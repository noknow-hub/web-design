//////////////////////////////////////////////////////////////////////
// script.js
//////////////////////////////////////////////////////////////////////
import { Accordion } from './component/accordion.js';
import { Directory } from './component/directory.js';
import { Form } from './component/form.js';
import { ModalWindow } from './component/modal-window.js';
import { Table } from './component/table.js';
import { TypingAnimation } from './component/typing-animation.js';

class Script {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.accordion = new Accordion();
        this.directory = new Directory();
        this.form = new Form();
        this.modalWindow = new ModalWindow();
        this.table = new Table();
        this.typingAnimation = new TypingAnimation();
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.accordion.Run();
        this.directory.Run();
        this.form.Run();
        this.modalWindow.Run();
        this.table.Run();
        this.typingAnimation.Run();
    }


}
export { Script };
