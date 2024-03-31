import React, { useEffect, useState } from 'react';
import { Center, Grid,Switch,Table } from '@mantine/core';
import '@mantine/charts/styles.css';
// import { Bar } from 'react-chartjs-2';
import { BarChart } from '@mantine/charts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { findStocksByPortId, getPortNames, getWeight, getBeta } from '../../lib/apis/portfolios';
import { portfolioInstance } from '../../lib/apis/api';

type portfolioItem = {
    id : number,
    amount : number,
    avg : number,
    krxCode : {krxCode: string , name: string, type: string}
}
type myPort = {
    id : number,
    ismain : boolean,
    portName : string,
    portfolioItems : portfolioItem[]
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

const PortfolioPage: React.FC = () => {
    const navigate = useNavigate()
    const [portNames,setPortNames] = useState<string>([])
    const [myPorts, setMyPorts] = useState([])
    const [numSelected, setNumSelected] = useState<number>(0)
    const [betas, setBetas] = useState([])

    useEffect(()=>{
        const func = async ()=>{
            const B = await getBeta();
            setBetas(B)
            return await getPortNames();
        }

        func().then(result=>{
            const port = result.data.result
            port.map(async (elem,idx)=>{
                // Promise.all(await getWeight(elem.id))
                // console.log(await getWeight(elem.id))
                const res = await getWeight(elem.id)
                const ratios = []
                res.data.result.portfolioItems.map(async elem=>{
                    // console.log(elem.ratio)
                    await ratios.push(elem.ratio)
                })
                // console.log(ratios)
                const tempmyports = port
                tempmyports[idx].weight = ratios
            })
            

            console.log(port)
            setMyPorts(port)
            const names = port.map((elem)=>{return elem.portName})
            setPortNames(names)
        }).then();
    },[])

    function showDetail(myports, numSelected){
        const selectedPort = myports[numSelected];
        const selectedPorts = selectedPort?.portfolioItems
        return (
            <>
                <div style={{height : "50px", border:"solid black 1px", margin : "20px", display:"flex", textAlign : "center"}}>
                <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>종목명</div>
                <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>수량</div>
                <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>평균단가</div>
                <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>평가금액</div>
                <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>비중</div>
                <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>베타</div>
                
                </div>
                {selectedPorts?.map((elem : portfolioItem, idx : number)=>{
                    return <div style={{height : "50px", border:"solid black 1px", margin : "20px", display:"flex", textAlign : "center"}}>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.krxCode.name}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.amount}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.avg}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.avg* elem.amount}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{myports[numSelected]?.weight?.[idx]?.toFixed(2)}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{betas[numSelected][idx].toFixed(2)}</div>
                        </div>})}
            </>
        )
    }
    
    const test = async (e) => {
        // console.log(portWeight)
        console.log(myPorts)
        // findStocksByPortId(78)
        // console.log(myPorts[numSelected].portName)
    };

    function getPortSum( myPorts : myPort [] , numSelected : number){
        const selectedPort = myPorts[numSelected];
        const selectedPorts = selectedPort?.portfolioItems
        const betaList = betas[numSelected]
        let sum = 0
        selectedPorts?.map( (elem :portfolioItem,idx : number) =>{sum += Number(elem.amount) * elem.avg;})
        return sum;
    }
    function getBetaSum( myPorts : myPort [] , numSelected : number){
        console.log(myPorts[numSelected]?.weight)
        const selectedPort = myPorts[numSelected];
        const selectedPorts = selectedPort?.portfolioItems
        let sum = 0
        selectedPorts?.map( (elem :portfolioItem, idx : number) =>{
            const beta =  betas[numSelected]?.[idx]
            const weight = myPorts[numSelected]?.weight?.[idx] 
            console.log(beta,weight)
            sum += beta * weight
        })
        return (sum/100).toFixed(2);
    }
    function getER(myPorts,numSelected){
        const beta = Number(getBetaSum(myPorts,numSelected));
        const rf = 3.414
        const Em = 2
        const capm = rf + beta*(Em-rf)
        return capm.toFixed(2)
    }
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
                    <h1 style={{marginLeft : "10px" ,fontFamily : "Arial",width : "200PX",fontWeight : 'bold' ,display : "flex"}}>{myPorts[numSelected]?.portName}</h1>
                    <h3 style={{marginLeft : "50px"}}>베타 : {getBetaSum(myPorts,numSelected)}</h3>
                    <h3 style={{marginLeft :"30px" , fontWeight : 'bold' ,display : "flex"}}>
                        포트폴리오 자산 : {getPortSum(myPorts,numSelected)}</h3>
                    <h3 style={{marginLeft :"30px" , fontWeight : 'bold' ,display : "flex"}}>기대수익률 : {getER(myPorts,numSelected)}%</h3>    
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
