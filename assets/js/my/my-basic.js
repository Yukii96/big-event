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
                // $('.layui-form input[name=id').val(res.data.id)
                // $('.layui-form input[name=username').val(res.data.username)
                // $('.layui-form input[name=nicknamne').val(res.data.nickname)
                // $('.layui-form input[name=email').val(res.data.email)

                // 1.2 基于layui的form对象填写表单，第一个参数是页面结构中表单的lay-filter="basicForm" 属性值
                form.val('basicForm',res.data)

            }
        })
    }
    loadUserInfo()

    // 2. 控制表单的提交
    // 2.1 给表单绑定提交事件
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        // 2.2 获取需要的表单元素
            // 我们的用户名是不允许修改的，所以不能对username进行修改，需要在提交数据时，删除username
            // 并且服务器返回的用户信息有一个id值，是后端自动生成的，所以还需要把id值存到隐藏域中
            // var formData = $(this).serialize()   //得到的是一个字符串，分割字符串太麻烦
        var formData = $(this).serializeArray()   //得到的输入域的信息是一个数组
            // 从数组中删除一个元素：方法一：先找到元素的索引，然后根据索引删除；方法二：使用filter方法，遍历数组，并筛选符合条件的元素
        formData = formData.filter(function(item) {
            // 属性名不是username的被过滤出来
            return item.name !== 'username'
        })
        // 2.3 调用接口，将修改数据提交到服务器
        $.ajax({
            type: 'post',
            url: 'my/userinfo',
            data: formData,
            success: function(res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
})