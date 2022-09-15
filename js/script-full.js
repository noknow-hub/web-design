//////////////////////////////////////////////////////////////////////
// script-full.js
//////////////////////////////////////////////////////////////////////
import { Accordion } from './component/accordion.js';
import { Directory } from './component/directory.js';
import { Table } from './component/table.js';
import { TypingAnimation } from './component/typing-animation.js';

class ScriptFull {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.accordion = new Accordion();
        this.directory = new Directory();
        this.table = new Table();
        this.typingAnimation = new TypingAnimation();
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.accordion.Run();
        this.directory.Run();
        this.table.Run();
        this.typingAnimation.Run();
    }


}


//////////////////////////////////////////////////////////////////////
// Initialize.
//////////////////////////////////////////////////////////////////////
const myInterval = setInterval(() => {
    if(document.readyState === 'complete') {
        clearInterval(myInterval);
        new ScriptFull().Run();
    }
}, 100);