$(function() {
    // 2. 处理表单验证
    // 需求：新密码与原密码不能一样，新密码必须与确认密码一致
    var form = layui.form
    form.verify({
        // 2.1 新密码与原密码不能一样
        diff: function(value) {
            // 2.1.1 获取原密码
            var oldPwd = $('.layui-form input[name=oldPwd]').val()
            // 2.1.2 判断新旧密码是否一样
            if (value === oldPwd) {
                return '新密码不能和原密码相同'
            }
        },

        // 2.2 新密码必须与确认密码一致
        same: function(value) {
            // 获取新密码
            var newPwd = $('.layui-form input[name=newPwd]').val()
            if (value !== newPwd) {
                return '两次输入的密码不相同'
            }
        }
    })

    // 1. 控制表单提交
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        // 1.1 获取表单数据
        var fd = $(this).serialize()

        // 1.2 调用接口修改密码
        $.ajax({
            type: 'post',
            url: 'my/updatepwd',
            data: fd,
            success: function(res) {
               
                if (res.status === 0) {
                     // 更新成功后，提示修改成功
                    layer.msg(res.message)
                } else {
                    // 否则，提示原密码输入错误
                    layer.msg(res.message)
                }
            }
        })
    })
})