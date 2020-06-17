$(function() {
    // 判断标志位token是否存在
    var mytoken = localStorage.getItem('mytoken')
    if (!mytoken) {
        // 如果token不存在，跳转到登录页
        location.href = './login.html'
    }




})