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
import { createPortfolio } from '../../lib/apis/portfolios';

//선택한 종목들 버튼 누르면 종목이름과 비중 입력받을 수 있는 테이블 입력

const PortfolioEdit : React.FC = () => {

    const [inputType,setInputType] = useState(false) //기본 0이면 %로 받겠다는 뜻
    const [isEditType , setIsEditType] = useState(false) // 수정하는 화면인지 아닌지에 따라 제목이 포폴 수정하기, 생성하기로 다르게 보임
    const location = useLocation()
    const [port, setPort] = useState([]) //[ {"name" : "이름", "code" : "123456"}, ... ]
    const [portId , setPortId ] = useState(0) //없으면 일단 0으로 만들고 서버에 넘겨주면 알아서 id부여해준다
    const [selectedStock, setSelectedStock] = useState([])
    const [selectedStockWeight, setselectedStockWeight] = useState([])

    function table(stocks, inputType){ //stocks => selectedStock임
        const rows = stocks?.map((elem,idx) =>(
            <>
                <Table.Tbody key={elem}>
                <Table.Tr>
                    <Table.Td>{elem}</Table.Td>
                    <Table.Td style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                        <Input 
                        style={{width:"100px"}} 
                        value={selectedStockWeight[stocks.indexOf(elem)]} 
                        onChange={(e)=>{    
                            selectedStockWeight[idx] = Number(e.target.value)
                            setselectedStockWeight(selectedStockWeight)
                        }}></Input>{inputType === false ? '%' : '원'}
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
            <div style={{display:"flex", alignContent:"center", alignItems:"center"}}>
                <div>금액으로 입력</div>
                <Switch onChange={(e)=>{setInputType(!inputType)}} style={{marginLeft:"10px"}}/>
                <Button onClick={(e)=>{navigate(-1);
                    createPortfolio(portId,stocks,selectedStockWeight)
                    // console.log("yeah",selectedStockWeight, selectedStock)
                }} style={{marginLeft : "20px"}}>제출하기</Button>
            </div>
            </Table>
        );
    }
        
    const navigate = useNavigate()
    useEffect(() => {
        if (location.state) {
        //   setSelectedStock(location.state.items)
        //   setselectedStockWeight(location.state.weight)
        //   setSelectedStock(location.state.items)
          setIsEditType(location.state.length === 0 ? false : true) //길이가 0이면 수정모드가 아니라 새로 만드는 모드
          setPort(location.state.items) //종목들 쭈루루루 
        }
        // console.log("port",port)

        setPortId(location.state?.portId)
        
        //전에 넘겨줬던 location.state.items구조 => {"stockId" : "005930", "name":"삼성전자", "weight" : 0.5} 이게 배열에 담겨있는 형태
        const tempStocks = port.map((elem)=>{ return elem.name })
        const tempWeight = port.map((elem)=>{ return elem.weight})
        // console.log(tempStocks, tempWeight)

        //기존에 받아왔던 종목들 다시 multiselector에 넘겨줘서 선택된 상태로 보여주기
        setSelectedStock(tempStocks)
        setselectedStockWeight(tempWeight)
    }, [port]);

    //테스트용 클릭
    const onClicked = (stocks)=>{ //종목이름만 가져옴
        // setselectedStockWeight([])
        setSelectedStock(stocks)
    }

    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34} style={{display:"flex"}}>
            <Grid.Col span={4}>
                <Button onClick={(e)=>{navigate(-1)}}>뒤로가기</Button>
                <div style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                    {isEditType === false ? <h3>포트폴리오 추가하기</h3> : <h3>포트폴리오 수정하기</h3>}
                    <Button>+</Button>
                </div>
                <div style={{ width:"100%",display:"flex"}}>
                    {/* 일단 전에 받아왔던 주식정보들 넘겨준다 existStock은 포폴에 담긴 주식들 보내주는거고 Click함수는 부모에서 처리 */}
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
