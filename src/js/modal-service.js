class ModalWindow {
    constructor() {
        this.markupString = '<div class="modal js-modal"><div div class="modal__overlay"></div ><div class="modal__content"><div class="img-card"><img src="" alt="" class="img-card__image"/></div></div><button type="button" class="modal__button" data-action="close-modal"></button></div > ';
        this.modal;
        this.modalContent;
        this.modalCloser;
        this.modalOverlay;
        this.modalImage;
        this.tempModalImgUrls = null;
        this.listeningEl;
    };
    
    /* ============создание разметки и слушателя событий============ */

    createMarkupAndEvnListeners(listeningElClass) {
        document.querySelector('script').insertAdjacentHTML("beforebegin", this.markupString);
        this.modal = document.querySelector('.js-modal');
        this.modalContent = document.querySelector('.modal__content');
        this.modalCloser = document.querySelector('button[data-action="close-modal"]');
        this.modalOverlay = document.querySelector('.modal__overlay');
        this.modalImage = document.querySelector('.img-card__image');
        this.listeningEl = document.querySelector(`.${listeningElClass}`)
        this.createAddEvtListenerModal();
    };

    createAddEvtListenerModal() {
        this.modalImage.addEventListener('click', e => this.onModalImageTurn(e));
        this.modalCloser.addEventListener('click', () => this.closeModalOn());
        this.modalOverlay.addEventListener('click', e => this.onCloseModalOverlay(e));
        window.addEventListener('keydown', e => this.onKeyPress(e));
        this.listeningEl.addEventListener('click', e => this.openModalClick(e));
    };

    /* ============остановка скролла под модальным окном============ */

    stopScroll() {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100wh";
    };

    /* =========запуск скролла после закрытия модального окна========= */

    startScroll() {
        document.body.style.overflow = "auto"; 
        document.body.style.height = "auto";
    };

    /* =========создание массива ссылок на большие картинки========= */

    createTempImgUrls() {
        this.tempModalImgUrls = [...document.querySelectorAll('.img-list-link')].map(el => el.parentNode.dataset.url);
    };
    
    /* =========открытие-закрытие модального окна========= */
    
    openModalOn() {
        this.modal.classList.add('is-open');
        this.modalImage.src = document.activeElement.parentNode.dataset.url;
        this.stopScroll();
        this.createTempImgUrls();    
    };

    openModalClick(e) {
        if (!e.target.classList.contains('main-img')) {
            return
        };
        this.createTempImgUrls();
        this.modal.classList.add('is-open');
        this.modalImage.src = e.target.parentNode.parentNode.dataset.url;
        this.stopScroll();
    };

    closeModalOn() {
        this.modal.classList.remove('is-open');
        this.modalImage.src = "";
        this.startScroll();
        this.tempModalImgUrls = null;
    };

    onCloseModalOverlay(e) {
        if (e.target === e.currentTarget) {
            this.closeModalOn();
        }
    };
        
    /* =========== перелистывание картинок в модальном окне =========== */
    modalImageRun(direction) {
        const curImgIndex = this.tempModalImgUrls.indexOf(this.tempModalImgUrls.find(tempImgURL => tempImgURL === this.modalImage.src));
        let nextImgIndex = 0;

        if (direction === 'right') {
           curImgIndex === this.tempModalImgUrls.length - 1 ?
            nextImgIndex = 0 :
            nextImgIndex = curImgIndex + 1; 
        } else {
            curImgIndex === 0 ?
            nextImgIndex = this.tempModalImgUrls.length - 1 :
            nextImgIndex = curImgIndex - 1;
        };

        this.modalImage.src = `${this.tempModalImgUrls[nextImgIndex]}`;
    };

    /* ========== перелистывание картинок в модальном окне клиом мыши ========== */

    onModalImageTurn(e) {
        let direction = '';
        e.clientX > (window.innerWidth / 2) || e.code === "ArrowRight" ?
            direction = 'right' :
            direction = 'left';
        this.modalImageRun(direction);
    };

    /* ================ события кнопок ================ */

    onKeyPress(e) {
        if (e.code === "Enter" && document.activeElement.classList.contains("img-list-link")) {
            e.preventDefault();
            this.openModalOn();
        };

        let modalIsOpen = this.modal.classList.contains('is-open');
        
        if (modalIsOpen) {
            switch (e.code) {
            case "Escape": 
            this.closeModalOn();
            break;

            case "ArrowRight":
            this.onModalImageTurn(e);
            break;

            case "ArrowLeft":
            this.onModalImageTurn(e);
            break;

            default:
            break;
            }
        };
    };
};

export default new ModalWindow;