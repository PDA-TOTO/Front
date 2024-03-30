import React, { useEffect, useState } from 'react';
import { Grid,Switch,Table } from '@mantine/core';
import '@mantine/charts/styles.css';
// import { Bar } from 'react-chartjs-2';
import { BarChart } from '@mantine/charts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { findStocksByPortId, getPortNames } from '../../lib/apis/portfolios';
import { portfolioInstance } from '../../lib/apis/api';

type portfolioItem = {
    id : Number,
    amount : Number,
    krxCode : {krxCode: String , name: String, type: String}
}
const data01 = [
    { x: 1, y: 2 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 9 },
    { x: 5, y: 10 },
];

const ScatterChartComponent: React.FC = () => {
    return (
        <ScatterChart
            width={730}
            height={250}
            margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 10,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="volatility" unit="%" />
            <YAxis dataKey="y" type="number" name="expected return" unit="%" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Portfolio" data={data01} fill="#8884d8" />
        </ScatterChart>
    );
};

function Demo() {
    const elements :{ [key : string] : number} =  { m1 : 10, m3 : -20, m6 : -30, m12 : 40}
    const rows = (
      <Table.Tr>
        {Object.keys(elements).map((key) => (
            <Table.Td style={elements[key]>0 ? {color:"red"}: {color:"blue"}}>{elements[key]} %</Table.Td>
        ))}
      </Table.Tr>
    );
  
    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>1개월</Table.Th>
            <Table.Th>3개월</Table.Th>
            <Table.Th>6개월</Table.Th>
            <Table.Th>12개월</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
        
      </Table>
    );
}
const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 }
]
  

const PortfolioPage: React.FC = () => {
    const navigate = useNavigate()
    const [portNames,setPortNames] = useState<string>([])
    const [myPorts, setMyPorts] = useState([])
    const [numSelected, setNumSelected] = useState<number>(0)
    const [port, setPort] = useState<[{items : [], portNames : "", portid : ""}]>([{items : [], portNames : "", portid : ""}])
    
    useEffect(()=>{
        const func = async ()=>{
            return await getPortNames();
        }
        func().then(result=>{
            const port = result.data.result
            console.log(port)
            setMyPorts(port)

            const names = port.map((elem)=>{return elem.portName})

            // console.log(names)
            setPortNames(names)
        }).then(()=>{

        });

    },[])
    
    useEffect(()=>{
        console.log(numSelected,"selected")
        console.log(portNames)
        // const tempPort = {"portName" : portNames[numSelected], "portId" : 1}
    },[numSelected])

    function showDetail(myports, numSelected){
        const selectedPort = myports[numSelected];
        const selectedPorts = selectedPort?.portfolioItems
        console.log(selectedPort)
        return (
            <>
                {selectedPorts?.map((elem)=>{
                    return <div>{elem.krxCode.name}</div>})}
                <div>1</div>
            </>
        )
    }
    
    const test = async (e) => {
        console.log(port)
        findStocksByPortId(78)
    };

    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34} style={{display:"flex"}}>
            <Grid.Col span={4}>
                <h2>
                    포트폴리오 지표 분석
                </h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ScatterChartComponent />
                </div>
                
                <div style={{fontWeight : 'bold' ,display : "flex"}}>
                    <div>
                        포트폴리오
                    </div>
                    <select style={{marginLeft:"10px"}}  onChange={(e)=>{setNumSelected(Number(e.target.value))}}>
                        {/* {portNames.map((elem,idx)=>{return <option value={idx}>{elem}</option>})} */}
                        {myPorts.map((elem,idx)=>{return <option value={idx}>{elem.portName}</option>})}
                    </select>
                    <button style={{marginLeft:"10px"}} onClick={test}>
                        보기
                    </button>
                    <button style={{marginLeft:"10px"}} onClick={()=>{navigate("create")}}>
                        포트폴리오 만들기
                    </button>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <h3 style={{fontWeight : 'bold' ,display : "flex"}}>투자구성종목</h3>
                    <h4 style={{marginLeft : "50px"}}>베타 : </h4>
                    <h5>1.3</h5>
                </div>
                {showDetail(myPorts, numSelected)}      
                <h3>
                    기간별 수익률
                    {Demo()}
                </h3>
            </Grid.Col>
        </Grid>
    );
};

export default PortfolioPage;
