import { createSlice } from "@reduxjs/toolkit";


const initialState = [{
  id: 0,
  question: "상장사 주가에 발행주식 수를 곱하면 구할 수 있는 값으로, 전체 주식의 가치를 시장가격으로 평가한 금액인 이것은?",
  answer1: "시가총액",
  answer2: "액면가",
  answer3: "PBR",
  answer4: "PER",
  level: 0,
  answer: 1,
  exp: 0,
  created_at: new Date()
},
{
  id: 0,
  question: "문제2",
  answer1: "시가총액",
  answer2: "액면가",
  answer3: "PBR",
  answer4: "PER",
  level: 0,
  answer: 2,
  exp: 0,
  created_at: new Date()
},{
  id: 0,
  question: "문제3",
  answer1: "시가총액",
  answer2: "액면가",
  answer3: "PBR",
  answer4: "PER",
  level: 0,
  answer: 3,
  exp: 0,
  created_at: new Date()
},{
  id: 0,
  question: "문제4",
  answer1: "시가총액",
  answer2: "액면가",
  answer3: "PBR",
  answer4: "PER",
  level: 0,
  answer: 4,
  exp: 0,
  created_at: new Date()
},{
  id: 0,
  question: "문제5",
  answer1: "시가총액",
  answer2: "액면가",
  answer3: "PBR",
  answer4: "PER",
  level: 0,
  answer: 1,
  exp: 0,
  created_at: new Date()
},{
  id: 0,
  question: "상장사 주가에 발행주식 수를 곱하면 구할 수 있는 값으로, 전체 주식의 가치를 시장가격으로 평가한 금액인 이것은?",
  answer1: "시가총액",
  answer2: "액면가",
  answer3: "PBR",
  answer4: "PER",
  level: 0,
  answer: 2,
  exp: 0,
  created_at: new Date()
},];



const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {},
});


export default quizSlice.reducer;
