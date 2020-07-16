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
  console.log('-->', document.elementFromPoint(x,y));
  const nodeAtCoordinates = document.elementFromPoint(x, y);
  let swapItem =
    nodeAtCoordinates === null
      ? selectedItem
      : nodeAtCoordinates;

  // swapItem =
  //   swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;

  console.log('SWAP', swapItem);
  if (swapItem.className.split(' ').includes("board-item")) {
    swapItem.parentNode
      // .appendChild(selectedItem);
      .insertBefore(selectedItem, swapItem);
  }

  if (swapItem.className.split(' ').includes("board-items-container")) {
      swapItem
        .appendChild(selectedItem);
    }
}

function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");
  eventBus.fire("board_item_drag", "message");
}
