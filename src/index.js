import { throttle } from 'throttle-debounce';
import './sass/main.scss';
import '@pnotify/core/dist/Angeler.css';
import LoadMoreBtn from './js/load-more-btn';
import { pN  } from './js/pnotify-set';
import ImagesApiService from './js/api-img-service';
import { onSearch, fetchAndRenderImages } from './js/search-render';
import { openModalClick, closeModalOn, onModalImageTurn, onCloseModalOverlay, onKeyPress } from './js/modal-service';
import { toTop, scrollWatch, orientationValue, imgTypeValue, infiniteScrollValue, resetAll } from './js/utils';
import { refs } from './js/refs';

export const imagesApiService = new ImagesApiService;
export const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

window.addEventListener('scroll', throttle(500, e => scrollWatch(refs)));
window.addEventListener('keydown', e => onKeyPress(e, refs));
refs.modalImage.addEventListener('mousemove', throttle(500, e=> refs.xMousePosition = e.clientX));
refs.modalImage.addEventListener('click', () => onModalImageTurn(refs));
refs.btnReset.addEventListener('click', () => resetAll(refs));
refs.doneBtn.addEventListener('click', () => resetAll(refs));
refs.searchForm.addEventListener('submit', e => onSearch(e, refs, pN));
loadMoreBtn.refs.button.addEventListener('click', () => fetchAndRenderImages(refs, pN));
refs.imgList.addEventListener('click', e => openModalClick(e, refs));
refs.modalCloser.addEventListener('click', () => closeModalOn(refs));
refs.modalOverlay.addEventListener('click', e => onCloseModalOverlay(e, refs));
refs.toTopBtn.addEventListener('click', () => toTop(refs));
refs.formOrientation.addEventListener('input',() => orientationValue(refs));
refs.formImgType.addEventListener('input', () => imgTypeValue(refs));
refs.formInfiniteScroll.addEventListener('input', () => infiniteScrollValue(refs));




console.log("Привіт, світ! Життя ДУЖЕ брутальне!");


