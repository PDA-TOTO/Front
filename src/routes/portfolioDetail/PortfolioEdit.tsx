import React from 'react';
import { Button, Grid,Input,Switch,Table } from '@mantine/core';
import '@mantine/charts/styles.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { SearchableMultiSelect } from './matine_layout/SearchableMultiSelect';
import { useState, useEffect } from 'react';
import { createPortfolio } from '../../lib/apis/portfolios';
import { useSelector } from 'react-redux';
import { NumberInput } from '@mantine/core';
//선택한 종목들 버튼 누르면 종목이름과 비중 입력받을 수 있는 테이블 입력

const PortfolioEdit : React.FC = () => {

    const location = useLocation()
    const user = useSelector(state => state.user.user);
    
    const [inputType,setInputType] = useState(false) //기본 0이면 %로 받겠다는 뜻
    const [isEditType , setIsEditType] = useState(false) // 수정하는 화면인지 아닌지에 따라 제목이 포폴 수정하기, 생성하기로 다르게 보임
    
    const [port, setPort] = useState([]) //[ {"name" : "이름", "code" : "123456"}, ... ]
    const [portId , setPortId ] = useState(0) //없으면 일단 0으로 만들고 서버에 넘겨주면 알아서 id부여해준다
    const [portName , setPortName] = useState<string>("")
    const [stockCode, setStockCode ] = useState([])

    const [selectedStock, setSelectedStock] = useState<string[]>([])
    const [selectedStockWeight , setselectedStockWeight] = useState<number[]>([])
    
    // console.log("user", user)

    function table(stocks : string[], inputType : boolean ){ //stocks => selectedStock임
        const rows = stocks?.map((elem,idx) =>(
            <>
                <Table.Tbody key={elem}>
                <Table.Tr>
                    <Table.Td>{elem}</Table.Td>
                    <Table.Td style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                        {inputType === false ? 
                        <div style={{display:"flex", alignItems:"center", marginRight:"30px" ,width:"100px"}}>
                            <Input 
                            style={{width:"100px"}} 
                            value={selectedStockWeight[idx]} 
                            onChange={(e)=>{    
                                selectedStockWeight[idx] = Number(e.target.value);
                                // console.log(selectedStockWeight)
                                setselectedStockWeight(selectedStockWeight)}}>
                        </Input>%</div> 
                        : <div style={{display:"flex" , alignItems:"center", marginRight:"30px",width:"100px"}}>
                            <NumberInput defaultValue={0}></NumberInput>주</div>
                        }
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
                <Switch onChange={()=>{setInputType(!inputType)}} style={{marginLeft:"10px"}}/>
                <Button onClick={()=>{
                    // console.log(stockCode);
                    createPortfolio({user, portId, portName, stockCode , selectedStockWeight});
                    navigate(-1);
                    // console.log("yeah",selectedStockWeight, selectedStock)
                }} style={{marginLeft : "20px"}}>제출하기</Button>
            </div>
            </Table>
        );
    }
        
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state) {
          setIsEditType(location.state.length === 0 ? false : true) //길이가 0이면 수정모드가 아니라 새로 만드는 모드
          setPort(location.state.items) //종목들 쭈루루루 
          setPortName(location.state.portName)
        }

        setPortId(location.state?.portId || 0);
        
        //전에 넘겨줬던 location.state.items구조 => {"stockId" : "005930", "name":"삼성전자", "weight" : 0.5} 이게 배열에 담겨있는 형태
        const tempStocks : string[] = port.map((elem : {"name" : string} )=>{ return elem.name })
        const tempWeight : number[] = port.map((elem : {"weight" : number} )=>{ return elem.weight})
        
        // console.log(tempStocks, tempWeight)

        //기존에 받아왔던 종목들 다시 multiselector에 넘겨줘서 선택된 상태로 보여주기
        setSelectedStock(tempStocks)
        setselectedStockWeight(tempWeight)
    }, [port]);

    //테스트용 클릭
    const onClicked = async ( items )=>{ //종목이름만 가져옴
        // console.log("dd",items)
        const stocks = items.map((elem)=>{return elem.name})
        setSelectedStock(stocks)
        setStockCode(items)
    }

    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34} style={{display:"flex"}}>
            <Grid.Col span={4}>
                <Button onClick={()=>{navigate(-1)}}>뒤로가기</Button>
                <div style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                    {isEditType === false ? <h3>포트폴리오 추가하기</h3> : <h3>포트폴리오 수정하기</h3>}
                    <Button>+</Button>
                </div>
                
                {isEditType === false ? 
                <div style={{display:"flex", marginBottom:"10px", alignItems:"center"}}>
                    <div style={{margin:"10px"}}>포트폴리오 이름</div><Input value={portName} onChange={(e)=>setPortName(e.target.value)}></Input>
                </div> :
                <div style={{display:"flex", marginBottom:"10px", alignItems:"center"}}>
                    <h4 style={{margin:"10px"}}>승준이포트폴리오</h4>
                </div>
                }

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
