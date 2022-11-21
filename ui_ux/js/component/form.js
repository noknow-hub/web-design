//////////////////////////////////////////////////////////////////////
// form.js
//////////////////////////////////////////////////////////////////////
class Form {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.elms = document.querySelectorAll('[data-select-filter-tooltip-target]');
    }


    //////////////////////////////////////////////////////////////////////
    // Run.
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.elms.length === 0) {
            return;
        }
        for(let i = 0; i < this.elms.length; i++) {
            const elm = this.elms[i];
            const datasetVal = elm.dataset.selectFilterTooltipTarget;
            const tooltipElm = document.querySelector(`[data-select-filter-tooltip-id="${datasetVal}"]`);
            if(tooltipElm === undefined || tooltipElm === null) {
                continue;
            }
            elm.addEventListener('click', () => {
                if(tooltipElm.classList.contains('active')) {
                    tooltipElm.classList.remove('active');
                } else {
                    tooltipElm.classList.add('active');
                }
            });

            // Set up the tooltip
            this.setUpTooltip(elm, tooltipElm);
        }

        // Close tooltip event
        document.body.addEventListener('click', (event) => {
            if(event.target.closest('[data-select-filter-tooltip-target]') !== null) {
                return;
            }
            const elm = event.target.closest('[data-select-filter-tooltip-id]');
            if(elm === null) {
                const elms = document.querySelectorAll('[data-select-filter-tooltip-id]');
                for(let i = 0; i < elms.length; i++) {
                    if(elms[i].classList.contains('active')) {
                        elms[i].classList.remove('active');
                    }
                }
            }
        });
    }


    //////////////////////////////////////////////////////////////////////
    // Set up the tooltip
    //////////////////////////////////////////////////////////////////////
    setUpTooltip(elm, tooltipElm) {
        const search = tooltipElm.querySelector('input[type="text"]');
        if(search === undefined || search === null) {
            return;
        }
        const items = tooltipElm.querySelectorAll('.filter-box > .item');
        for(let i = 0; i < items.length; i++) {
            const item = items[i];
            item.addEventListener('click', () => {
                elm.textContent = item.textContent;
                tooltipElm.classList.remove('active');
            });
        }

        search.addEventListener('input', () => {
            for(let i = 0; i < items.length; i++) {
                const item = items[i];
                if(item.textContent.toLowerCase().indexOf(search.value.trim().toLowerCase()) !== -1) {
                    item.classList.remove('display-none');
                } else {
                    item.classList.add('display-none');
                }
            }
        });
    }

}
export { Form };
