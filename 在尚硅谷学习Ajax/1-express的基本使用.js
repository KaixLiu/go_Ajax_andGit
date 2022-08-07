//引入express
const express=require('express');

//创建应用对象
const app=express();

//创建路由规则
//repress 是对请求报文的封装
//response 是对响应报文的封装
app.get('/',(request,response)=>{
    //设置响应
    response.send('hello');
});

//监听端口
app.listen(8000,()=>{
    console.log("服务器已启动，8000端口监听中");
})