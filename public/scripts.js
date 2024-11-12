const socket = io(); // 建立 Socket.IO 连接

// 获取棋盘元素（假设棋盘由 <div> 元素表示）
const board = document.getElementById("game-board");

// 渲染初始棋盘状态
socket.on("initBoard", (boardState) => {
  console.log("Initializing board:", boardState);
  renderBoard(boardState);
});

// 监听服务器广播的棋盘更新事件
socket.on("updateBoard", ({ index, tile }) => {
  console.log(`Update from server: Index ${index}, Tile ${tile}`);
  updateTile(index, tile);
});

// 点击棋盘格子移动麻将牌的事件（模拟操作）
board.addEventListener("click", (event) => {
  const index = parseInt(event.target.dataset.index); // 获取格子索引
  const tile = "🀄"; // 示例：假设用户选择了某个麻将牌

  // 本地更新（预览效果）
  updateTile(index, tile);

  // 通知服务器
  socket.emit("moveTile", { index, tile });
});

// 更新指定格子的内容
function updateTile(index, tile) {
  const tileElement = document.querySelector(`[data-index="${index}"]`);
  if (tileElement) {
    tileElement.textContent = tile; // 更新格子内容为麻将牌
  }
}

// 渲染整个棋盘
function renderBoard(boardState) {
  board.innerHTML = ""; // 清空棋盘内容
  boardState.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.className = "tile";
    tileElement.dataset.index = index; // 设置格子索引
    tileElement.textContent = tile || ""; // 显示麻将牌（如果有）
    board.appendChild(tileElement);
  });
}