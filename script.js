"use strict";

// 1行目に記載している 'use strict' は削除しないでください

function zeros(row, col) {
  if (row < 1 || col < 1) {
    throw new Error("IndexError");
  }
  let zeros = [];
  for (let i = 0; i < row; i++) {
    let tmp = [];
    for (let j = 0; j < col; j++) {
      tmp.push(0);
    }
    zeros.push(tmp);
  }

  return zeros;
}

// 初期地点を決めて、迷路を作るよう指示する
function makeMazeBase(mazeArray, inputRow, inputCol) {
  // mazeArray = all 壁
  // 初期地点
  mazeArray[1][1] = 1;

  makeMaze(mazeArray, 1, 1, inputRow, inputCol);

  return mazeArray;
}

// 迷路を作る
function makeMaze(mazeArray, ny, nx, inputRow, inputCol) {
  // 進む方向を決める
  let directionArray = [0, 1, 2, 3];

  // 要素の並び替え
  for (let i = directionArray.length - 1; 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1));

    let tmp = directionArray[i];
    directionArray[i] = directionArray[r];
    directionArray[r] = tmp;
  }

  //　進めるかどうか判定、進む
  for (const index of directionArray) {
    if (
      // 0,row以上は飛ばす
      ny + dy[index][1] < 1 ||
      ny + dy[index][1] >= inputRow
    ) {
      continue;
    } else if (
      // 0,col以上は飛ばす
      nx + dx[index][1] < 1 ||
      nx + dx[index][1] >= inputCol
    ) {
      continue;
    } else if (
      // ２つ先が通路の場合は飛ばす
      nx + dx[index][1] === inputRow - 1 ||
      ny + dy[index][1] === inputCol - 1 ||
      mazeArray[ny + dy[index][1]][nx + dx[index][1]] === 1
    ) {
      continue;
    }

    // ２マス分進む
    for (let j = 0; j < 2; j++) {
      mazeArray[ny + dy[index][j]][nx + dx[index][j]] = 1;
    }

    //掘った先のところに移動
    makeMaze(
      mazeArray,
      ny + dy[index][1],
      nx + dx[index][1],
      inputRow,
      inputCol
    );
  }

  return mazeArray;
}

// 迷路を出力
function printMaze(mazeArray, inputRow, inputCol) {
  // 既存の迷路を削除
  if (document.getElementsByTagName("table").length !== 0) {
    const previousTable = document.getElementById("maze");
    previousTable.remove();
  }

  const tdArray = [];

  for (let i = 0; i < inputRow; i++) {
    let tmp = [];
    for (let j = 0; j < inputCol; j++) {
      tmp.push(document.createElement("td"));
    }
    tdArray.push(tmp);
  }

  // deep copy
  const mazeArrayColor = mazeArray.map((list) => ({ ...list }));

  // 0を紺に、1を薄青に変換
  // 壁：紺、通路：薄青
  for (let i = 0; i < inputRow; i++) {
    for (let j = 0; j < inputCol; j++) {
      if (mazeArrayColor[i][j] === 0) {
        mazeArrayColor[i][j] = "#050505";
      } else {
        mazeArrayColor[i][j] = "#F0F0F0";
      }
    }
  }

  // tdの背景色を変更
  for (let i = 0; i < inputRow; i++) {
    for (let j = 0; j < inputCol; j++) {
      tdArray[i][j].style.backgroundColor = mazeArrayColor[i][j];
      tdArray[i][j].style.height = "15px";
      tdArray[i][j].style.width = "15px";
      tdArray[i][j].style.textAlign = "center";
      tdArray[i][j].style.fontSize = "12px";
    }
  }

  tdArray[1][1].innerText = "S";

  tdArray[inputRow - 2][inputCol - 2].innerText = "G";

  // tableを一番下に表示
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const trArray = [];

  for (let i = 0; i < inputRow; i++) {
    trArray.push(document.createElement("tr"));
  }

  document.body.appendChild(table);
  table.appendChild(tableBody);
  table.id = "maze";
  table.style.borderSpacing = "0";
  table.style.margin = "auto";

  for (let i = 0; i < inputRow; i++) {
    for (let j = 0; j < inputCol; j++) {
      trArray[i].appendChild(tdArray[i][j]);
    }
    tableBody.appendChild(trArray[i]);
  }
}

// 「迷路生成」が押された時
function clicked() {
  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  // mazeに0で埋めたrow行col列の配列を作る
  const maze = zeros(inputRow, inputCol);

  // 迷路を生成
  makeMazeBase(maze, inputRow, inputCol);

  // 迷路を出力
  printMaze(maze, inputRow, inputCol);
}

// 「↑」が押された時
function up() {
  // 初期地点　1,1

  // i-1, j
  console.log("up");
}

// 「↓」が押された時
function down() {
  // i+1, j
  console.log("down");
}

// 「→」が押された時
function right() {
  // i, j+1
  console.log("right");
}

// 「←」が押された時
function left() {
  // i, j-1
  console.log("left");
}

let mazeMake = document.getElementById("generateMaze");

const dx = [
  [1, 2],
  [-1, -2],
  [0, 0],
  [0, 0],
]; //x軸のベクトル
const dy = [
  [0, 0],
  [0, 0],
  [1, 2],
  [-1, -2],
]; //y軸のベクトル

mazeMake.addEventListener("click", clicked);

let upKey = document.getElementById("up");
let downKey = document.getElementById("down");
let rightKey = document.getElementById("right");
let leftKey = document.getElementById("left");

// 上移動
upKey.addEventListener("click", up);

// 下移動
downKey.addEventListener("click", down);

// 右移動
rightKey.addEventListener("click", right);

// 左移動
leftKey.addEventListener("click", left);
