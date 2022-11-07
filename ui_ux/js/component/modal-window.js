//////////////////////////////////////////////////////////////////////
// modal-window.js
//////////////////////////////////////////////////////////////////////
class ModalWindow {

    static CLASS_NAME = 'modal-window';
    static CLASS_NAME_ACTIVE = 'active';
    static CURRENT_Z_INDEX = 10;
    static DATASET_ACTION_CLOSE = '[data-modal-action="close"]';
    static DATASET_TARGET = '[data-modal-target]';
    static DATASET_TARGET_KEY = 'modalTarget';
    static DATASET_ID_KEY = 'data-modal-id';

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.modalElms = document.getElementsByClassName(ModalWindow.CLASS_NAME);
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.modalElms === undefined || this.modalElms === null || this.modalElms.length === 0) {
            return;
        }
        for(let i = 0; i < this.modalElms.length; i++) {
            const modal = this.modalElms[i];
            modal.removeEventListener('click', (event) => { this.clkParentModalWindow(event); });
            modal.addEventListener('click', (event) => { this.clkParentModalWindow(event); });
            const closeBtns = modal.querySelectorAll(ModalWindow.DATASET_ACTION_CLOSE);
            if(closeBtns === undefined || closeBtns === null || closeBtns.length === 0) {
                continue;
            }
            for(let j = 0; j < closeBtns.length; j++) {
                const closeBtn = closeBtns[j];
                closeBtn.removeEventListener('click', () => { this.clkCloseBtn(modal); });
                closeBtn.addEventListener('click', () => { this.clkCloseBtn(modal); });
            }
        }
        const modalTargets = document.querySelectorAll(ModalWindow.DATASET_TARGET);
        if(modalTargets === undefined || modalTargets === null || modalTargets.length === 0) {
            return;
        }
        for(let i = 0; i < modalTargets.length; i++) {
            const modalTarget = modalTargets[i];
            modalTarget.removeEventListener('click', () => { this.clkTargetBtn(modalTarget.dataset[ModalWindow.DATASET_TARGET_KEY]); });
            modalTarget.addEventListener('click', () => { this.clkTargetBtn(modalTarget.dataset[ModalWindow.DATASET_TARGET_KEY]); });
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Append the event for opening modal.
    //////////////////////////////////////////////////////////////////////
    static AppendEventOpeningModal(elm) {
        elm.addEventListener('click', () => {
            const modal = document.querySelector(`[${ModalWindow.DATASET_ID_KEY}="${elm.dataset[ModalWindow.DATASET_TARGET_KEY]}"]`);
            if(modal === undefined || modal === null) {
                return;
            }
            ModalWindow.CURRENT_Z_INDEX++;
            modal.style.zIndex = ModalWindow.CURRENT_Z_INDEX;
            modal.classList.add(ModalWindow.CLASS_NAME_ACTIVE);
        });
    }


    //////////////////////////////////////////////////////////////////////
    // Close modal.
    //////////////////////////////////////////////////////////////////////
    static CloseModal(modalWindow = null) {
        let elms;
        if(modalWindow !== undefined && modalWindow !== null) {
            elms = [modalWindow];
        } else {
            elms = document.getElementsByClassName(ModalWindow.CLASS_NAME);
        }
        if(elms === undefined || elms === null) {
            return;
        }
        for(let i = 0; i < elms.length; i++) {
            const e = elms[i];
            if(e.classList.contains(ModalWindow.CLASS_NAME_ACTIVE)) {
                if(ModalWindow.CURRENT_Z_INDEX > 10) {
                    ModalWindow.CURRENT_Z_INDEX--;
                }
                e.style.zIndex = null;
                e.classList.remove(ModalWindow.CLASS_NAME_ACTIVE);
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the parent modal window.
    //////////////////////////////////////////////////////////////////////
    clkParentModalWindow(event) {
        if(event.target.classList.contains(ModalWindow.CLASS_NAME) && event.target.classList.contains(ModalWindow.CLASS_NAME_ACTIVE)) {
            this.styleZIndex(event.target, false);
            event.target.classList.remove(ModalWindow.CLASS_NAME_ACTIVE);
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the close button.
    //////////////////////////////////////////////////////////////////////
    clkCloseBtn(modalWindow) {
        this.styleZIndex(modalWindow, false);
        modalWindow.classList.remove(ModalWindow.CLASS_NAME_ACTIVE);
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the modal target button.
    //////////////////////////////////////////////////////////////////////
    clkTargetBtn(dataSetValue) {
        const modal = document.querySelector(`[${ModalWindow.DATASET_ID_KEY}="${dataSetValue}"]`);
        if(modal === undefined || modal === null) {
            return;
        }
        this.styleZIndex(modal, true);
        modal.classList.add(ModalWindow.CLASS_NAME_ACTIVE);
    }


    //////////////////////////////////////////////////////////////////////
    // Style `z-index`.
    //////////////////////////////////////////////////////////////////////
    styleZIndex(modalWindow, isIncrement) {
        if(isIncrement) {
            ModalWindow.CURRENT_Z_INDEX++;
            modalWindow.style.zIndex = ModalWindow.CURRENT_Z_INDEX;
        } else {
            if(ModalWindow.CURRENT_Z_INDEX > 10) {
                ModalWindow.CURRENT_Z_INDEX--;
            }
            modalWindow.style.zIndex = null;
        }
    }

}
export { ModalWindow };
