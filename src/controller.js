import Board from "./board";
import { enableDragSort } from "./sort";
import eventBus from "./eventBus";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.addedBoardItem = this.addedBoardItem.bind(this);
    this.deleteBoardItem = this.deleteBoardItem.bind(this);
    this.handleUpdateBoardItem = this.handleUpdateBoardItem.bind(this);

    this.events = {
      add_board_item: this.addedBoardItem,
      delete_board_item: this.deleteBoardItem,
      board_item_drag: this.saveUpdatedBoardSequence,
      update_board_item: this.handleUpdateBoardItem,
    };
  }

  registerEvents() {
    Object.entries(this.events).forEach(([event, callback]) =>
      eventBus.register(event, callback)
    );
  }

  init() {
    this.emptyContainer();
    console.log("boards==", this.model.boards);
    this.model.boards.forEach(boardData => {
      const board = new Board(boardData, this.view.container);
      board.init();
    });
    enableDragSort("drag-sort-enable");
    this.registerEvents();
  }

  addedBoardItem({ detail: { boardId, data } }) {
    this.model.addBoardItem(boardId, data).then(_ => {
      eventBus.fire("board-updatedx", boardId);
      this.init();
    });
  }

  deleteBoardItem({ detail: { boardItemId } }) {
    this.model.deleteBoardItem(boardItemId).then(_ => {
      eventBus.fire("board-updatedx", boardItemId);
      this.init();
    });
  }

  handleUpdateBoardItem({ detail: { boardItemId, data } }) {
    this.model.updateBoardItem(boardItemId, data).then(_ => {
      this.init();
    });
  }

  saveUpdatedBoardSequence() {
    console.log("saved");
  }

  emptyContainer() {
    this.view.container.innerHTML = "";
  }
}
