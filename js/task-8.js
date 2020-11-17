import galleryItems from './gallery-items.js';
// console.log(galleryItems[0]);
const galleryListRef = document.querySelector('.js-gallery');
const bigImageRef = document.querySelector('.big-image');
const modalRef = document.querySelector('.js-lightbox');
const closeModalBth = document.querySelector('.lightbox__button');

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
  console.log(imagesOriginal);
  bigImageRef.src = imagesOriginal.dataset.source;
  bigImageRef.alt = imagesOriginal.alt;
  modalRef.classList.add('is-open');
}

function hendlerClosedModal() {
  modalRef.classList.remove('is-open');
}
