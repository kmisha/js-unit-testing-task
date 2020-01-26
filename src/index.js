import Controller from './widget/controller.js';
import Model from "./widget/model.js";
import View from './widget/view.js';
import config from './config.json'

const container = document.querySelector('.person-list-container');
const model = new Model(config)
const controller = new Controller(model)
const view = new View(container, controller,[10, 15 , 20])
// widget.compile([10, 15, 20]);

