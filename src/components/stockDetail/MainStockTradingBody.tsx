import { Button, Grid, Group, Stack, rem } from "@mantine/core";
import CircleInfo from "./CircleInfo";
import { useElementSize } from "@mantine/hooks";
import { MouseEventHandler } from "react";

type MainStockTradingBodyProps = {
  gap: "xs" | "sm" | "md" | "lg" | "xl";
  onBuyClick: MouseEventHandler;
  onSellClick: MouseEventHandler;
};

const MainStockTradingBody: React.FC<MainStockTradingBodyProps> = ({
  gap,
  onBuyClick,
  onSellClick,
}: MainStockTradingBodyProps) => {
  const { ref, width } = useElementSize();
  return (
    <Stack gap={gap}>
      <CircleInfo title="신뢰도" info="A+" width={width / 2 - 14} />
      <Group justify="space-between">
        <CircleInfo title="보유 수량" info="3" width={width / 2 - 14} />
        <CircleInfo title="평단" info="100,000₩" width={width / 2 - 14} />
      </Group>
      <Grid ref={ref}>
        <Grid.Col span={6}>
          <Button
            color="pink.5"
            autoContrast
            fullWidth
            h={rem(54)}
            onClick={onBuyClick}
          >
            사기
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            color="secondary.5"
            autoContrast
            fullWidth
            h={rem(54)}
            onClick={onSellClick}
          >
            팔기
          </Button>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default MainStockTradingBody;
