import { useState } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import { Button, Grid,Switch,Table } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

export function SearchableMultiSelect({onClicked}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <div style={{display:"flex"}}>
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}  >
        <Combobox.DropdownTarget>
        <PillsInput onClick={() => {combobox.openDropdown()}}>
            <Pill.Group>
                {values}

                <Combobox.EventsTarget>
                <PillsInput.Field
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    value={search}
                    placeholder="Search values"
                    onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                    console.log("onchange")
                    }}
                    onKeyDown={(event) => {
                    if (event.key === 'Backspace' && search.length === 0) {
                        event.preventDefault();
                        handleValueRemove(value[value.length - 1]);
                        console.log("onKeyDown")
                    }
                    }}
                />
                </Combobox.EventsTarget>
            </Pill.Group>
            </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
            <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
            </Combobox.Options>
        </Combobox.Dropdown>
        </Combobox>
        <Button onClick={(e)=>{onClicked(value)}}>선택</Button>
    </div>
  );
}