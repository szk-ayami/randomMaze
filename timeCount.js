"use strict";

function timerStart() {
  startTime = Date.now();
  timerId = setInterval(goTimer, 10);
  console.log(startTime);
  console.log(timerId);
}

function timerStop() {
  clearInterval(timerId);
  const sec = timerResult[0];
  const min = timerResult[1];
  clearTime.innerHTML = `${min}:${sec}`;
}

//1桁のときに10の位に文字列の"0"を足す関数
function addZero(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function arrangeTime() {
  let sec = Math.floor((elTime % 60000) / 1000);
  //商の余りを使うことで60を超えたら自動的に0になる
  let min = Math.floor((elTime % 3600000) / 60000);
  let hour = Math.floor(elTime / 3600000);

  sec = addZero(sec);
  timerResult.push(sec);
  //上で作ったadd_zeroのvalueにsecを入れたものをsecに入れた
  min = addZero(min);
  timerResult.push(min);

  timerCount.innerHTML = `${min}:${sec}`;
  //html内にあるdef_timerを書き換える
}

// mazeMake.addEventListener("click", timerStart);
const timerResult = [];
let timerCount = document.getElementById("timer");
let clearTime = document.getElementById("clearTime");
let startTime;
let elTime;
let timerId;

let goTimer = () => {
  let timeNow = Date.now();
  elTime = timeNow - startTime;
  arrangeTime();
};
