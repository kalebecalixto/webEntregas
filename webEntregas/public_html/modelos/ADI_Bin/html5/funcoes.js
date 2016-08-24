/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function datatruncada(ver, datas) {	
    for (var i = 0; i < datas.length; i++) {
            var data = datas[i];

            if ( (ver.inicio >= data.inicio) && (ver.inicio <= data.fim) )
                    return true;

            else

            if ( (ver.fim >= data.inicio) && (ver.fim <= data.fim) )
                    return true;

            else

            if ( (ver.inicio <= data.inicio) && (ver.fim >= data.fim) )
                    return true;
    }

    return false;
}

var databr = function(d){
    if (d=="")
        return "1900-01-01";

    var parts = d.split("/");
    
    if (parts.lengh != 3)
        return "1900-01-01";
    
    var nd = parts[2] + "-" + parts[1] + "-" + parts[0];
    
    return nd;
}

var addNoGroup = function (nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

var addNoGroupAndDecimalPlaces = function (nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : ',00';
    if (x2.length == 2) { x2 = x2 + '0' }
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function wssqlurl() {
    var tpl = "/{APPNAME}/ADI_Programacao/ADI_Bin/html5/wssql.jsp";
    var src = tpl.replace("{APPNAME}", location.pathname.split("/")[1]);
    return src;
}

function wssql(sql, callback) {    
    $.post(wssqlurl(), {sql: sql}, callback);
}

function objectify(formElm) {
    var ret = $(formElm).serializeArray().reduce(function(obj, v) { obj[v.name] = v.value; return obj; }, { });
    return ret;
}