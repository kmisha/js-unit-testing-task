import Controller from './widget/controller.js';
import Model from "./widget/model.js";
import View from './widget/view.js';
import config from './config.json'

const container = document.querySelector('.person-list-container');
const list = new Model(config);
const view = new View(container);
const widget = new Controller(view, list);
widget.compile([10, 15, 20]);

