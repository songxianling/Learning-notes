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

			that.titleText = that.xhCalendarBox.find('#js-today-text');
			console.log(that.titleText);

			that.arrowPrev = that.xhCalendarBox.find('#js-arrow-prev');
			that.arrowNext = that.xhCalendarBox.find('#js-arrow-next');
			that.goToday = that.xhCalendarBox.find('#js-today-btn');

			that.arrowPrev.on('click', function () {
				var curDate = xhDateObj.getDate();
				console.log(curDate);

				var curMonth = curDate.getMonth() - 1;
				// console.log(curMonth);

				// curDate.getFullYear 获取完整的年份
				// console.log(new Date(curDate.getFullYear(),curMonth, 1));

				xhDateObj.setDate(new Date(curDate.getFullYear(), curMonth, 1));
				that.replaceDom();

			});
			that.arrowNext.on('click', function () {
				var curDate = xhDateObj.getDate();
				console.log(curDate);

				var curMonth = curDate.getMonth() + 1;
				// console.log(curMonth);

				// curDate.getFullYear 获取完整的年份
				// console.log(new Date(curDate.getFullYear(),curMonth, 1));
				if(that.options){
					if (typeof that.options.handleFun === 'function') {
						var abc = that.options.handleFun('777');
						console.log(abc);
						that.dayParams = abc;
	
					}
				}
				xhDateObj.setDate(new Date(curDate.getFullYear(), curMonth, 1));
				that.replaceDom();

			});
			that.goToday.on('click', function () {
				xhDateObj.setDate(new Date());
				that.replaceDom();

			})
		},
		// 点击替换内容
		replaceDom: function () {
			var that = this;
			var year = xhDateObj.getDate().getFullYear();
			var month = xhDateObj.getDate().getMonth() + 1;
			that.titleText.html(year + '年' + month + '月');
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
				if (strDate == that.nowDate) {
					dateDomStr += '<li class="item-day cur-date">' + j + '</li>';
				} else {
					dateDomStr += '<li class="item-day">' + j + '</li>';
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
			// 获取循环周期
			var dIm = that.getDayInMonth(year, month);
			// 获得当前月份的第一天的标准时间
			var standardTime = new Date(year, parseInt(month) - 1, 1);
			// 得到从周几开始填入内容(本月的第一天是周几);返回值是number
			// 获取本月第一天是星期X(0-6,0代表星期天)
			var week = standardTime.getDay();

			// 定义外围元素
			that.xhCalendarTitle = $('<div class="xh-calendar-title"></div>');
			that.xhCalendarWeek = $('<ul class="xh-calendar-week li-out-box clearfix"></ul>');
			that.xhCalendarDate = $('<div class="xh-calendar-date li-out-box clearfix" id="js-xh-calendar-date"></div>');

			// 定义实际元素字符串
			var titleDomStr = '<span id="js-arrow-prev"><</span>' +
				'<span id="js-today-text">2018年8月</span>' +
				'<span id="js-arrow-next">></span>' +
				'<span id="js-today-btn">回今天</span>';
			var weekDomStr = '<li class="item">日</li>' +
				'<li class="item">一</li>' +
				'<li class="item">二</li>' +
				'<li class="item">三</li>' +
				'<li class="item">四</li>' +
				'<li class="item">五</li>' +
				'<li class="item">六</li>';
			var dateDomStr = '';
			// 每周7天；开始结束行尾补齐
			for (var i = 0, len = week; i < len; i++) {
				dateDomStr += '<li>&nbsp;</li>';
			}
			console.log(dIm);
			// 常量存储7天剩余
			var weekI = i;

			for (var j = 1; j <= dIm; j++) {
				var strDate = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + ((j < 10) ? ("0" + j) : j);
				if (strDate == that.nowDate) {
					dateDomStr += '<li class="item-day cur-date">' + j + '</li>';
				} else {
					dateDomStr += '<li class="item-day">' + j + '</li>';
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
			that.xhCalendarTitle.html(titleDomStr);
			that.xhCalendarWeek.html(weekDomStr);
			that.xhCalendarDate.html(dateDomStr);
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
			console.log(that.allDateLi.length);

			// 渲染⭐️期
			var ovulateDay = that.dayParams.cycle - 14; // ⭐️当天
			// 新建一个数组为整个ovulate的日期
			var ovulateCycle = [];
			var ovulateBeginDay = ovulateDay - 4; // ⭐️开始的第一天
			for (var i = 0; i < 10; i++) {
				ovulateCycle.push(ovulateBeginDay++);
			}
			// console.log(ovulateCycle);
			ovulateCycle.splice(ovulateCycle.indexOf(ovulateDay + 1), 1);
			// console.log(ovulateCycle);
			// 渲染⭐️当天元素 单独ovulate
			that.allDateLi.eq(ovulateDay).addClass('ovulate-cur-day');
			// 渲染⭐️期间丰胸的日期(10天内不包含ovulate当天的其他日期)
			var breastDay = ovulateCycle[randomNum(9) - 1];
			that.allDateLi.eq(breastDay).append('<span class="lose-weight">丰胸</span>');
			// 后4天
			for (var i = ovulateDay; i < ovulateDay + 5; i++) {
				that.allDateLi.eq(i).addClass('ovulate-date');
			}
			// 前5天
			for (var i = 0; i < 6; i++) {
				that.allDateLi.eq(ovulateDay--).addClass('ovulate-date');
			}

			// 渲染敷面膜（养颜汤）|| 皮肤清洁（排毒）的日期(预测经期开始日前3天随机出)
			var beautyDay = that.dayParams.beginDay - randomNum(3) - 1;
			if (beautyDay >= 0) {
				that.allDateLi.eq(beautyDay).append('<span class="lose-weight">敷面膜</span>');
			}
			// 渲染❤️元素
			for (var i = 0, len = that.allDateLi.length; i < len; i++) {
				if (i == that.dayParams.beginDay - 1) {
					// that.allDateLi.eq(i).addClass('begin-date');
					for (var j = 0; j < that.dayParams.dayNum; j++) {
						that.allDateLi.eq(that.dayParams.beginDay + j - 1).addClass('begin-date');
					}
				}
				if (i == that.dayParams.cycle) {
					// that.allDateLi.eq(i).addClass('begin-date');
					for (var k = that.dayParams.cycle; k < that.dayParams.dayNum + that.dayParams.cycle; k++) {
						that.allDateLi.eq(that.dayParams.beginDay + k - 1).addClass('begin-date');
					}
				}

			}
			// 渲染燃脂（瘦身）元素 ❤️结束之后的随机3天内
			// 本身超出1天+eq从0开始;所以减去2
			that.allDateLi.eq(that.dayParams.beginDay + that.dayParams.dayNum + randomNum(3) - 2).append('<span class="lose-weight">燃脂</span>');
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