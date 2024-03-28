import React from 'react';
import { Grid,Switch,Table } from '@mantine/core';
import '@mantine/charts/styles.css';
// import { Bar } from 'react-chartjs-2';
import { BarChart } from '@mantine/charts';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
const data01 = [
    { x: 1, y: 2 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 9 },
    { x: 5, y: 10 },
];

const port = {
    "items" : ["삼성전자","SK하이닉스","셀트리온"],
    "weight" : [0.5, 0.25, 0.25]

}
const portNames = ["포트1","포트폴리오2","프로포폴3"]
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
            {/* <Scatter name="B school" data={data02} fill="#82ca9d" /> */}
        </ScatterChart>
    );
};
function portSelectClicked(){
    console.log(1)
}

function Demo() {

    const elements =  { m1 : 10, m3 : -20, m6 : -30, m12 : 40}
    
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


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 }
]
  

const PortfolioPage: React.FC = () => {
    const navigate = useNavigate()
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
                    <select style={{marginLeft:"10px"}}>
                        {portNames.map((elem,idx)=>{return <option value={idx}>{elem}</option>})}
                    </select>
                    <button style={{marginLeft:"10px"}} onClick={(e)=>portSelectClicked()}>
                        보기
                    </button>
                    <button style={{marginLeft:"10px"}} onClick={(e)=>{portSelectClicked(); navigate("create")}}>
                        포트폴리오 만들기
                    </button>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <h3 style={{fontWeight : 'bold' ,display : "flex"}}>투자구성종목</h3>
                    <div style={{marginLeft:"25px", fontSize:"12px"}}>자세히보기</div>
                    <Switch style={{marginLeft:"10px"}}/>
                    <button style={{fontSize:"10px",marginLeft:"10px"}} onClick={(e)=>{portSelectClicked(); navigate("edit")}}>
                        편집
                    </button>
                </div>
                {/* <Bar options={options} data={data}></Bar> */}
                <BarChart h={300}
                    data={data}
                    dataKey="month"
                    // xScale={{ type: 'linear' }}
                    // yScale={{ type: 'band' }}
                    type="percent"
                    series={[
                        { name: 'Smartphones', color: 'violet.6' },
                        { name: 'Laptops', color: 'blue.6' },
                        { name: 'Tablets', color: 'teal.6' },
                    ]}
                />              

                <h3>
                    기간별 수익률
                    {Demo()}
                </h3>
            </Grid.Col>
        </Grid>
    );
};

export default PortfolioPage;
