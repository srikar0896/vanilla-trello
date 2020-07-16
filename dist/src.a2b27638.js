// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function View(container) {
  _classCallCheck(this, View);

  this.container = container;
};

exports.default = View;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qsAll = exports.qs = void 0;

var qs = function qs(target) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return parent.querySelector(target);
};

exports.qs = qs;

var qsAll = function qsAll(target) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return parent.querySelectorAll(target);
};

exports.qsAll = qsAll;
},{}],"src/eventBus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    this._bus = document.createElement("div");
  }

  _createClass(EventBus, [{
    key: "register",
    value: function register(event, callback) {
      this._bus.addEventListener(event, callback);
    }
  }, {
    key: "remove",
    value: function remove(event, callback) {
      this._bus.removeEventListener(event, callback);
    }
  }, {
    key: "fire",
    value: function fire(event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._bus.dispatchEvent(new CustomEvent(event, {
        detail: detail
      }));
    }
  }]);

  return EventBus;
}();

var bus = new EventBus();
var _default = bus;
exports.default = _default;
},{}],"src/ListItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _eventBus = _interopRequireDefault(require("./eventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View(boardContainer) {
    _classCallCheck(this, View);

    this.container = boardContainer;
  }

  _createClass(View, [{
    key: "renderListItem",
    value: function renderListItem(boardItem, isEditing) {
      console.log(isEditing);

      if (isEditing) {
        var boardItemNode = (0, _utils.qs)("[data-board-item-id=\"".concat(boardItem.id, "\"]"), this.container);
        boardItemNode.innerHTML = "\n        <form class=\"vertical-align flex-occupy\">\n          <input id=\"title\" type=\"text\" placeholder=\"Title\" name=\"title\" class=\"m-b m-t bg-light\" value=\"".concat(boardItem.title, "\"/>\n          <textarea rows=\"4\" id=\"description\" placeholder=\"Description\" name=\"description\" class=\"m-b bg-light\">").concat(boardItem.description, "</textarea>\n          <button class=\"update-item-btn\">Update</button>\n        </form>\n      ");
      } else {
        var listItemTemplate = document.createElement("div");
        listItemTemplate.className = ["board-item", "drag-item", "flex"].join(" ");
        listItemTemplate.setAttribute("data-board-item-id", boardItem.id);
        listItemTemplate.innerHTML = "\n        <div class=\"content-wrapper vertical-align flex-occupy\">\n          <p class=\"text-normal text-strong\">".concat(boardItem.title, "</p>\n          <p class=\"board-item-description m-t text-medium text-faded\">").concat(boardItem.description, "</p>\n        </div>\n        <div role=\"button\" class=\"edit-item-btn text-faded pointer m-r\">\n          <p class=\"no-margin text-big\">\n            \u270E\n          </p>\n        </div>\n        <div role=\"button\" class=\"delete-item-btn text-faded pointer\">\n          <p class=\"no-margin text-big\">\n            \u2297\n          </p>\n        </div>\n      ");
        this.container.appendChild(listItemTemplate);
      }
    }
  }]);

  return View;
}();

