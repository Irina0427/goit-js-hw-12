import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScrollAfterAppend,
} from './js/render-functions.js';

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query', position: 'topRight' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits || 0;

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({ message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideLoader();
    form.reset(); 
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    smoothScrollAfterAppend();

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({ message: 'Failed to load more images.', position: 'topRight' });
  } finally {
    hideLoader();
  }
}