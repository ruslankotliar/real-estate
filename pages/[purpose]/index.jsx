import { fetchApi, baseUrl } from '../../utils/fetchApi';
import Hero from '../../components/Hero';
import PropertiesContainer from '../../components/PropertiesContainer';
import FilterDrawer from '../../components/FilterBar';
import { Box } from '@chakra-ui/react';

const index = ({ properties }) => {
  properties = []
  return (
    <Box minHeight={'80vh'}>
      <FilterDrawer />
      <Hero />
      <PropertiesContainer properties={properties} />
    </Box>
  );
};

// export async function getServerSideProps({ query }) {
//   // const { purpose } = params;
//   const purpose = query.purpose || 'for-rent';
//   const rentFrequency = query.rentFrequency || 'yearly';
//   const minPrice = query.minPrice || '0';
//   const maxPrice = query.maxPrice || '1000000';
//   const roomsMin = query.roomsMin || '0';
//   const bathsMin = query.bathsMin || '0';
//   const sort = query.sort || 'price-desc';
//   const areaMax = query.areaMax || '35000';
//   const locationExternalIDs = query.locationExternalIDs || '5002';
//   const categoryExternalID = query.categoryExternalID || '4';
//   const properties = await fetchApi(
//     `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
//   );

//   return {
//     props: {
//       properties: properties?.hits,
//     },
//   };
// }

export default index;
