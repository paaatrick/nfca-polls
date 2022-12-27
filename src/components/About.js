import { Box, useMantineTheme } from '@mantine/core'

export default function About() {
  const theme = useMantineTheme();
  return (
    <Box
      sx={{
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
        fontSize: theme.fontSizes.sm
      }}
    >
      <p>Data from <a target="_blank" rel="noopener noreferrer" href="https://nfca.org/pages/polls">USA Today/NFCA Coaches Division 1 polls</a></p>
      <p>Created by <a target="_blank" rel="noopener noreferrer" href="http://patrickkalita.com/">Patrick Kalita</a></p>
    </Box>
  )
}