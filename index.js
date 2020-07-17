import View from "./src/view";
import Controller from "./src/controller";
import Model from "./src/model";
import { qs } from "./src/utils";
import data from "./src/data";

import "./styles.css";
import "./baseStyles.css";

const container = qs(".boards-container");

const options = {
	allowDragNDrop: true,
};

const model = new Model(data);
const view = new View(container);
const controller = new Controller(model, view, options);
controller.init();
