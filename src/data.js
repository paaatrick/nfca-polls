import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path'

const DATA_DIR = 'data/rankings'

export async function getYears() {
  const files = await readdir(DATA_DIR);
  return files
    .map(f => path.basename(f, '.json'))
    .sort((a, b) => b.localeCompare(a))
}

export async function getYear(year) {
  const file = await readFile(`${DATA_DIR}/${year}.json`)
  return JSON.parse(file)
}
