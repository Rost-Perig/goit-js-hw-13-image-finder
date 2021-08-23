
import { imagesApiService } from '../index';
import { loadMoreBtn } from '../index';

/* ======================== всякие подмотки и слежение за скроллом ======================== */

export function scrollList(hits) {
  const currentFirstEl = document.querySelector(`[id="${hits[0].id}"]`);
  currentFirstEl.scrollIntoView({block: "start", behavior: "smooth"});
};

export function toTop(ref) {
  ref.body.scrollIntoView({block: "start", behavior: "smooth"});
};

export function scrollWatch(ref) {
  let scroll_position = window.scrollY;
  scroll_position > 140?
    ref.toTopBtn.classList.remove('hide-el') :
    ref.toTopBtn.classList.add('hide-el');
  }

/* ======================== очистка страницы и временного массива адресов ======================== */

export function clearImgList({imgList, tempImgURLs}) {
  imgList.innerHTML = '';
  tempImgURLs = [];
};

/* =========== очистка при первом запросе в т.ч., когда новый вводился дополняя предыдущий =========== */

export function clearFirstSearch(ref) {
  imagesApiService.resetPage();
  ref.tempImgURLs = [];
  ref.optionBox.classList.add('hide-el');
  clearImgList(ref);
  loadMoreBtn.hide();
}

/* ======================== очистка, когда все запросы выполнены ======================== */

export function clearIfAllDone(ref) {
  ref.endedScroll = true;
  loadMoreBtn.hide();
  ref.doneBtn.classList.remove('hide-el');
  document.querySelector('.result-section').scrollIntoView({block: "end", behavior: "smooth"});
}

/* ======================== очистка всего ======================== */

export function resetAll(ref) {
  loadMoreBtn.hide();
  ref.searchForm.reset();
  clearImgList(ref);
  imagesApiService.resetPage();
  ref.currentSearchQuery = '';
  ref.tempImgURLs = [];
  ref.optionBox.classList.remove('hide-el');
  ref.doneBtn.classList.add('hide-el');
};

/* ======================== задание параметров поиска ======================== */

export function orientationValue(ref) {
  imagesApiService.orientation = document.querySelector('input[name="orientation"]:checked').value;
  ref.currentSearchQuery = '';
};

export function imgTypeValue(ref) {
  imagesApiService.imgType = document.querySelector('input[name="image-type"]:checked').value;
  ref.currentSearchQuery = '';
};

export function infiniteScrollValue(ref) {
  ref.infiniteScrollOn = document.querySelector('input[name="infinite-scroll"]:checked').value;
};
