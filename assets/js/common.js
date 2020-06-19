// 通用的接口调用设置
var baseURL = 'http://ajax.frontend.itheima.net/'
$.ajaxPrefilter(function(option) {
    // option形参是jQuery请求方法的配置信息
    // 1. 配置通用的url地址
    option.url = baseURL + option.url
    // 2. 设置接口的请求头
    if (option.url.lastIndexOf('/my/') !== -1) {
        // 判断路径中是否包含/my/，若包含，需要进行权限验证（需要先登录）
    option.headers = { Authorization: localStorage.getItem('mytoken')}
    // 3. 处理通用的异常情况（服务器返回来的有异常信息）
    option.complete = function(res) {
        // 服务器响应结束时触发，相当于success
        // 处理失败的情况
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 如果身份验证失败了，把无效的token清除，就跳转到登录页
            localStorage.removeItem('mytoken')
            location.href = './login.html'
        }
    }

    }    
})