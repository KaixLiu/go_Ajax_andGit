function resolveData(data) {
    var arr = [];
    for (let k in data) {
        arr.push(k + '=' + data[k]);
    }
    return arr.join('&');
}



function itheima(options) {
    var xhr = new XMLHttpRequest();


    var qs = resolveData(options.data);

    if(options.method.toUpperCase()==='GET'){
        //说明他发送的是GET 请求
        xhr.open(options.method,options.url+'?'+qs);
        xhr.send();
    }
    else if(options.method.toUpperCase()==='POST'){
        //说明他发送的是POST 请求
        xhr.open(options.method,options.url);
        xhr.send(qs);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}