var ListItem = /*#__PURE__*/function () {
  function ListItem(data, container) {
    _classCallCheck(this, ListItem);

    this.data = data;
    this.view = new View(container);
    this.handleRemoveBoardItem = this.handleRemoveBoardItem.bind(this);
    this.handleEditBoardItem = this.handleEditBoardItem.bind(this);
    this.handleUpdateBoardItem = this.handleUpdateBoardItem.bind(this);
    this.registerEventListeners = this.registerEventListeners.bind(this);
    this.render = this.render.bind(this);
  }

  _createClass(ListItem, [{
    key: "init",
    value: function init() {
      this.render();
      this.registerEventListeners();
    }
  }, {
    key: "render",
    value: function render() {
      this.view.renderListItem(this.data, this.isEditing);
    }
  }, {
    key: "registerEventListeners",
    value: function registerEventListeners() {
      var boardItemNode = (0, _utils.qs)("[data-board-item-id=\"".concat(this.data.id, "\"]"), this.view.container);
      (0, _utils.qs)(".delete-item-btn", boardItemNode).addEventListener("click", this.handleRemoveBoardItem);
      (0, _utils.qs)(".edit-item-btn", boardItemNode).addEventListener("click", this.handleEditBoardItem);
    }
  }, {
    key: "handleRemoveBoardItem",
    value: function handleRemoveBoardItem() {
      if (window.confirm("Are you sure you want to delete this item ")) {
        _eventBus.default.fire("delete_board_item", {
          boardItemId: this.data.id
        });
      }
    }
  }, {
    key: "handleEditBoardItem",
    value: function handleEditBoardItem() {
      this.isEditing = true;
      this.render();
      var boardItemNode = (0, _utils.qs)("[data-board-item-id=\"".concat(this.data.id, "\"]"), this.view.container);
      (0, _utils.qs)(".update-item-btn", boardItemNode).addEventListener("click", this.handleUpdateBoardItem);
    }
  }, {
    key: "handleUpdateBoardItem",
    value: function handleUpdateBoardItem(e) {
      console.log("submit", e);
      e.preventDefault();
      var form = e.currentTarget.parentNode;
      var values = Object.values(form).reduce(function (obj, field) {
        obj[field.name] = field.value;
        return obj;
      }, {});

      _eventBus.default.fire("update_board_item", {
        boardItemId: this.data.id,
        data: values
      });

      this.isEditing = false;
      this.render();
    }
  }]);

  return ListItem;
}();

exports.default = ListItem;
},{"./utils":"src/utils.js","./eventBus":"src/eventBus.js"}],"src/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _utils = require("./utils");

var _eventBus = _interopRequireDefault(require("./eventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View(boardContainer) {
    _classCallCheck(this, View);

    this.container = boardContainer;
    this.renderBoard = this.renderBoard.bind(this);
  }

  _createClass(View, [{
    key: "renderBoard",
    value: function renderBoard(boardData) {
      // const boardContainer = qs(
      //   `[data-board-id="${boardData.id}"]`,
      //   this.container
      // );
      var boardTemplate = document.createElement("div");
      boardTemplate.className = "board";
      boardTemplate.setAttribute("data-board-id", boardData.id);
      boardTemplate.innerHTML = "\n      <div class=\"board-header m-l text-strong\">\n        ".concat(boardData.name, "\n      </div>\n      <div class=\"board-items-container drag-sort-enable\">\n      </div>\n      <form class=\"vertical-align\">\n        <input id=\"title\" type=\"text\" placeholder=\"Title\" name=\"title\" class=\"m-b m-t\" />\n        <input id=\"description\" placeholder=\"Description\" name=\"description\" class=\"m-b\"/>\n        <button class=\"add-item-btn\">Add</button>\n      </form>\n    ");
      this.container.appendChild(boardTemplate);
    }
  }, {
    key: "renderNoDataMessage",
    value: function renderNoDataMessage(boardContainer) {
      var boardItemsContainer = (0, _utils.qs)(".board-items-container", boardContainer);
      boardItemsContainer.innerHTML = "\n      <center>\n      <h3 class=\"text-faded\">\n        No Items in this list\n      </h3>\n      </center>\n    ";
    }
  }]);

  return View;
}();

