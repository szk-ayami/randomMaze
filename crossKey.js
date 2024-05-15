"use strict";
// 「↑」が押された時
function up() {
  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  // 現在地点のindexを取得
  let currentIndexY = 0;
  let currentIndexX = 0;

  for (let i = 0; i < inputRow; i++) {
    if (maze[i].indexOf(2) !== -1) {
      currentIndexY = i;
      currentIndexX = maze[i].indexOf(2);
    }
  }

  // ゴール後は動かない
  if (currentIndexY === inputRow - 2 && currentIndexX === inputCol - 2) {
    return;
  }

  // 上が通路なら進んで、元の場所を通路に戻す
  if (maze[currentIndexY - 1][currentIndexX] === 1) {
    maze[currentIndexY][currentIndexX] = 1;
    maze[currentIndexY - 1][currentIndexX] = 2;
  }

  printMaze(maze, inputRow, inputCol);
}

// 「↓」が押された時
function down() {
  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  // 現在地点のindexを取得
  let currentIndexY = 0;
  let currentIndexX = 0;

  for (let i = 0; i < inputRow; i++) {
    if (maze[i].indexOf(2) !== -1) {
      currentIndexY = i;
      currentIndexX = maze[i].indexOf(2);
    }
  }

  // ゴール後は動かない
  if (currentIndexY === inputRow - 2 && currentIndexX === inputCol - 2) {
    return;
  }

  // 上が通路なら進んで、元の場所を通路に戻す
  if (maze[currentIndexY + 1][currentIndexX] === 1) {
    maze[currentIndexY][currentIndexX] = 1;
    maze[currentIndexY + 1][currentIndexX] = 2;
  }

  printMaze(maze, inputRow, inputCol);
}

// 「→」が押された時
function right() {
  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  let currentIndexY = 0;
  let currentIndexX = 0;

  for (let i = 0; i < inputRow; i++) {
    if (maze[i].indexOf(2) !== -1) {
      currentIndexY = i;
      currentIndexX = maze[i].indexOf(2);
    }
  }

  // ゴール後は動かない
  if (currentIndexY === inputRow - 2 && currentIndexX === inputCol - 2) {
    return;
  }

  // 上が通路なら進んで、元の場所を通路に戻す
  if (maze[currentIndexY][currentIndexX + 1] === 1) {
    maze[currentIndexY][currentIndexX] = 1;
    maze[currentIndexY][currentIndexX + 1] = 2;
  }

  printMaze(maze, inputRow, inputCol);
}

// 「←」が押された時
function left() {
  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  // 現在地点のindexを取得
  let currentIndexY = 0;
  let currentIndexX = 0;

  for (let i = 0; i < inputRow; i++) {
    if (maze[i].indexOf(2) !== -1) {
      currentIndexY = i;
      currentIndexX = maze[i].indexOf(2);
    }
  }

  // ゴール後は動かない
  if (currentIndexY === inputRow - 2 && currentIndexX === inputCol - 2) {
    return;
  }

  // 上が通路なら進んで、元の場所を通路に戻す
  if (maze[currentIndexY][currentIndexX - 1] === 1) {
    maze[currentIndexY][currentIndexX] = 1;
    maze[currentIndexY][currentIndexX - 1] = 2;
  }

  printMaze(maze, inputRow, inputCol);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    up();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    down();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    left();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    right();
  }
});
