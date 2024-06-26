import React, { useRef } from 'react';
import { Button, Grid, Input, Table } from '@mantine/core';
import '@mantine/charts/styles.css';
import { useNavigate } from 'react-router-dom';
import SearchableMultiSelect from './matine_layout/SearchableMultiSelect';
import { useState, useEffect } from 'react';
import { createPortfolio } from '../../lib/apis/portfolios';
import { NumberInput } from '@mantine/core';
import { getPrice } from '../../lib/apis/stocks';
//선택한 종목들 버튼 누르면 종목이름과 비중 입력받을 수 있는 테이블 입력

const PortfolioEdit: React.FC = () => {
    const navigate = useNavigate();

    //멀티 select에서 선택된 종목 이름 띄우기
    const [selectedStock, setSelectedStock] = useState<{ stockName: string; krxCode: string }[]>([]);
    const [prices, setPrices] = useState<number[]>([]);

    //오른쪽에 종목별 총합
    const [sumPrices, setSumPrices] = useState<number[]>([]);

    //밑에 나오는 가격 총 합
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const portNameRef = useRef<HTMLInputElement>(null);

    const [selectedStockAmount, setselectedStockAmount] = useState<number[]>([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        return inputElement.value;
    };

    const onClicked = async (items: { krxCode: string; name: string; type: string }[]) => {
        //종목이름만 가져옴

        //종목 이름 띄우기
        const stocks = items.map((elem) => {
            return { stockName: elem.name, krxCode: elem.krxCode };
        });
        setSelectedStock(stocks);

        const p = await getPrice(stocks);
        setPrices(p);

        const updatedPrices = items.map(() => 0);
        setSumPrices(updatedPrices);
    };

    useEffect(() => {
        let total = 0;
        sumPrices.forEach((amount) => {
            total += Number(amount);
        });
        setTotalPrice(total);
    }, [selectedStockAmount, prices]);

    const handlePriceChange = (e: number, idx: number) => {
        const newAmounts = [...selectedStockAmount];
        newAmounts[idx] = Number(e);
        setselectedStockAmount(newAmounts);
        console.log(selectedStockAmount);
    };

    // let tempportName : string = ""

    const numberInputHandler = (e: number | string, idx: number) => {
        const tempPrice = prices[idx] * Number(e);
        const newSumPrices = [...sumPrices];
        newSumPrices[idx] = tempPrice;
        setSumPrices(newSumPrices);
        handlePriceChange(Number(e), idx);
    };
    function table(stocks: { stockName: string; krxCode: string }[]) {
        //stocks => selectedStock
        const rows = stocks?.map(
            (
                elem,
                idx //{"stockName" : string, "stockPrice" : number}[]
            ) => (
                <>
                    <Table.Tbody key={elem.krxCode}>
                        <Table.Tr>
                            <Table.Td>{elem.stockName}</Table.Td>
                            <Table.Td>{prices[idx]}</Table.Td>
                            <Table.Td style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                                {
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginRight: '30px',
                                            width: '100px',
                                        }}
                                    >
                                        <NumberInput
                                            value={selectedStockAmount[idx]}
                                            min={0}
                                            onChange={(e: number | string) => numberInputHandler(e, idx)}
                                        ></NumberInput>
                                        주
                                    </div>
                                }
                            </Table.Td>
                            <Table.Td>{sumPrices[idx]} 원</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </>
            )
        );

        return (
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ width: '100px' }}>종목명</Table.Th>
                        <Table.Th style={{ width: '100px' }}>가격</Table.Th>
                        <Table.Th style={{ width: '100px' }}>수량입력</Table.Th>
                        <Table.Th style={{ width: '100px' }}>총 금액</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {rows}
                <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                    <Button
                        onClick={async () => {
                            const newPortName = portNameRef;
                            console.log(newPortName);
                            // const portNameRef = useRef<HTMLInputElement>(null);

                            if (newPortName !== undefined && confirm('제출하시겠습니까?')) {
                                try {
                                    await createPortfolio({
                                        newPortName: newPortName.current!.value,
                                        selectedStock,
                                        selectedStockAmount,
                                        prices,
                                    });

                                    navigate(-1);
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                } catch (error: any) {
                                    console.error('Error occurred:', error);
                                    if ('request' in error) {
                                        alert(
                                            error.request.response.split(':')[2].replace('}', '').replaceAll('"', '')
                                        );
                                    } else {
                                        console.log(1);
                                    }
                                }
                            } else {
                                console.log('암것도 안함');
                                console.log({ newPortName, selectedStock, selectedStockAmount, prices });
                            }
                        }}
                        style={{ marginLeft: '20px', marginTop: '20px' }}
                    >
                        제출하기
                    </Button>
                </div>
                <Table.Th style={{ width: '100px' }}>총 금액: {totalPrice}원</Table.Th>
            </Table>
        );
    }

    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34} style={{ display: 'flex' }}>
            <Grid.Col span={4}>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    뒤로가기
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                    <h3>포트폴리오 추가하기</h3>
                </div>

                <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                    <div style={{ margin: '10px' }}>포트폴리오 이름</div>
                    <Input
                        ref={portNameRef}
                        onChange={(e) => {
                            onChange(e);
                        }}
                    ></Input>
                </div>

                <div style={{ width: '100%', display: 'flex' }}>
                    {/* 일단 전에 받아왔던 주식정보들 넘겨준다 existStock은 포폴에 담긴 주식들 보내주는거고 Click함수는 부모에서 처리 */}
                    <SearchableMultiSelect onClicked={onClicked}></SearchableMultiSelect>
                </div>
                {table(selectedStock)}
            </Grid.Col>
        </Grid>
    );
};

export default PortfolioEdit;
