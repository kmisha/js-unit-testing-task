import PersonWidget from './widget/personwidget.js';
import config from './config.json'

const container = document.querySelector('.person-list-container');
const widget = new PersonWidget(config, container, [10, 15, 20]);

