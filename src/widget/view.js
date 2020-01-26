// string -> String
function sentenceCase(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

// convert "4091 lakeshore rd" to "4091 Lakeshore Rd"
function parseAddress(street) {
    const array = street.split(' ');
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += ` ${sentenceCase(array[i])}`;
    }
    return result;
}

// remove all children
function removeChildren(container) {
    const count = container.children.length;

    for (let i = 0; i < count; i++) {
        container.removeChild(container.firstElementChild);
    }
}

// Add DOM Element to container
function addElement(container, element, attr, content) {
    const elm = document.createElement(element);
    for (let key in attr) {
        elm.setAttribute(key, attr[key])
    }
    if (content) {
        elm.innerText = content;
    }
    container.appendChild(elm);
    return elm;
}

export default class View {

    // hidden css class
    static get HIDDEN() {
        return 'hidden';
    }

    constructor(container, controller, ) {
        this.sortSelector = container.querySelector('.sorting');
        this.viewList = container.querySelector('.view-list');
        this.ranges = container.querySelector('.ranges');
        this.pages = container.querySelector('.pages');
        this.modalOverlay = container.querySelector('.modal-overlay');
        this.modal = container.querySelector('.full-info');
        this.controller = controller

        this.init()
    }

    init() {
        this.controller.getRangesEvent((ranges, active) => this.showRanges_(ranges, active))
        this.controller.showListEvent((error, list) => this.showList_(error, list))
        this.setSortSelector_()
    }

    showList_(error, personList) {
        if (error) {
            // show error page
            // this.showErrorPage()
        }

        if (this.viewList.children.length > 0) {
            removeChildren(this.viewList);
        }

        personList.forEach(person => {
            const li = document.createElement('li'),
                img = document.createElement('img'),
                name = document.createElement('p')

            img.src = person.picture.thumbnail;
            const {title, first, last} = person.name;
            name.innerText = `${sentenceCase(title)}. ${sentenceCase(first)} ${sentenceCase(last)}`;
            li.appendChild(img);
            li.appendChild(name);

            li.addEventListener('click', event => this.showFullInfo_(person, event));

            this.viewList.appendChild(li);
        });

        this.controller.getPageEvent((pages, active) => this.showPages_(pages, active))
    }

    showRanges_(ranges, active) {
        if (this.ranges.children.length > 0) {
            removeChildren(this.ranges);
        }

        ranges.forEach(range => {
            const li = document.createElement('li'),
                link = document.createElement('a')

            if (range === active) {
                link.classList.add('active')
            }

            link.innerText = range
            link.addEventListener('click', () => {
                this.controller.setActiveRangeEvent(range, (ranges, active) => this.showRanges_(ranges, active))
                this.controller.showListEvent((error, list) => this.showList_(error, list))
            })
            li.appendChild(link);
            this.ranges.appendChild(li);
        });
    }

    showPages_(amount, active) {
        if (this.pages.children.length > 0) {
            removeChildren(this.pages);
        }

        for (let i = 0; i < amount; i++) {
            const li = document.createElement('li'),
                link = document.createElement('a')

            if (active === i + 1) {
                link.classList.add('active');
            }

            link.innerText = i + 1;
            link.addEventListener('click', event => {
                this.controller.setPageEvent(i + 1, (amount, active) => this.showPages_(amount, active))
                this.controller.showListEvent((error, list) => this.showList_(error, list))
            });
            li.appendChild(link);
            this.pages.appendChild(li);
        }
    }

    // modal view
    showFullInfo_(person) {
        const over = this.modalOverlay;
        over.classList.remove(View.HIDDEN);
        over.addEventListener('click', () => over.classList.add(View.HIDDEN));
        // show modal window
        const modal = this.modal;

        if (this.modal.children.length > 0) {
            removeChildren(this.modal);
        }

        modal.classList.remove(View.HIDDEN);
        addElement(modal, 'img', {src: person.picture.large, alt: `${person.name.first} ${person.name.last}`});
        const div = addElement(modal, 'div', {});
        addElement(div, 'p', {}, `Street: ${parseAddress(person.location.street)}`);
        addElement(div, 'p', {}, `City: ${sentenceCase(person.location.city)}`);
        addElement(div, 'p', {}, `State: ${sentenceCase(person.location.state)}`);
        addElement(div, 'p', {}, `Email: ${person.email}`);
        addElement(div, 'p', {}, `Phone: ${person.phone}`);

    }

    setSortSelector_() {
        this.sortSelector.addEventListener('change', event => this.controller.sortEvent(event, (error, list) => this.showList_(error, list)))
    }
}
