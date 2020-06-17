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

    // 控制登录表单提交
    $('#loginForm').submit(function(e) {
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
                    // 把登陆成功的标志位存储到客户端
                    localStorage.setItem('mytoken',res.token)

                    // 跳转到主页面
                        // location是浏览器的内置对象--BOM,存储的是关于地址的有关的信息
                    location.href = './index.html'

                }
            }
        })
    })

    // 登录表单底部链接“去注册”
    $('#loginForm a').click(function() {
        // 点击后，显示注册页面，隐藏登录页面
        $('#loginForm').hide()
        $('#registerForm').show()
    })

    // 注册表单底部链接“去登录”
    $('#registerForm a').click(function() {
        // 点击后，隐藏注册页面，显示登录页面
        $('#loginForm').show()
        $('#registerForm').hide()
    })




})