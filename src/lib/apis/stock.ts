import { stockInstance } from './api';

export type GlobalResponse<T> = {
    success: boolean;
    message: string;
    result?: T;
};

export type FinanceResponse = {
    code: string;
    yymm: string;
    rev: number;
    income: number;
    netincome: number;
    roeVal: number;
    eps: number;
    lbltRate: number;
    bps: number;
    incomeRate: number;
    incomeGrownthRate: number;
    netincomeGrownthRate: number;
    per: number;
    cap: number;
    pbr: number;
    dividend: number;
    dividendRate: number;
    quickRatio: number;
    consensus: number;
    beta: number;
    revGrownthRate: number;
    netincomeRate: number;
};

export const getFinance = async (id: string): Promise<GlobalResponse<FinanceResponse>> => {
    const { data } = await stockInstance.get<GlobalResponse<FinanceResponse>>(`/${id}/finance`);

    return data;
};
