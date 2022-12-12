import '../styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import Layout from '../components/layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import RefreshTokenHandler from '../components/RefreshTokenHandler';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [interval, setInterval] = useState(0);
  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
          <RefreshTokenHandler setInterval={setInterval} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default React.memo(MyApp);
