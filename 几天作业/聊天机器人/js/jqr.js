$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()


    $('#btn').on('click', function () {
        var ipttxt = $('#ipt').val().trim();
        if (ipttxt.length <= 0) {
            return $('#ipt').val('');
        }

        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + ipttxt + '</span></li>');
        $('#ipt').val('');
        resetui();
        getjqr(ipttxt);
    })

    function getjqr(txt){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken:txt
            },
            success:function(res){
                if(res.message==='success'){
                    console.log(res);
                    var msg=res.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>');
                    resetui();
                    audio(msg);
                }
            }
        })
    }

    function audio(mp3){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:mp3
            },
            success:function(res){
                if(res.status===200){
                    $('#voice').attr('src',res.voiceUrl);
                }
            }
        })
    };
    $('#ipt').on('keyup',function(e){
        if(e.keyCode===13){
            $('#btn').click();
        }
    })
})