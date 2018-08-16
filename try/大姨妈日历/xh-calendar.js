var $ = function (objId) {
	if (!objId) {
		return null;
	}
	if (document.getElementById) {
		return eval('document.getElementById("' + objId + '")');
	} else if (document.layers) {
		return eval("document.layers['" + objId + "']");
	} else {
		return eval('document.all.' + objId);
	}
}

var DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth() + 1;
var nowDay = now.getDate();
var nowDate = nowYear + "-" + ((nowMonth < 10) ? ("0" + nowMonth) : nowMonth) + "-" + ((nowDay < 10) ? ("0" + nowDay) : nowDay);
var strCal = "";

/**
 * 根据年月返回天数
 */
function GetDaysInMonth(year, month) {
	if (month == 2) {
		return (((year % 4 == 0) && ((year % 100) != 0)) || (year % 400 == 0)) ? 29 : 28;
	} else {
		return DaysInMonth[month - 1];
	}
}

/**
 * 更改年份触发函数
 */
function ChgYear(id) {
	var Year = id.options[id.selectedIndex].value;
	var MonthIndex = $("CalMonth").selectedIndex;
	var Month = $("CalMonth").options[MonthIndex].value;
	InitCalendar(Year, Month);
}

function ChgMonth(id) {
	var Month = id.options[id.selectedIndex].value;
	var YearIndex = $("CalYear").selectedIndex;
	var Year = $("CalYear").options[YearIndex].value;
	InitCalendar(Year, Month);
}

/**
 * 根据年月更新日历函数
 */
function InitCalendar(year, month) {
	if (!year && !month) {
		year = nowYear;
		month = nowMonth;
	}

	var DayInMonth = GetDaysInMonth(year, month);
	// 获得当前时间的标准时间
	var standardTime = new Date(year, parseInt(month) - 1, 1);
	// 得到从周几开始填入内容(本月的第一天是周几);返回值是number
	// 获取本月第一天是星期X(0-6,0代表星期天)
	var week = standardTime.getDay();

	
	strCal = "<ul class='xh-calendar-date flex-ul'>";
	
	console.log(year, parseInt(month) - 1, 1);
	console.log(standardTime,week);
	// Wed Aug 01 2018 00:00:00 GMT+0800 (中国标准时间) 3
	
	for (var i = 0; i < week; i++) {
		strCal += "<li>&nbsp;</li>";
	}
	// console.log(strCal);
	// return;
	

	var intWeek = i;

	for (var j = 1; j <= DayInMonth; j++) {
		var strDate = year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + ((j < 10) ? ("0" + j) : j);
		console.log(strDate,nowDate);
		
		if (strDate == nowDate) {
			strCal += '<li class="curDate">'+j+'</li>';
		} else {
			strCal += '<li>'+j+'</li>';
		}
		if (intWeek == 6){
			intWeek = 0;
		}else{
			intWeek++;
		}
		
	}
	for (k = intWeek; k <= 6 && k > 0; k++) {
		strCal += "<li>&nbsp;</li>";
	}
	// console.log(strCal);
	strCal += "</ul>";
	// console.log(strCal);
	$("js-xh-calendar-date").innerHTML = strCal;
}
