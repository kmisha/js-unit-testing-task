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

    constructor(container, controller, range) {
        this.container = container;
        this.sortSelector = container.querySelector('.sorting');
        this.viewList = container.querySelector('.view-list');
        this.ranges = container.querySelector('.ranges');
        this.pages = container.querySelector('.pages');
        this.modalOverlay = container.querySelector('.modal-overlay');
        this.modal = container.querySelector('.full-info');
        this.controller = controller
        this.range = range
        this.activeRangeNumber = range[0]
        this.activePageNumber = 1
        this.init()
    }

    init() {
        const range = this.showRanges_(this.range, this.controller)
        this.controller.showListEvent(1, range + 1, (...args) => this.showList_(...args))
        this.setSortSelector_()
    }

    showList_(error, personList, amountOfPersons) {
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

        this.showPages_(amountOfPersons, this.activeRangeNumber, this.controller)
    }

    showRanges_(ranges, controller) {
        ranges.forEach((range, index) => {
            const li = document.createElement('li'),
                link = document.createElement('a')

            if (!index) {
                link.classList.add('active')
                this.activeRange = link
            }

            link.innerText = range
            link.addEventListener('click', event => {
                this.setRangeActive_(event.currentTarget, range)
                controller.rangeEvent(range, (...args) => this.showList_(...args))
            })
            li.appendChild(link);
            this.ranges.appendChild(li);
        });
        // return default range
        return ranges[0];
    }

    showPages_(amount, rangeNumer, controller) {
        if (this.pages.children.length > 0) {
            removeChildren(this.pages);
        }

        const count = this.calcPages_(amount, rangeNumer)

        for (let i = 0; i < count; i++) {
            const li = document.createElement('li'),
                link = document.createElement('a')

            if (this.activePageNumber === i + 1) {
                link.classList.add('active');
                this.activePage = link;
            }

            link.innerText = i + 1;
            link.addEventListener('click', event => {
                this.setPageActive_(event.currentTarget, i + 1)
                controller.pageEvent(i + 1, this.activeRangeNumber,  (...args) => this.showList_(...args))
            });
            li.appendChild(link);
            this.pages.appendChild(li);
        }
        // return default page
        return 0;
    }

    calcPages_(amount, range) {
        return !(amount % range) ? amount / range : Math.floor( amount / range ) + 1;
    }

    setRangeActive_(element, range) {
        this.activeRange.classList.remove('active')
        this.activeRange = element
        this.activeRangeNumber = range
        this.activeRange.classList.add('active')
        // drop activePageNumber
        this.activePageNumber = 1
    }

    setPageActive_(element, page) {
        this.activePage.classList.remove('active')
        this.activePage = element
        this.activePageNumber = page
        this.activePage.classList.add('active')
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
        this.sortSelector.addEventListener('change', (event) => this.controller.sortEvent(event, this.activePageNumber, this.activeRangeNumber, (...args) => this.showList_(...args)))
    }
}
