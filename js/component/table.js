//////////////////////////////////////////////////////////////////////
// table.js
//////////////////////////////////////////////////////////////////////
class Table {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.classNameTableBox = 'table-box';
        this.classNameTable = 'table';
        this.classNameScrollX = 'scroll-x';
        this.classNameScrollY = 'scroll-y';
        this.classNameDropDown = 'drop-down';
        this.classNameActive = 'active';
        this.resizeEventId;
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.setUpForScrollX();

        window.addEventListener('resize', () => {
            if(this.resizeEventId) {
                clearTimeout(this.resizeEventId);
            }
            this.resizeEventId = setTimeout(() => {
                this.setUpForScrollX();
            }, 300);
        });
    }


    //////////////////////////////////////////////////////////////////////
    // Set up for scroll X
    //////////////////////////////////////////////////////////////////////
    setUpForScrollX() {
        const elms = document.querySelectorAll(`.${this.classNameTableBox} > .${this.classNameTable}.${this.classNameScrollX}`);
        for(let i = 0; i < elms.length; i++) {
            const e = elms[i];
            e.style.width = '0';
            e.style.width = `${e.parentElement.clientWidth}px`;
            this.setIntervalForScrollX(e);
        }
    }


    async setIntervalForScrollX(elm) {
        let intervalId;
        return new Promise((resolve, reject) => {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    if(elm.style.width === `${elm.parentElement.clientWidth}px`) {
                        clearInterval(intervalId);
                    } else {
                        elm.style.width = `${elm.parentElement.clientWidth}px`;
                    }
                }, 300);
            }
        });
    }



}
export { Table };
