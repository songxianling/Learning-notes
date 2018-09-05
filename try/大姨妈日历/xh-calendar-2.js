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
                var ymfirst = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + "01";
                if (strDate == that.nowDate) {
                    dateDomStr += '<li class="item-day js-item-day cur-date" data-time="' + strDate + '"  data-ymfirst="' + ymfirst + '" data-ym="' + year + month + '" data-month="' + month + '" data-day="' + j + '" data-index="' + (j - 1) + '">' +
                        '<span class="date">今</span>' +
                        '</li>';
                } else {
                    dateDomStr += '<li class="item-day js-item-day" data-time="' + strDate + '"  data-ymfirst="' + ymfirst + '" data-ym="' + year + month + '" data-day="' + j + '" data-index="' + (j - 1) + '">' +
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
            // that.xhCalendarWeek = $('<ul class="xh-calendar-week clearfix"></ul>');
            that.xhCalendarDate = $('<div class="xh-calendar-date js-xh-calendar-date clearfix"></div>');

            // 定义实际元素字符串
            // var titleDomStr = '<div class="center-box js-select-date-box">' +
            //     '<span class="today-text js-today-text">' + year + '年' + month + '月</span>' +
            //     '<span class="arrow-next js-arrow-next"></span>' +
            //     '</div>' +
            //     '<span class="today-btn js-go-today-btn">回今天</span>';
            // var weekDomStr = '<li class="week-item">周日</li>' +
            //     '<li class="week-item">周一</li>' +
            //     '<li class="week-item">周二</li>' +
            //     '<li class="week-item">周三</li>' +
            //     '<li class="week-item">周四</li>' +
            //     '<li class="week-item">周五</li>' +
            //     '<li class="week-item">周六</li>';
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
                var ymfirst = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + "01";

                if (strDate == that.nowDate) {
                    dateDomStr += '<li class="item-day js-item-day cur-date" data-time="' + strDate + '" data-ymfirst="' + ymfirst + '"  data-ym="' + year + month + '"  data-month="' + month + '"  data-day="' + j + '" data-index="' + (j - 1) + '">' +
                        '<span class="date">今</span>' +
                        '</li>';
                } else {
                    dateDomStr += '<li class="item-day js-item-day" data-time="' + strDate + '" data-ymfirst="' + ymfirst + '" data-ym="' + year + month + '" data-month="' + month + '" data-day="' + j + '" data-index="' + (j - 1) + '">' +
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
            // console.log(that.allDateLi.length);


            // 渲染❤️元素
            // 第一次
            if (that.dayParams.isForecast && that.dayParams.beginDay + that.dayParams.dayNum > 3) {
                // 当前是预测并且符合应该显示的要求
                that.renderMenstrualEle(that.dayParams.beginDay, that.dayParams.isForecast)
            } else {
                console.log('传过来了设置');

                console.log(that.dayParams.menstrualListTime, that.dayParams.menstrualListTime);

                if (that.dayParams.menstrualListTime && that.dayParams.menstrualListTime.length) {
                    for (var i = 0; i < that.dayParams.menstrualListTime.length; i++) {
                        var curNum = that.dayParams.menstrualListTime[i].num;
                        var curBeginDay = Number(that.dayParams.menstrualListTime[i].beginTime.substring(8));
                        console.log('设置的开始日期' + curBeginDay);

                        that.renderMenstrualEle(curBeginDay, false, curNum);
                    }
                } else {
                    console.log('没有list传过来了');

                    that.renderMenstrualEle(that.dayParams.beginDay, that.dayParams.isForecast)
                }

            }
            // for (var j = 0; j < that.dayParams.dayNum; j++) {
            //     console.log('第一轮');
            //     console.log((that.dayParams.beginDay + that.dayParams.dayNum), that.nowDay);

            //     if (that.dayParams.isForecast && that.dayParams.beginDay + that.dayParams.dayNum > 15) {
            //         console.log('符合预测月经的显示1');
            //         if (j == 0) {
            //             that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('forecast-menses-date forecast-menses-one');
            //             // 渲染敷面膜（养颜汤）|| 皮肤清洁（排毒）的日期(预测经期开始日前第3天)
            //             that.allDateLi.eq(that.dayParams.beginDay + j - 1 - 3).append('<span class="text">敷面膜11</span>');
            //             // 倒推排卵期
            //             var ovulateLastDay = that.dayParams.beginDay + j - 1 - 10;
            //             console.log('预测排卵期最后一天' + ovulateLastDay);

            //             if (ovulateLastDay >= 0) {
            //                 that.renderOvulateEle(ovulateLastDay)
            //             }
            //         } else {
            //             that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('forecast-menses-date');
            //         }
            //     } else {
            //         // 如果当前不是预测；第一个增加switch开启标志
            //         if (j == 0) {
            //             console.log('确切的开始');

            //             that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass(' menses-date set-open-day');
            //         } else if (j == that.dayParams.dayNum - 1) {
            //             that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass(' menses-date set-end-day');
            //         } else {
            //             that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass(' menses-date');
            //         }
            //     }
            // }
            // 渲染敷面膜（养颜汤）|| 皮肤清洁（排毒）的日期(预测经期开始日前第3天)
            // 当前是否有显示预测经期
            // for (var i = 0, len = that.allDateLi.length; i < len; i++) {
            //     if (that.allDateLi.eq(i).hasClass('forecast-menses-one')) {
            //         console.log(that.allDateLi.eq(i).data('index'));
            //         that.allDateLi.eq(that.allDateLi.eq(i).data('index') - 3).append('<span class="text">敷面膜1</span>');
            //     }
            // }



            // 如果有两次 正向 开始1+周期20 小于当月全部天数
            if (that.dayParams.cycle + that.dayParams.beginDay <= that.allDateLi.length && that.dayParams.calendarTimeMonth >= that.nowMonth) {
                var afterBeginDay = that.dayParams.cycle + that.dayParams.beginDay;
                console.log('往后预测第二次');
                that.renderMenstrualEle(afterBeginDay, true)
            }

            // 当前开始的日期和周期是否符合2次❤️(上次)反向
            if (that.dayParams.beginDay > that.dayParams.cycle && that.dayParams.beforeForecast) {
                var agoBeginDay = that.dayParams.beginDay - that.dayParams.cycle - 1;
                if (agoBeginDay >= 0 && agoBeginDay + that.dayParams.dayNum > 3) {
                    console.log('往前预测第二次');
                    var agoBeginDay = that.dayParams.beginDay - that.dayParams.cycle;
                    that.renderMenstrualEle(agoBeginDay, true)
                }
            }

            // 正向预测排卵期 跨越2个月的情况
            if (that.dayParams.beginDay + that.dayParams.cycle > that.allDateLi.length && that.dayParams.calendarTimeMonth >= that.nowMonth) {
                var afterMonthBegin = that.dayParams.beginDay + that.dayParams.cycle - that.allDateLi.length;
                // 下月月经第一天距离上次排卵第一天的值为19
                var moreDayNum = 19 - afterMonthBegin;
                // 当月天数减去当月开始的那一天就是本月开始的日期
                var nowOvuBegin = that.allDateLi.length - moreDayNum;

                for (var i = 1; i <= 10; i++) {

                    if (nowOvuBegin >= 0) {
                        if (i == 5) {
                            that.allDateLi.eq(nowOvuBegin).addClass('ovulate-cur-date');
                            that.allDateLi.eq(nowOvuBegin).append('<span class="text p-text">排卵日2</span>');
                        }
                        that.allDateLi.eq(nowOvuBegin).addClass('ovulate-date');
                    }
                    nowOvuBegin++;
                }
            }

            // var beginDay2 = that.dayParams.beginDay - that.dayParams.cycle - 1;
            // if (beginDay2 >= 0) {
            //     console.log('反向预测第二次');
            //     for (var i = beginDay2, len = that.dayParams.yyDayNum + beginDay2; i < len; i++) {
            //         if (i >= 0) {
            //             if (that.dayParams.beforeForecast) {
            //                 that.allDateLi.eq(i).addClass('forecast-menses-date');
            //             } else {
            //                 that.allDateLi.eq(i).addClass('forecast-menses-date menses-date');
            //             }

            //         }
            //     }
            // }
            // 渲染燃脂（瘦身）元素 真正月经期结束之后的第3天
            // if (!that.dayParams.isForecast) {
            //     that.allDateLi.eq(that.dayParams.dayNum + that.dayParams.beginDay + 3 - 1).append('<span class="text">燃脂2s</span>');
            // }

            // 渲染排卵期
            var ovulateDay = that.dayParams.beginDay + that.dayParams.cycle - 10 - 1; // 10天排卵期的最后一天
            // for(var i = 0,len = that.allDateLi.length;i<len;i++){
            //     if(that.allDateLi.eq(i).hasClass('forecast-menses-one')){
            //         console.log(that.allDateLi.eq(i).data('index'));
            //         that.allDateLi.eq(that.allDateLi.eq(i).data('index')-3).append('<span class="text">敷面膜1</span>');
            //     }
            // }

            // 常规一个月一次的情况
            // 如果周期减去天数小于14则不显示
            // if (ovulateDay >= 0) {
            //     if (that.dayParams.cycle - that.dayParams.dayNum > 14) {
            //         // 渲染⭐️当天元素 单独ovulate
            //         if (that.dayParams.isForecast && (that.dayParams.beginDay + that.dayParams.dayNum) > that.nowDay) {
            //             that.allDateLi.eq(ovulateDay - 4).addClass('ovulate-cur-date');
            //             that.allDateLi.eq(ovulateDay - 4).append('<span class="text p-text">排卵日1</span>');
            //             // 渲染⭐️期间丰胸的日期(ovulate当天的第三天)
            //             var breastDay = ovulateDay + 3;
            //             that.allDateLi.eq(ovulateDay - 3).append('<span class="text">丰胸</span>');
            //             for (var i = 0; i < 10; i++) {
            //                 if (ovulateDay >= 0) {
            //                     that.allDateLi.eq(ovulateDay--).addClass('ovulate-date');
            //                 }
            //             }
            //         } else {

            //         }
            //     }
            // }

            // 一个月两次的情况
            // if (that.dayParams.beginDay > 9) {

            //     console.log(that.dayParams.beginDay - 9);
            //     var ovulateDay2 = that.dayParams.beginDay - 9 - 1;
            //     console.log(ovulateDay2);
            //     for (var i = 0; i < 10; i++) {
            //         ovulateDay2--;
            //         if (ovulateDay2 >= 0) {
            //             if (i == 5) {
            //                 that.allDateLi.eq(ovulateDay2 + 1).addClass('ovulate-cur-date');
            //                 that.allDateLi.eq(ovulateDay2 + 1).append('<span class="text p-text">排卵日2</span>');
            //             }
            //             that.allDateLi.eq(ovulateDay2).addClass('ovulate-date');
            //         }
            //     }
            // }
            // if (that.dayParams.menstrualListTime && that.dayParams.menstrualListTime.length) {
            //     for (var i = 0; i < that.dayParams.menstrualListTime.length; i++) {
            //         var cur = that.dayParams.menstrualListTime[i];
            //         var oDayNum = 3;
            //         that.renderMenstrualEle(1, false, oDayNum);
            //     }

            // }



        },
        renderMenstrualEle: function (beginDay, isForecast, oDayNum) {
            var that = this;
            if (!beginDay) {
                return;
            }
            var beginDay = beginDay - 1;
            console.log(beginDay);
            // 渲染手动设置
            if (oDayNum) {
                console.log('手动设置的');
                console.log(oDayNum);
                for (var j = 0; j < oDayNum; j++) {
                    if (j == 0) {
                        console.log('确切的开始');

                        that.allDateLi.eq(beginDay).addClass('forecast-menses-date menses-date set-open-day');
                        // 倒推排卵期
                        var ovulateLastDay = beginDay - 10;
                        // console.log('预测排卵期最后一天' + ovulateLastDay);
                        console.log(that.dayParams.calendarTimeMonth, that.nowMonth);

                        // if (ovulateLastDay >= 0 && that.dayParams.calendarTimeMonth >= that.nowMonth) {
                        if (ovulateLastDay >= 0) {
                            that.renderOvulateEle(ovulateLastDay)
                        }
                    } else if (j == oDayNum - 1) {
                        that.allDateLi.eq(beginDay).addClass('forecast-menses-date menses-date set-end-day');
                        // 燃脂（瘦身）的日期(正式经期结束后第3天)
                        that.allDateLi.eq(beginDay + 3).append('<span class="text remind">燃脂</span>');
                    } else {
                        that.allDateLi.eq(beginDay).addClass('forecast-menses-date menses-date');
                    }
                    beginDay++;
                }
                return;
            } else {
                console.log('没有手动设置传过来');

                if (isForecast) {
                    for (var i = 0; i < that.dayParams.dayNum; i++) {
                        if (i == 0) {
                            that.allDateLi.eq(beginDay).addClass('forecast-menses-date forecast-menses-one');
                            // 渲染敷面膜（养颜汤）|| 皮肤清洁（排毒）的日期(预测经期开始日前第3天)
                            if (beginDay - 3 >= 0) {
                                that.allDateLi.eq(beginDay - 3).append('<span class="text remind">敷面膜11</span>');
                            }

                            // 倒推排卵期
                            var ovulateLastDay = beginDay - 10;
                            // console.log('预测排卵期最后一天' + ovulateLastDay);

                            if (ovulateLastDay >= 0) {
                                that.renderOvulateEle(ovulateLastDay)
                            }
                        } else {
                            that.allDateLi.eq(beginDay).addClass('forecast-menses-date');
                        }
                        beginDay++;
                    }
                } else {
                    // 如果当前不是预测；第一个增加switch开启标志
                    for (var j = 0; j < that.dayParams.dayNum; j++) {
                        if (j == 0) {
                            console.log('确切的开始');
                            console.log(that.allDateLi.length);
                            console.log(beginDay);

                            that.allDateLi.eq(0).addClass('forecast-menses-date menses-date set-open-day');
                            // 倒推排卵期
                            var ovulateLastDay = beginDay - 10;
                            // console.log('预测排卵期最后一天' + ovulateLastDay);

                            if (ovulateLastDay >= 0) {
                                that.renderOvulateEle(ovulateLastDay)
                            }
                        } else if (j == that.dayParams.dayNum - 1) {
                            that.allDateLi.eq(beginDay).addClass('forecast-menses-date menses-date set-end-day');
                            // 燃脂（瘦身）的日期(正式经期结束后第3天)
                            that.allDateLi.eq(beginDay + 3).append('<span class="text remind">燃脂2</span>');
                        } else {
                            that.allDateLi.eq(beginDay).addClass('forecast-menses-date menses-date');
                        }
                        beginDay++;
                    }

                }
            }


        },
        // 渲染排卵期元素样式
        renderOvulateEle: function (lastDay) {
            var that = this;
            var ovulateDay = lastDay + 1;
            console.log(ovulateDay);

            for (var i = 1; i <= 10; i++) {
                ovulateDay--;
                if (ovulateDay >= 0) {
                    if (i == 5) {
                        that.allDateLi.eq(ovulateDay).addClass('ovulate-cur-date');
                        that.allDateLi.eq(ovulateDay).append('<span class="text p-text">排卵日2</span>');
                    }
                    that.allDateLi.eq(ovulateDay).addClass('ovulate-date');
                }

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