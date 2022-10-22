//////////////////////////////////////////////////////////////////////
// directory.js
//////////////////////////////////////////////////////////////////////
class Directory {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.classNameDirectory = 'directory';
        this.classNameContent = 'content';
        this.classNameItem = 'item';
        this.classNameDropDown = 'drop-down';
        this.classNameActive = 'active';
        this.classNameList = 'list';
        this.classNameSubList = 'sub-list';
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.setUpForDropDown();
    }


    //////////////////////////////////////////////////////////////////////
    // Set up for drop-down
    //////////////////////////////////////////////////////////////////////
    setUpForDropDown() {
        const elms = document.querySelectorAll(`.${this.classNameDirectory} .${this.classNameItem}.${this.classNameDropDown}`);
        for(let i = 0; i < elms.length; i++) {
            const elm = elms[i];
            this.setUpMaxHeight(elm);
            elm.addEventListener('click', () => {
                elm.classList.toggle(this.classNameActive);
                this.setUpMaxHeight(elm);
            });
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Set up max-height for sub-list
    //////////////////////////////////////////////////////////////////////
    async setUpMaxHeight(elm) {
        const nextElm = elm.nextElementSibling; 
        if(nextElm === undefined || nextElm === null) {
            return;
        }
        const listElm = nextElm.querySelector(`.${this.classNameList}`);
        if(listElm === undefined || listElm === null) {
            return;
        }
        const listElmRect = listElm.getBoundingClientRect();
        if(elm.classList.contains(this.classNameActive)) {
            nextElm.style.maxHeight = `${listElmRect.height}px`;
        }
        if(elm.classList.contains(this.classNameActive)) {
            nextElm.style.maxHeight = `${listElmRect.height}px`;
        } else {
            nextElm.style.maxHeight = 0;
        }
    }

}
export { Directory };
