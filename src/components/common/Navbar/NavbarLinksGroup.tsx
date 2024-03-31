import { useState } from "react";
import { Group, Collapse, UnstyledButton, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "../../../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

interface LinksGroupProps {
  label: string;
  links?: { label: string; link: string }[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export function LinksGroup({
  label,
  links,
  active,
  setActive,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const items = (hasLinks ? links : []).map((item) => (
    <a
      className={
        item.label === "채권" || item.label === "ETF"
          ? classes.unActive
          : classes.links
      }
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        if (item.label === "채권" || item.label === "ETF") {
          notifications.show({
            message: "해당 레벨에서는 볼 수 없는 서비스예요.",
          });
        } else {
          navigate(item.link);
        }
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)}>
        <Group justify="center" gap={0} pos={"relative"}>
          <span className={classes.link} style={{ width: "150px" }}>
            {label}
          </span>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