var Board = /*#__PURE__*/function () {
  function Board(data, container) {
    _classCallCheck(this, Board);

    this.data = data;
    this.view = new View(container);
    this.init = this.init.bind(this);
    this.handleAddBoardItem = this.handleAddBoardItem.bind(this);
    this.checkUpdateValidity = this.checkUpdateValidity.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
    this.render = this.render.bind(this);
  }

  _createClass(Board, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.render();

      if (this.data.items.length > 0) {
        this.data.items.forEach(function (item) {
          var boardContainer = (0, _utils.qs)("[data-board-id=\"".concat(_this.data.id, "\"]"), _this.view.container);
          var boardItemsContainer = (0, _utils.qs)(".board-items-container", boardContainer);
          (0, _utils.qs)(".add-item-btn", boardContainer).addEventListener("click", _this.handleAddBoardItem);
          var listItem = new _ListItem.default(item, boardItemsContainer);
          listItem.init();
        });
      } else {
        this.renderNoDataMessage();
      }

      this.registerEvents();
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      _eventBus.default.register("board-updated", this.checkUpdateValidity);
    }
  }, {
    key: "checkUpdateValidity",
    value: function checkUpdateValidity(_ref) {
      var detail = _ref.detail;

      if (detail === this.data.id) {
        this.render();
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.view.renderBoard(this.data);
    }
  }, {
    key: "renderNoDataMessage",
    value: function renderNoDataMessage() {
      var boardContainer = (0, _utils.qs)("[data-board-id=\"".concat(this.data.id, "\"]"), this.view.container);
      this.view.renderNoDataMessage(boardContainer);
    }
  }, {
    key: "handleAddBoardItem",
    value: function handleAddBoardItem(e) {
      e.preventDefault();
      var form = e.currentTarget.parentNode;
      var values = Object.values(form).reduce(function (obj, field) {
        obj[field.name] = field.value;
        return obj;
      }, {});

      _eventBus.default.fire("add_board_item", {
        boardId: this.data.id,
        data: values
      });
    }
  }]);

  return Board;
}();

exports.default = Board;
},{"./ListItem":"src/ListItem.js","./utils":"src/utils.js","./eventBus":"src/eventBus.js"}],"src/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableDragSort = enableDragSort;

var _utils = require("./utils");

var _eventBus = _interopRequireDefault(require("./eventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function enableDragSort(listClass) {
  var sortableLists = document.getElementsByClassName(listClass);

  var _iterator = _createForOfIteratorHelper(sortableLists),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      enableDragList(item);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, function (item) {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

function handleDrag(event) {
  var selectedItem = event.target,
      list = (0, _utils.qsAll)(".drag-sort-enable"),
      x = event.clientX,
      y = event.clientY;
  selectedItem.classList.add("drag-sort-active");
  console.log('-->', document.elementFromPoint(x, y));
  var nodeAtCoordinates = document.elementFromPoint(x, y);
  var swapItem = nodeAtCoordinates === null ? selectedItem : nodeAtCoordinates; // swapItem =
  //   swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;

  console.log('SWAP', swapItem);

  if (swapItem.className.split(' ').includes("board-item")) {
    swapItem.parentNode // .appendChild(selectedItem);
    .insertBefore(selectedItem, swapItem);
  }

  if (swapItem.className.split(' ').includes("board-items-container")) {
    swapItem.appendChild(selectedItem);
  }
}

function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");

  _eventBus.default.fire("board_item_drag", "message");
}
},{"./utils":"src/utils.js","./eventBus":"src/eventBus.js"}],"src/controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _board = _interopRequireDefault(require("./board"));

var _sort = require("./sort");

