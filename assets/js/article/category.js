$(function () {
    // 获取表单对象
    var form = layui.form

    // 1. 加载数据分类数据
    function loadListData() {
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            success: function (res) {
                // 2. 基于模板引擎做渲染
                var result = template('list-tpl', res)
                $('.layui-table tbody').html(result)
            }
        })
    }
    loadListData()

    // 2. 添加分类--通过弹出层方式实现
    // 2.3 弹出层的唯一标识，在删除的时候，通过索引值去查找对应的
    var addIndex = null
    // 2.1 绑定点击事件
    $('#addCategory').click(function (e) {

        // 2.2 实现弹层效果
        addIndex = layer.open({
            type: 1,
            title: '添加分类',
            // 弹窗内容：在主页中再次添加模板
            content: $('#tpl-add').html(),
            area: ['500px', '250px']
        })

        // 2.4 监听添加分类的表单提交事件（方法一）
        $('#add-form').submit(function (e) {
            e.preventDefault()

            var fd = $(this).serialize()

            $.ajax({
                type: 'post',
                url: 'my/article/addcates',
                data: fd,
                success: function (res) {
                    if (res.status === 0) {
                        // 添加分类成功：提示并关闭弹窗，刷新列表
                        layer.msg(res.message)
                        layer.close(addIndex)
                        loadListData()
                    }
                }
            })

        })
    })


    // // 2.4 监听添加分类的表单提交事件（方法二）
    // $('body').on('submit', '#add-form', function (e) {
    //     e.preventDefault()
    //     var fd = $(this).serialize()

    //     $.ajax({
    //         type: 'post',
    //         url: 'my/article/addcates',
    //         data: fd,
    //         success: function (res) {
    //             if (res.status === 0) {
    //                 // 添加分类成功：提示并关闭弹窗，刷新列表
    //                 layer.msg(res.message)
    //                 layer.close(addIndex)
    //                 loadListData()
    //             }
    //         }
    //     })
    // })

     // 4.5 监听编辑分类的表单提交事件
     $('body').on('submit', '#edit-form', function (e) {
        e.preventDefault()
        var fd = $(this).serialize()

        $.ajax({
            type: 'post',
            url: 'my/article/updatecate',
            data: fd,
            success: function (res) {
                if (res.status === 0) {
                    // 编辑分类成功：提示并关闭弹窗，刷新列表
                    layer.msg(res.message)
                    layer.close(editIndex)
                    loadListData()
                }
            }
        })
    })

    // 3. 删除分类
    // 3.1 监听删除按钮事件
    $('body').on('click','.del',function(e) {
        // 3.2 得到要删除的分类的id
        // var id = e.target.dataset.id
        // var id = $(e.target).dataset.id
        var id = $(this).data('id')

        // 3.3 根据id删除分类
        $.ajax({
            type: 'get',
            url: 'my/article/deletecate/' + id,
            data: {
                id: id
            },
            success: function(res) {
                // 判断是否删除成功
                if (res.status === 0) {
                    // 删除分类成功，提示信息，刷新列表
                    layer.msg(res.message)
                    loadListData()
                }
            }
        })
    })

    // 4. 编辑分类
    // 4.4.1 编辑弹出的唯一标识
    var editIndex = null
    // 4.1 监听编辑按钮事件
    $('body').on('click','.edit',function(e) {
        // 4.2 得到需要编辑的id
        var id = $(this).data('id')

        // 4.3 根据id查询详细数据
        $.ajax({
            type: 'get',
            url: 'my/article/cates/'+ id,
            data: {
                id: id
            },
            success: function(res) {
                // 4.4 获取成功，填充到弹窗中
                // 4.4.2 添加一个新的弹窗
                editIndex = layer.open({
                    type: 1,
                    title: '编辑分类',
                    content: $('#edit-tpl').html(),
                    area: ['500px','250px']
                })
                // 4.4.3 将数据填到弹窗中
                form.val('editForm',res.data)
            }
        })
    })

   



})