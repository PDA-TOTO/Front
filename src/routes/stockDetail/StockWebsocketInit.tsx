import { useEffect } from 'react';
import { useStockDetailDispatch } from '../../lib/hooks/stockReduxHooks';
import { pushWebsocketPrice } from '../../store/reducers/stockWebSocketReducers';

import { getRecentStock } from '../../lib/apis/stock';
type Props = { id: string };

export default function StockWebsocketInit({ id }: Props) {
    const stockDetailDispatch = useStockDetailDispatch();
    useEffect(() => {
        getRecentStock(id).then((response) => {
            const price = response.data.result;
            console.log('#################################################');
            const webSocketData = {
                krxCode: id || '',
                aspr_acpt_hour: price,
                askp1: price,
                askp2: price,
                askp3: price,
                askp4: price,
                askp5: price,
                askp6: price,
                askp7: price,
                askp8: price,
                askp9: price,
                askp10: price,
                bidp1: price,
                bidp2: price,
                bidp3: price,
                bidp4: price,
                bidp5: price,
                bidp6: price,
                bidp7: price,
                bidp8: price,
                bidp9: price,
                bidp10: price,
                askp_rsqn1: price,
                askp_rsqn2: price,
                askp_rsqn3: price,
                askp_rsqn4: price,
                askp_rsqn5: price,
                askp_rsqn6: price,
                askp_rsqn7: price,
                askp_rsqn8: price,
                askp_rsqn9: price,
                askp_rsqn10: price,
                bidp_rsqn1: price,
                bidp_rsqn2: price,
                bidp_rsqn3: price,
                bidp_rsqn4: price,
                bidp_rsqn5: price,
                bidp_rsqn6: price,
                bidp_rsqn7: price,
                bidp_rsqn8: price,
                bidp_rsqn9: price,
                bidp_rsqn10: price,
            };
            stockDetailDispatch(pushWebsocketPrice(webSocketData));
        });
    }, []);
    return <div></div>;
}
