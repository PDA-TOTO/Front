import React, { useState } from "react";
import RisingStock from "./RisingStock";
type Props = {
  id: number;
};

export default function BottomStock({ id }: Props) {
  const [pageNum, setPageNum] = useState<number>(1);

  return (
    <div>
      {id === 0 && <RisingStock />}
      {id === 1 && <div>시가 총액 순</div>}
      {id === 2 && <div>관심 종목</div>}
    </div>
  );
}
