$(function() {
    // 判断标志位token是否存在
    var mytoken = localStorage.getItem('mytoken')
    if (!mytoken) {
        // 如果token不存在，跳转到登录页
        location.href = './login.html'
    }

    // 首页加载时，需要调用后台接口，获取用户信息
    function loadInfo () {
        $.ajax({
            type: 'get',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            headers: {
                // my开头的请求都需要携带请求头，作用：权限验证
                Authorization: localStorage.getItem('mytoken')
            },
            success: function(res) {
                if (res.status === 0) {
                // 获取用户信息                
                    var info = res.data
                    

                    // 把用户信息渲染到页面
                    $('#welcome-username').html(info.username)
                    $('#nav-username').html(info.username)

                    // 填充头像信息
                    if (info.user_pic) {
                        // 存在头像数据，就显示一张图片
                        // 将之前的默认的div盒子删除
                        $('#welcome-username').parent().prev('div').remove()
                        // 再添加一张图片
                        $('#welcome-username').parent().prepend('<img src="'+info.user_pic+'"></img>')
                    } else{
                        // 头像不存在，显示div盒子
                    }

                }

            }
        })
    }
    loadInfo()

    // 绑定退出按钮的事件
    $('#logout-btn').click(function() {
        layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
        //实现退出功能，清除localstorage里面的token数据跳转到登录页面
        localStorage.removeItem('mytoken')
        // 关闭弹框
        layer.close(index)
        // 跳转到登录页
        location.href = './login.html'
     
    })
     });




})