var _eventBus = _interopRequireDefault(require("./eventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(model, view) {
    _classCallCheck(this, Controller);

    this.model = model;
    this.view = view;
    this.addedBoardItem = this.addedBoardItem.bind(this);
    this.deleteBoardItem = this.deleteBoardItem.bind(this);
    this.handleUpdateBoardItem = this.handleUpdateBoardItem.bind(this);
    this.events = {
      add_board_item: this.addedBoardItem,
      delete_board_item: this.deleteBoardItem,
      board_item_drag: this.saveUpdatedBoardSequence,
      update_board_item: this.handleUpdateBoardItem
    };
  }

  _createClass(Controller, [{
    key: "registerEvents",
    value: function registerEvents() {
      Object.entries(this.events).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            event = _ref2[0],
            callback = _ref2[1];

        return _eventBus.default.register(event, callback);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.emptyContainer();
      console.log("boards==", this.model.boards);
      this.model.boards.forEach(function (boardData) {
        var board = new _board.default(boardData, _this.view.container);
        board.init();
      });
      (0, _sort.enableDragSort)("drag-sort-enable");
      this.registerEvents();
    }
  }, {
    key: "addedBoardItem",
    value: function addedBoardItem(_ref3) {
      var _this2 = this;

      var _ref3$detail = _ref3.detail,
          boardId = _ref3$detail.boardId,
          data = _ref3$detail.data;
      this.model.addBoardItem(boardId, data).then(function (_) {
        _eventBus.default.fire("board-updatedx", boardId);

        _this2.init();
      });
    }
  }, {
    key: "deleteBoardItem",
    value: function deleteBoardItem(_ref4) {
      var _this3 = this;

      var boardItemId = _ref4.detail.boardItemId;
      this.model.deleteBoardItem(boardItemId).then(function (_) {
        _eventBus.default.fire("board-updatedx", boardItemId);

        _this3.init();
      });
    }
  }, {
    key: "handleUpdateBoardItem",
    value: function handleUpdateBoardItem(_ref5) {
      var _this4 = this;

      var _ref5$detail = _ref5.detail,
          boardItemId = _ref5$detail.boardItemId,
          data = _ref5$detail.data;
      this.model.updateBoardItem(boardItemId, data).then(function (_) {
        _this4.init();
      });
    }
  }, {
    key: "saveUpdatedBoardSequence",
    value: function saveUpdatedBoardSequence() {
      console.log("saved");
    }
  }, {
    key: "emptyContainer",
    value: function emptyContainer() {
      this.view.container.innerHTML = "";
    }
  }]);

  return Controller;
}();

exports.default = Controller;
},{"./board":"src/board.js","./sort":"src/sort.js","./eventBus":"src/eventBus.js"}],"src/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model(data) {
    _classCallCheck(this, Model);

    this.boards = data.boards;
    this.addBoardItem = this.addBoardItem.bind(this);
    this.updateBoardItem = this.updateBoardItem.bind(this);
  }

  _createClass(Model, [{
    key: "addBoardItem",
    value: function addBoardItem(boardId, _ref) {
      var _this = this;

      var title = _ref.title,
          description = _ref.description;
      return new Promise(function (resolve) {
        var data = {
          id: Date.now(),
          title: title,
          description: description
        };
        _this.boards = _this.boards.map(function (board) {
          if (board.id === boardId) {
            return _objectSpread(_objectSpread({}, board), {}, {
              items: [].concat(_toConsumableArray(board.items), [data])
            });
          } else return board;
        });
        resolve({
          data: data
        });
      });
    }
  }, {
    key: "deleteBoardItem",
    value: function deleteBoardItem(boardItemId) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.boards = _this2.boards.reduce(function (acc, curr) {
          return [].concat(_toConsumableArray(acc), [_objectSpread(_objectSpread({}, curr), {}, {
            items: curr.items.filter(function (item) {
              return item.id !== boardItemId;
            })
          })]);
        }, []);
        resolve({
          status: 200
        });
      });
    }
  }, {
    key: "updateBoardItem",
    value: function updateBoardItem(boardItemId, _ref2) {
      var _this3 = this;

      var title = _ref2.title,
          description = _ref2.description;
      var data = {
        id: boardItemId,
        title: title,
        description: description
      };
      return new Promise(function (resolve) {
        _this3.boards = _this3.boards.reduce(function (acc, curr) {
          return [].concat(_toConsumableArray(acc), [_objectSpread(_objectSpread({}, curr), {}, {
            items: curr.items.map(function (item) {
              return item.id === boardItemId ? data : item;
            })
          })]);
        }, []);
        resolve({
          status: 200
        });
      });
    }
  }]);

  return Model;
}();

