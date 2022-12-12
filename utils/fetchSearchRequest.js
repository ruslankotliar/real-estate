import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchSearchRequest = async (url, query) => {
  const { data } = await axios.get(url, {
    params: { query: query },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  });

  return data;
};
