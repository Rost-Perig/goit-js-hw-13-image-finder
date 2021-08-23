import { throttle } from '../../node_modules/throttle-debounce';
import { refs } from './refs';
import { imagesApiService, loadMoreBtn } from '../index';
import { scrollList, clearFirstSearch, clearIfAllDone, resetAll } from './utils';
import { pN, openModalPn } from './pnotify-set';
import imgListTpl from '../templates/img-list.hbs';

/* ======================== получение API-даных и рендер ======================== */

export function onSearch(e, ref, pNot) {

  e.preventDefault();
  
  if (e.currentTarget.elements.query.value === '') {
    // return alert('Введи что-то нормальное');
    pNot.noticePn(pNot.setCreator(pNot.emptyRequest));
    openModalPn(ref);
    return resetAll(ref) 
  }

  if (e.currentTarget.elements.query.value === ref.currentSearchQuery) {
    // return alert('такое уже есть');
    pNot.noticePn(pNot.setCreator(pNot.controlInput));
    return openModalPn(ref);
  }
  
  imagesApiService.query = e.currentTarget.elements.query.value;
  ref.currentSearchQuery = e.currentTarget.elements.query.value;
  clearFirstSearch(ref)
  return fetchAndRenderImages(ref, pNot);
};

export function fetchAndRenderImages(ref) {
  imagesApiService.fetchImages().then(hits => {
    if (hits === undefined || hits.length === 0) {
      clearIfAllDone(ref);
      return 
    };
    
    if (ref.infiniteScrollOn === 'on') {
      ref.endedScroll = false;
      window.addEventListener("scroll", throttle(500, () => unlessScroll(refs, pN)));
      renderImgList(hits, ref);
    } else {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    renderImgList(hits, ref);
    if (imagesApiService.page > 2) {
      scrollList(hits);
    }
    loadMoreBtn.enable();
    };
  });
};

export function renderImgList(hits, {imgList, tempImgURLs}) {
  imgList.insertAdjacentHTML('beforeend', imgListTpl(hits));
  hits.forEach(hit => tempImgURLs.push(hit.largeImageURL));
};

/* ======================== бесконечная прокрутка (все сЭм-восЭм строчек) ======================== */

export function unlessScroll(ref){
/* 
  *понятнее 
*/
    // var block = document.getElementById('infinite-scroll');
    // var contentHeight = block.offsetHeight;      // 1) высота блока контента вместе с границами
    // var yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
    // var window_height = window.innerHeight;      // 3) высота внутренней области окна документа
    // var y = yOffset + window_height;
      // запрет на запуск при достижении конца и очистке всего конкретно для этого приложени
    if (ref.endedScroll){
      return window.removeEventListener("scroll", throttle(500, () => unlessScroll(refs, pN)));
    }
            // если пользователь достиг конца
    //  if (y >= contentHeight)
/* 
  *короче  
*/
            // если пользователь достиг конца конкретно для этого приложени
    if(window.pageYOffset + window.innerHeight >= document.getElementById('unless-scroll').offsetHeight){
            //загружаем новое содержимое в элемент
      fetchAndRenderImages(ref);
      imagesApiService.page += 1;
    }
}