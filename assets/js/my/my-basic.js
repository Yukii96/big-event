$(function() {
    // 获取layui的form对象
    var form = layui.form

    // 1. 调用接口，加载用户信息
    function loadUserInfo () {
        $.ajax({
            type: 'get',
            url: 'my/userinfo',
            success: function(res) {
                // 1.1 基于jQuery把数据填充到表单中
                // $('.layui-form input[name=username').val(res.data.username)
                // $('.layui-form input[name=nicknamne').val(res.data.nickname)
                // $('.layui-form input[name=email').val(res.data.email)

                // 1.2 基于layui的form对象填写表单，第一个参数是页面结构中表单的lay-filter="basicForm" 属性值
                form.val('basicForm',res.data)

            }
        })
    }
    loadUserInfo()

    // 2. 给表单绑定提交事件，调用接口，将数据提交到服务器
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        var formData = $(this).serialize()
        $.ajax({
            type: 'post',
            url: 'my/userinfo',
            data: formData,
            success: function(res) {
                loadUserInfo()
            }
        })
    })
})