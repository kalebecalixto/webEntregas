// CodeThatTab STANDARD
// Version: 1.3.1 (12.27.05.1)
// Script is FREE for non commercial use.
// Copyright (c) 2003-2005 by CodeThat.Com
// http://www.codethat.com/

var CT_IMG_BLANK="img/1x1.gif",CT_C=0,CT_RZ=null,CT_TBLS='<table cellpadding=0 cellspacing=0 border=0 width=100%>',CT_TBLE='</table>',CodeThatTabs=[],tmt=null;
function CTabSet(id)
{
    var t=this;
    t.id=id;
    t.def= { tabs:[],x:10,y:10,width:100,height:80,offset:3,spacing:5,layout:'top',align:'center' };
    t.tabs=[];
    t.currTab=null;
    t.check=0;
    t.wp=0;
    t.hp=0;
    CodeThatTabs[t.id]=t;
    ua.oldB=ua.nn4||ua.oldOpera;
};
{
    var CTp=CTabSet.prototype;
    CTp.create=(typeof CodeThat.gets=='function'&&CodeThat.gets())?
                    function(tabDef)
                    {
                        var t=this,i,j,l,tdd= {
                                            width:100,height:(ua.oldOpera)?18:20,text:"",hint:""
                                         },s;
                        CT_setA(tabDef,t.def);
                        t.def.layout='top';
                        for(i in t.def)
                        {
                            if(i.indexOf("css")>-1)
                                tdd[i]=t.def[i];
                            if(i.indexOf("border")>-1)
                                tdd[i]=t.def[i];
                        };
                        if(Def(t.def.tabs)&&t.def.tabs.constructor!=Array)
                            t.def.tabs=[t.def.tabs];
                        for(i=0; i<t.def.tabs.length; i++)
                        {
                            tdd.cssover="";
                            for(j in t.def.tabs[i])
                            {
                                if(j.indexOf("css")>-1)
                                    t.def.tabs[i][j]=tdd[j];
                                t.def.tabs[i].border=null;
                            };
                            t.tabs[i]=new CTab(i,t,tdd);
                            t.tabs[i].init(t.def.tabs[i]);
                        };
                        i=0;
                        t.currTab=t.tabs[i];
                        t.draw();
                        if(ua.oldOpera)
                            CT_move();
                    }
                    ://else
                    function()
                    {
                        return;
                    };
    CTp.toHTML=function(inDiv,ct)
    {
        var t=this,h='',th='',th1='',i,f,bc='',bw='',bh='',w=0,cts=t.currTab,j=0,tw=t.def.offset;
        if(Undef(ct))
            ct=t.currTab;
        if(Def(ct.border))
        {
            if(Def(ct.border.color))
                bc=' bgcolor='+ct.border.color;
            if(Def(ct.border.width))
            {
                w=ct.border.width;
                bw=' width='+w;
                bh=' height='+w
            };
        };
        t.currTab=ct;
        if(!t.check)
        {
            switch(t.def.layout)
            {
                case "left":
                case "right":
                            f=(t.def.layout=='left');
                            if(t.def.offset>0)
                            {
                                th='<td>'+CT_setI(1,t.def.offset)+'</td>';
                                h='<td'+bc+bw+'>'+CT_setI(1,t.def.offset)+'</td>';
                                if(!w)
                                    h='';
                                th1+='<tr>'+((f)?th+h:h+th)+'</tr>';
                            };
                            for(i=0; i<t.tabs.length; i++)
                            {
                                th='<td class='+t.tabs[i].getCSS()+' id='+t.tabs[i].getID()+'>'+t.tabs[i].getText()+'</td>';
                                if(ct.id==i)
                                    h='<td>'+CT_TBLS+'<tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr><tr><td width=1 class='+t.tabs[i].csshint+'>'+CT_setI(1,t.tabs[i].height+((ua.oldOpera)?2:0))+'</td></tr><tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr>'+CT_TBLE+'</td>';
                                else 
                                    h='<td'+bc+bw+'>'+CT_setI(w,t.tabs[i].height)+'</td>';
                                if(!w)
                                    h='';
                                th1+='<tr>'+((f)?th+h:h+th)+'</tr>';
                                th='<td>'+CT_setI(1,t.def.spacing)+'</td>';
                                h='<td'+bc+bw+'>'+CT_setI(w,t.def.spacing)+'</td>';
                                if(!w)
                                    h='';
                                if(t.def.spacing)
                                    th1+='<tr>'+((f)?th+h:h+th)+'</tr>';
                                tw+=t.tabs[i].height+((w>0)?t.tabs[i].border.width*2:0)+t.def.spacing;
                            };
                            j=t.def.height-tw;
                            tw=t.def.height;
                            if(j<0)
                            {
                                t.def.height+=j*-1+((ua.oldOpera)?3-2*ct.border.width:-2*ct.border.width);
                                j=0;
                            }
                            else 
                                j+=((ua.oldOpera)?-1:2);
                            if(j>0)
                            {
                                th='<td>'+CT_setI(1,j)+'</td>';
                                h='<td'+bc+bw+'>'+CT_setI(w,j)+'</td>';
                                if(!w)
                                    h='';
                                th1+='<tr>'+((f)?th+h:h+th)+'</tr>';
                            };
                            h=CT_TBLS+th1+CT_TBLE;
                            if(w>0)
                            {
                                th=((f)?'<tr><td'+bc+bw+'>'+CT_setI(w,w)+'</td><td rowspan=3'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr>':'<tr><td rowspan=3'+bc+bw+bh+'>'+CT_setI(w,w)+'</td><td'+bc+bw+'>'+CT_setI(w,w)+'</td></tr>');
                                th+='<tr><td class='+ct.csshint+'>'+ct.getHint()+'</td></tr>'+'<tr><td'+bc+bw+'>'+CT_setI(w,w)+'</td></tr>';
                            }
                            else 
                                th='<tr><td class='+ct.csshint+'>'+ct.getHint()+'</td></tr>';
                            t.def.height=tw;
                            th=CT_TBLS+th+CT_TBLE;
                            h=((f)?'<tr><td valign=top'+((t.wp)?' width="'+t.tabs[0].width+'"':'')+'>'+h+'</td><td valign=top width=99%>'+th+'</td></tr>':'<tr><td valign=top width=99%>'+th+'</td><td valign=top'+((t.wp)?' width="'+t.tabs[0].width+'"':'')+'>'+h+'</td></tr>');
                            h='<table cellpadding=0 cellspacing=0 border=0 width='+t.def.width+' height='+t.def.height+'>'+h+'</table>';
                            break;
                case "top":
                case "bottom":
                            f=(t.def.layout=='top');
                            if(t.def.offset>0)
                            {
                                th+='<td>'+CT_setI(t.def.offset,1)+'</td>';
                                h+='<td'+bc+bh+'>'+CT_setI(t.def.offset,1)+'</td>';
                            };
                            for(i=0; i<t.tabs.length; i++)
                            {
                                th+='<td valign='+((f)?"bottom":"top")+((!ua.nn4)?' class='+t.tabs[i].getCSS():'')+' id='+t.tabs[i].getID()+'>'+t.tabs[i].getText()+'</td>'+'<td>'+CT_setI(t.def.spacing,1)+'</td>';
                                if(ct.id==i)
                                    h+='<td>'+CT_TBLS+'<tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td><td width='+ct.width+' class='+t.tabs[i].csshint+'>'+CT_setI(1,1)+'</td><td'+bc+bw+bh+'>'+CT_setI(1,1)+'</td></tr>'+CT_TBLE+'</td>';
                                else 
                                    h+='<td'+bc+bh+'>'+CT_setI(t.tabs[i].width,1)+'</td>';
                                h+='<td'+bc+bh+'>'+CT_setI(t.def.spacing,1)+'</td>';
                            };
                            th+='<td width=99%>'+CT_setI(1,1)+'</td>';
                            h+='<td width=99%'+bc+bh+'>'+CT_setI(1,1)+'</td>';
                            if(w>0)
                                if(f)
                                    h='<tr>'+th+'</tr><tr>'+h+'</tr>';
                                else 
                                    h='<tr>'+h+'</tr><tr>'+th+'</tr>';
                            else 
                                h='<tr>'+th+'</tr>';
                            h=CT_TBLS+h+CT_TBLE;
                            if(w>0)
                            {
                                th='<tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td><td width='+(t.def.width)+' class='+ct.csshint+'>'+ct.getHint()+'</td><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr>';
                                if(f)
                                    th+='<tr><td colspan=3'+bc+bh+'>'+CT_setI(w,w)+'</td></tr>';
                                else 
                                    th='<tr><td colspan=3'+bc+bh+'>'+CT_setI(w,w)+'</td></tr>'+th;
                            }
                            else 
                                th='<tr><td width='+(t.def.width)+' class='+ct.csshint+'>'+ct.getHint()+'</td></tr>';
                            th=CT_TBLS+th+CT_TBLE;
                            if(f)
                                h+=th;
                            else 
                                h=th+h;
                            h='<table cellpadding=0 cellspacing=0 border=0 width='+t.def.width+' height='+t.def.height+'><tr><td valign=top>'+h+'</td></tr></table>';
                            break;
            }
        };
        t.currTab=cts;
        if(inDiv)
            if(t.check&&!ua.oldB)
            {
                h="<div id='"+t.id+"'"+((ua.moz)?"":" style='width:"+((t.wp)?t.wp+"%":t.def.width+"px")+";height:"+((t.hp)?t.hp+"%":t.def.height+"px")+";'")+"></div>";
            }
            else
            {
                h="<div id='"+t.id+"'>"+h+"</div>"
            };
        return h;
    };
    CTp.setCurrTab=function(text,id)
                    {
                        var t=this,ct=t.currTab,i;
                        if(Def(text))
                            for(i=0; i<t.tabs.length&&Undef(id); i++)
                                if(t.tabs[i].text.toUpperCase()==text.toUpperCase())
                                    id=i;
                        if(Undef(id))
                            return;
                        t.currTab=t.tabs[id];
                        if(ua.oldB)
                            t.drawOldB(ct);
                        else 
                            t.draw(Def(text));
                    };
    CTp.toHTMLOldB=function()
                    {
                        var t=this,h='',i,p=[t.def.x-0+t.def.offset-0,t.def.y-0],vp=['hidden','visible'];
                        if(ua.nn4)
                            h='<div style="position:absolute; top:'+p[1]+'px; left:'+p[0]+'px; width:1px; height:1px; visibility:visible; border-bottom-width:0;" id="badtab"></div>';
                        h+='<div id="'+t.currTab.getID('c')+'" style="position:absolute; top:'+p[1]+'px; left:'+p[0]+'px; visibility:'+vp[1]+'">'+t.toHTML(0,t.currTab)+'</div>';
                        for(i=0; i<t.tabs.length; i++)
                        {
                            if(i!=t.currTab.id)
                                h+='<div id="'+t.tabs[i].getID('c')+'" style="position:absolute; top:'+p[1]+'px; left:'+p[0]+'px; visibility:'+vp[0]+'">'+t.toHTML(0,t.tabs[i])+'</div>';
                        };
                        h+="<img id='"+t.getID("pos")+"' name='"+t.getID("pos")+"' src='"+CT_IMG_BLANK+"' width="+t.def.width+" height="+(t.def.height+20)+" border=0>";
                        return h;
                    };
    CTp.getID=function(s)
                {
                    return this.id+'_'+s;
                };
    CTp.setWH=function(){ };
    CTp.draw=function(u)
                {
                    var t=this,o=CT_fe(t.id),a=t.currTab.action;
                    if(o&&t.check)
                        t.setWH();
                    if(ua.oldB)
                        dw(t.toHTMLOldB());
                    else if(Undef(o))
                        dw(t.toHTML(1));
                    else
                    {
                        if(Def(a)&&Def(a.url)&&!u)CT_wo(a.url,a.target);
                        CT_HTML(t.id,t.toHTML());
                    };
                    if(t.check)
                    {
                        window.setTimeout("CodeThatTabs['"+t.id+"'].draw()",25);
                        CT_C++;
                    };
                };
    CTp.drawOldB=function(ct)
                    {
                        var t=this;
                        if(t.currTab==ct)
                            return;
                        CT_setV(CT_fe(t.currTab.getID("c")),1);
                        CT_setV(CT_fe(ct.getID("c")),0);
                    };
};
function CTab(id,tabSet,tabDef)
{
    var t=this;
    t.id=id;
    t.wp=t.hp=0;
    t.tabSet=tabSet;
    CT_setA(tabDef,t);
};
{
    var CTp=CTab.prototype;
    CTp.init=function(tabDef)
                {
                    var t=this,s;
                    CT_setA(tabDef,t);
                    s=new String(t.width);
                    if(s.indexOf("%")>-1)
                    {
                        t.wp=t.width=parseInt(t.width);
                    };
                    s=new String(t.height);
                    if(s.indexOf("%")>-1)
                    {
                        t.hp=t.height=parseInt(t.height);
                    };
                    if(Undef(t.csshint))
                        t.csshint=t.csscurr;
                };
    CTp.getText=function()
                {
                    var t=this,h='',th='',
                        s=' style="background-image:none;'+((t.borderonlyhint)?'background-color:transparent;':'')+((!ua.nn4)?'cursor:hand;border:none;':'')+'"',
                        bc='',bw='',bh='',w=0,text;
                    if(t.wp)
                        t.width=parseInt(t.tabSet.def.width*t.wp/100);
                    if(t.hp)
                        t.height=parseInt(t.tabSet.def.height*t.hp/100);
                    text=(!ua.nn4)?'<a '+t.actionOf()+' style="text-decoration:none;"><table border=0 width='+t.width+' height='+t.height+' cellspacing=0 cellpadding=1><tr><td align='+t.tabSet.def.align+' class='+t.getCSS()+s+' id="'+t.getID('td')+'">'+t.text+'</td></tr></table></a>':'<table border=0 width='+t.width+' height='+t.height+' cellspacing=0 cellpadding=3><tr><td align='+t.tabSet.def.align+' class='+t.getCSS()+'><a '+t.actionOf()+' style="text-decoration:none;"><font class='+t.getCSS()+s+'>'+t.text+'</font></a></td></tr></table>';
                    if(Def(t.border)&&!t.borderonlyhint)
                    {
                        if(Def(t.border.color))
                            bc=' bgcolor='+t.border.color;
                        if(Def(t.border.width))
                        {
                            w=t.border.width;
                            bw=' width='+w;
                            bh=' height='+w;
                        }
                        switch(t.tabSet.def.layout)
                        {
                            case "left":h='<tr><td colspan=2 '+bc+bh+'>'+CT_setI(1,w)+'</td></tr>'+'<tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td><td class='+t.csshint+'>'+text+'</td></tr>'+'<tr><td colspan=2 '+bc+bh+'>'+CT_setI(1,w)+'</td></tr>';
                                        break;
                            case "right":h='<tr><td colspan=2 '+bc+bh+'>'+CT_setI(1,w)+'</td></tr>'+'<tr><td class='+t.csshint+'>'+text+'</td><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr>'+'<tr><td colspan=2 '+bc+bh+'>'+CT_setI(1,w)+'</td></tr>';
                                        break;
                            case "top":h='<tr><td colspan=3'+bc+bh+'>'+CT_setI(1,w)+'</td></tr>'+'<tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td><td class='+t.csshint+'>'+text+'</td><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr>';
                                        break;
                            case "bottom":h='<tr><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td><td class='+t.csshint+'>'+text+'</td><td'+bc+bw+bh+'>'+CT_setI(w,w)+'</td></tr>'+'<tr><td colspan=3'+bc+bh+'>'+CT_setI(1,w)+'</td></tr>';
                                        break;
                        };
                        h=CT_TBLS+h+CT_TBLE;
                    }
                    else 
                        h=text;
                    return h;
                };
    CTp.getHint=function()
                {
                    var t=this,s=' valign=top'+((ua.nn4)?'':' style="border:none"'),l='';
                    switch(t.tabSet.def.layout)
                    {
                        case "left":
                        case "right":l=" width='"+((t.tabSet.wp)?"100%":(t.tabSet.def.width-t.width))+"'"+" height='"+(t.tabSet.def.height)+"'";
                                    break;
                        case "top":
                        case "bottom":l=" height="+(t.tabSet.def.height-t.height)+" width="+t.tabSet.def.width;
                                    break;
                    };
                    return '<table border=0 cellpadding=0 cellspacing='+t.tabSet.def.padding+l+'><tr><td class='+t.csshint+s+'>'+t.hint+'</td></tr></table>';
                };
    CTp.getCSS=function()
                {
                    var t=this;
                    return((t.tabSet.currTab==t)?t.csscurr:t.css);
                };
    CTp.getID=function(s)
                {
                    return this.tabSet.id+'_'+this.id+((Def(s))?s:'');
                };
    CTp.actionOf=function()
                    {
                        var t=this,h,
                            a=((Def(t.action))?t.action: { } ),
                            js="CodeThatTabs['"+t.tabSet.id+"'].setCurrTab(null,"+t.id+");"+(Def(a.js)?a.js:""),
                            jsover=((!ua.oldB&&Def(t.cssover)?"CT_setCSS('"+t.getID()+"', '"+t.cssover+"');":""))+(Def(a.jsover)?a.jsover:""),
                            jsout=((!ua.oldB&&Def(t.cssover)?"CT_setCSS('"+t.getID()+"', '"+t.getCSS()+"');":""))+(Def(a.jsout)?a.jsout:"");
                        if(Def(a.url)&&ua.oldB)
                            h="href=\""+a.url+"\""+((Def(a.target))?" target='"+a.target+"'":"");
                        else 
                            h="href=\"javascript:void(0)\"";
                        if(Def(js))
                            h+=" onClick=\""+js+"\"";
                        if(Def(jsover))
                            h+=" onMouseOver=\""+jsover+"\"";
                        if(Def(jsout))
                            h+=" onMouseOut=\""+jsout+"\"";
                        return h;
                    };
};
function CT_fe(id)
{
    return CodeThat.findElement(id);
};
function CT_wo(u,t)
{
    if(Undef(t))t="_self";
    switch(t)
    {
        case "_blank":window.open(u);
                    break;
        case "_parent":parent.location.href=u;
                    break;
        case "_top":top.location.href=u;
                    break;
        case "_self":location.href=u;
                    break;
        default:eval("try{top.document.frames[t].location.href=u;}catch(e){ window.open(u, t); }");
    };
};
function CT_setA(s,d)
{
    if(Undef(d)||Undef(s)||s.constructor!=Object)
        return d;
    var i;
    for(i in s)
        if(Def(s[i]))
            d[i]=s[i];
    return d;
};
function CT_setV(o,v)
{
    if(Def(o))
        if(ua.nn4)
            o.visibility=(v)?'visible':'hide';
        else 
            o.style.visibility=(v)?'visible':'hidden';
};
function CT_setI(w,h)
{
    if(Undef(w))
        w=1;
    if(Undef(h))
        h=1;
    var img="<img src='"+CT_IMG_BLANK+"' width=_W_ height=_H_ border=0>",rew=/_W_/,reh=/_H_/;
    return img.replace(rew,w).replace(reh,h);
};
function CT_setCSS(id,css)
{
    var o=CT_fe(id),o1=CT_fe(id+'td');
    if(Def(o)&&Def(o1))
    {
        CT_css(o,css);
        CT_css(o1,css);
    };
};
function CT_move()
{
    var i,j,o,l,t,o1;
    if(Def(tmt))
        window.clearTimeout(tmt);
    for(i in CodeThatTabs)
    {
        o=document.images[CodeThatTabs[i].getID("pos")];
        if(Undef(o))
            tmt=window.setTimeout('CT_move()',100);
        else
        {
            tmt=null;
            l=parseInt(CT_getAbsLeft(o));
            t=parseInt(CT_getAbsTop(o));
            if(isNaN(l)||isNaN(t))
                return;
            l-=CodeThatTabs[i].def.x;
            if(Math.abs(l)<50)
                l=0;
            t-=CodeThatTabs[i].def.y;
            if(Math.abs(t)<50)
                t=0;
            if(!t&&!l)return;
            for(j=0; j<CodeThatTabs[i].tabs.length; j++)
            {
                o1=CT_fe(CodeThatTabs[i].tabs[j].getID("c"));
                if(Def(o1))
                {
                    o1.style.top+=t;
                    o1.style.left+=l;
                }
            };
        };
    };
};
function CT_Tab_ReDraw()
{
    if(ua.oldB)
        return;
    var i,t;
    for(i in CodeThatTabs)
    {
        t=CodeThatTabs[i];
        if(t.wp||t.hp)
        {
            CT_C=0;
            t.check=1;
            CT_HTML(t.id,"");
            t.draw();
        };
    };
};