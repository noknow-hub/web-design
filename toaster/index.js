//////////////////////////////////////////////////////////////////////
// toaster.js
// @usage:
//     1. Include js and css for toaster in your head element.
//
//         --------------------------------------------------
//         <head>
//           <link rel="stylesheet" type="text/css" href="toaster.css">
//           <script type="text/javascript" src="toaster.js"></script>
//         </head>
//         --------------------------------------------------
//
//     2. Instantiate the Toaster class in your javascript.
//
//         The easy way is like below.
//         --------------------------------------------------
//         const toaster = new Toaster();
//         --------------------------------------------------
//
//         There are some options so you can set an option like below.
//         --------------------------------------------------
//         const toaster = new Toaster(
//             'closeButton': false,
//             'hideDuration': 5000,
//         );
//         --------------------------------------------------
//
//         The optisons are following:
//             'closeButton' boolean: When setting the true, will display the close button.
//             'method' string:
//                 'top-full-width-drop-down' string: The toast with full width displays by drop down from top.
//                 'top-center-drop-down' string: The toast displays by drop down from center top.
//                 'bottom-full-width-drop-up' string: The toast with full width displays by drop up from bottom.
//                 'bottom-center-drop-up' string: The toast displays by drop down from center bottom.
//             'hideDuration' int: The duration for hiding the toast. It's milliseconds.
//
//     3. Show a message toast.
//
//         When displaying an error toast.
//         --------------------------------------------------
//         toaster.Error('Error.');
//         toaster.Error('Error.', 'This is an error message.');
//         --------------------------------------------------
//     
//         When displaying a warning toast.
//         --------------------------------------------------
//         toaster.Warning('Warning.');
//         toaster.Warning('Warning.', 'This is a warning message.');
//         --------------------------------------------------
//
//         When displaying a success toast.
//         --------------------------------------------------
//         toaster.Success('Success.');
//         toaster.Success('Success.', 'This is a success message.');
//         --------------------------------------------------
//
//
//////////////////////////////////////////////////////////////////////
class Toaster {

    //////////////////////////////////////////////////
    // Constructor
    // @param options object: Toaster Option.
    //////////////////////////////////////////////////
    constructor(options = null) {
        // Options
        this.options = {
            'closeButton': true,
            'method': 'top-full-width-drop-down',
            'hideDuration': 7000,
        }
        if(options) {
            for(let k in options) {
                if(k === 'closeButton') {
                    this.options.closeButton = options[k] ? options[k] : options[k];
                } else if(k === 'method') {
                    if(options[k] === 'top-full-width-drop-down' ||
                            options[k] === 'top-center-drop-down' ||
                            options[k] === 'bottom-full-width-drop-up' ||
                            options[k] === 'bottom-center-drop-up') {
                        this.options.method = options[k];
                    } else {
                        this.options.method = 'top-full-width-drop-down';
                    }
                } else if(k === 'hideDuration') {
                    if(!isNaN(parseInt(options[k], 10))) {
                        this.options.hideDuration = parseInt(options[k], 10);
                    }
                }
            }
        }

        // DOM Toaster Container
        this.container = document.getElementById('noknow-toaster');
        if(this.container == null) {
            this.container = document.createElement('DIV');
            this.container.id = ('noknow-toaster');
            this.container.classList.add('toaster-container');
            this.container.classList.add(this.options.method);
            document.body.appendChild(this.container);
        }
    }


    //////////////////////////////////////////////////
    // Error
    // @param title string: The error title.
    // @param msg string: The error message.
    //////////////////////////////////////////////////
    Error(title, msg = null) {
        const toasterItem = this.generateToastDom('error', title, msg);
        this.show(toasterItem);

    }


    //////////////////////////////////////////////////
    // Warning
    // @param title string: The warning title.
    // @param msg string: The warning message.
    //////////////////////////////////////////////////
    Warning(title, msg = null) {
        const toasterItem = this.generateToastDom('warning', title, msg);
        this.show(toasterItem);
    }


    //////////////////////////////////////////////////
    // Success
    // @param title string: The success title.
    // @param msg string: The success message.
    //////////////////////////////////////////////////
    Success(title, msg = null) {
        const toasterItem = this.generateToastDom('success', title, msg);
        this.show(toasterItem);
    }


    //////////////////////////////////////////////////
    // Generate a toast DOM.
    // This is a private method so don't call it from your javascript.
    // @param type string: The type such as 'success', 'warning' and 'error'.
    // @param title string: The title of the toast.
    // @param msg string: The message of the toast.
    // @return object: Toaster Item DOM.
    //////////////////////////////////////////////////
    generateToastDom(type, title, msg = null) {
        const toasterItem = document.createElement('DIV');
        toasterItem.classList.add('toaster-item', type);
        this.container.appendChild(toasterItem);
        const icon = document.createElement('P');
        icon.classList.add('toaster-icon', type);
        toasterItem.appendChild(icon);
        const contentsBox = document.createElement('DIV');
        contentsBox.classList.add('toaster-item-contents');
        toasterItem.appendChild(contentsBox);
        const titleP = document.createElement('P');
        titleP.classList.add('toaster-item-title');
        titleP.textContent = title;
        contentsBox.appendChild(titleP);
        if(msg != null && msg !== '') {
            const msgP = document.createElement('P');
            msgP.classList.add('toaster-item-msg');
            msgP.textContent = msg;
            contentsBox.appendChild(msgP);
        }
        if(this.options.closeButton) {
            const closeBtn = document.createElement('SPAN');
            closeBtn.classList.add('toaster-close-btn');
            toasterItem.appendChild(closeBtn);
            closeBtn.addEventListener('click', this.close, false);
            closeBtn.myToasterItem = toasterItem;
        }
        return toasterItem;
    }


    //////////////////////////////////////////////////
    // Show a toast.
    // This is a private method so don't call it from your javascript.
    //////////////////////////////////////////////////
    show(toasterItem) {
        // Set event listener.
        toasterItem.onFocus = false;
        toasterItem.addEventListener('mouseover', function() {
            this.onFocus = true
        }, false);
        toasterItem.addEventListener('mouseout', function() {
            this.onFocus = false
        }, false);
        
        setTimeout(function() {
            toasterItem.classList.add('active');
        }, 20);
        if(this.options.hideDuration > 0) {
            const clear = function(instance) {
                if(instance.timerId && !instance.onFocus) {
                    clearInterval(instance.timerId);
                    instance.classList.remove('active');
                    setTimeout(function() {
                        instance.parentNode.removeChild(instance);
                    }, 300);
                }
            }
            toasterItem.timerId = setInterval(clear, this.options.hideDuration, toasterItem);
        }
    }


    //////////////////////////////////////////////////
    // Close a toast.
    // This is a private method so don't call it from your javascript.
    //////////////////////////////////////////////////
    close() {
        const toasterItem = this.myToasterItem;
        if(toasterItem == null) {
            return;
        }
        if(toasterItem.timerId) {
            clearInterval(toasterItem.timerId);
        }
        toasterItem.classList.remove('active');
        setTimeout(function() {
            toasterItem.parentNode.removeChild(toasterItem);
        }, 300);
    }

}

