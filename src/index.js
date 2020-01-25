import PersonWidget from './widget/personwidget.js';
import PersonList from "./widget/personlist";
import PersonView from './widget/personview';
import config from './config.json'

const container = document.querySelector('.person-list-container');
const list = new PersonList(config);
const view = new PersonView(container);
const widget = new PersonWidget(view, list);
widget.compile([10, 15, 20]);

