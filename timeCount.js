"use strict";

// タイマースタート
function timerStart() {
  startTime = Date.now();
  timerId = setInterval(goTimer, 10);
  timerList.push(timerId);
  // console.log(`startID : ${timerId}`);
}

// タイマーストップ;
function timerStop() {
  // console.log("stop");

  const clearTime = document.getElementById("timer");
  clearTime.style.fontSize = "3vh";

  const mmsec = timerResult[0];
  const sec = timerResult[1];
  const min = timerResult[2];

  clearTime.innerHTML = `Clear Time <br> ${min}:${sec}:${mmsec}`;
  document.body.appendChild(clearTime);

  // console.log(`stopID : ${timerId}`);

  clearInterval(timerList.shift());
}

//1桁のときに10の位に文字列の"0"を足す関数
function addZero(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function arrangeTime() {
  let mmsec = Math.floor((elTime % 1000) / 10);
  let sec = Math.floor((elTime % 60000) / 1000);
  //商の余りを使うことで60を超えたら自動的に0になる
  let min = Math.floor((elTime % 3600000) / 60000);

  timerResult.splice(0);

  mmsec = addZero(mmsec);
  timerResult.push(mmsec);

  sec = addZero(sec);
  timerResult.push(sec);
  //上で作ったaddZeroのvalueにsecを入れたものをsecに入れた
  min = addZero(min);
  timerResult.push(min);

  timer.innerHTML = `${min}:${sec}:${mmsec}`;
  // console.log(timerResult);
  //html内にあるtimerを書き換える
}

let goTimer = () => {
  let timeNow = Date.now();
  elTime = timeNow - startTime;
  arrangeTime();
};

// mazeMake.addEventListener("click", timerStart);
const timerResult = [];
let timer = document.getElementById("timer");
let clearTime;
let startTime;
let elTime;
let timerId;
const timerList = [];
