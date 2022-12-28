import Head from 'next/head'
import { useRouter } from 'next/router'
import { getYears } from '../data'

export async function getStaticProps() {
  const years = await getYears()
  return {
    props: {
      latest: years[0]
    }
  }
}

export default function HomePage({ latest }) {
  const router = useRouter()
  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${router.basePath}/${latest}/`} />
    </Head>
  )
}
