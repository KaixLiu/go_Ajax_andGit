$(function(){

    //1、定义延时器的ID
    var timer=null;

    //定义缓存对象
    var cache={};

    //2、定义防抖函数
    function debon(kw){
       timer= setTimeout(function(){
            getSug(kw);
        },500)
    }

    //给输入框添加键盘弹起事件
    $('.ipt').on('keyup',function(){
        //3、清空timer
        clearTimeout(timer);
        var keyword=$(this).val().trim();
        if(keyword.length<=0){//如果输入框的内容小于0
            return $('#sug').empty().hide();//把建议框清空并且隐藏
        };
        //先判断缓存是否有数据
        if(cache[keyword]){
            return getHtml(cache[keyword]);
        }
        //当他有内容时，调用查找建议函数
        // getSug(keyword);
        debon(keyword);//调用定时器
    })

    //查找用户输入的内容在服务器中查找建议值
    function getSug(kw){
        $.ajax({
            url:'https://suggest.taobao.com/sug?q='+kw,
            dataType:'jsonp',
            success:function(res){
                getHtml(res);//调用渲染页面
            }
        })
    }

    //渲染页面
    function getHtml(res){
        if(res.result.length<=0){//如果没有内容
            return $('#sug').empty().hide();//把建议框清空隐藏
        }
        //使用template 方法，需要渲染的元素为 script ，渲染的内容为 传入的内容
       var htmlStr= template('tpl',res);
       //使建议框显示
       $('#sug').html(htmlStr).show();
        //缓存结果
        var k=$('.ipt').val().trim();
        cache[k]=res;
    }
})