import galleryItems from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const lightboxImageRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.js-lightbox');
const closeModalBth = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');
const nextImgRef = document.querySelector('.lightbox__handler.next');
const prevImgRef = document.querySelector('.lightbox__handler.prev');

galleryListRef.insertAdjacentHTML('beforeend', getItemsMarkup(galleryItems));

galleryListRef.addEventListener('click', handlerClickImages);
closeModalBth.addEventListener('click', hendlerClosedModal);
overlayRef.addEventListener('click', hendlerClosedModal);

let indexImg;

function getItemsMarkup(items) {
  return items.reduce(
    (string, { preview, original, description }, ind) =>
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
          data-index="${ind}"
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
  indexImg = Number(imagesOriginal.dataset.index);

  hendlerOpenModal();
  setImageOnModal(imagesOriginal);
}

function hendlerOpenModal() {
  window.addEventListener('keydown', hendlerEscClosedModal);
  window.addEventListener('keydown', hendlerModalGallary);
  nextImgRef.addEventListener('click', scrolledNextImgOnModal);
  prevImgRef.addEventListener('click', scrolledPrevImgOnModal);
  modalRef.classList.add('is-open');
}

function setImageOnModal(image) {
  lightboxImageRef.src = image.dataset.source;
  lightboxImageRef.alt = image.alt;
}

function hendlerModalGallary({ code }) {
  if (code === 'ArrowRight') {
    scrolledNextImgOnModal();
  }
  if (code === 'ArrowLeft') {
    scrolledPrevImgOnModal();
  }
}

function scrolledNextImgOnModal() {
  if (indexImg < galleryItems.length - 1) {
    indexImg += 1;
    scrolledActiveImgOnModal(indexImg);
  }
}
function scrolledPrevImgOnModal() {
  if (indexImg > 0) {
    indexImg -= 1;
    scrolledActiveImgOnModal(indexImg);
  }
}

function scrolledActiveImgOnModal(indexImg) {
  const activeSrc = galleryItems[indexImg].original;
  const activeAlt = galleryItems[indexImg].description;
  lightboxImageRef.src = activeSrc;
  lightboxImageRef.alt = activeAlt;
}

//==========functions close==========//
function hendlerEscClosedModal({ code }) {
  if (code === 'Escape') {
    hendlerClosedModal();
  }
}
function hendlerClosedModal() {
  window.removeEventListener('keydown', hendlerEscClosedModal); //при закрытии снимаем слушатель
  window.removeEventListener('keydown', hendlerModalGallary);
  nextImgRef.removeEventListener('click', scrolledNextImgOnModal);
  prevImgRef.removeEventListener('click', scrolledPrevImgOnModal);
  modalRef.classList.remove('is-open');
  clearAttributeImageOnModal();
}

function clearAttributeImageOnModal() {
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
}
