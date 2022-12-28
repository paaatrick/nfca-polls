import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>NFCA NCAA Division 1 Softball Polls</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg"></link>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          primaryColor: 'teal',
          globalStyles: (theme) => ({
            '.y.axis .domain': { 
              stroke: 'none' 
            },
            '.y.axis .tick line': {
              stroke: theme.colors.gray[4]
            }
          })
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
