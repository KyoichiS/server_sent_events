/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/sse2.js ***!
  \******************************/
var btnStart = document.getElementById('btnStart');
var es;
btnStart.addEventListener('click', function (e) {
  e.preventDefault();
  //screenLock();
  funcSubmit();
});

//
var xhr = new XMLHttpRequest();
function funcSubmit() {
  xhr.open('post', 'http://192.168.2.114:8000/', true);
  xhr.responseType = "text";
  xhr.timeout = 1000 * 60 * 30;
  var frmData = new FormData(document.getElementById("frmInput"));
  xhr.send(frmData);
}
xhr.addEventListener('readystatechange', function (e) {
  e.preventDefault();
  if (xhr.readyState === 4 && xhr.status === 200) {
    //screenUnLock();

    //fileUrl = window.URL.createObjectURL(xhr.response)
    //window.open(fileUrl,"_self");
    console.log(xhr.status);
    //ここに来るまでは、固定でメッセージを出しておく。
    receiveMessage();
  } else {
    console.log("通信中…[" + xhr.readyState + "] [" + xhr.status + "]");
  }

  //console.log("システム管理者に連絡してください(readystatechange)");
});

xhr.onerror = function () {
  //screenUnLock();
  console.log("Eerror!");
};

//
var txtServerMessage = document.getElementById('txtServerMessage');
function receiveMessage() {
  es = new EventSource('/sse');
  es.addEventListener('message', function (e) {
    var _JSON$parse = JSON.parse(e.data),
      time = _JSON$parse.time,
      word = _JSON$parse.word;
    console.log('サーバからの受信 ' + "".concat(time, " ").concat(word));
    //sample.appendChild(document.createElement('li')).textContent  = 'サーバからの受信 ' + `${time} ${word}`;
    txtServerMessage.value = "サーバからの受信 " + "".concat(time, " ").concat(word);
  });
  es.addEventListener('error', function (e) {
    console.log('サーバからエラー 。正常終了もここを通る。');
    es.close();
  });
}

/**
 * ScreenLook
 */
function screenLock() {
  var sl = document.createElement("div");
  sl.id = "screenlock";
  sl.style.height = '100%';
  sl.style.left = '0px';
  sl.style.position = 'fixed';
  sl.style.top = '0px';
  sl.style.width = '100%';
  sl.style.zIndex = '9998';
  sl.style.backgroundColor = '#c0c0c0'; //darkgray
  sl.style.opacity = '50%';
  var objBody = document.querySelector("body");
  objBody.appendChild(sl);
  var divSpinner = document.getElementById("spinner");
  divSpinner.classList.toggle("hidden");
}

/**
* ScreenUnLook
*/
function screenUnLock() {
  var divSpinner = document.getElementById("spinner");
  divSpinner.classList.toggle("hidden");
  var sl = document.getElementById("screenlock");
  sl.parentNode.removeChild(sl);
}
/******/ })()
;