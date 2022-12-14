import React from 'react';

import { Box, Flex, Spinner } from '@chakra-ui/react';

const LoadingStatus = () => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      w={'calc(100vw)'}
      h={'calc(100vh)'}
      pos={'fixed'}
      top={0}
    >
      <Spinner color='red.500' size='xl' />
    </Flex>
  );
};

export default LoadingStatus;
