import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLevelTest, getTest } from '../../lib/apis/quiz';
import { Quiz } from '../../lib/type';

const initialState = {
    quiz: [
        {
            id: 0,
            question:
                '상장사 주가에 발행주식 수를 곱하면 구할 수 있는 값으로, 전체 주식의 가치를 시장가격으로 평가한 금액인 이것은?',
            option1: '시가총액',
            option2: '액면가',
            option3: 'PBR',
            option4: 'PER',
            level: 0,
            answer: 1,
        },
    ],
};

type QuizResult = {
    success: boolean;
    message: string;
    result: Quiz[];
};

export const setStockTest = createAsyncThunk('test/setStockTest', async (): Promise<QuizResult> => {
    const response = await getTest();
    return response.data;
});

export const setLevelTest = createAsyncThunk('test/setLevelTest', async (): Promise<QuizResult> => {
    const response = await getLevelTest();
    return response.data;
});

const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setLevelTest.fulfilled, (state, action) => {
            state.quiz = action.payload.result;
        });
        builder.addCase(setStockTest.fulfilled, (state, action) => {
            state.quiz = action.payload.result;
        });
    },
});

export default quizSlice.reducer;
