import { alert, notice, info, success, error } from '../../node_modules/@pnotify/core';
import { defaults } from '../../node_modules/@pnotify/core';
defaults.closerHover = false;
defaults.styling = 'angeler';
defaults.icons = 'angeler';

export const pN = {
  basicSet: {
    hide: false,
    sticker: false,
    shadow: true,
    animation: 'fade',
    animateSpeed: 'normal'
  },
  controlInput: {
    TITLE: 'CONTROL INPUT',
    TEXT: 'Such request is completed. Change request!',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  emptyRequest: {
    TITLE: 'CONTROL INPUT',
    TEXT: 'Input is empty. Enter something!',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  setCreator: function (setData) {
    this.basicSet.title = setData.TITLE;
    this.basicSet.text = setData.TEXT;
    this.basicSet.addClass = setData.ADD__CLASS;
    return this.basicSet;
  },
  noticePn: notice,
  errorPn: error,
};

export function openModalPn({ pnotifyOverlay, input }) {
    pnotifyOverlay.classList.add('is-open');
    let closerPn = document.querySelector('.pnotify-closer');
    closerPn.addEventListener('click', e => {
      pnotifyOverlay.classList.remove('is-open');
      input.disabled = false;
      document.body.style.overflow = "auto"; // запуск скролла после закрытия модального окна
      document.body.style.height = "auto"; // запуск скролла после закрытия модального окна
    })
    input.disabled = true;
    document.body.style.overflow = "hidden"; // остановка скролла под модальным окном
    document.body.style.height = "100wh"; // остановка скролла под модальным окном
};