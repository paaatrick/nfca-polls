import { Navbar as Navbar_, NavLink } from '@mantine/core'
import { useRouter } from 'next/router'
import About from './About'
import Link from 'next/link'

export default function Navbar({ years, hidden }) {
  const router = useRouter()
  return (
    <Navbar_ width={{ sm: 150, md: 275 }} hiddenBreakpoint="sm" hidden={hidden}>
      <Navbar_.Section grow>
        {years.map(year => (
          <NavLink 
            key={year} 
            component={Link}
            href={year} 
            label={year}
            p="md" 
            active={router.asPath === `/${year}/`}
            variant='filled'
          />
        ))}
      </Navbar_.Section>
      <Navbar_.Section>
        <About />
      </Navbar_.Section>
    </Navbar_>
  )
}