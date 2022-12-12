import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com/properties/list';

export const fetchFiltersRequest = async (url, params) => {
  // let data
  const { data } = await axios.get(url, {
    params,
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  });

  // return data || [];
  return data;
};
