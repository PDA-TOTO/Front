import React from 'react';
import { Button, Flex, Grid,Input,Switch,Table } from '@mantine/core';
import '@mantine/charts/styles.css';
import { BarChart } from '@mantine/charts';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Bar } from 'recharts';
import { useNavigate,useLocation } from 'react-router-dom';
import { TransferList } from './matine_layout/TransferList';
import { SearchableMultiSelect } from './matine_layout/SearchableMultiSelect';
import { useState, useEffect } from 'react';
import { getAllStockNames } from '../../lib/apis/stocks';

const PortfolioEdit : React.FC = () => {
    const navigate = useNavigate()
    const [inputType,setInputType] = useState(false) //기본 0이면 %로 받겠다는 뜻
    const [isEditType , setIsEditType] = useState(false)
    const location = useLocation()

    const [port, setPort] = useState([]) //[ {"name" : "이름", "code" : "123456"}, ... ]

    const [selectedStock, setSelectedStock] = useState([])
    const [selectedStockWeight, setselectedStockWeight] = useState([])

    useEffect(() => {
        if (location.state) {
          setSelectedStock(location.state.items)
          setselectedStockWeight(location.state.weight)
          setIsEditType(location.state.length ===0 ? false : true)
        }
        console.log(port)
        const stocknames = port.map((elem)=>{
            return elem.name
        })
    }, []);

    //선택한 종목들 버튼 누르면 종목이름과 비중 입력받을 수 있는 테이블 입력
    function table(stocks, inputType){
        console.log(stocks)
        // const rows = stocks.items.map((elem) => (
        const rows = stocks.map((elem) =>(
            <>
                <Table.Tbody key={elem}>
                <Table.Tr>
                    <Table.Td>{elem}</Table.Td>
                    <Table.Td style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                        <Input 
                        style={{width:"100px"}} 
                        value={selectedStockWeight[stocks.indexOf(elem)]} 
                        onChange={(e)=>console.log(e)}></Input>{inputType === false ? '%' : '원'}
                    </Table.Td> 
                </Table.Tr>
                </Table.Tbody>
            </>
        ));
        return(
            <Table>
            <Table.Thead>
            <Table.Tr>
                <Table.Th style={{width:"100px"}}>종목명</Table.Th>
                <Table.Th style={{width:"100px"}}>비중입력</Table.Th>
            </Table.Tr>
            </Table.Thead>
            {rows}
            <div style={{display:"flex"}}>
                <div>금액으로 입력</div>
                <Switch onChange={(e)=>{console.log(inputType); setInputType(!inputType)}} style={{marginLeft:"10px"}}/>
                <Button onClick={(e)=>{navigate(-1)}}>제출하기</Button>
            </div>
        </Table>
        
        );
    }

    //테스트용 클릭
    const onClicked = (stocks)=>{
        // console.log("너 ", stocks,"눌렀찌")
        setselectedStockWeight([])
        setSelectedStock(stocks)
        // setPort({"items": stocks})
    }

    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34} style={{display:"flex"}}>
            <Grid.Col span={4}>
                <Button onClick={(e)=>{navigate(-1)}}>뒤로가기</Button>
                <div style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                    <h3>포트폴리오 추가하기</h3>
                    <Button>+</Button>
                </div>
                <div style={{ width:"100%",display:"flex"}}>
                    <SearchableMultiSelect
                        onClicked={onClicked} 
                        existStocks={selectedStock.length > 0 ?  selectedStock : []}>    
                    </SearchableMultiSelect>
                </div>
                {table(selectedStock,inputType)}
            </Grid.Col>
        </Grid>
    );
};

export default PortfolioEdit;
