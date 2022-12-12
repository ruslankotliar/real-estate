import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box pos={'relative'} minH={'100vh'}>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
