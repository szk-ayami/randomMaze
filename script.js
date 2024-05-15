"use strict";

// 1行目に記載している 'use strict' は削除しないでください

function zeros(mazeArray) {
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  if (inputRow < 1 || inputCol < 1) {
    throw new Error("IndexError");
  }
  for (let i = 0; i < inputRow; i++) {
    let tmp = [];
    for (let j = 0; j < inputCol; j++) {
      tmp.push(0);
    }
    mazeArray.push(tmp);
  }
}

// 初期地点を決めて、迷路を作るよう指示する
function makeMazeBase(mazeArray, inputRow, inputCol) {
  // mazeArray = all 壁
  // 初期地点
  // let initialPointYRandom = 0;
  // let initialPointXRandom = 0;

  // while (initialPointYRandom % 2 === 0 || initialPointXRandom % 2 === 0) {
  //   initialPointYRandom = Math.floor(Math.random() * inputRow);
  //   initialPointXRandom = Math.floor(Math.random() * inputCol);
  // }
  // console.log(initialPointYRandom, initialPointXRandom);

  // initialPointY.push(initialPointYRandom);
  // initialPointX.push(initialPointXRandom);

  initialPointY.pop();
  initialPointX.pop();

  initialPointY.push(inputRow - 2);
  initialPointX.push(inputCol - 2);

  mazeArray[initialPointY[0]][initialPointX[0]] = 1;

  makeMaze(mazeArray, initialPointY[0], initialPointX[0], inputRow, inputCol);

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
  const mazeArrayColor = mazeArray.map((list) => [...list]);

  // 0を紺に、1を薄青に変換
  // 壁：紺、通路：薄青、現在地：赤
  for (let i = 0; i < inputRow; i++) {
    for (let j = 0; j < inputCol; j++) {
      if (mazeArrayColor[i][j] === 0) {
        mazeArrayColor[i][j] = "#050505";
      } else if (mazeArrayColor[i][j] === 1) {
        mazeArrayColor[i][j] = "#F0F0F0";
      } else if (mazeArrayColor[i][j] === 2) {
        mazeArrayColor[i][j] = "#DC143C";
      }
    }
  }

  // tdの背景色を変更
  for (let i = 0; i < inputRow; i++) {
    for (let j = 0; j < inputCol; j++) {
      tdArray[i][j].style.backgroundColor = mazeArrayColor[i][j];
      tdArray[i][j].style.height = "17px";
      tdArray[i][j].style.width = "17px";
      tdArray[i][j].style.textAlign = "center";
      tdArray[i][j].style.fontSize = "11px";
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

  // 現在地点のindexを取得
  let currentIndexY = 0;
  let currentIndexX = 0;

  for (let i = 0; i < inputRow; i++) {
    if (mazeArray[i].indexOf(2) !== -1) {
      currentIndexY = i;
      currentIndexX = mazeArray[i].indexOf(2);
    }
  }

  // ゴール
  if (currentIndexY === inputRow - 2 && currentIndexX === inputCol - 2) {
    clearedMaze();
  }
}

// 「迷路生成」が押された時
function clicked() {
  // clearMessageを消す
  if (document.getElementById("message") !== null) {
    const message = document.getElementById("message");
    message.remove();
  }

  // ボタンを無効化
  const button = document.getElementById("generateMaze");
  button.disabled = true;

  // timerをスタートさせる
  timerStart();

  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  const inputRow = Number(row.value);
  const inputCol = Number(col.value);

  // 行列入力の無効化
  row.disabled = true;
  col.disabled = true;

  // mazeに0で埋めたrow行col列の配列を作る
  if (maze.length !== 0) {
    maze.splice(0);
  }
  zeros(maze);

  // 迷路を生成
  makeMazeBase(maze, inputRow, inputCol);

  // 初期地点を設定
  maze[1][1] = 2;

  // 迷路を出力
  printMaze(maze, inputRow, inputCol);
}

// クリアを表示
function clearedMaze() {
  // ボタンを有効化
  const button = document.getElementById("generateMaze");
  button.disabled = false;

  // 行列の数を取得する
  const row = document.getElementById("inputRow");
  const col = document.getElementById("inputCol");

  // 行列入力の無効化
  row.disabled = false;
  col.disabled = false;

  // clearMessageを消す
  if (document.getElementById("message") !== null) {
    const message = document.getElementById("message");
    message.remove();
  }

  // 文字を出力
  const clearedMassage = document.createElement("p");
  clearedMassage.id = "message";
  clearedMassage.innerHTML = `Congratulations!<br>Maze clear!`;
  clearedMassage.style.textAlign = "center";
  clearedMassage.style.fontSize = "10vh";
  clearedMassage.style.margin = "0";
  document.body.appendChild(clearedMassage);

  // timer止める
  window.onload = timerStop();

  // 迷路を消す
  const previousTable = document.getElementById("maze");
  previousTable.remove();
}

const initialPointY = [];
const initialPointX = [];

//x軸のベクトル
const dx = [
  [1, 2],
  [-1, -2],
  [0, 0],
  [0, 0],
];
//y軸のベクトル
const dy = [
  [0, 0],
  [0, 0],
  [1, 2],
  [-1, -2],
];

const maze = [];
let mazeMake = document.getElementById("generateMaze");
mazeMake.addEventListener("click", clicked);
