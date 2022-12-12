// import { parseBody } from 'next/dist/server/api-utils/node';
import Hero from '../components/Hero';
import PropertiesContainer from '../components/PropertiesContainer';
// import FilterBar from '../components/FilterBar';
import { Box } from '@chakra-ui/react';
// import { fetchFiltersRequest, baseUrl } from '../utils/fetchFiltersRequest';

const index = () => {
  return (
    <Box pos={'relative'} minHeight={'80vh'}>
      <Hero />
      <PropertiesContainer />
    </Box>
  );
};

export default index;
