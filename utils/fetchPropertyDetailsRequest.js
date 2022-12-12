import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com/properties/detail';

export const fetchPropertyDetailsRequest = async (url, id) => {
  const { data } = await axios.get(url, {
    url: 'https://bayut.p.rapidapi.com/properties/detail',
    params: { externalID: id },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  });

  return data;
};
