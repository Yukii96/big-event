$(function() {
    // LAYUI是全局对象，通过它可以得到form对象
    var form = layui.form
    // 基于layui自定义表单规则
    form.verify({
        // 用户名：6-8位字符。\S不包括空格
        // 语法规范：  自定义规则名：[正则，不符合时的提示信息]
        uname: [/^[\S]{6,8}$/,'用户名必须是6-8位字符'],

        pwd: function(val,item) {   //value:对应输入域的值  item：对应的DOM元素
            // 要求密码必须是6位数字
            var reg = /^[\d]{6}$/
            // 判断，如果正则规则不匹配，就返回提示
            if (!reg.test(val)) {
                return '密码必须是6位数字'
            }


        }
    })

    // 控制表单提交
    $('.layui-form').submit(function(e) {
        // 阻止默认提交
        e.preventDefault()

        // 获取表单输入域的用户名和密码
        var formData = $(this).serialize()

        // 如果纯手工实现表单验证，可以实现，但是比较繁琐，所以可以借助Layui的表单验证
        
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