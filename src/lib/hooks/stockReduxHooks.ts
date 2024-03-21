import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StockDetailDispatch, StockDetailStoreState } from '../../store/stockDetailStore';

export const useStockDetailDispatch = () => useDispatch<StockDetailDispatch>();
export const useStockDetailSelector: TypedUseSelectorHook<StockDetailStoreState> = useSelector;
