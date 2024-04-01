import React, { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import '@mantine/charts/styles.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Bar, ZAxis } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { getPortNames, getWeight, getBeta, deletePortfolio } from '../../lib/apis/portfolios';

type portfolioItem = {
    id : number,
    amount : number,
    avg : number,
    krxCode : {krxCode: string , name: string, type: string}
}
type myPort = {
    weight?: number[];
    id : number,
    ismain : boolean,
    portName : string,
    portfolioItems : portfolioItem[]
}

const ScatterChartComponent: React.FC = (data) => {
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
            <XAxis dataKey="x" type="number" name="베타" unit="" />
            <YAxis dataKey="y" type="number" name="기대수익률" unit="%" />
            <ZAxis dataKey="z" type="category" name="포트폴리오 이름" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Portfolio" data={data} fill="#1639e8" />
        </ScatterChart>
    );
};

const PortfolioPage: React.FC = () => {
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [portNames,setPortNames] = useState<string[]>([])
    const [myPorts, setMyPorts] = useState<myPort[]>([])
    const [numSelected, setNumSelected] = useState<number>(0)
    const [betas, setBetas] = useState<Array<number[]>>([])
    const [graph, setGraph ] = useState<{x : number, y : number, z : string}[]>([])

    useEffect(()=>{
        const func = async ()=>{
            const B = await getBeta();
            setBetas(B)
            return await getPortNames();
        }

        func().then(result=>{
            const port:myPort[] = result.data.result
            console.log(port)

            const portWithRatios = port.map(async (elem)=>{
                const res = await getWeight(elem.id)
                
                const weight: number[] = res.data.result.portfolioItems.map((elem : {ratio : number })=>{
                    return elem.ratio
                })
                return {
                    ...elem,
                    weight
                };
            })
            Promise.all(portWithRatios).then(value=>{
                setMyPorts(value)
            })
        })
    },[])

    useEffect(()=>{
        const G : {x : number, y : number, z : string}[] = myPorts.map((elem: myPort, idx: number) => {
            const temp: { x: number ; y: number; z: string  } = { x: 0, y: 0, z: '' }; // 타입 정의 수정
            temp.z = elem.portName;
            temp.x = Number(getBetaSum(myPorts,idx))
            temp.y = Number(getER(myPorts,idx))
            return temp
        });
        setGraph(G)
    },[myPorts])

    function showDetail(myports : myPort[] , numSelected : number){
        // console.log("Myports ",myPorts)
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
                    return <div key={elem.id} style={{height : "50px", border:"solid black 1px", margin : "20px", display:"flex", textAlign : "center"}}>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.krxCode.name}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.amount}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{elem.avg.toLocaleString()}원</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{(elem.avg* elem.amount).toLocaleString()}원</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{myports[numSelected]?.weight?.[idx]?.toFixed(2).toLocaleString()}</div>
                        <div style={{width : "200px", alignContent : "center", alignItems:"center "}}>{betas[numSelected][idx].toFixed(2)}</div>
                        </div>})}
            </>
        )
    }

    function getPortSum( myPorts : myPort [] , numSelected : number){
        const selectedPort = myPorts[numSelected];
        const selectedPorts = selectedPort?.portfolioItems
        let sum = 0
        selectedPorts?.map( (elem :portfolioItem) =>{sum += Number(elem.amount) * elem.avg;})
        return sum;
    }

    function getBetaSum( myPorts : myPort [] , numSelected : number){
        // console.log(myPorts[numSelected]?.weight)
        const selectedPort = myPorts[numSelected];
        const selectedPorts = selectedPort?.portfolioItems
        let sum = 0
        selectedPorts?.map( (elem :portfolioItem, idx : number) =>{
            const beta =  betas[numSelected]?.[idx]
            const weight = myPorts[numSelected]?.weight?.[idx] 
            // console.log(beta,weight)
            sum += beta * weight!
        })
        return (sum/100).toFixed(2);
    }

    function getER(myPorts : myPort[] , numSelected : number){
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
                    포트폴리오 지표 분석(베타 - 기대수익률)
                </h2>
                <div style={{ width: '100%', height: 300 }}>
                    {/* <ScatterChartComponent  /> */}
                    {ScatterChartComponent(graph)}
                </div>
                
                <div style={{fontWeight : 'bold' ,display : "flex"}}>
                    <div>
                        포트폴리오
                    </div>
                    <select style={{marginLeft:"10px"}} value={numSelected} onChange={(e)=>{setNumSelected(Number(e.target.value))}}>
                        {/* {portNames.map((elem,idx)=>{return <option value={idx}>{elem}</option>})} */}
                        {myPorts.map((elem,idx)=>{return <option key={elem.id} value={idx}>{elem.portName}</option>})}
                    </select>
                    {/* <Button style={{marginLeft:"10px"}} onClick={openDeleteModal}>포트폴리오 삭제하기</Button> */}
                    <button style={{marginLeft:"10px"}} onClick={()=>{
                        if(confirm(myPorts[numSelected].portName+" 포트폴리오를 삭제하시겠습니까?")){
                            // console.log(myPorts[numSelected].id)
                            deletePortfolio(myPorts[numSelected].id)
                            setNumSelected(0)
                            // setMyPorts(myPorts)
                            window.location.reload();
                        }
                    }}>포트폴리오 삭제하기</button>
                    <button style={{marginLeft:"10px"}} onClick={()=>{navigate("create")}}>
                        포트폴리오 만들기
                    </button>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <h1 style={{marginLeft : "10px" ,fontFamily : "Arial",width : "400px",fontWeight : 'bold' ,display : "flex"}}>{myPorts[numSelected]?.portName}</h1>
                    <h3 style={{marginLeft :"30px" , fontWeight : 'bold' ,display : "flex"}}>
                        포트폴리오 자산 : {getPortSum(myPorts,numSelected).toLocaleString()}원</h3>
                    <h3 style={{marginLeft : "50px"}}>베타 : {getBetaSum(myPorts,numSelected)}</h3>
                    <h3 style={{marginLeft :"30px" , fontWeight : 'bold' ,display : "flex"}}>기대수익률 : {getER(myPorts,numSelected)}%</h3>    
                </div>
                {showDetail(myPorts, numSelected)}      
            </Grid.Col>
        </Grid>
    );
};

export default PortfolioPage;
