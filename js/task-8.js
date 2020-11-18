import galleryItems from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const lightboxImageRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.js-lightbox');
const closeModalBth = document.querySelector('[data-action="close-lightbox"]');

galleryListRef.insertAdjacentHTML('beforeend', getItemsMarkup(galleryItems));

galleryListRef.addEventListener('click', handlerClickImages);
closeModalBth.addEventListener('click', hendlerClosedModal);

function getItemsMarkup(items) {
  return items.reduce(
    (string, { preview, original, description }) =>
      string +
      `<li class="gallery__item">
         <a
           class="gallery__link"
           href="${original}"
          >
         <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          />
         </a>
       </li>`,
    ` `,
  );
}

function handlerClickImages(event) {
  event.preventDefault(); // чтобы не переходило по ссылке при клике
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imagesOriginal = event.target;

  hendlerOpenModal();
  setImageOnModal(imagesOriginal);
}

function hendlerOpenModal() {
  modalRef.classList.add('is-open');
}
function setImageOnModal(value) {
  lightboxImageRef.src = value.dataset.source;
  lightboxImageRef.alt = value.alt;
}

function hendlerClosedModal() {
  modalRef.classList.remove('is-open');
  clearAttributeImageOnModal();
}

function clearAttributeImageOnModal() {
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
}
