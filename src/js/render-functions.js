import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="card-meta">
          <span><b>Likes</b>${likes}</span>
          <span><b>Views</b>${views}</span>
          <span><b>Comments</b>${comments}</span>
          <span><b>Downloads</b>${downloads}</span>
        </div>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('show');
}

export function hideLoader() {
  loader.classList.remove('show');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
export function smoothScrollAfterAppend() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}
