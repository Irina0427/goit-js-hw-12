import axios from 'axios';

const API_KEY = '52299901-ed5308505488786f07030921d'; 
axios.defaults.baseURL = 'https://pixabay.com/api/';

const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });
  return data;
}
export { PER_PAGE };
