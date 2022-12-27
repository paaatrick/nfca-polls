import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path'
import { useState } from 'react';
import Chart from '../components/chart';
import { AppShell } from '@mantine/core';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const DATA_DIR = 'data/rankings'

async function getYears() {
  const files = await readdir(DATA_DIR);
  return files
    .map(f => path.basename(f, '.json'))
    .sort((a, b) => b.localeCompare(a))
}

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
  const file = await readFile(`${DATA_DIR}/${params.year}.json`)
  const data = JSON.parse(file)
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
