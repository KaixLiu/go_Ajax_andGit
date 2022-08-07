$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    //给发送按钮添加点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();//把文本框的内容赋值给text并且取消文本两侧空格
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        //给聊天框添加li 
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
        $('#ipt').val('');//发送过后清空文本框
        resetui();//使每次发送后重新定义聊天框的右侧滚动条
        //调用机器人
        getMsg(text);
    });

    //获取机器人的语言
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            //请求成功时，返回回调函数
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text;//存放文本内容
                    //添加到li 后面
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>');
                    resetui();
                    //调用语音功能
                    getVoice(msg);
                }
            }
        })
    };

    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    //让语音标签的src 改为服务器内的地址
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        })
    };
    //给文本框添加键盘事件
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode === 13) {//当键盘弹起时判断是不是回车键
            $('#btnSend').click();//调用发送按钮的点击事件
        }
    })



})

/*
                            _oo0oo_
                           o8888888o
                           88" . "88
                           (/ -_- /)
                            0\ = /0
                        ____/'---'\____
                        .  ' \\/ |// ' 
                       / \\/// : |||//- \
                     / _||||| -:- |||||- \
                       / / \\\ - /// / /
                     / \_/ ''\---/'' / /
                      \ .-\__ '-' ___/-. /
                   ___'. .' /--.--\ '. . __
                 ."" '< '.___\_</>_/___/' >'"".
               / / : /- \'.;'\_ /';.'/ - ' : / /
                \ \ '-. \_ __\ /__ _/ .-' / /
    ========'-.____ '-.___ \_____/ ___.-'____.-'=========
                           '=---='

                佛祖保佑            永无BUG


*/