var btnStart = document.getElementById('btnStart');
var es;

btnStart.addEventListener('click',function(e){
    e.preventDefault();
    screenLock();

    funcSubmit();
});

//
async function funcSubmit(){
    try{
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let txtInput = document.querySelector('#textName');

        let frmData = new FormData();
        frmData.append('textName',txtInput.value);
        let res = await fetch('/',{
            method : 'post',
            headers: {
                'X-CSRF-TOKEN': token,
            },
            body : frmData,
        });
        requestid = ( await res.text()).toString();
        console.log(requestid);
        receiveMessage(requestid);
    }
    catch(error){
        screenUnLock();
        console.log("error:");
    }
}

/*
/////////////////
var xhr = new XMLHttpRequest();
 function funcSubmit(){
    xhr.open( 'post', '/',true);
    xhr.responseType="text";
    xhr.timeout = 1000 * 60 * 30 ;
    var frmData = new FormData(document.getElementById("frmInput"));
    xhr.send(frmData);
}
xhr.addEventListener('readystatechange', function(e) {
    e.preventDefault();

    if(xhr.readyState === 4 && xhr.status === 200) {
        //screenUnLock();

        //fileUrl = window.URL.createObjectURL(xhr.response)
        //window.open(fileUrl,"_self");
        console.log('サーバからのrequestid:' + xhr.responseText);
        //ここに来るまでは、固定でメッセージを出しておく。
        receiveMessage(xhr.responseText);  //return requestid
    }else {
        console.log("通信中…[" + xhr.readyState + "] [" + xhr.status + "]");
    }

    //console.log("システム管理者に連絡してください(readystatechange)");
});
xhr.onerror = function() {
    //screenUnLock();
    console.log("Eerror!");
}
*/

//
var txtServerMessage = document.getElementById('txtServerMessage');
async function receiveMessage(requestid){
    console.log("receiveMessage [" + requestid + "]");
    var eventURL = '/sse?requestid=' + requestid;
    es = new EventSource(eventURL);
    es.addEventListener('message', e => {
        const { time, word } = JSON.parse(e.data);
        console.log('サーバからの受信 ' + `${time} ${word}`);
        //sample.appendChild(document.createElement('li')).textContent  = 'サーバからの受信 ' + `${time} ${word}`;
        txtServerMessage.value = "サーバからの受信 " + `${time} ${word}` + " requestid:" + requestid;
    });
    es.addEventListener('error',e =>{
        screenUnLock();
        console.log('サーバからエラー 。正常終了もここを通る。');
        es.close();
    })
}

/**
 * ScreenLook
 */
 function screenLock(){
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
function screenUnLock(){
    var divSpinner = document.getElementById("spinner");
    divSpinner.classList.toggle("hidden");

    var sl = document.getElementById("screenlock");
    sl.parentNode.removeChild(sl);
}
