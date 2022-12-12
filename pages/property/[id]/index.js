import React from 'react';
import PropertyDetails from '../../../components/PropertyDetails';

import {
  fetchPropertyDetailsRequest,
  baseUrl,
} from '../../../utils/fetchPropertyDetailsRequest';

const index = ({ propertyDetails }) => {
  return (
    <>
      <PropertyDetails propertyDetails={propertyDetails} />
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchPropertyDetailsRequest(baseUrl, id);

  return {
    props: { propertyDetails: data },
  };
}

export default index;
