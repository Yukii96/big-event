$(function() {
    
    // 1. 实现裁剪基本初始化效果
    // 获取img标签
    var $img = $('.cropper-box img')
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview',
        // autoCropArea：类型：Number，默认值0.8（图片的80%）。0-1之间的数值，定义自动剪裁区域的大小。
        autoCropArea: 0.6,
        // zoomable：类型：Boolean，默认值true。是否允许放大缩小图片。
        zoomable: false
    }
    $img.cropper(options)

    // 2. 绑定上传图片按钮的点击事件
    $('#upload').click(function() {
        // 点击上传按钮，触发file标签的点击行为
        $('#file').trigger('click')
    })

    // 3. 更换裁剪的图片
    $('#file').change(function(e) {
        // 3.1 为file标签添加change事件：表单输入域内容发生变化时触发
        // 选中文件后，触发该事件函数
        // e.target就是事件源--file标签
        // file标签有一个files方法，可以获取所有上传的文件
        // 3.2 获取上传的文件（图片）
        var file = e.target.files[0]

        // 3.3 获取文件信息后，要将文件显示到预览区
        // 3.3.1 将选取的文件创建一个新的url地址
            // URL.createObjectURL()方法：根据选中的文件生成一个预览URL地址
        var newImgURL = URL.createObjectURL(file)
        // 3.3.2 把地址更新到图片的src属性中
            // 因为裁剪区是依赖于图片的，图片改变，裁剪区也要改变
        $img.cropper('destroy')  //销毁旧的裁剪区域
        .attr('src',newImgURL)   //更新图片的路径
        .cropper(options)        //创建新的裁剪区
    })

    // 4. 调用接口，完成头像的修改
        // 点击确定按钮，得到当前选框中的图片，把该图片上传到服务器，成功后更新用户头像
        // 4.1 绑定事件
        $('#okbtn').click(function() {
            // 4.2 获取裁剪后的图片信息
            var imgURL = $img.cropper('getCroppedCanvas',{
                width: 100,
                height:100
            }).toDataURL('image/png')

            // 4.3 把上述图片上传到服务器
            $.ajax({
                type: 'post',
                url: 'my/update/avatar',
                data: {
                    avatar: imgURL
                },
                success: function(res) {
                    // 如果头像更新成功
                    if (res.status === 0) {
                        // 提示成功信息
                        layer.msg(res.message)

                        // 更新头像（重新获取用户信息，并加载到指定位置）
                        window.parent.$.loadInfo()   //获取当前窗口的父窗口，再调用父窗口中的方法

                    }
                }
            })


        })

})