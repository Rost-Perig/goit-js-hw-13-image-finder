import { throttle } from 'throttle-debounce';
import './sass/main.scss';
import '@pnotify/core/dist/Angeler.css';
import { pN  } from './js/pnotify-set';
import { onSearch, fetchAndRenderImages } from './js/search-render';
import { toTop, scrollWatch, orientationValue, imgTypeValue, infiniteScrollValue, resetAll } from './js/utils';
import { refs } from './js/refs';

import ImagesApiService from './js/api-img-service';
export const imagesApiService = new ImagesApiService;

import LoadMoreBtn from './js/load-more-btn';
export const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

import ModalWindow from './js/modal-service'; 
const modalWind = new ModalWindow; 
modalWind.createMarkupAndEvnListeners('js-img-list');

window.addEventListener('scroll', throttle(500, e => scrollWatch(refs)));
refs.btnReset.addEventListener('click', () => resetAll(refs));
refs.doneBtn.addEventListener('click', () => resetAll(refs));
refs.searchForm.addEventListener('submit', e => onSearch(e, refs, pN));
loadMoreBtn.refs.button.addEventListener('click', () => fetchAndRenderImages(refs, pN));
refs.toTopBtn.addEventListener('click', () => toTop(refs));
refs.formOrientation.addEventListener('input',() => orientationValue(refs));
refs.formImgType.addEventListener('input', () => imgTypeValue(refs));
refs.formInfiniteScroll.addEventListener('input', () => infiniteScrollValue(refs));




console.log("Привіт, світ! Життя ДУЖЕ брутальне!");


