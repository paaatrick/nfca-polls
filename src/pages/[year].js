import { useState } from 'react';
import Chart from '../components/Chart';
import { AppShell } from '@mantine/core';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { getYear, getYears } from '../data';

export async function getStaticPaths() {
  const years = await getYears()
  return {
    paths: years.map(year => ({
      params: { year },
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const years = await getYears()
  const data = await getYear(params.year)
  return {
    props: {
      data,
      years,
    }
  }
}

export default function Year({ data, years }) {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar years={years} hidden={!opened} />}
      header={<Header opened={opened} onToggle={() => setOpened((o) => !o)} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Chart rankings={data} />
    </AppShell>
  )
}
