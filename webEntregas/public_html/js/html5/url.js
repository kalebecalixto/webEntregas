url = new function () {
    var url = this;

    url.val = function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    url.jsp = function () {
        var url = window.location.pathname;
        var ret = url.replace(".html", ".jsp");
        var ret = ret.replace(".htm", ".jsp");
        return ret;
    }
}