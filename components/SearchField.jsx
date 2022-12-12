import { SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsChatText } from 'react-icons/bs';

const SearchField = () => {
  const router = useRouter();
  const { asPath } = router;

  // USE STATE
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch() {
    router.push(`search/${searchTerm}`);
  }

  function onKeyPress(e) {
    e.code == 'Enter' && handleSearch();
  }

  // // google autocomplete
  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  // const { ref } = usePlacesWidget({
  //   apiKey: apiKey,
  //   onPlaceSelected: (place) => place && setLocation(place),
  // });

  // useEffect(() => {
  //   if (navigator?.geolocation) {
  //     navigator.geolocation.getCurrentPosition((location) => {
  //       if (location) getDefaultLocation(location, setLocation);
  //     });
  //   }
  // }, []);

  return (
    <InputGroup alignItems={'center'} display={'flex'}>
      <InputLeftElement
        display={{ base: 'none', md: 'inline-flex' }}
        h={'full'}
        pointerEvents='none'
        // eslint-disable-next-line react/no-children-prop
        children={
          <BsChatText
            size={'1.5rem'}
            color={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          />
        }
      />
      <Input
        onKeyPress={onKeyPress}
        onInput={(e) => setSearchTerm(e.target.value)}
        variant={'outline'}
        bg={useColorModeValue('gray.50', 'gray.900')}
        size={'lg'}
        _placeholder={{
          color: useColorModeValue('blackAlpha.600', 'whiteAlpha.600'),
        }}
        placeholder='Enter anything...'
      />
      <InputRightElement
        w={'3rem'}
        h={'full'}
        // eslint-disable-next-line react/no-children-prop
        children={
          <IconButton
            onClick={handleSearch}
            colorScheme='green'
            aria-label='Search database'
            icon={<SearchIcon />}
          />
        }
      />
    </InputGroup>
  );
};

export default SearchField;
