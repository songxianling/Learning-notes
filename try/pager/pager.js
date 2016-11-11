(function($) {
    $.fn.pager = function(options) {
        var opts = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {
            // 初始化渲染
            // 需要转换下传入的页数和总页数为int
            opts.pagenumber = parseInt(opts.pagenumber);
            opts.pagecount = parseInt(opts.pagecount);
            // 判断无分页和参数是否显示无分页的数据
            if(opts.pagecount == 1 && opts.noPagingHide){
                return;
            }
            $(this).empty().append(renderpager(opts));
            $('#js-gb-pager-page-jumpnum').on('input', function () {
                var number = $.trim($(this).val());
                if(!(/^[1-9]\d*$/g.test(number))){
                    $(this).val('');
                }
            }).on('propertychange', function () {
                var number = $.trim($(this).val());
                if(!(/^[1-9]\d*$/g.test(number))){
                    $(this).val('');
                }
            });
            $('#js-gb-pager-page-go').click(function () {
                var number = $.trim($('#js-gb-pager-page-jumpnum').val());
                opts.buttonClickCallback(number);
            });
        });
    };

    // 渲染分页
    function renderpager(opts) {
        var pagenumber = opts.pagenumber,
            pagecount = opts.pagecount,
            $pager = $('<ul class="gb-pager-pages clearfix"></ul>');

        // 首页和上一页的渲染
        $pager.append(renderButton(opts.fristPage, pagenumber, pagecount, opts)).append(renderButton(opts.prevPage,
            pagenumber, pagecount, opts));

        // 计算分页
        var startPoint = 1;
        var endPoint = 5;

        if (pagenumber >= 5) {
            startPoint = pagenumber - 2;
            endPoint = pagenumber + 2;
        }
        if (endPoint > pagecount) {
            startPoint = pagecount - 4;
            endPoint = pagecount;
        }
        if (startPoint < 1) {
            startPoint = 1;
        }

        // 中间页数渲染
        for (var page = startPoint; page <= endPoint; page++) {
            var currentButton = $('<li class="gb-pager-page-number">' + (page) + '</li>');
            page == pagenumber ? currentButton.addClass('gb-pager-pgCurrent') : currentButton.click(function() {
                opts.buttonClickCallback(this.firstChild.data); });
            currentButton.appendTo($pager);
        }

        // 下一页和尾页渲染
        $pager.append(renderButton(opts.nextPage, pagenumber, pagecount, opts)).append(renderButton(opts.lastPage,
            pagenumber, pagecount, opts));

        // 更多信息渲染
        if (opts.showmore) {
            var moreBtn,
                pageInfo = '<li class="gb-pager-page-more">' + opts.pagenumber + '/'+ pagecount +'</li>',
                sumpage = '<li class="gb-pager-page-more">共' + opts.sum + '条</li>',
                jumpto = '<li class="gb-pager-page-jump">跳转到:</li>',
                jumpnum = '<li class="gb-pager-page-more"><input type="text" class="gb-pager-page-jumpnum" id="js-gb-pager-page-jumpnum" /></li>',
                go = '<li id="js-gb-pager-page-go">GO</li>';
            // 0页不显示分信息
            if (pagecount == 0) {
                if (opts.sum) {
                    moreBtn = $(sumpage);
                }
            }else {
                if (opts.sum) {
                    if(opts.isjump){
                        moreBtn = $(pageInfo + sumpage + jumpto + jumpnum + go);
                    }else{
                        moreBtn = $(pageInfo + sumpage);
                    }
                }else{
                    moreBtn = $(pageInfo);
                }
            }

            moreBtn.appendTo($pager);
        };


        return $pager;
    }

    // 渲染分页按钮
    function renderButton(buttonLabel, pagenumber, pagecount, options) {
        var $Button = $('<li class="gb-pager-pgNext">' + buttonLabel + '</li>'),
            destPage = 1;

        switch (buttonLabel) {
            case options.fristPage:
                destPage = 1;
                $Button.addClass('gb-pager-frist');
                break;
            case options.prevPage:
                destPage = pagenumber - 1;
                break;
            case options.nextPage:
                destPage = pagenumber + 1;
                break;
            case options.lastPage:
                destPage = pagecount;
                $Button.addClass('gb-pager-last');
                break;
        }

        // 设置分页显示
        if (buttonLabel == options.fristPage || buttonLabel == options.prevPage) {
            pagenumber <= 1 ? $Button.addClass('gb-pager-pgEmpty') : $Button.click(function() {
                options.buttonClickCallback(destPage); });
        }
        else if (buttonLabel == options.nextPage || buttonLabel == options.lastPage) {
            pagenumber >= pagecount ? $Button.addClass('gb-pager-pgEmpty') : $Button.click(function() { 
                options.buttonClickCallback(destPage); });
        }

        return $Button;
    }

    // 默认分页设置
    $.fn.pager.defaults = {
        noPagingHide : false,
        pagenumber : 1,
        pagecount : 1,
        showmore : true,
        fristPage : "首页",
        prevPage : "上一页",
        nextPage : "下一页",
        lastPage : "末页"
    };
})(jQuery);