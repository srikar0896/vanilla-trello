import { qs, qsAll } from "./utils";
import eventBus from "./eventBus";

export function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  for (let item of sortableLists) {
    enableDragList(item);
  }
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, item => {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

function handleDrag(event) {
  const selectedItem = event.target,
    list = qsAll(".drag-sort-enable"),
    x = event.clientX,
    y = event.clientY;

  selectedItem.classList.add("drag-sort-active");
  const nodeAtCoordinates = document.elementFromPoint(x, y);
  let swapItem = nodeAtCoordinates === null ? selectedItem : nodeAtCoordinates;

  if (swapItem.className.split(" ").includes("board-item")) {
    swapItem.parentNode.insertBefore(selectedItem, swapItem);
  }

  // If this list is empty
  if (swapItem.className.split(" ").includes("board-items-container")) {
    swapItem.appendChild(selectedItem);
  }
}

function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");
  eventBus.fire("board_item_drop", {
    boardItemId: item.target.dataset.boardItemId,
    boardId: item.target.parentNode.parentNode.dataset.boardId
  });
}
