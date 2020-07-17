import { qs } from "./utils";
import eventBus from "./eventBus";

class View {
  constructor(boardContainer) {
    this.container = boardContainer;
  }

  renderListItem(boardItem, isEditing) {
    if (isEditing) {
      const boardItemNode = qs(`[data-board-item-id="${boardItem.id}"]`);
      boardItemNode.setAttribute("draggable", false);
      boardItemNode.innerHTML = `
        <form class="vertical-align flex-occupy">
          <input id="title" type="text" placeholder="Title" name="title" class="m-b m-t bg-light" value="${
            boardItem.title
          }"/>
          <textarea rows="4" id="description" placeholder="Description" name="description" class="m-b bg-light">${
            boardItem.description
          }</textarea>
          <button class="update-item-btn">Update</button>
        </form>
      `;
    } else {
      const listItemTemplate = document.createElement("div");
      listItemTemplate.className = ["board-item", "drag-item", "flex"].join(
        " "
      );
      listItemTemplate.setAttribute("data-board-item-id", boardItem.id);
      listItemTemplate.innerHTML = `
        <div class="content-wrapper vertical-align flex-occupy">
          <p class="text-normal text-strong">${boardItem.title}</p>
          <p class="board-item-description m-t text-medium text-faded">${
            boardItem.description
          }</p>
        </div>
        <div role="button" class="edit-item-btn text-faded pointer m-r">
          <p class="no-margin text-big">
            ✎
          </p>
        </div>
        <div role="button" class="delete-item-btn text-faded pointer">
          <p class="no-margin text-big">
            ⊗
          </p>
        </div>
      `;
      this.container.appendChild(listItemTemplate);
    }
  }
}

export default class ListItem {
  constructor(data, container) {
    this.data = data;
    this.view = new View(container);
    this.handleRemoveBoardItem = this.handleRemoveBoardItem.bind(this);
    this.handleEditBoardItem = this.handleEditBoardItem.bind(this);
    this.handleUpdateBoardItem = this.handleUpdateBoardItem.bind(this);
    this.registerEventListeners = this.registerEventListeners.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    this.render();
    this.registerEventListeners();
  }

  render() {
    this.view.renderListItem(this.data, this.isEditing);
  }

  registerEventListeners() {
    const boardItemNode = qs(
      `[data-board-item-id="${this.data.id}"]`,
      this.view.container
    );
    qs(".delete-item-btn", boardItemNode).addEventListener(
      "click",
      this.handleRemoveBoardItem
    );
    qs(".edit-item-btn", boardItemNode).addEventListener(
      "click",
      this.handleEditBoardItem
    );
  }

  handleRemoveBoardItem() {
    if (window.confirm("Are you sure you want to delete this item ")) {
      eventBus.fire("delete_board_item", {
        boardItemId: this.data.id
      });
    }
  }

  handleEditBoardItem() {
    this.isEditing = true;
    this.render();

    const boardItemNode = qs(
      `[data-board-item-id="${this.data.id}"]`,
      this.view.container
    );
    qs(".update-item-btn", boardItemNode).addEventListener(
      "click",
      this.handleUpdateBoardItem
    );
  }

  handleUpdateBoardItem(e) {
    e.preventDefault();
    const form = e.currentTarget.parentNode;
    const values = Object.values(form).reduce((obj, field) => {
      obj[field.name] = field.value;
      return obj;
    }, {});
    eventBus.fire("update_board_item", {
      boardItemId: this.data.id,
      data: values
    });

    this.isEditing = false;
    this.render();

    return false;
  }
}
