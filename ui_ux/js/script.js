//////////////////////////////////////////////////////////////////////
// script.js
//////////////////////////////////////////////////////////////////////
import { Accordion } from './component/accordion.js';
import { Directory } from './component/directory.js';
import { Table } from './component/table.js';
import { TypingAnimation } from './component/typing-animation.js';

class Script {

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
export { Script };
