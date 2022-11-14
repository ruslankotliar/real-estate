import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  useColorMode,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';

const Property = ({ property }) => {
  let {
    id,
    name,
    agency,
    purpose,
    price,
    title,
    location,
    category,
    coverPhoto,
  } = property;

  const image = coverPhoto
    ? coverPhoto.url
    : 'https://source.unsplash.com/random/300×300/?house';
  const locationName = location && `${location[1]?.name}, ${location[3]?.name}`;
  name = name || agency.name;
  // Hook to toggle dark mode
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      w='300px'
      rounded='20px'
      overflow='hidden'
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      mt={10}
    >
      <Image src={image} alt={title} boxSize='300px'></Image>
      <Box h={'15rem'} p={5}>
        {price && (
          <Stack align='center'>
            <Badge
              variant='solid'
              fontSize={'md'}
              colorScheme='green'
              rounded='full'
              px={8}
              py={1}
            >
              {`${purpose}: ${price}$`}
            </Badge>
          </Stack>
        )}
        <Stack align='center'>
          <Text
            as='h2'
            textAlign={'center'}
            minH={'3rem'}
            fontWeight='normal'
            my={2}
          >
            {name}
          </Text>
          {location && (
            <Text minH={'3rem'} fontWeight='light'>
              {locationName}
            </Text>
          )}
        </Stack>
        <Flex mt={'.5rem'}>
          <Spacer />
          <Button variant='solid' colorScheme='green' size='sm'>
            Learn More
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Property;
