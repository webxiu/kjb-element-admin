export const cookies = {
    //设置cookie
    setCookie(name, value, days) {
        var days = days || 30;//天
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        // "user=c3284d0f94606dexxxxxx;path:/;expires=Sat, 20 Jul 2019 01:32:14 GMT"
        document.cookie = name + "=" + escape(value) + ";path:/;expires=" + exp.toGMTString();
    },
    //获取cookie
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    //删除cookie
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";path:/;expires=" + exp.toGMTString();
    }

}