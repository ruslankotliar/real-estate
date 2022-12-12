import {
  fetchSearchRequest,
  baseUrl,
} from '../../../utils/fetchSearchRequest.js';
import React from 'react';
import PropertiesContainer from '../../../components/PropertiesContainer.jsx';

const index = ({ properties }) => {
  const { hits } = properties;
  return (
    <>
      <PropertiesContainer searchProperties={hits} />
    </>
  );
};

// THIS DOWN HAS TO BE UNCOMMENTED
export async function getServerSideProps({ query }) {
  const { search } = query;
  const properties = await fetchSearchRequest(
    `${baseUrl}/auto-complete`,
    search
  );
  return { props: { properties: properties } };
}

export default index;