exports.default = Model;
},{}],"src/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  meta: "",
  boards: [{
    "id": "5f109749f95ec825d28b002a",
    "name": "Backlog",
    "items": [{
      "id": "5f109749656a3f8b2c7507dc",
      "title": "aute nulla laborum cillum",
      "description": "Cillum velit duis eu proident est. Sunt laborum laboris reprehenderit ullamco cillum ut mollit cupidatat consequat aute ad."
    }, {
      "id": "5f10974920f02f9f9388fc31",
      "title": "ex voluptate labore non",
      "description": "Est pariatur quis culpa anim aliqua aliqua proident. Lorem magna minim ullamco non aliquip sint est et consequat velit velit duis pariatur pariatur."
    }, {
      "id": "5f10974952a4698dd701b8be",
      "title": "id Lorem ipsum enim",
      "description": "Veniam ullamco incididunt amet irure fugiat aliquip velit non tempor ea laboris exercitation. Ullamco officia duis reprehenderit dolore fugiat consequat occaecat."
    }, {
      "id": "5f1097495d91d8dbb1b166bc",
      "title": "adipisicing exercitation incididunt sit",
      "description": "Esse veniam sunt do deserunt. Sit proident labore labore ea dolor nulla ullamco tempor labore ullamco id sit excepteur."
    }, {
      "id": "5f10974947aa450a139c2cbe",
      "title": "minim ex ea cillum",
      "description": "Enim labore cupidatat ea ad elit excepteur. Do Lorem mollit est id anim sit."
    }]
  }, {
    "id": "5f1097490abba01d647494d4",
    "name": "In Progress",
    "items": [{
      "id": "5f109749b918bb00c7f58a17",
      "title": "commodo adipisicing sunt in",
      "description": "Excepteur est sit labore incididunt est enim sit veniam dolor eu do pariatur. Nostrud Lorem duis cupidatat sit duis sint occaecat et labore dolore culpa ex aute."
    }, {
      "id": "5f10974928376262f0ead296",
      "title": "occaecat reprehenderit eu ut",
      "description": "Lorem aliquip sit magna velit minim aute et magna magna fugiat nostrud in ea. Culpa irure elit qui tempor voluptate."
    }, {
      "id": "5f1097498c9e6b8ab7c83083",
      "title": "duis in ut qui",
      "description": "Excepteur anim exercitation ipsum occaecat mollit reprehenderit proident et incididunt aliqua laboris nisi laboris. Aliqua fugiat do pariatur mollit irure."
    }, {
      "id": "5f109749fa3d7709852f94b3",
      "title": "nulla esse proident consectetur",
      "description": "Laboris eiusmod sunt veniam occaecat qui exercitation labore ea voluptate in sint sint labore aliquip. Ullamco fugiat anim esse consectetur commodo enim magna."
    }, {
      "id": "5f1097494f6aae2aa31d2b8a",
      "title": "ullamco nulla laboris proident",
      "description": "Labore mollit aliquip Lorem tempor velit aliquip in. Aliquip commodo officia occaecat et tempor reprehenderit dolore non culpa fugiat dolore."
    }]
  }, {
    "id": "5f109749c8d9e7e3937d1cb9",
    "name": "Blocked",
    "items": [{
      "id": "5f1097498cb3fa0cd2ede225",
      "title": "et ad sint ut",
      "description": "Deserunt aliquip magna ipsum magna. Sunt mollit consectetur consequat minim ex qui dolor fugiat fugiat magna."
    }, {
      "id": "5f1097493e78b4622f48affe",
      "title": "enim ad cupidatat sit",
      "description": "Aute ipsum eiusmod laborum nulla. Ex ad non minim cupidatat anim consectetur laborum amet labore adipisicing commodo exercitation mollit est."
    }, {
      "id": "5f109749e2f9cb42ac2abdbc",
      "title": "sint nulla ex ex",
      "description": "Ex est veniam ullamco ad. Proident voluptate commodo occaecat id tempor nisi enim amet est laboris veniam nisi."
    }, {
      "id": "5f109749743ad06d1f1c1a8c",
      "title": "nisi minim non et",
      "description": "Excepteur laborum incididunt sunt elit excepteur. Nisi mollit sit amet minim."
    }, {
      "id": "5f109749fbda99b760137470",
      "title": "dolore ipsum irure minim",
      "description": "Ex et culpa Lorem ut adipisicing culpa ipsum ipsum aliqua dolore laboris. Culpa proident ea magna adipisicing elit dolor laboris cupidatat aliquip."
    }]
  }, {
    "id": "5f109749c784bb13676a6865",
    "name": "QA",
    "items": [{
      "id": "5f10974999d6e90f08481334",
      "title": "tempor fugiat magna in",
      "description": "Sint in adipisicing ad minim sunt ex do magna incididunt id. Deserunt consequat aliqua eu incididunt irure ipsum nisi est cillum id incididunt amet duis laboris."
    }, {
      "id": "5f10974965ec19bfe349e66d",
      "title": "enim irure Lorem officia",
      "description": "Aliquip id aliqua magna excepteur. Tempor adipisicing consequat ullamco excepteur."
    }, {
      "id": "5f109749b2f2a4cacf8abbb9",
      "title": "irure aute adipisicing ad",
      "description": "Minim sit reprehenderit non duis laborum irure amet proident. Non voluptate aliqua pariatur voluptate esse tempor pariatur elit commodo dolor sint voluptate anim."
    }, {
      "id": "5f1097497efeba8911c29ee5",
      "title": "adipisicing voluptate laboris adipisicing",
      "description": "Irure sit anim aliquip occaecat. Est esse esse aliquip esse fugiat reprehenderit sunt."
    }, {
      "id": "5f1097498e30aec3ec96630d",
      "title": "fugiat irure eiusmod elit",
      "description": "Dolore labore tempor irure anim minim commodo nulla reprehenderit qui minim irure exercitation irure et. Sunt id do nisi tempor et mollit et voluptate aute eu dolor nisi occaecat."
    }]
  }, {
    "id": "5f10974942a8c4e5ce953231",
    "name": "Ready for Release",
    "items": [{
      "id": "5f109749f8d3bad4d6e0c924",
      "title": "excepteur qui minim occaecat",
      "description": "Esse Lorem sunt irure excepteur cupidatat sit culpa officia dolore est laborum nisi. Ad magna minim aliquip sit duis adipisicing Lorem consectetur incididunt proident aliqua."
    }, {
      "id": "5f109749c507714dfb806739",
      "title": "commodo Lorem exercitation deserunt",
      "description": "Ad ex elit in ipsum reprehenderit. Sit irure proident adipisicing officia."
    }, {
      "id": "5f10974943740e85fd30216c",
      "title": "anim dolor culpa aute",
      "description": "Proident anim ut aute nostrud fugiat est ut velit do. Minim minim cupidatat ea culpa veniam duis ad in ex incididunt et qui."
    }, {
      "id": "5f109749267b8e90732e89a8",
      "title": "ex laborum velit elit",
      "description": "Dolor proident ex pariatur irure pariatur. Eu laboris nulla ex tempor incididunt deserunt id est ea."
    }, {
      "id": "5f109749e02d44c7a79b31c4",
      "title": "aute in nostrud voluptate",
      "description": "Anim nulla ea consequat Lorem consequat deserunt sunt consequat. Aliquip excepteur velit anim aliquip occaecat laboris ullamco magna ea."
    }]
  }]
};
exports.default = _default;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/baseStyles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _view = _interopRequireDefault(require("./view"));

var _controller = _interopRequireDefault(require("./controller"));

var _model = _interopRequireDefault(require("./model"));

var _utils = require("./utils");

var _data = _interopRequireDefault(require("./data"));

require("./styles.css");

require("./baseStyles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = (0, _utils.qs)(".boards-container");
var model = new _model.default(_data.default);
var view = new _view.default(container);
var controller = new _controller.default(model, view);
controller.init();
},{"./view":"src/view.js","./controller":"src/controller.js","./model":"src/model.js","./utils":"src/utils.js","./data":"src/data.js","./styles.css":"src/styles.css","./baseStyles.css":"src/baseStyles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62106" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map