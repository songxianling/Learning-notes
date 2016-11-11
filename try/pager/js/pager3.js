define('common.widget.pager.js.pager3', function () {
    var $count = $.trim($('#js-gb-pager3-count').val()),
        $pagesize = $.trim($('#js-gb-pager3-pagesize').val()),
        $pagenumber = $.trim($('#js-gb-pager3-pagenumber').val()),
        $pagerid = $('#js-gb-pager3-pagerid'),
        $right = $('#js-gb-pager3-right');
    var pages = require('common:widget/pager/pager'),
        commonClass = require('common.static.js.common');

    /*统计内容分页*/
    function bigPager(pagercount, pagersize,pagernum){
        var option1 = {
            isjump:1,
            pagenumber: pagernum,
            pagecount: Math.ceil(pagercount/pagersize),
            sum : pagercount,
            buttonClickCallback : function(pageclickednumber){
                var data = {
                    currentPage:pageclickednumber
                };
                var result = commonClass.addUrl(data);
                window.location.href = result;
            }
        };
        $pagerid.pager(option1);
    }

    /* 分页函数 */
    bigPager($count, $pagesize, $pagenumber);

});