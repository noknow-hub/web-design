//////////////////////////////////////////////////////////////////////
// accordion.js
//////////////////////////////////////////////////////////////////////
class Accordion {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.classNameAccordionBox = 'accordion-box';
        this.classNameAccordionBoxHeading = 'heading';
        this.classNameAccordionBoxHeadingBox = 'heading-box';
        this.classNameAccordionBoxHasContent = 'has-content';
        this.classNameAccordionBoxContent = 'content-box';
        this.classNameAccordionBoxItem = 'item';
        this.classNameActive = 'active';
        this.paddingTop = 10;
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.setUpForAccordingBox();
    }


    //////////////////////////////////////////////////////////////////////
    // Set up for "according-box"
    //////////////////////////////////////////////////////////////////////
    async setUpForAccordingBox() {
        const accordionBoxElms = document.querySelectorAll(`.${this.classNameAccordionBox}`);
        for(let i = 0; i < accordionBoxElms.length; i++) {
            const elms = accordionBoxElms[i].querySelectorAll(`.${this.classNameAccordionBoxHeadingBox}.${this.classNameAccordionBoxHasContent}`);
            if(elms === undefined || elms === null) {
                continue;
            }
            for(let j = 0; j < elms.length; j++) {
                const elm = elms[j].parentElement;
                if(elm === undefined || elm === null || !elm.classList.contains(this.classNameAccordionBoxItem)) {
                    continue;
                }
                const contentElm = elm.querySelector(`.${this.classNameAccordionBoxContent}`);
                if(contentElm === undefined || contentElm === null) {
                    continue;
                }
                elms[j].addEventListener('click', async () => {
                    elm.classList.toggle(this.classNameActive);
                    if(elm.classList.contains(this.classNameActive)) {
                        contentElm.style.maxHeight = `${contentElm.scrollHeight + this.paddingTop}px`;
                    } else {
                        contentElm.style.maxHeight = '0px';
                    }
                });
            }
        }
    }

}
export { Accordion };
