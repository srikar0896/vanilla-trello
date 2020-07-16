import ListItem from "./ListItem";
import { qs } from "./utils";
import eventBus from "./eventBus";

class View {
  constructor(boardContainer) {
    this.container = boardContainer;
    this.renderBoard = this.renderBoard.bind(this);
  }

  renderBoard(boardData) {
    // const boardContainer = qs(
    //   `[data-board-id="${boardData.id}"]`,
    //   this.container
    // );

    const boardTemplate = document.createElement("div");
    boardTemplate.className = "board";
    boardTemplate.setAttribute("data-board-id", boardData.id);
    boardTemplate.innerHTML = `
      <div class="board-header m-l text-strong">
        ${boardData.name}
      </div>
      <div class="board-items-container drag-sort-enable">
      </div>
      <form class="vertical-align">
        <input id="title" type="text" placeholder="Title" name="title" class="m-b m-t" />
        <input id="description" placeholder="Description" name="description" class="m-b"/>
        <button class="add-item-btn">Add</button>
      </form>
    `;
    this.container.appendChild(boardTemplate);
  }

  renderNoDataMessage(boardContainer) {
    const boardItemsContainer = qs(".board-items-container", boardContainer);
    boardItemsContainer.innerHTML = `
      <center>
      <h3 class="text-faded">
        No Items in this list
      </h3>
      </center>
    `;
  }
}

export default class Board {
  constructor(data, container) {
    this.data = data;
    this.view = new View(container);
    this.init = this.init.bind(this);
    this.handleAddBoardItem = this.handleAddBoardItem.bind(this);
    this.checkUpdateValidity = this.checkUpdateValidity.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    this.render();
    if (this.data.items.length > 0) {
      this.data.items.forEach(item => {
        const boardContainer = qs(
          `[data-board-id="${this.data.id}"]`,
          this.view.container
        );
        const boardItemsContainer = qs(
          ".board-items-container",
          boardContainer
        );
        qs(".add-item-btn", boardContainer).addEventListener(
          "click",
          this.handleAddBoardItem
        );
        const listItem = new ListItem(
          item,
          boardItemsContainer,
        );
        listItem.init();
      });
    } else {
      this.renderNoDataMessage();
    }

    this.registerEvents();
  }

  registerEvents() {
    eventBus.register("board-updated", this.checkUpdateValidity);
  }

  checkUpdateValidity({ detail }) {
    if (detail === this.data.id) {
      this.render();
    }
  }

  render() {
    this.view.renderBoard(this.data);
  }

  renderNoDataMessage() {
    const boardContainer = qs(
      `[data-board-id="${this.data.id}"]`,
      this.view.container
    );
    this.view.renderNoDataMessage(boardContainer);
  }

  handleAddBoardItem(e) {
    e.preventDefault();
    const form = e.currentTarget.parentNode;
    const values = Object.values(form).reduce((obj, field) => {
      obj[field.name] = field.value;
      return obj;
    }, {});
    eventBus.fire("add_board_item", {
      boardId: this.data.id,
      data: values
    });
  }
}
