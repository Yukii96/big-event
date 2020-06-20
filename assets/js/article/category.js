$(function() {
    
    // 1. 加载数据分类数据
    function loadListData () {
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            success: function(res) {
                // 2. 基于模板引擎做渲染
                var result = template('list-tpl',res)
                $('.layui-table tbody').html(result)
            }
        })
    }
    loadListData()

})