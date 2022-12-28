import { Header as Header_, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';


export default function Header({ opened, onToggle }) {
  const theme = useMantineTheme();
  return (
    <Header_ height={{ base: 70}} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={onToggle}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text size='xl'>NFCA NCAA Division 1 Softball Polls</Text>
      </div>
    </Header_>
  )
}
