/* ======================== работа с модальным окном ======================== */

// остановка скролла под модальным окном
export function stopScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.height = "100wh";
};

// запуск скролла после закрытия модального окна
export function startScroll() {
  document.body.style.overflow = "auto"; 
  document.body.style.height = "auto";
}

export function openModalOn({modal, modalImage}) {
  modal.classList.add('is-open');
  modalImage.src = document.activeElement.parentNode.dataset.url;
  stopScroll();
};

export function openModalClick(e, { modal, modalImage }) {
  if (e.target.classList.contains('main-img')) {
   modal.classList.add('is-open');
  modalImage.src = e.target.parentNode.parentNode.dataset.url;
  stopScroll(); 
  } else {
    return
  }
  
};
 
export function closeModalOn({modal, modalImage}) {
  modal.classList.remove('is-open');
  modalImage.src = "";
  startScroll();
};

export function onCloseModalOverlay(e, ref) {
  if (e.target === e.currentTarget) {
    closeModalOn(ref);
  }
};

/* ======================== перелистывание картинок в модальном окне ======================== */

export function modalImageRight({tempImgURLs, modalImage}) {
  const curImgIndex = tempImgURLs.indexOf(tempImgURLs.find(tempImgURL => tempImgURL === modalImage.src));

  let nextImgIndex = 0;

  curImgIndex === tempImgURLs.length - 1 ?
    nextImgIndex = 0 :
    nextImgIndex = curImgIndex + 1;

  modalImage.src = `${tempImgURLs[nextImgIndex]}`;
};

export function modalImageLeft({tempImgURLs, modalImage}) {
const curImgIndex = tempImgURLs.indexOf(tempImgURLs.find(tempImgURL => tempImgURL === modalImage.src));

  let previousImgIndex = 0;

  curImgIndex === 0 ?
    previousImgIndex = tempImgURLs.length - 1 :
    previousImgIndex = curImgIndex - 1;

  modalImage.src = `${tempImgURLs[previousImgIndex]}`;
};

/* ======================== перелистывание картинок в модальном окне клиом мыши ======================== */

export function onModalImageTurn(ref) {
  if (ref.xMousePosition > (window.innerWidth / 2)) {
    modalImageRight(ref);
  } else {
    modalImageLeft(ref);
  };
};

/* ======================== события кнопок ======================== */

export function onKeyPress(e, ref) {
  if (e.code === "Enter" && document.activeElement.classList.contains("img-list-link")) {
    // e.preventDefault();
    openModalOn(ref);
  };

  let modalIsOpen = ref.modal.classList.contains('is-open');
  
  if (modalIsOpen) {
    switch (e.code) {
      case "Escape": 
       closeModalOn(ref);
       break;

      case "ArrowRight":
       modalImageRight(ref);
       break;

      case "ArrowLeft":
       modalImageLeft(ref);
       break;

      default:
       break;
    }
  };
};


