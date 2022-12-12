import _ from 'lodash';
import {
  Box,
  Drawer,
  Flex,
  Select,
  useColorModeValue,
  useDisclosure,
  DrawerContent,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { filterData, getFilterValues } from '../utils/filterData';
import { fetchFiltersRequest, baseUrl } from '../utils/fetchFiltersRequest';

const FilterBar = ({ setProperties, setLoading, setApplyFiltersAndScroll }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters] = useState(filterData);
  const [params, setParams] = useState({
    locationExternalIDs: '5002',
  });
  const [currentScrollPos, setCurrentScrollPos] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);
  const [closedWithBtn, setClosedWithBtn] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');

  // debounce function
  let filterTimeout;
  const debounceFilter = (params) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setApplyFiltersAndScroll(true);
      requestProperties(params);
    }, 2000);
  };

  const searchProperties = async (filterValues) => {
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        params[item.name] = item.value;
        setParams({ [item.name]: item.value, ...params });
      }
    });
    debounceFilter(params);
  };

  const requestProperties = async (params) => {
    setLoading(true);
    const { hits: properties } = await fetchFiltersRequest(baseUrl, params);
    setLoading(false);
    setProperties(properties);
  };

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      setCurrentScrollPos(currentScrollPos);
    };
  }

  useEffect(() => {
    if (
      currentScrollPos > windowHeight * 0.5 &&
      currentScrollPos < windowHeight * 0.8
    ) {
      if (!closedWithBtn && !isOpen) {
        onOpen();
      }
    } else if (
      currentScrollPos < windowHeight * 0.5 &&
      currentScrollPos > windowHeight * 0.2
    ) {
      isOpen && onClose();
      setClosedWithBtn(false);
    }
  }, [currentScrollPos]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    // default filtering
    requestProperties(params);
  }, []);

  const toggleDrawerBtn = (
    <IconButton
      aria-label='Toggle filters'
      icon={
        <Icon
          height={8}
          width={8}
          as={isOpen ? TriangleUpIcon : TriangleDownIcon}
        />
      }
      pos={'fixed'}
      top={5}
      right={5}
      variant={'ghost'}
      zIndex={10}
      onClick={() => {
        isOpen && setClosedWithBtn(true);
        isOpen ? onClose() : onOpen();
      }}
    />
  );

  return (
    <>
      {!isOpen && currentScrollPos > windowHeight * 0.5 && toggleDrawerBtn}
      <Drawer
        placement='top'
        isOpen={isOpen}
        onClose={onClose}
        pos={'fixed'}
        // allowPinchZoom={true}
        // returnFocusOnClose={false}
        blockScrollOnMount={false}
        // closeOnOverlayClick={false}
        // isFullHeight={false}
        // trapFocus={false}
      >
        <DrawerContent>
          {isOpen && toggleDrawerBtn}
          <Flex
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
                  onChange={(e) => {
                    searchProperties({ [filter.queryName]: e.target.value });
                  }}
                  placeholder={filter.placeholder}
                  w='fit-content'
                  p='2'
                >
                  {filter?.items?.map((item) => (
                    <option
                      value={item.value}
                      selected={
                        params[filter.queryName] == item.value ? true : false
                      }
                      key={item.value}
                    >
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Box>
            ))}
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default React.memo(FilterBar);
