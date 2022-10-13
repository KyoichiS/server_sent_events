/** 
document.addEventListener('DOMContentLoaded', e => {
    var es = new EventSource('./sse');
    es.addEventListener('message', e => {
        const { time, word } = JSON.parse(e.data);
        console.log('サーバからの受信待ち' + `${time} ${word}`);
        //sample.appendChild(document.createElement('li')).textContent  = `${time} ${word}`;
    });
});
*/
var btnStart = document.getElementById('btnStart');
var es;

btnStart.addEventListener('click',function(){
    funcSubmit();
    /*
        .then(result => console.log(result))
        .catch((error) => {
            console.log(error);
        });
    */
});

//
async  function funcSubmit(){
    //https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
    console.log('submit!');
    //const $formData = document.querySelector('#frmInput');
    
    const response = await fetch('http://192.168.2.114:8000/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //'Content-Type': 'multipart/form-data'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: $formData,
    }).then( (response) => {
        if(!response.ok) {
            console.log('error!');
        } 
        console.log('ok!');
        return response.text();
    }).catch((response) => {
        console.log(response);
    });
     
    return response;
}

//
 function receiveMessage(){
    es = new EventSource('./sse');
    es.addEventListener('message', e => {
        const { time, word } = JSON.parse(e.data);
        console.log('サーバからの受信待ち' + `${time} ${word}`);
        //sample.appendChild(document.createElement('li')).textContent  = `${time} ${word}`;
    });
    es.addEventListener('error',e =>{
        console.log('サーバからエラー 。正常終了もここを通る。');
    })
}
