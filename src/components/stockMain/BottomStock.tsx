import RisingStock from './RisingStock';
import MarketCap from './MarketCap';
type Props = {
    id: number;
};

export default function BottomStock({ id }: Props) {
    return (
        <div>
            {id === 0 && <RisingStock />}
            {id === 1 && <MarketCap />}
            {/* {id === 2 && <div>관심 종목</div>} */}
        </div>
    );
}
