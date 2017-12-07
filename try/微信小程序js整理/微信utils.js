/**
 * 格式化时间
 */
exports.formatTime = function(date, fmt = "yyyy/MM/dd hh:mm:ss") {
    if (!date) return "";
    date = typeof date == "number" ? new Date(date) : date;
    var o = {
 
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
 
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 人性话格式时间
 */
exports.ctDate = function(date) {
    if (!date) return "";
    const now = Date.now();
    let diff;
    date = typeof date == "number" ? date : +(new Date(date));
    diff = now - date;
    switch (Math.floor(diff / 3600000 / 24)) {
        case 0:
            return "今天";
        case 1:
            return "昨天";
        case 2:
            return "两天前";
        case 3:
            return "三天前";
        case 4:
            return "四天前";
        case 5:
            return "五天前";
        default:
            return formatTime(date);
    }
 
};
/**
 * 封装loadding
 */
exports.loading = function(title = "加载中", duration = 10000, icon = "loading") {
    wx.showToast({
        title,
        icon,
        duration
    });
};
 
/**
 * 封装hideLoading
 */
exports.hideLoading = function() {
    wx.hideToast();
};

