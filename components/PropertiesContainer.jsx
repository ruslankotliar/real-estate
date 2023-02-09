import { Box, filter, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Property from './Property';
import FilterBar from './FilterBar';
import LoadingStatus from './LoadingStatus';
import { useRouter } from 'next/router';

const PropertiesContainer = ({ searchProperties }) => {
  const [scrollPos, setScrollPos] = useState(null);
  const [applyFiltersAndScroll, setApplyFiltersAndScroll] = useState(false);
  const [properties, setProperties] = useState(searchProperties);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { route } = router;
  const propContainerRef = useRef(null);

  useEffect(() => {
    if (properties) {
      if (applyFiltersAndScroll) {
        const windowWidth = window.innerWidth;
        let scrollShift;
        // responsive design improvement
        if (windowWidth > 1170) scrollShift = 40;
        else if (windowWidth >= 650 && windowWidth <= 1170) scrollShift = 90;
        else if (windowWidth < 650) scrollShift = 140;
        window.scrollTo(0, scrollPos - scrollShift);
      }
      setScrollPos(propContainerRef?.current.offsetTop);
    }
  }, [properties]);

  return (
    <Box zIndex={1500} ref={propContainerRef}>
      <Flex flexWrap={'wrap'} justifyContent={'space-evenly'}>
        {properties &&
          properties.map((property) => (
            <Property
              setLoading={setLoading}
              property={property}
              key={property.id}
            />
          ))}
      </Flex>
      {route == '/' && (
        <FilterBar
          setProperties={setProperties}
          setLoading={setLoading}
          setApplyFiltersAndScroll={setApplyFiltersAndScroll}
        />
      )}
      {loading && <LoadingStatus />}
    </Box>
  );
};

export default PropertiesContainer;
