import { Navbar as Navbar_, NavLink } from '@mantine/core'
import { useRouter } from 'next/router'

export default function Navbar({ years, hidden }) {
  const router = useRouter()
  return (
    <Navbar_ width={{ sm: 200 }} hiddenBreakpoint="sm" hidden={hidden}>
      {years.map(year => (
        <NavLink 
          key={year} 
          component="a" 
          href={year} 
          label={year}
          p="md" 
          active={router.asPath === `/${year}`}
          variant='filled'
        />
      ))}
    </Navbar_>
  )
}