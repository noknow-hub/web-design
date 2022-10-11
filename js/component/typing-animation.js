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

        this.domParser = new DOMParser();

        this.cursorElm = document.createElement('SPAN');
        this.cursorElm.classList.add('cursor');
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
            const elmStyle = window.getComputedStyle(elm);
            this.cursorElm.style.backgroundColor = elmStyle.color;
            this.cursorElm.style.height = elmStyle.fontSize;
            elm.myCursor = this.cursorElm.cloneNode(true);
            elm.appendChild(elm.myCursor);
            this.blinkCursor(elm);
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
                if(elm.myCursor === undefined) {
                    elm.appendChild(childNode);
                } else {
                    elm.myCursor.insertAdjacentElement('beforebegin', childNode);
                }
                const childNodes = childNode.childNodes;
                const myChildNodes = [];
                for(let j = 0; j < childNodes.length; j++) {
                    myChildNodes.push(childNodes[j].cloneNode(true));
                }
                childNode.myChildNodes = myChildNodes;
                childNode.textContent = '';
                await this.startTyping(childNode);
            } else if(childNode.nodeType === TypingAnimation.NOTE_TYPE_TEXT) {
                const text = [...childNode.textContent];
                for(let j = 0; j < text.length; j++) {
                    if(elm.myCursor === undefined) {
                        elm.innerHTML += text[j];
                    } else {
                        elm.myCursor.insertAdjacentHTML('beforebegin', text[j]);
                    }
                    await this.sleep(this.typeSpeedMS);
                }
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Blink the cursor
    //////////////////////////////////////////////////////////////////////
    async blinkCursor(elm) {
        if(elm.myCursor === undefined || elm.myCursor === null) {
            return;
        }
        const intervalID = setInterval(() => {
            if(elm.myCursor.style.opacity === '1') {
                elm.myCursor.style.opacity = '0';
            } else {
                elm.myCursor.style.opacity = '1';
            }
        }, 1000);
    }


    //////////////////////////////////////////////////////////////////////
    // Sleep
    //////////////////////////////////////////////////////////////////////
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
export { TypingAnimation };
