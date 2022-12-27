import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path'
import Chart from '../components/chart';

const DATA_DIR = 'data/rankings'

export async function getStaticPaths() {
  const files = await readdir(DATA_DIR);
  return {
    paths: files.map(f => path.basename(f, '.json')).map(year => ({
      params: { year },
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const file = await readFile(`${DATA_DIR}/${params.year}.json`)
  const data = JSON.parse(file)
  return {
    props: {
      data
    }
  }
}

export default function Year({ data }) {
  return (
    <Chart rankings={data} />
  )
}
