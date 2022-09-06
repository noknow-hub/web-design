//////////////////////////////////////////////////////////////////////
// typing-animation.js
//////////////////////////////////////////////////////////////////////
class TypingAnimation {

    static NOTE_TYPE_ELEMENT = 1;
    static NOTE_TYPE_TEXT = 3;

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.classNameTypingAnimation = 'typing-animation';

        this.datasetKeyStatus = 'status';
        this.datasetValueDone = 'done';

        this.elms = document.querySelectorAll(`.${this.classNameTypingAnimation}`);

        this.typeSpeedMS = 50;
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.setUp();
    }


    //////////////////////////////////////////////////////////////////////
    // Set up
    //////////////////////////////////////////////////////////////////////
    setUp() {
        if(this.elms.length === 0) {
            return;
        }
        for(let i = 0; i < this.elms.length; i++) {
            const elm = this.elms[i];
            const childNodes = elm.childNodes;
            const myChildNodes = [];
            for(let j = 0; j < childNodes.length; j++) {
                myChildNodes.push(childNodes[j].cloneNode(true));
            }
            elm.myChildNodes = myChildNodes;
            elm.textContent = '';
        }

        // scroll event
        let timeoutId;
        window.addEventListener('scroll', () => {
            if(timeoutId !== null) {
                clearTimeout(timeoutId);        
            }
            timeoutId = setTimeout(() => {
                this.isInView();
            }, 150);
        });

        // init
        this.isInView();
    }


    //////////////////////////////////////////////////////////////////////
    // Set up
    //////////////////////////////////////////////////////////////////////
    isInView() {
        for(let i = 0; i < this.elms.length; i++) {
            const elm = this.elms[i];
            if(elm.dataset[this.datasetKeyStatus] === this.datasetValueDone) {
                continue;
            }
            const rect = elm.getBoundingClientRect();
            const isInView = 0 < rect.bottom && rect.top < window.innerHeight;
            if(isInView) {
                this.startTyping(elm);
                elm.dataset[this.datasetKeyStatus] = this.datasetValueDone;
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Start typing
    //////////////////////////////////////////////////////////////////////
    async startTyping(elm) {
        const childNodes = elm.myChildNodes;
        for(let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            if(childNode.nodeType === TypingAnimation.NOTE_TYPE_ELEMENT) {
                elm.appendChild(childNode);
                const childNodes = childNode.childNodes;
                const myChildNodes = [];
                for(let j = 0; j < childNodes.length; j++) {
                    myChildNodes.push(childNodes[j].cloneNode(true));
                }
                childNode.myChildNodes = myChildNodes;
                childNode.textContent = '';
                await this.startTyping(childNode);
            }
            if(childNode.nodeType === TypingAnimation.NOTE_TYPE_TEXT) {
                const text = [...childNode.textContent];
                for(let j = 0; j < text.length; j++) {
                    elm.innerHTML += text[j];
                    await this.sleep(this.typeSpeedMS);
                }
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Sleep
    //////////////////////////////////////////////////////////////////////
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
export { TypingAnimation };
