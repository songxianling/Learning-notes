;
(function ($, window, document, undefined) {
	var HolidayCalendar = function (elem, options) {
		this.$calendar = elem;
		this.$calendar.addClass('holidayCalendar');

		this.defaults = {
			ifCurrYear: true, //是否只显示当年的日历
			switchMonth: true, // 是否切换月份
			hoverDate: true, // hover是否显示当天信息
			backToday: true, // 是否返回当天
			holidayArray: [], //休息日列表默认不填写时为正常周末
			workingDayArray: [] //加班列表
		};
		this.DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		this.ArrMonth = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
		this.ArrMonthName = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
		this.now = new Date();
		this.nowYear = this.now.getFullYear();
		this.nowMonth = this.now.getMonth() + 1;
		this.nowDay = this.now.getDate();
		this.nowDate = this.nowYear + "-" + ((this.nowMonth < 10) ? ("0" + this.nowMonth) : this.nowMonth) + "-" + ((this.nowDay < 10) ? ("0" + this.nowDay) : this.nowDay);
		this.strCal = "";
		this.opts = $.extend({}, this.defaults, options);
	};

	HolidayCalendar.prototype = {
		showCalendar: function (opts) { // 输入数据并显示
			var self = this;
			var year = dateObj.getDate().getFullYear();
			var month = dateObj.getDate().getMonth() + 1;
			var dateStr = returnDateStr(dateObj.getDate());
			var firstDay = new Date(year, month - 1, 1); // 当前月的第一天
			// console.log(dateStr);
			// console.log(this.$calendarDate_item);

			this.$calendarTitle_text.text(year + '年' + dateStr.substr(4, 2) + '月');
			console.log(this.$calendarDate_item);
			this.$calendarDate_item.each(function (i) {

				// allDay: 得到当前列表显示的所有天数
				// var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay()),
				// 	allDay_str = allDay,
				// 	$itemThis = $(this);
				// console.log(i);
				var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
				console.log(year, month - 1, i + 1 - firstDay.getDay());
				
				var $itemThis = $(this);
				

				$itemThis.text(allDay.getDate()).attr('data', allDay_str);
				if (returnDateStr(new Date()) === allDay_str) {
					$itemThis.attr('class', 'item item-curDay');
				} else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
					$itemThis.attr('class', 'item item-curMonth');
				} else {
					$itemThis.attr('class', 'item');
				}

				//设置所有周末为假期
				// var day = allDay.getDay();
				// if(day === 6 || day === 0){
				//     $itemThis.addClass('item-holiday');
				// }
				// if(opts.holidayArray.indexOf(parseInt(allDay_str))>-1){
				//     $itemThis.addClass('item-holiday');
				// }
				// if(opts.workingDayArray.indexOf(parseInt(allDay_str))>-1){
				//     $itemThis.removeClass('item-holiday');
				// }

			});
		},
		// 根据年月更新日历函数;渲染DOM
		renderDOM: function (Year, Month) { 
		

			var that = this;
			this.$calendar_title = $('<div class="holidayCalendar-title"></div>');
			this.$calendar_week = $('<ul class="holidayCalendar-week"></ul>');
			this.$calendar_date = $('<ul class="holidayCalendar-date"></ul>');
			this.$calendar_today = $('<div class="holidayCalendar-today"></div>');
			
			if (!Year && !Month) {
				Year = that.nowYear;
				Month = that.nowMonth;
			}

			var DayInMonth = that.GetDaysInMonth(Year, Month);

			var _titleStr = '<a href="#" class="title"></a>' +
				'<a href="javascript:;" id="backToday">今</a>' +
				'<div class="arrow">' +
				'<span class="arrow-prev"><</span>' +
				'<span class="arrow-next">></span>' +
				'</div>';
			var _weekStr = '<li class="item">日</li>' +
				'<li class="item">一</li>' +
				'<li class="item">二</li>' +
				'<li class="item">三</li>' +
				'<li class="item">四</li>' +
				'<li class="item">五</li>' +
				'<li class="item">六</li>';
			var _dateStr = '';
			var _dayStr = '<i class="triangle"></i>' +
				'<p class="date"></p>' +
				'<p class="week"></p>';
				console.log(DayInMonth);
			for (var i = 1; i < DayInMonth; i++) {
				_dateStr += '<li class="item">'+i+'</li>';
				var intWeek = i;
				// console.log(_dateStr);
				
				// for (var j = 1; j <= DayInMonth; j++) {
				// 	var strDate = Year + "-" + ((Month < 10) ? ("0" + Month) : Month) + "-" + ((j < 10) ? ("0" + j) : j);
				// 	if (strDate == nowDate) {
				// 		strCal += "<td class=\"byellow\">";
				// 	} else {
				// 		strCal += "<td>";
				// 	}
				// 	strCal += "<a onclick=\"Suan(" + j + ");return false;\">" + j + "</a></td>";
				// 	if (intWeek == 6) {
				// 		intWeek = 0;
				// 		strCal += "</tr><tr>";
				// 	} else {
				// 		intWeek++;
				// 	}
				// }
			}

			this.$calendar_title.html(_titleStr);
			this.$calendar_week.html(_weekStr);
			this.$calendar_date.html(_dateStr);
			this.$calendar_today.html(_dayStr);
			this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
			this.$calendar.show();
		},
		/**
		 * 根据年月返回天数
		 */
		GetDaysInMonth: function (year, month) {
			if (month == 2) {
				return (((year % 4 == 0) && ((year % 100) != 0)) || (year % 400 == 0)) ? 29 : 28;
			} else {
				return this.DaysInMonth[month - 1];
			}
		},
		
		inital: function () { // 初始化
			var self = this;

			self.renderDOM();
			self.$calendarTitle_text = self.$calendar_title.find('.title');
			self.$backToday = $('#backToday');
			self.$arrow_prev = self.$calendar_title.find('.arrow-prev');
			self.$arrow_next = self.$calendar_title.find('.arrow-next');
			self.$calendarDate_item = self.$calendar_date.find('.item');
			console.log(self.$calendar_date.find('.item'));
			console.log(self.$calendarDate_item);
			// return;
			
			self.$calendarToday_date = self.$calendar_today.find('.date');
			self.$calendarToday_week = self.$calendar_today.find('.week');


			self.showCalendar(self.opts);

			if (self.opts.switchMonth) {
				self.$arrow_prev.bind('click', function () {
					var _date = dateObj.getDate(),
						_month = _date.getMonth() - 1,
						_$this = $(this);
					if (self.opts.ifCurrYear) {
						if (_month == -1) {
							return false;
						}
						if (_month == 0) {
							_$this.addClass('arrow-disabled');
						} else {
							_$this.removeClass('arrow-disabled');
						}
						_$this.next('.arrow-next').removeClass('arrow-disabled');
					}

					dateObj.setDate(new Date(_date.getFullYear(), _month, 1));
					self.showCalendar(self.opts);
				});

				self.$arrow_next.bind('click', function () {
					var _date = dateObj.getDate(),
						_month = _date.getMonth() + 1,
						_$this = $(this);
					if (self.opts.ifCurrYear) {
						if (_month == 12) {
							return false;
						}
						if (_month == 11) {
							_$this.addClass('arrow-disabled');
						} else {
							_$this.removeClass('arrow-disabled');
						}
						_$this.prev('.arrow-prev').removeClass('arrow-disabled');
					}

					dateObj.setDate(new Date(_date.getFullYear(), _month, 1));
					self.showCalendar(self.opts);
				});
			}

			if (self.opts.backToday) {
				self.$backToday.bind('click', function () {
					if (!self.$calendarDate_item.hasClass('item-curDay')) {
						if (self.opts.ifCurrYear) {
							var _date = dateObj.getDate(),
								_month = _date.getMonth() + 1,
								_$arrow = $(this).next('.arrow');
							_$arrow.find('span').removeClass('arrow-disabled');
							if (_month == 0) {
								_$arrow.find('.arrow-prev').addClass('arrow-disabled');
							} else if (_month == 11) {
								_$arrow.find('.arrow-next').addClass('arrow-disabled');
							}
						}
						dateObj.setDate(new Date());
						self.showCalendar(self.opts);
					}
				});
			}



		},

		constructor: HolidayCalendar
	};

	$.fn.holidayCalendar = function (options) {
		
		var holidayCalendar = new HolidayCalendar(this, options);
		console.log(options);
		
		return holidayCalendar.inital();
	};


	// ========== 使用到的方法 ==========

	var dateObj = (function () {
		var _date = new Date();

		return {
			getDate: function () {
				return _date;
			},

			setDate: function (date) {
				_date = date;
			}
		}
	})();

	function returnDateStr(date) { // 日期转字符串
		
		
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		console.log(date);
		// console.log(day);

		month = month <= 9 ? ('0' + month) : ('' + month);
		day = day <= 9 ? ('0' + day) : ('' + day);

		return year + month + day;
	};

	function changingStr(fDate) { // 字符串转日期
		var fullDate = fDate.split("-");

		return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
	};

})(jQuery, window, document);
