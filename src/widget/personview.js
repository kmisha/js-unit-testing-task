// string -> String
function sentenceCase(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
// convert "4091 lakeshore rd" to "4091 Lakeshore Rd"
function parseAddress(street) {
    const array = street.split(' ');
    let result = '';
    for(let i = 0; i < array.length; i++) {
        result += ` ${sentenceCase(array[i])}`;
    }
    return result;
}
// remove all children
function removeChildren(container) {
    const count = container.children.length;

    for(let i = 0; i < count; i++) {
        container.removeChild(container.firstElementChild);
    }
}
// Add DOM Element to container
function addElement(container, element, attr, content) {
    const elm = document.createElement(element);
    for(let key in attr) {
        elm.setAttribute(key, attr[key])
    }
    if(content) {
        elm.innerText = content;
    }
    container.appendChild(elm);
    return elm;
}

export default class PersonView {
    // click event
    static get CLICK() {
      return 'click';
    }
    // active css class
    static get ACTIVE() {
      return 'active';
    }
    // hidden css class
    static get HIDDEN() {
      return 'hidden';
    }
    constructor(container) {
        this.container     = container;
        this.sortSelector  = container.querySelector('.sorting');
        this.viewList      = container.querySelector('.view-list');
        this.ranges        = container.querySelector('.ranges');
        this.pages         = container.querySelector('.pages');
        this.modalOverlay  = container.querySelector('.modal-overlay');
        this.modal         = container.querySelector('.full-info');
    }
    showList(personList) {

        if(this.viewList.children.length > 0) {
            removeChildren(this.viewList);
        }

        personList.forEach((person) => {
            const li  = document.createElement('li'),
                  img = document.createElement('img'),
                  pName = document.createElement('p');
            img.src = person.picture.thumbnail;
            const { title, first, last } = person.name;
            pName.innerText = `${sentenceCase(title)}. ${sentenceCase(first)} ${sentenceCase(last)}`;
            li.appendChild(img);
            li.appendChild(pName);

            li.addEventListener(PersonView.CLICK,(event) => this.showFullInfo(person,event));

            this.viewList.appendChild(li);
        });
    }
    showRanges(ranges, controller) {
        ranges.forEach( (range, index) => {
            const li = document.createElement('li'),
                  a  = document.createElement('a');
            if(!index) {
                a.classList.add(PersonView.ACTIVE);
                this.activeRange = a;
            }
            a.innerText = range;
            a.addEventListener(PersonView.CLICK, event => controller.setRangeEvent(range,event));
            li.appendChild(a);
            this.ranges.appendChild(li);
        });
        // return default range
        return ranges[0];
    }
    setRangeActive(element) {
        this.activeRange.classList.remove(PersonView.ACTIVE);
        this.activeRange = element;
        this.activeRange.classList.add(PersonView.ACTIVE);
    }
    showPages(pageCount, controller) {

        if(this.pages.children.length > 0) {
            removeChildren(this.pages);
        }

        for(let i = 0; i < pageCount; i++) {
            const li = document.createElement('li'),
                  a  = document.createElement('a');
            if( i === 0 ) {
                a.classList.add(PersonView.ACTIVE);
                this.activePage = a;
            }
            a.innerText = i + 1;
            a.addEventListener(PersonView.CLICK, event => controller.setPageEvent(i, event));
            li.appendChild(a);
            this.pages.appendChild(li);
        }
        // return default page
        return 0;
    }
    setPageActive(element) {
        this.activePage.classList.remove(PersonView.ACTIVE);
        this.activePage = element;
        this.activePage.classList.add(PersonView.ACTIVE);
    }
    // modal view
    showFullInfo(person, event) {
        const over = this.modalOverlay;
        over.classList.remove(PersonView.HIDDEN);
        over.addEventListener(PersonView.CLICK,() => over.classList.add(PersonView.HIDDEN));
        // show modal window
        const modal = this.modal;

        if(this.modal.children.length > 0) {
            removeChildren(this.modal);
        }

        modal.classList.remove(PersonView.HIDDEN);
        addElement(modal, 'img', { src: person.picture.large, alt: `${person.name.first} ${person.name.last}` });
        const div = addElement(modal, 'div', {});
        addElement(div, 'p'  , {}, `Street: ${parseAddress(person.location.street)}`);
        addElement(div, 'p'  , {}, `City: ${sentenceCase(person.location.city)}`);
        addElement(div, 'p'  , {}, `State: ${sentenceCase(person.location.state)}`);
        addElement(div, 'p'  , {}, `Email: ${person.email}`);
        addElement(div, 'p'  , {}, `Phone: ${person.phone}`);

    }
}
