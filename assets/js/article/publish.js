$(function () {
    // 导入表单对象
    var form = layui.form
    // 初始化下拉选框
    // form.render('select')

    // 1. 绑定表单提交事件
    // $('#add-form').submit(function(e) {
    //     e.preventDefault()
    //     // 1.1 获取表单数据
    //         // 因为涉及到文件上传，所以必须要用FormData才能上传文件
    //     var fd = new FormData(this)

    //     // 1.2 提交表单数据
    //     $.ajax({
    //         type: 'post',
    //         url: 'my/article/add',
    //         data: fd,
    //         // 防止把请求参数转换成字符串
    //         processData: false,
    //         // 禁止使用默认的提交参数类型 x/www-...的那种
    //         contentType: false,
    //         success: function(res) {
    //             if (res.status === 0) {
    //                 layer.msg(res.message)
    //             }
    //         }

    //     })
    // })

    // 2. 动态获取文章分类数据
    function loadListData() {
        // 2.1 调用接口，获取分类
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            success: function (res) {
                if (res.status === 0) {
                    // 2.2 基于模板引擎渲染列表数据
                    var tags = template('list-tpl', res)
                    $('#cate-list').html(tags)
                    // 2.3 更新渲染select前必须先用template先渲染完再用form对象更新
                    // 因为option表单元素是通过模板引擎动态添加的，所以只用template渲染是不行的，就需要更新一下
                    // form.render('参数1','参数2')
                    // 参数1：需要更新的表单元素的type类型，如select、checkbox、radio
                    // 参数2：需要更新的表单的lay-filter属性的值
                    form.render('select')
                }
            }
        })
    }
    loadListData()

    // 3. 初始化富文本编辑器
    initEditor()
    // 下面这种方法也可以
    // tinymce.init({
    //     selector: '.layui-textarea'
    // })

    // 4. 裁剪封面
    // 4.1 选中预览的图片
    var $img = $('#image')
    // 4.2 设置配置项
    var options = {
        // 长宽比
        aspectRatio: 400 / 280,
        // 预览区
        preview: '.img-preview'
    }
    // 4.3 初始化裁剪区
    $img.cropper(options)

    // 4.4 给选择封面绑定点击事件
    $('#select-btn').click(function () {
        // 当点击上传封面时，自动触发file标签
        $('#cover-img').trigger('click')
    })

    // 4.5 更新裁剪区图片
    // 4.5.1 当file标签里的内容改变时触发
    $('#cover-img').change(function (e) {
        // 4.5.2 得到选中的文件内容
        var file = e.target.files[0]
        // 4.5.3 基于选中的文件创建一个临时预览地址
        var imgURL = URL.createObjectURL(file)
        // 4.5.4 更新预览区图片地址
        $img.cropper('destroy')
            .attr('src', imgURL)
            .cropper(options)

        // base64格式的地址优点：减少了http请求，可以加快解析图片的速度；缺点：体积比正常图片大30%左右
        // 所以小图片可以使用base64，大图片不建议使用

    })
    // 4.5.5 处理提交按钮的点击行为
    var state = ''
    $('').click(function(e) {
        e.preventDefault()
        // 4.6.1 获取当前选择的按钮类型
        var type = $(e.target).data('type')
        // 4.6.2 判断按钮类型
        if (type === 'publish') {
            // 如果发布文章
            state = '已发布'

        } else if (type === 'temp') {
            // 如果存为草稿
            state = '草稿'
        }

    })

    // 4.6 通过事件委托，给发布和存草稿按钮添加点击事件
    $('#add-form').on('submit', function (e) {
        e.preventDefault()
        
        // 4.6.3 生成文章封面图片
        // 将新的裁剪区的图片转换为普通的图片格式
        $img.cropper('getCroppedCanvas', {
            width: 400,
            height: 200
        }).toBlob(function (blob) {
            // 将Canvas画布中的图片转化为文件对象（正常的图片格式），用于上传

            // 4.7 获取表单中的所有数据（因为涉及文件上传，所以要用FormData）
            // 因为FormData方法是元素js方法，所以要将form表单对象转换为DOM元素
            var form = $('#add-form').get(0)
            // 获取表单中的数据
            var fd = new FormData(form)
            // 追加数据
            fd.append('state', state)
            fd.append('cover_img', blob)


            // 4.8 调用接口，提交表单

            $.ajax({
                type: 'post',
                url: 'my/article/add',
                data: fd,
                // 防止把请求参数转换成字符串
                processData: false,
                // 禁止使用默认的提交参数类型 x/www-...的那种
                contentType: false,
                success: function (res) {
                    if (res.status === 0) {
                        layer.msg(res.message)
                    }
                }

            })

        })
    })


})