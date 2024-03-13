import { useState } from 'react';
import { Group, Collapse, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from '../../styles/Navbar.module.css';

interface LinksGroupProps {
  label: string;
  links?: { label: string; link: string }[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export function LinksGroup({ label, links, active, setActive }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);

  const items = (hasLinks ? links : []).map((item) => (
    <a
      className={classes.links}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
    <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)}>
        <Group justify="center" gap={0} pos={'relative'}>
            <span className={classes.link}>{label}</span>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}