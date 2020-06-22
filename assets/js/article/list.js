$(function () {
    var form = layui.form

    // 因为后面有两个地方都用到了这两个变量，为了后期修改方便，所以把他们放到顶部存到变量里
    // 当前页码
    var pagenum = 1
    // 每页显示的条数
    var pagesize = 10

    // 3. 处理日期的格式化，要放到模板渲染之前
    // 3.4 补零函数
    function addZero (n) {
        return n < 10 ? '0' + n : n;
    }
        // 3.1 基于模板引擎的过滤器
    template.defaults.imports.formDate = function (data) {
        // 3.2 把参数date日期字符串转为日期对象
        var d = new Date(data)
        // 3.3 设置年月日时分秒
        var year = d.getFullYear();
        var month = addZero(d.getMonth() + 1);
        var day = addZero(d.getDate());
        var hour = addZero(d.getHours());
        var minutes =addZero( d.getMinutes());
        var seconds = addZero(d.getSeconds());
        // return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        return year + '-' + month + '-' + day;

    }


    // 1. 获取所有的文章分类数据
    function loadCateData () {
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            success: function(res) {
                if (res.status === 0) {
                    // 1.2 基于模板引擎渲染列表数据
                    var tags = template('cate-tpl',res)
                    $('#category').html(tags)
                    // 1.3 更新渲染select前必须先用template先渲染完再用form对象更新
                        // 因为option表单元素是通过模板引擎动态添加的，所以只用template渲染是不行的，就需要更新一下
                        // form.render('参数1','参数2')
                            // 参数1：需要更新的表单元素的type类型，如select、checkbox、radio
                            // 参数2：需要更新的表单的lay-filter属性的值
                    form.render('select')
                }
            }
        })
    }
    loadCateData()

    // 2. 获取表格列表数据
    function loadTableData (param) {
        $.ajax({
            type: 'get',
            url: 'my/article/list',
            data: param,
            success: function (res) {
                if (res.status === 0) {
                    var tags = template('table-tpl',res)                    
                    $('.layui-table tbody').html(tags)
                }
            }
        })
    }
    loadTableData({
        // 页码：从第1页开始查询
        pagenum: pagenum,
        // 每页显示多少条
        pagesize: pagesize
    })

    // 4. 筛选按钮功能
    $('#search-form').submit(function(e) {
        e.preventDefault()
        // 获取筛选条件的搜索参数
        var fd = $(this).serializeArray()
        // fd是数组，数组中每一项是对象，对象中有两个属性，name和value。0: {name: "cate_id", value: "1"} 1: {name: "state", value: "已发布"}
        
        // param在调用接口时需要4个参数，其中两个是在fd中保存，另外两个是在上面的param中就存在的，所以需要将筛选条件中的参数添加到param中
        var param = {
            // 页码：从第1页开始查询
            pagenum: pagenum,
            // 每页显示多少条
            pagesize: pagesize
        }
        // 把筛选条件参数添加到param对象中
        fd.forEach(function(item) {
            // 向param对象中动态添加属性。属性名是item.name的值，属性值是item.value
            param[item.name] = item.value
        })
        loadTableData(param)
    })

    // 5. 删除功能
    $('body').on('click','.del',function(e) {
        // 5.1 获取要删除的文章id
        var id = $(this).data('id')

        // 5.2 通过弹窗，询问是否要删除
        var index = layer.confirm('确认要删除吗？',function() {
            // 5.3 调用接口，通过id值删除文章
            $.ajax({
                type: 'get',
                url: 'my/article/delete/' + id,
                data: {
                    id: id
                },
                success: function(res) {
                    // 5.3.1 判断是否删除成功
                    if (res.status === 0) {
                        // 5.3.2 若删除成功，关闭弹窗
                        layer.close(index)
                        // 5.3.3 显示提示信息
                        layer.msg(res.message)
                        // 5.3.4 刷新文章列表
                        loadTableData({
                            // 页码：从第1页开始查询
                            pagenum: pagenum,
                            // 每页显示多少条
                            pagesize: pagesize
                        })

                        

                    }
                }
            })

        })

    })

})