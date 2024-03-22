import { useState,useEffect } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import { Button, Grid,Switch,Table } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import { getAllStockNames } from '../../../lib/apis/stocks';

let groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

// export function SearchableMultiSelect({onClicked, existStocks}) {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//     onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
//   });
//   useEffect(()=>{
//     // groceries = groceries.concat(existStocks)
//   },[])

//   const [search, setSearch] = useState('');
//   const [value, setValue] = useState<string[]>([]);

//   const handleValueSelect = (val: string) =>
//     setValue((current) =>
//       current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
//     );

//   const handleValueRemove = (val: string) =>
//     setValue((current) => current.filter((v) => v !== val));

//   const values = value.map((item) => (
//     <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
//       {item}
//     </Pill>
//   ));

//   const options = groceries
//     .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
//     .map((item) => (
//       <Combobox.Option value={item} key={item} active={value.includes(item)}>
//         <Group gap="sm">
//           {value.includes(item) ? <CheckIcon size={12} /> : null}
//           <span>{item}</span>
//         </Group>
//       </Combobox.Option>
//     ));

//   return (
//     <div style={{display:"flex"}}>
//         <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}  >
//         <Combobox.DropdownTarget>
//         <PillsInput onClick={() => {combobox.openDropdown()}}>
//             <Pill.Group>
//                 {values}

//                 <Combobox.EventsTarget>
//                 <PillsInput.Field
//                     onFocus={() => combobox.openDropdown()}
//                     onBlur={() => combobox.closeDropdown()}
//                     value={search}
//                     placeholder="Search values"
//                     onChange={(event) => {
//                     combobox.updateSelectedOptionIndex();
//                     setSearch(event.currentTarget.value);
//                     console.log("onchange")
//                     }}
//                     onKeyDown={(event) => {
//                     if (event.key === 'Backspace' && search.length === 0) {
//                         event.preventDefault();
//                         handleValueRemove(value[value.length - 1]);
//                         console.log("onKeyDown")
//                     }
//                     }}
//                 />
//                 </Combobox.EventsTarget>
//             </Pill.Group>
//             </PillsInput>
//         </Combobox.DropdownTarget>

//         <Combobox.Dropdown>
//             <Combobox.Options >
//             {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
//             </Combobox.Options>
//         </Combobox.Dropdown>
//         </Combobox>
//         <Button onClick={(e)=>{onClicked(value)}}>선택</Button>
//     </div>
//   );
// }

export function SearchableMultiSelect({onClicked, existStocks}) {
  
    const [value, setValue] = useState<string[]>([]); //
    const [names, setNames] = useState([]); //모든 종목들 이름 가져오기

    useEffect(() => {
        async function api() {
            return await getAllStockNames(); //모든 종목들 가져와 보리기~~
        }
        api().then((stocks) => {
            //종목이름들 가져와 보리기~
            const temp = stocks.data?.map((elem)=>{ return elem.name });
            //가져온 이름 세팅 가보자 가보자 => MultiSelect에 data값으로 넣어준다
            setNames(temp) 
        }).then(async () => {
            setValue(existStocks)
        });
    }, [existStocks]);
    return( 
    <>
        <MultiSelect style={{width:"100%"}} data={names} value={value}  onChange={setValue} searchable/> 
        {/* 버튼 누르면 종목 이름만 넘어감 => 부모에서 처리 해줘야함(종목이름이랑 코드 매핑)*/}
        <Button onClick={(e)=>{onClicked(value)}}>선택</Button>
    </>);

}