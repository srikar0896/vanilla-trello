import View from "./view";
import Controller from "./controller";
import Model from "./model";
import { qs } from "./utils";
import data from "./data";

import "./styles.css";
import "./baseStyles.css";

const container = qs(".boards-container");

const model = new Model(data);
const view = new View(container);
const controller = new Controller(model, view);
controller.init();
