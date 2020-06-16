$(function() {

    // 控制表单提交
    $('.layui-form').submit(function(e) {
        // 阻止默认提交
        e.preventDefault()

        // 得到表单输入域的用户名和密码
        var formData = $(this).serialize()
        
        // 调用后台接口，验证是否正确
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: formData,
            success: function(res) {
                // 登陆成功后，跳转到主页面
                if (res.status === 0) {
                location.href = './index.html'
                }
            }
        })
    })




})