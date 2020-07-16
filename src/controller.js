import Board from "./board";
import { enableDragSort } from "./drag";
import eventBus from "./eventBus";

export default class Controller {
  constructor(model, view, options) {
    this.model = model;
    this.view = view;
    this.options = options;

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
    this.model.boards.forEach(boardData => {
      const board = new Board(boardData, this.view.container);
      board.init();
    });

    if(!this.options){
      enableDragSort("drag-sort-enable");
    } else if(this.options.allowDragNDrop) {
      enableDragSort("drag-sort-enable");
    }

    this.registerEvents();
  }

  addedBoardItem({ detail: { boardId, data } }) {
    this.model.addBoardItem(boardId, data).then(_ => {
      this.init();
    });
  }

  deleteBoardItem({ detail: { boardItemId } }) {
    this.model.deleteBoardItem(boardItemId).then(_ => {
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
