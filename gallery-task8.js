"use strict";
import images from "./gallery-items.js";
const refs = {
  gallery: document.querySelector('.js-gallery'),
  image: document.createElement('img'),
  lightbox: document.querySelector('.lightbox'),
   btn: document.querySelector('button[data-action="close-lightbox"]'),
  modal: document.querySelector('.lightbox__content'),
  lightbox__image: document.querySelector('.lightbox__image'),
};
//Создание и рендер разметки по массиву данных и  шаблону
const createGalleryItem = ({ preview, original, description }, index ) =>
  `<li class='gallery__item'>
<a class='gallery__link' href=${original}>
  <img class='gallery__image'
    src=${preview}
    data-source=${original}
    alt=${description}
    data-index = ${index};
    /></a></li>`;
const galleryMarkup = images.reduce(
  (acc, item) => acc + createGalleryItem(item),
  ''
);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);//вставляем в HTML

//refs.image.classList.add("gallery__image");
refs.gallery.addEventListener('click', galleryClick);//клик по картинке 
refs.btn.addEventListener('click', onClickHandlerClose);
refs.modal.addEventListener('click', closeLightbox);

function galleryClick(e) {
  e.preventDefault();  //Default(при клике на картинку)не куда, не переходит.
  if (e.target.nodeName !== 'IMG') {//проверка,что "клик", на картинку(img)!!!просто досвиданье.
    return;
  };   

  if (e.target.nodeName === 'IMG') { //проверка,если равен.  
    refs.lightbox.classList.add('is-open');// добавляю на div.lightbox CSS-класс is-open
    refs.lightbox__image.src = e.target.getAttribute('data-source');
    refs.lightbox__image.alt = e.target.alt;
  };
  window.addEventListener('keyup', clickKey);
};

function onClickHandlerClose(e) {
  e.preventDefault(); 
  refs.lightbox.classList.remove('is-open');// снимает, если уже есть 
  refs.lightbox__image.src = '';
  refs.lightbox__image.alt = '';
  window.removeEventListener('keyup', clickKey);
};

function closeLightbox(event) {
  if (event.target === event.currentTarget) {
    onClickHandlerClose();
  };
};

function clickKey(event) {
  if (refs.lightbox.classList.contains('is-open') && event.code === 'Escape') {
    onClickHandlerClose();
  };
};
//из д/з верстки
/*(() => {
    const refs = {
        openModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
        closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
        modal: document.querySelector('[data-modal]'),
    };

    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal() {
        refs.modal.classList.toggle('.lightbox__content');
    }
})();*/

//варианты ребят, перелистывания original картинок
/*function clickKey(event) {
  let activeIndex = Number(event.target.dataset.index);

  switch (event.code) {
    case 'Escape':
      onClickHandlerClose();
      break;

    case 'ArrowRight':
      activeIndex + 1 === gallery.length
        ? (activeIndex = 0)
        : (activeIndex += 1);
      refs.lightbox__image.src = gallery[activeIndex].original;
      break;

    case 'ArrowLeft':
      activeIndex === 0
        ? (activeIndex = gallery.length - 1)
        : (activeIndex -= 1);
      refs.lightbox__image.src = gallery[activeIndex].original;
      break;
  }
}*/
//варианты ребят, перелистывания original картинок
/*const checkButton = function (e) {
  if (indexCurrenElement === undefined) {
    indexCurrenElement = parseInt(e.target.firstChild.dataset.index); // проверка на наличие стартового индекса, работает только один раз
  }
  if (e.code === "Escape") {
    modalIsClose();
  } else if (e.code === "ArrowRight") {
    moveInGallary("right");
  } else if (e.code === "ArrowLeft") {
    moveInGallary("left");
  } else {
    return;
  }
};
const moveInGallary = function (indexToMove) {
  if (indexToMove === "right") {
    indexCurrenElement += 1;
    if (indexCurrenElement > gallary.length - 1) {
      indexCurrenElement = 0;
    }
  } else if (indexToMove === "left") {
    indexCurrenElement -= 1;
    if (indexCurrenElement < 0) {
      indexCurrenElement = gallary.length - 1;
    }
  }
  changeImg(
    document.querySelector(`img[data-index="${indexCurrenElement}"]`).dataset
      .sourse
  );
};*/
 