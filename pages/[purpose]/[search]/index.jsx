import { fetchApi, baseUrl } from '../../../utils/fetchApi.js';
import React, { useEffect } from 'react';
import PropertiesContainer from '../../../components/PropertiesContainer.jsx';

const index = ({ properties }) => {
  properties = []
  const {hits} = properties
  console.log(hits);
  return (
    <div>
      <PropertiesContainer properties={hits} />
    </div>
  );
};

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const data = await fetchSearchData();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export async function getServerSideProps({ query }) {
//   const { search } = query;
//   const properties = await fetchApi(`${baseUrl}/auto-complete`, search);
//   return { props: { properties: properties } };
// }

export default index;
