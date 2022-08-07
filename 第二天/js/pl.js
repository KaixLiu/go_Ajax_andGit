function getComment() {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        data: {},//不需要传输数据就空
        success: function (res) {
            if (res.status !== 200) return alert('失败');
            //获取成功
            var rows = [];
            $.each(res.data, function (i, item) {
                var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间:' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>';
                rows.push(str);
            })
            $('#cmt-list').empty().append(rows.join(''));
        }
    });
}

getComment();

$(function(){
    $('#formAdd').submit(function(e){
        e.preventDefault();
        var data=$(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,function(res){
            if(res.status!==201) {return alert("失败");}
            getComment();
            //转成DOM元素
            $('#formAdd')[0].reset();
        })
    })
})
