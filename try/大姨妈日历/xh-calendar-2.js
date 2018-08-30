;
(function ($, window, document, undefined) {
    var XhInitCalendar = function (ele, options) {
        this.xhCalendarBox = ele;
        this.dayInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        this.now = new Date();
        this.nowYear = this.now.getFullYear();
        this.nowMonth = this.now.getMonth() + 1;
        this.nowDay = this.now.getDate();
        this.nowDate = this.nowYear + "-" + ((this.nowMonth < 10) ? ("0" + this.nowMonth) : this.nowMonth) + "-" + ((this.nowDay < 10) ? ("0" + this.nowDay) : this.nowDay);
        this.options = options;
        this.dayParams = options;
        console.log(options);


    }
    XhInitCalendar.prototype = {
        init: function (params) {
            var that = this;
            that.buildDom();

            // that.todayText = that.xhCalendarBox.find('.js-today-text');
            // that.selectDate = that.xhCalendarBox.find('.js-select-date-box');
            // that.arrowPrev = that.xhCalendarBox.find('.js-arrow-prev');
            // that.arrowNext = that.xhCalendarBox.find('.js-arrow-next');
            // that.goToday = that.xhCalendarBox.find('.js-go-today-btn');

            // that.selectDate.on('click', function () {
            //     console.log(123);

            //     that.dayParams.selectDateFn()
            //     // xhDateObj.setDate(new Date());
            //     // that.replaceDom();

            // })

            // that.goToday.on('click', function () {

            //     xhDateObj.setDate(new Date());
            //     that.replaceDom();

            // })
        },
        // 点击替换内容
        replaceDom: function () {
            var that = this;
            var year = xhDateObj.getDate().getFullYear();
            var month = xhDateObj.getDate().getMonth() + 1;
            // that.todayText.html(year + '年' + month + '月');
            // 获取循环周期
            var dIm = that.getDayInMonth(year, month);
            var standardTime = new Date(year, parseInt(month) - 1, 1);
            var week = standardTime.getDay();

            var dateDomStr = '';
            for (var i = 0, len = week; i < len; i++) {
                dateDomStr += '<li>&nbsp;</li>';
            }
            var weekI = i;

            for (var j = 1; j <= dIm; j++) {
                var strDate = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + ((j < 10) ? ("0" + j) : j);
                var itemDate = year + ((month < 10) ? ("0" + month) : month) + ((j < 10) ? ("0" + j) : j);
                if (strDate == that.nowDate) {
                    dateDomStr += '<li class="item-day js-item-day cur-date" data-time="' + strDate + '" data-day="' + j + '" data-index="' + (j-1) + '">' +
                        '<span class="date">今</span>' +
                        '</li>';
                } else {
                    dateDomStr += '<li class="item-day js-item-day" data-time="' + strDate + '" data-day="' + j + '" data-index="' + (j-1) + '">' +
                        '<span class="date">' + j + '</span>' +
                        '</li>';
                }
                if (weekI == 6) {
                    weekI = 0;
                } else {
                    weekI++;
                }
            }
            for (k = weekI; k <= 6 && k > 0; k++) {
                dateDomStr += "<li>&nbsp;</li>";
            }
            that.xhCalendarDate.html(dateDomStr);
            that.beautifyDomSty();

        },

        // 构建基本元素结构
        buildDom: function (year, month) {
            var that = this;
            // 校验时间参数
            if (!year && !month) {
                year = that.nowYear;
                month = that.nowMonth;
            }
            if (that.dayParams.calendarTimeYear && that.dayParams.calendarTimeMonth) {
                year = that.dayParams.calendarTimeYear;
                month = that.dayParams.calendarTimeMonth;
            }

            // 获取循环周期
            var dIm = that.getDayInMonth(year, month);
            // 获得当前月份的第一天的标准时间
            var standardTime = new Date(year, parseInt(month) - 1, 1);
            // 得到从周几开始填入内容(本月的第一天是周几);返回值是number
            // 获取本月第一天是星期X(0-6,0代表星期天)
            var week = standardTime.getDay();

            // 定义外围元素
            // that.xhCalendarTitle = $('<div class="xh-calendar-title"></div>');
            that.xhCalendarWeek = $('<ul class="xh-calendar-week clearfix"></ul>');
            that.xhCalendarDate = $('<div class="xh-calendar-date js-xh-calendar-date clearfix"></div>');

            // 定义实际元素字符串
            // var titleDomStr = '<div class="center-box js-select-date-box">' +
            //     '<span class="today-text js-today-text">' + year + '年' + month + '月</span>' +
            //     '<span class="arrow-next js-arrow-next"></span>' +
            //     '</div>' +
            //     '<span class="today-btn js-go-today-btn">回今天</span>';
            var weekDomStr = '<li class="week-item">周日</li>' +
                '<li class="week-item">周一</li>' +
                '<li class="week-item">周二</li>' +
                '<li class="week-item">周三</li>' +
                '<li class="week-item">周四</li>' +
                '<li class="week-item">周五</li>' +
                '<li class="week-item">周六</li>';
            var dateDomStr = '';
            // 每周7天；开始结束行尾补齐
            for (var i = 0, len = week; i < len; i++) {
                dateDomStr += "<li>&nbsp;</li>";
            }
            // console.log(dIm);
            // 常量存储7天剩余
            var weekI = i;

            for (var j = 1; j <= dIm; j++) {
                var strDate = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + ((j < 10) ? ("0" + j) : j);

                var itemDate = year + ((month < 10) ? ("0" + month) : month) + ((j < 10) ? ("0" + j) : j);
                // console.log(strDate);

                if (strDate == that.nowDate) {
                    dateDomStr += '<li class="item-day js-item-day cur-date" data-time="' + strDate + '" data-day="' + j + '" data-index="' + (j-1) + '">' +
                        '<span class="date">今</span>' +
                        '</li>';
                } else {
                    dateDomStr += '<li class="item-day js-item-day" data-time="' + strDate + '" data-day="' + j + '" data-index="' + (j-1) + '">' +
                        '<span class="date">' + j + '</span>' +
                        '</li>';
                }
                if (weekI == 6) {
                    weekI = 0;
                } else {
                    weekI++;
                }
            }
            for (k = weekI; k <= 6 && k > 0; k++) {
                dateDomStr += "<li>&nbsp;</li>";
            }

            // 拼装内容
            // that.xhCalendarTitle.html(titleDomStr);
            that.xhCalendarWeek.html(weekDomStr);
            that.xhCalendarDate.html(dateDomStr);
            that.xhCalendarBox.html('');
            that.xhCalendarBox.append(that.xhCalendarTitle, that.xhCalendarWeek, that.xhCalendarDate);
            that.xhCalendarBox.show();
            that.beautifyDomSty();
        },
        // 美化dom样式渲染详细展示数据
        beautifyDomSty: function () {
            var that = this;
            // 如果没有参数传递过来
            if (!that.dayParams) {
                return;
            }
            that.allDateLi = that.xhCalendarDate.find('.item-day');
            // console.log(that.allDateLi.length);

            // 渲染⭐️期
            var ovulateDay = parseInt(that.dayParams.beginDay) + parseInt(that.dayParams.cycle) - 14 - 1; // ⭐️当天


            // 渲染⭐️ 常规一个月一次的情况
            // 如果周期减去天数小于14则不显示⭐️
            if (that.dayParams.cycle - that.dayParams.dayNum > 14) {
                // 渲染⭐️当天元素 单独ovulate

                that.allDateLi.eq(ovulateDay).addClass('ovulate-cur-date');
                that.allDateLi.eq(ovulateDay).append('<span class="text p-text">排卵日1</span>');

                // 渲染⭐️期间丰胸的日期(ovulate当天的第三天)
                var breastDay = ovulateDay + 3;
                that.allDateLi.eq(breastDay).append('<span class="text">丰胸</span>');
                // 后4天
                for (var i = ovulateDay; i < ovulateDay + 5; i++) {
                    that.allDateLi.eq(i).addClass('ovulate-date');
                }
                // 前5天
                for (var i = 0; i < 6; i++) {
                    that.allDateLi.eq(ovulateDay--).addClass('ovulate-date');
                }
            }
            // 一个月两次的情况
            if (that.dayParams.beginDay > 9) {

                console.log(that.dayParams.beginDay - 9);
                var ovulateDay2 = that.dayParams.beginDay - 9 - 1;
                console.log(ovulateDay2);
                for (var i = 0; i < 10; i++) {
                    ovulateDay2--;
                    if (ovulateDay2 >= 0) {
                        if (i == 5) {
                            that.allDateLi.eq(ovulateDay2 + 1).addClass('ovulate-cur-date');
                            that.allDateLi.eq(ovulateDay2 + 1).append('<span class="text p-text">排卵日2</span>');
                        }
                        that.allDateLi.eq(ovulateDay2).addClass('ovulate-date');
                    }
                }
            }

            // 渲染敷面膜（养颜汤）|| 皮肤清洁（排毒）的日期(预测经期开始日前第3天)
            var beautyDay = that.dayParams.beginDay - 3 - 1;
            if (beautyDay >= 0) {
                that.allDateLi.eq(beautyDay).append('<span class="text">敷面膜1</span>');
            }
            // 渲染❤️元素
            // 第一次
            var sDayNum = '';
            if(that.dayParams.isForecast){
                sDayNum = that.dayParams.yyDayNum;
            }else{
                sDayNum = that.dayParams.dayNum;
            }
            for (var j = 0; j < that.dayParams.dayNum; j++) {
                console.log('第一轮');

                if (that.dayParams.isForecast) {
                    that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('forecast-menses-date');
                } else {
                    // 如果当前不是预测；第一个增加switch开启标志
                    if (j == 0) {
                        console.log('确切的开始');

                        that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('forecast-menses-date menses-date set-open-day');
                    } else if (j == that.dayParams.dayNum - 1) {
                        that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('forecast-menses-date menses-date set-end-day');
                    } else {
                        that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('forecast-menses-date menses-date');
                    }
                }
            }
            // 如果有两次 正向 开始1+周期20 小于当月全部天数
            if (parseInt(that.dayParams.cycle) + parseInt(that.dayParams.beginDay) < that.allDateLi.length) {
                var beautyDay2 = parseInt(that.dayParams.beginDay) + parseInt(that.dayParams.cycle) - 3 - 1;
                if (beautyDay2 >= 0) {
                    that.allDateLi.eq(beautyDay2).append('<span class="text">敷面膜2</span>');
                }
                // that.allDateLi.eq(i).addClass('begin-date');
                for (var k = that.dayParams.cycle; k <= parseInt(that.dayParams.yyDayNum) + parseInt(that.dayParams.cycle); k++) {
                    that.allDateLi.eq(that.dayParams.beginDay + k - 1 - 1).addClass('forecast-menses-date');
                }
            }

            // 当前开始的日期和周期是否符合2次❤️(上次)反向
            // var beginDay2 = that.dayParams.beginDay - that.dayParams.cycle - 1;
            // if (beginDay2 >= 0) {
                // console.log('反向第二次');
                // for (var i = beginDay2, len = parseInt(that.dayParams.yyDayNum) + parseInt(beginDay2); i < len; i++) {
                //     if(i >= 0){
                //         if(that.dayParams.beforeForecast){
                //             that.allDateLi.eq(i).addClass('forecast-menses-date');
                //         }else{
                //             that.allDateLi.eq(i).addClass('forecast-menses-date menses-date');
                //         }
                        
                //     }
                // }
            // }
            // 渲染燃脂（瘦身）元素 ❤️结束之后的第3天
            if (!that.dayParams.isForecast) {
                that.allDateLi.eq(parseInt(that.dayParams.dayNum) + parseInt(that.dayParams.beginDay) + 3 - 1).append('<span class="text">燃脂2s</span>');
            }

        },
        // 获取一个月有几天
        getDayInMonth: function (year, month) {
            console.log(year, month);
            var that = this;
            if (!year && !month) {
                year = that.nowYear;
                month = that.nowMonth;
            }
            if (month == 2) {
                return (((year % 4 == 0) && ((year % 100) != 0)) || (year % 400 == 0)) ? 29 : 28;
            } else {
                return that.dayInMonth[month - 1];
            }
        },
        constructor: XhInitCalendar
    }

    $.fn.xhInitCalendar = function (options) {

        var xhInitCalendar = new XhInitCalendar(this, options);
        return xhInitCalendar.init();
    };
    jQuery.loadCalendar = function (options) {
        var xhInitCalendar = new XhInitCalendar(this, options);
        return xhInitCalendar.replaceDom();
    }
    // jQuery.loadCalendar = {
    //     loadCalendar: function (params) {
    //         var xhInitCalendar = new XhInitCalendar(this, options);
    //         return xhInitCalendar.replaceDom();
    //     }
    // }
    // $.fn.loadCalendar = function (options) {
    //     console.log(777);

    //     var xhInitCalendar = new XhInitCalendar(this, options);
    //     return xhInitCalendar.replaceDom();
    // };

    // 定义帮助函数

    var xhDateObj = (function () {
        var sDate = new Date();
        console.log(sDate);

        return {
            getDate: function () {
                return sDate;
            },

            setDate: function (date) {
                sDate = date;
                console.log(sDate, date);
            }
        }
    })();
    var randomNum = function (params) {
        return Math.ceil(Math.random() * params);
    }

})(jQuery, window, document);