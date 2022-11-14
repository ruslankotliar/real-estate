import { Box, Flex, Select, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { filterData, getFilterValues } from '../utils/filterData';

const FilterBar = () => {
  const [filters] = useState(filterData);
  const [topPos, setTopPos] = useState(-8);
  const [currentScrollPos, setCurrentScrollPos] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hideFilters, setHideFilters] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');
  const filterBarRef = useRef(null);
  const router = useRouter();
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      setCurrentScrollPos(currentScrollPos);
    };
  }

  function showFiltersBar() {
    setTopPos((topPos += 0.5));
    filterBarRef.current.style.top = `${topPos}rem`;
    topPos < 0 && requestAnimationFrame(showFiltersBar);
  }

  function hideFiltersBar() {
    setTopPos((topPos -= 0.5));
    filterBarRef.current.style.top = `${topPos}rem`;
    topPos > -8 && requestAnimationFrame(hideFiltersBar);
  }

  useEffect(() => {
    if (showFilters) {
      console.log('show filters');
      requestAnimationFrame(showFiltersBar);
    } else if (hideFilters) {
      console.log('hide filters');
      requestAnimationFrame(hideFiltersBar);
    }
  }, [showFilters, hideFilters]);

  useEffect(() => {
    const showFiltersNew = currentScrollPos > windowHeight * 0.81;
    if (showFiltersNew != showFilters) {
      setShowFilters(showFiltersNew);
    }
    const hideFiltersNew = currentScrollPos < windowHeight * 0.81;
    if (hideFiltersNew != hideFilters) {
      setHideFilters(hideFiltersNew);
    }
  }, [currentScrollPos]);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    setWindowHeight(windowHeight);
    filterBarRef.current.style.top = `${topPos}rem`;
  }, []);

  return (
    <Box ref={filterBarRef} pos={'fixed'} zIndex={'5'}>
      <Flex
        bg={useColorModeValue(
          'rgba(255, 255, 255, 0.65)',
          'rgba(26, 32, 44, 0.65)'
        )}
        color={useColorModeValue('gray.600', 'white')}
        flexWrap={'wrap'}
        justifyContent={'center'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 24, lg: 40 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        {filters?.map((filter) => (
          <Box key={filter.queryName}>
            <Select
              bg={bg}
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
              placeholder={filter.placeholder}
              w='fit-content'
              p='2'
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default FilterBar;
