import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Property from './Property';

const PropertiesContainer = ({ properties }) => {
  const [ScrollPos, setScrollPos] = useState(null);
  const router = useRouter();
  const propContainerRef = useRef(null);

  useEffect(() => {
    const queryLength = Object.keys(router.query).length;
    if (queryLength > 1) {
      window.scrollTo(0, ScrollPos);
      // propContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [properties]);

  useEffect(() => {
    setScrollPos(propContainerRef?.current.offsetTop);
  }, []);
  return (
    <Flex
      ref={propContainerRef}
      flexWrap={'wrap'}
      justifyContent={'space-evenly'}
    >
      {properties.map((property) => (
        <Property property={property} key={property.id} />
      ))}
    </Flex>
  );
};

export default PropertiesContainer;
