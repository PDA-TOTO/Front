import React from 'react';
import { Button, Grid,Input,Switch,Table } from '@mantine/core';
import '@mantine/charts/styles.css';
// import { Bar } from 'react-chartjs-2';
import { BarChart } from '@mantine/charts';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { TransferList } from './matine_layout/TransferList';
import { SearchableMultiSelect } from './matine_layout/SearchableMultiSelect';
import { useState } from 'react';
const PortfolioEdit : React.FC = () => {
    const navigate = useNavigate()
    const [selectedStock, setSelectedStock] = useState([])
    const [inputType,setInputType] = useState(0) //기본 0이면 %로 받겠다는 뜻

    
function table(stocks,inputType){
    const rows = stocks.map((elem) => (
        <>
            <Table.Tbody key={elem}>
            <Table.Tr>
                <Table.Td>{elem}</Table.Td>
                <Table.Td ><Input></Input>{inputType === false ? '%' : '원'}</Table.Td>
            </Table.Tr>
            </Table.Tbody>
        </>
      ));
    return(
        <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{width:"100px"}}>종목명</Table.Th>
            <Table.Th style={{width:"10px"}}>비중입력</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {rows}
        <div style={{display:"flex"}}>
            <div>금액으로 입력</div>
            <Switch onChange={(e)=>{console.log(inputType); setInputType(!inputType)}} style={{marginLeft:"10px"}}/>
        </div>
      </Table>
      
    );
}
    const onClicked = (stocks)=>{
        console.log("너 ", stocks,"눌렀찌")
        setSelectedStock(stocks)
    }

    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34} style={{display:"flex"}}>
            <Grid.Col span={4}>
                <Button onClick={(e)=>{navigate(-1)}}>뒤로가기</Button>
                <div style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                    <h3>포트폴리오 추가하기</h3>
                    <Button>+</Button>
                </div>
                {/* <TransferList></TransferList> */}
                <div style={{ width:"100%",display:"flex"}}>
                    <SearchableMultiSelect onClicked={onClicked}></SearchableMultiSelect>
                </div>
                {table(selectedStock,inputType)}
            </Grid.Col>
        </Grid>
    );
};

export default PortfolioEdit;
