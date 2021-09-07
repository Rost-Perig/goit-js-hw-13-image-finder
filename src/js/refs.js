export const refs = {
  body: document.querySelector('body'),
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('[name="query"]'),
  btnReset: document.querySelector('[data-action="reset"]'),
  currentSearchQuery: '',
  imgList: document.querySelector('.img-list'),
  pnotifyOverlay: document.querySelector('.pnotify-overlay'),
  toTopBtn: document.querySelector('[data-action="to-top"]'),
  formOrientation: document.querySelector('.js-orientation'),
  formImgType: document.querySelector('.js-img-type'),
  formInfiniteScroll: document.querySelector('.js-infinite-scroll'),
  optionBox: document.querySelector('.option-box'),
  doneBtn: document.querySelector('.js-done-btn'),
  infiniteScrollOn: 'off',
  endedScroll: true
}