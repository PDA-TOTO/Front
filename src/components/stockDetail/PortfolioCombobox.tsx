import { Combobox, InputBase, useCombobox } from "@mantine/core";
import classes from "./css/PortfolioCombobox.module.css";
import cx from "clsx";
import { useState } from "react";

type KrxCode = {
  krxCode: string;
  name: string;
  type: string;
};

type PortfolioItem = {
  id: number;
  amount: string;
  avg: number;
  deletedAt: string | null;
  krxCode: KrxCode;
};

type Portfolio = {
  id: number;
  portName: string;
  isMain: boolean;
  deletedAt: string | null;
  portfolioItems: PortfolioItem[];
};

type PortfolioComoboboxProps = {
  portfolios: Portfolio[];
  targetPortfolio: string;
  setTargetPortfolio: (val: string) => void;
};

const PortfolioComobobox: React.FC<PortfolioComoboboxProps> = ({
  portfolios,
  targetPortfolio,
  setTargetPortfolio,
}: PortfolioComoboboxProps) => {
  const [animating, setAnimating] = useState(false);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setAnimating(false);
    },
    onDropdownOpen: () => setAnimating(true),
  });

  const matchPort = (id: number) => {};

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val, optionProps) => {
        setTargetPortfolio(val);
        combobox.closeDropdown();
      }}
      shadow="xl"
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          // className={classes.inputPart}
          styles={{
            input: {
              border: 0,
              boxShadow: "var(--mantine-shadow-lg)",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          }}
        >
          {targetPortfolio}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {portfolios.map((portfolio, index) => (
            <Combobox.Option
              value={portfolio.portName}
              key={portfolio.id}
              className={cx({ [classes.animateOption]: animating })}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {portfolio.portName}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default PortfolioComobobox;
