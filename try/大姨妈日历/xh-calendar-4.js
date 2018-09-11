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
            // that.xhCalendarWeek = $('<ul class="xh-calendar-week clearfix"></ul>');
            that.xhCalendarDate = $('<div class="xh-calendar-date js-xh-calendar-date clearfix"></div>');

            
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
                var md = ((j < 10) ? ("0" + j) : j);
                // console.log(strDate);
                var ymfirst = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + "01";
                if (strDate == that.nowDate) {
                    dateDomStr += '<li class="item-day js-item-day cur-date" data-time="' + strDate + '" data-ymfirst="' + ymfirst + '" data-md="' + md + '" data-day="' + j + '" data-index="' + (j - 1) + '">' +
                        '<span class="date">今</span>' +
                        '</li>';
                } else {
                    dateDomStr += '<li class="item-day js-item-day" data-time="' + strDate + '" data-ymfirst="' + ymfirst + '" data-md="' + md + '"  data-day="' + j + '" data-index="' + (j - 1) + '">' +
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
            // that.xhCalendarWeek.html(weekDomStr);
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
            // if (!that.dayParams || !that.dayParams.beginDay) {
            if (!that.dayParams) {
                return;
            }
            that.allDateLi = that.xhCalendarDate.find('.item-day');
            // that.allDateLi = $('.swiper-slide-active').find('.item-day');

            // 渲染手动设置的
            for (var i = 0; i < that.dayParams.menstrualListTime.length; i++) {
                var cur = that.dayParams.menstrualListTime[i];
                that.renderMenstrualEleTouch(cur)
            }
            // 渲染预测月经期
            if (that.dayParams.menstrual) {
                for (var i = 0; i < that.dayParams.menstrual.length; i++) {
                    var cur = that.dayParams.menstrual[i];
                    that.renderMenstrualEle(cur)
                }
            }
            // 渲染排卵期
            if (that.dayParams.ovulate && that.dayParams.ovulate.length) {
                for (var i = 0; i < that.dayParams.ovulate.length; i++) {
                    var cur = that.dayParams.ovulate[i];
                    that.renderOvulateEle(cur)
                }
            }
        },
        // 显示预测的经期
        renderMenstrualEle: function (arr) {
            var that = this;
            for(var i = 0;i<arr.length;i++){
                var cur = arr[i] - 1;
                if(i == 0 && cur > 2){
                    that.allDateLi.eq(cur-3).append('<span class="text remind">敷面膜</span>');
                }
                
                that.allDateLi.eq(cur).addClass('forecast-menses-date');
            }
            for (var j = 0; j < that.allDateLi.length; j++) {
                that.allDateLi.eq(j).addClass('anquan');
            }
            // console.log(one);
        },
        // 显示手动设置
        renderMenstrualEleTouch: function (arr) {
            var that = this;
            for (var j = 0; j < that.allDateLi.length; j++) {
                that.allDateLi.eq(j).addClass('anquan');
            }
            for (var j = 0; j < arr.length; j++) {
                var cur = arr[j] - 1;
                if (j == 0) {
                    if(parseFloat(arr[j])){
                        that.allDateLi.eq(cur).addClass('forecast-menses-date menses-date set-open-day');
                    }
                } else if (j == arr.length - 1) {
                    that.allDateLi.eq(cur).addClass('forecast-menses-date menses-date set-end-day');
                    // 燃脂（瘦身）的日期(正式经期结束后第3天)
                    that.allDateLi.eq(cur + 3).append('<span class="text remind">燃脂</span>');
                } else {
                    that.allDateLi.eq(cur).addClass('forecast-menses-date menses-date');
                }
            }
        },
        // 渲染排卵期元素样式
        renderOvulateEle: function (arr) {
            var that = this;
            for(var i =0;i<arr.length;i++){
                var cur = arr[i] - 1;
                if(i == arr.length - 1){
                    that.allDateLi.eq(cur+3).append('<span class="text remind">丰胸</span>');
                }
                if(i == 4 && arr.length > 4){
                    that.allDateLi.eq(cur).addClass('ovulate-cur-date');
                    that.allDateLi.eq(cur).append('<span class="text p-text">排卵日</span>');
                }
                that.allDateLi.eq(cur).addClass('ovulate-date');
            }
        },
        // 获取一个月有几天
        getDayInMonth: function (year, month) {
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