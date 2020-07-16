export default class Model {
  constructor(data) {
    this.boards = data.boards;
    this.addBoardItem = this.addBoardItem.bind(this);
    this.updateBoardItem = this.updateBoardItem.bind(this);
  }
  addBoardItem(boardId, { title, description }) {
    return new Promise(resolve => {
      const data = {
        id: Date.now(),
        title,
        description
      };
      this.boards = this.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            items: [...board.items, data]
          };
        } else return board;
      });
      resolve({
        data
      });
    });
  }

  deleteBoardItem(boardItemId) {
    return new Promise(resolve => {
      this.boards = this.boards.reduce((acc, curr) => {
        return [
          ...acc,
          {
            ...curr,
            items: curr.items.filter(item => item.id !== boardItemId)
          }
        ];
      }, []);
      resolve({
        status: 200
      });
    });
  }


  updateBoardItem(boardItemId, { title, description }) {
    const data = {
      id: boardItemId,
      title,
      description
    };
    return new Promise(resolve => {
      this.boards = this.boards.reduce((acc, curr) => {
        return [
          ...acc,
          {
            ...curr,
            items: curr.items.map(item => item.id === boardItemId ? data : item)
          }
        ];
      }, []);
      resolve({
        status: 200
      });
    });
  }
}
