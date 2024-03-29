import React, { useState,useEffect } from 'react';
import { Button } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import { getAllStockNames } from '../../../lib/apis/stocks';

// let groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];
import { AxiosResponse } from 'axios';

function codeAndName(values : string[]){
    return getAllStockNames().then((response: AxiosResponse<any, any>) => {
        // 응답에서 데이터 추출
        const codes = response.data;
        // 추출한 데이터 필터링
        return codes.filter((elem : {"code" : string, "name" : string}) => values.includes(elem.name));
    });
}

export default function SearchableMultiSelect({ onClicked }: { onClicked: (selectedItems: string[]) => void, existStocks: string[] }){
  
    const [value, setValue] = useState<string[]>([]); //
    const [names, setNames] = useState<string[]>([]); //모든 종목들 이름 가져오기

    // async function handleClick() {
    //     try {
    //         const result = await codeAndName(value);
    //         // result를 사용하여 원하는 작업 수행
    //         console.log('Filtered data:', result);
    //     } catch (error) {
    //         console.error('Error occurred:', error);
    //     }
    // }
// 
    useEffect(() => {
        async function api() {
            return await getAllStockNames(); //모든 종목들 가져와 보리기~~
        }
        api().then((stocks) => {
            console.log(stocks)
            //종목이름들 가져와 보리기~
            const temp = stocks.data?.map((elem : {name : string})=>{ return elem.name });
            //가져온 이름 세팅 가보자 가보자 => MultiSelect에 data값으로 넣어준다
            setNames(temp) 
        });
    }, [codeAndName]);

    return( 
    <>
        <MultiSelect style={{width:"100%"}} data={names} value={value}  onChange={setValue} searchable/> 
        {/* 버튼 누르면 종목 이름만 넘어감 => 부모에서 처리 해줘야함(종목이름이랑 코드 매핑)*/}
        <Button onClick={async () => {
                await codeAndName(value)
                    .then(async (result) => {
                        await onClicked(result);
                    })
                    .catch((error) => {
                        console.error('Error occurred:', error);
                    });
            }}>선택</Button>
    </>
    );
}