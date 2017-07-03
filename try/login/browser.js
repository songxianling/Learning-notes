/**
* 获取浏览器型号和版本号
* @return Array [description]
*/
define('common.static.js.browser', function () {
    function browserInfo() {
        var agent = navigator.userAgent.toLowerCase();
        var arr = [];
        var Browser = "";
        var Bversion = "";
        var verinNum = "";
        //IE
        if (agent.indexOf("msie") > 0) {
            if (navigator.appName == 'Microsoft Internet Explorer'){
                var ua = navigator.userAgent;
                var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null){
                  Browser = "IE";
                  Bversion = parseFloat( RegExp.$1 );
                }
            }
        }else if (agent.indexOf("firefox") > 0) {
            //firefox
            var regStr_ff = /firefox\/[\d.]+/gi;
            Browser = "firefox";
            Bversion = "" + agent.match(regStr_ff);
        }else if (agent.indexOf("chrome") > 0) {
            //Chrome
            var regStr_chrome = /chrome\/[\d.]+/gi;
            Browser = "chrome";
            Bversion = "" + agent.match(regStr_chrome);
        }else if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            //Safari
            var regStr_saf = /version\/[\d.]+/gi;
            Browser = "safari";
            Bversion = "" + agent.match(regStr_saf);
        }else if (agent.indexOf("opera") >= 0) {
            //Opera
            var regStr_opera = /version\/[\d.]+/gi;
            Browser = "opera";
            Bversion = "" + agent.match(regStr_opera);
        } else {
            var browser = navigator.appName;
            if (browser == "Netscape") {
                var ua = navigator.userAgent;
                var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null){
                  rv = parseFloat( RegExp.$1 );
                }

                Bversion = parseFloat(rv);
                Browser = "IE"
            }
        }
        arr.push(Browser);
        arr.push(Bversion);
        return arr;
    }

    return browserInfo();
});