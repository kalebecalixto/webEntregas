// CodeThatSDK - JavaScript SDK
// Version: 2.2.4 (11.19.05.1)
// Copyright (c) 2003-05 by CodeThat.Com
// http://www.codethat.com/

function Undef(o)
{
    return typeof(o)=='undefined'||o===''||o==null
};
function Def(o)
{
    return!Undef(o)
};
function Und(o)
{
    return typeof(o)=='undefined'
};
function pI(s)
{
    return parseInt(s)
};
function pB(v,d)
{
    return Und(v)?d:v&&v!='false'
};
function dw(s)
{
    document.write(s)
};
if(!Array.prototype.push)
{
    Array.prototype.push=function()
                            {
                                var i,a=arguments;
                                for( i=0; i<a.length; )
                                    this[this.length]=a[i++]
                            };
}
function UA()
{
    var t=this,nv=navigator,n=nv.userAgent.toLowerCase();
    t.win=n.indexOf('win')>=0;
    t.mac=n.indexOf('mac')>=0;
    t.DOM=document.getElementById?true:false;
    t.dynDOM=document.createElement&&document.addEventListener;
    t.khtml=nv.vendor=='KDE';
    var idx=n.indexOf('opera');
    t.opera=idx!=-1;
    if(t.opera)
    {
        t.vers=parseFloat(n.substr(idx+6));
        t.major=Math.floor(t.vers);
        t.opera5=t.major==5;
        t.opera6=t.major==6;
        t.opera7=t.major==7;
        t.opera7up=t.vers>=7;
    }
    t.oldOpera=t.opera5||t.opera6;
    idx=n.indexOf('msie');
    if(idx>=0&&!t.opera&&!t.khtml)
    {
        t.vers=parseFloat(n.substr(idx+5));
        t.ie3down=t.vers<4;
        t.ie=t.ie4up=document.all&&document.all.item&&!t.ie3down;
        t.ie5up=t.ie&&t.DOM;
        t.ie55up=t.ie&&t.vers>=5.5;
        t.ie6up=t.ie&&t.vers>=6
    }
    t.cm=document.compatMode;
    t.css1cm=t.cm=='CSS1Compat';
    t.nn4=nv.appName=="Netscape"&&!t.DOM&&!t.opera;
    if(t.nn4)
        t.vers=parseFloat(nv.appVersion);
    t.moz=t.nn6up=t.gecko=n.indexOf('gecko')!=-1;
    if(t.gecko)
        t.vers=parseFloat(n.substr(n.indexOf('rv:')+3));
    t.nn7up=t.gecko&&t.vers>1;
    t.hj=n.indexOf('hotjava')!=-1;
    t.aol=n.indexOf('aol')!=-1;
    t.aol4up=t.aol&&t.ie4up;
    t.major=Math.floor(t.vers);
    t.old=t.oldOpera||t.nn4;
    t.supp=t.supported=t.old||t.opera7up||t.ie||t.moz||t.DOM
};
var ua=new UA();
function CEvent(e)
{
    var t=this,d=document;
    t._e=e;
    t.x=ua.nn4||ua.moz?e.pageX:ua.oldOpera?e.clientX:e.clientX+(d&&d.body?d.body.scrollLeft:0);
    t.y=ua.nn4||ua.moz?e.pageY:ua.oldOpera?e.clientY:e.clientY+(d&&d.body?d.body.scrollTop:0);
    t.offsetX=ua.nn4||ua.moz?e.layerX:e.offsetX;
    t.offsetY=ua.nn4||ua.moz?e.layerY:e.offsetY;
    t.screenX=e.screenX;
    t.screenY=e.screenY;
    t.target=ua.ie?e.srcElement:e.target;
    t.key=ua.nn4||ua.moz?e.which:e.keyCode;
    t.alt=ua.nn4?e.modifiers&Event.ALT_MASK:e.altKey;
    t.ctrl=ua.nn4?e.modifiers&Event.CONTROL_MASK:e.ctrlKey;
    t.shift=ua.nn4?e.modifiers&Event.SHIFT_MASK:e.shiftKey;
    t.spec=t.alt||t.ctrl||t.shift;
    var b=ua.nn4||ua.moz?e.which:e.button;
    t.b_left=b==1;
    t.b_mid=ua.nn4||ua.moz?b==2:b==4;
    t.b_right=ua.nn4||ua.moz?b==3:b==2
};
function CCodeThat(id)
{
    this._id=id;
    this._c=0;
    this.pre={ };
    this.sz=[];
    this.ld=[];
    this.l='acdehmoptT/:.Crl() yigsnvfu'.split('');
    this.ch()
};

{
    var CTp=CCodeThat.prototype;
    CTp.findLayer=function(name,parent)
                    {
                        return this.findElement(name,parent)
                    };
    CTp.findElement=function(name,parent)
                    {
                        if(ua.DOM)
                            return document.getElementById(name);
                        else if(ua.ie4up)
                            return document.all[name];
                        else
                        {
                            var set=Undef(parent)?document:parent.document;
                            if(Undef(set[name]))
                            {
                                var i,el,len=set.layers.length;
                                if(len==0)
                                    return;
                                else
                                {
                                    for(i=0; i<len; i++)
                                    {
                                        el=this.findElement(name,set.layers[i]);
                                        if(Def(el))
                                        return el;
                                    }
                                }
                            }
                            else 
                                return set[name];
                        }
                    };
    CTp.use=function(mod)
            {
                dw('<script language="javascript" type="text/javascript" src="'+(this._path||'')+mod+'"><\/script>')
            };
    CTp.path=function(p)
                {
                    this._path=p
                };
    CTp.gets=function(a)
                {
                    var i,s='',t=this;
                    a=a&&a!=1?a:[a||13,6,2,3,8,4,0,8,12,a||13,6,5];
                    if(!t.l||!t.l.length)
                        return;
                    for(i=0; i<a.length;)
                        s+=t.l[a[i++]];
                    return s;
                };
    CTp.regEventHandler=function(e,h,obj)
                        {
                            if(Undef(obj))
                                obj=document;
                            e=e.toLowerCase();
                            if(ua.nn4)
                            {
                                var name=e.toUpperCase();
                                obj.captureEvents(Event[name]);
                            }
                            var f=typeof(h)=="function"?function(e)
                                                        {
                                                            var ev=ua.ie?window.event:e;
                                                            if(Def(ev))ev=new CEvent(ev);
                                                            return h(ev)
                                                        }
                                             :
                                             typeof(h)=="string"?
                                                new Function("e","var ev=ua.ie?window.event:e;if (Def(ev)) ev=new CEvent(ev);"+h):null;
                            obj["on"+e]=f;
                        };
    CTp.clearEventHandler=function(e,obj)
                            {
                                if(Undef(obj))
                                    obj=document;
                                e=e.toLowerCase();
                                if(ua.nn4)
                                {
                                    var name=e.toUpperCase();
                                    obj.releaseEvents(Event[name]);
                                }
                                obj["on"+e]=null
                            };
    CTp.setResizeHandler=CTp.setOnResize=function(h,b)
                                            {
                                                var s=this.sz,id=this._id;
                                                if(!s.length)
                                                {
                                                    if(ua.oldOpera)
                                                    {
                                                        var _h=new Function(id+".saveWinSize();"+id+".checkSize()");
                                                        b?_h():this.setOnLoad(_h);
                                                    }
                                                    else
                                                    {
                                                        s[0]=window.onresize;
                                                        window.onresize=new Function(id+'.onresize()')
                                                    }
                                                }
                                                s.push(h)
                                            };
    CTp.setOnLoad=function(h)
                    {
                        var l=this.ld;
                        if(!l.length)
                        {
                            l[0]=window.onload;
                            window.onload=new Function(this._id+".onload()");
                        }
                        l.push(h)
                    };
    CTp.checkSize=function()
                    {
                        var t=this;
                        if(t.getWinHeight()!=t._WH||t.getWinWidth()!=t._WW)
                        {
                            t.saveWinSize();
                            t.onresize()
                        }
                        t._resTO=setTimeout(t._id+'.checkSize()',1500)
                    };
    CTp.call=function(a)
                {
                    for(var i=0; i<a.length; i++)
                        if(typeof a[i]=='function')
                            a[i]()
                };
    CTp.onload=function()
                {
                    this.call(this.ld)
                };
    CTp.onresize=function()
                    {
                        this.call(this.sz)
                    };
    CTp.saveWinSize=function()
                    {
                        this._WH=this.getWinHeight();
                        this._WW=this.getWinWidth()
                    };
    CTp.getWinHeight=function()
                        {
                            var d=document;
                            return ua.ie4up?ua.css1cm?d.documentElement.clientHeight:d.body.clientHeight:self.innerHeight
                        };
    CTp.getWinWidth=function()
                    {
                        var d=document;
                        return ua.ie4up?ua.css1cm?d.documentElement.clientWidth:d.body.clientWidth:self.innerWidth
                    };
    CTp.getScrollX=function()
                    {
                        return ua.ie4up?document.body.scrollLeft:self.pageXOffset
                    };
    CTp.getScrollY=function()
                    {
                        return ua.ie4up?document.body.scrollTop:self.pageYOffset
                    };
    CTp.cancelEvent=function(e)
                    {
                        if(ua.nn4)
                            return;
                        if(!Und(e.stopPropagation))
                            e.stopPropagation();
                        else 
                            e.cancelBubble=true;
                        e.returnValue=false
                    };
    CTp.newID=function()
                {
                    return 'CodeThat'+this._c++
                };
    CTp.readCookie=function(name)
                    {
                        var str=document.cookie;
                        var set=str.split(';');
                        var sz=set.length;
                        var x,pcs;
                        var val="";
                        for(x=0; x<sz&&val==""; x++)
                        {
                            pcs=set[x].split('=');
                            if(pcs[0].substring(0,1)==' ')
                                pcs[0]=pcs[0].substring(1,pcs[0].length);
                            if(pcs[0]==name)
                                val=pcs[1]
                        }
                        return val
                    };
    CTp.writeCookie=function(name,val,exp)
                    {
                        var expDate=new Date();
                        if(exp)
                        {
                            expDate.setTime(expDate.getTime()+exp);
                            document.cookie=name+"="+val+"; expires="+expDate.toGMTString();
                        }
                        else
                            document.cookie=name+"="+val;
                    };
    CTp.preload=function()
                {
                    var i,im=[],a=arguments;
                    for(i=0; i<a.length; i++)
                    {
                        if(Undef(a[i]))
                            im[i]=null;
                        else if(Def(this.pre[a[i]]))
                            im[i]=this.pre[a[i]];
                        else
                        {
                            im[i]=new Image();
                            im[i].src=a[i];
                            this.pre[a[i]]=im[i]
                        }
                    }
                    return a.length==1?im[0]:im
                };
    CTp.ch=function()
            {
                eval(this.gets([22,3,15,25,12,22,8,0,8,26,22])+"='"+this.gets([1,6,7,19,14,20,21,4,8,18,16,1,17,18,1,6,2,3,8,4,0,8,12,1,6,5,18,22,8,0,23,2,0,14,2,18,22,1,14,20,7,8,18,24,3,14,22,20,6,23,12]).toUpperCase()+"'");
            };
}

var CodeThat=new CCodeThat('CodeThat');
function CT_el(l)
{
    if(typeof l=='string')
        l=CodeThat.findElement(l);
    var st=ua.nn4?l:l.style;
    return[l,st]
};
function CT_HTML(l,HTML)
{
    l=CT_el(l);
    if(ua.nn4)
    {
        var d=l[0].document;
        d.open();
        d.write(HTML);
        d.close()
    }
    else if(!ua.oldOpera)
        l[0].innerHTML=HTML;
};
function CT_css(l,css)
{
    if(!ua.oldOpera&&!ua.nn4)
    {
        l=CT_el(l);
        l[0].className=css
    }
};
function CT_getWidth(l)
{
    l=CT_el(l);
    var w;
    if(ua.nn4)
        w=l[0].clip.width;
    else 
        w=ua.oldOpera?l[1].pixelWidth:l[0].offsetWidth;
    return w
};
function CT_getHeight(l)
{
    l=CT_el(l);
    var h;
    if(ua.nn4)
        h=l[0].clip.height;
    else 
        h=ua.oldOpera?l[1].pixelHeight:l[0].offsetHeight;
    return h
};
function CT_getTop(l)
{
    l=CT_el(l);
    return ua.nn4?l[0].y:l[0].offsetTop
};
function CT_getLeft(l)
{
    l=CT_el(l);
    return ua.nn4?l[0].x:l[0].offsetLeft
};
function CT_getAbsTop(l)
{
    l=CT_el(l);
    if(ua.nn4)
        return l[0].pageY;
    else
    {
        var o=l[0],y=CT_getTop(l[0]);
        while(Def(o=o.offsetParent))y+=o.offsetTop;
        return y
    }
};
function CT_getAbsLeft(l)
{
    l=CT_el(l);
    if(ua.nn4)
        return l[0].pageX;
    else
    {
        var o=l[0],l=CT_getLeft(l[0]);
        while(Def(o=o.offsetParent))l+=o.offsetLeft;
        return l
    }
};
function CT_lrStyle(w,h,t,l,a,v,bgc,bgi,cl,o,d,st,z,al)
{
    return 'position:'+(a?'absolute':'relative')+';overflow:'+(o||'hidden')+';visibility:'+(v?'inherit':'hidden')+
            (Def(t)?";top:"+t+"px":"")+(Def(l)?";left:"+l+"px":"")+(Def(w)?";width:"+w+"px":"")+(Def(h)?";height:"+h+"px":"")+
            (z?";z-index:"+z:"")+(bgc?";background-color:"+bgc:"")+(bgi?";background-image:url("+bgi+")":"")+
            (cl?";clip:rect("+cl[0]+"px "+cl[1]+"px "+cl[2]+"px "+cl[3]+"px)":"")+(d?";display:"+d:"")+";"+(st||'')+
            (Def(al)?
                ua.ie55up?';filter:progid:DXImageTransform.Microsoft.Alpha(Opacity='+al+')':
                         (ua.gecko?';-moz-opacity:':';opacity:')+al/100:
                '');
};
function CT_lrSource(id,w,h,t,l,a,v,css,bgc,bgi,cl,o,d,st,z,al,ev,html)
{
    var src='';
    if(ua.nn4)
    {
        if(Undef(cl)&&Def(h)&&Def(w)&&(Undef(o)||o=='hidden'))
            cl=[0,w,h,0];
        if(st)
            src="<style type=text/css>#"+id+"{"+st+"}</style>";
        src+=(a?'<':'<i')+'layer id='+id+(Def(t)?' top='+t:"")+(Def(l)?' left='+l:"")+(Def(w)?' width='+w:"")+(z?' z-index='+z:"")+' visibility='+(v?"inherit":"hide")+(cl?' clip="'+cl[3]+','+cl[0]+','+cl[1]+','+cl[2]+'"':"")+(bgc?' bgcolor="'+bgc+'"':"")+(bgi?' background="'+bgi+'"':"")
    }
    else 
        src='<div id="'+id+'" style="'+CT_lrStyle(w,h,t,l,a,v,bgc,bgi,cl,o,d,st,z,al)+'"';
    if(css)
        src+=' class="'+css+'"';
    if(Def(ev))
        for(var i=ev.length-1;i>=0;i-=2)
            src+=' on'+ev[i-1]+'="'+ev[i]+'"';
    return src+">"+(html||'')+'</'+(ua.nn4?(a?'':'i')+"layer>":"div>")
};
function CT_createLayer(id,w,h,t,l,a,v,css,bgc,bgi,cl,o,d,st,z,al,ev,html,p)
{
    var id=id||CodeThat.newID();
    var src=CT_lrSource(id,w,h,t,l,a,v,css,bgc,bgi,cl,o,d,st,z,al,ev,html);
    var parent=p||document.body;
    if(!CodeThat.loaded)
        dw(src);
    else if(ua.ie)
        parent.insertAdjacentHTML("BeforeEnd",src);
    else if(ua.dynDOM)
    {
        var lr=document.createElement('DIV');
        lr.setAttribute('id',id);
        if(Def(css))
            lr.setAttribute('className',css);
        lr.setAttribute('style',CT_lrStyle(w,h,t,l,a,v,bgc,bgi,cl,o,d,st,z,al));
        lr.innerHTML=html;
        if(Def(ev))
            for(var i=ev.length-1; i>=0; i-=2)
                lr.addEventListener(ev[i-1],new Function(ev[i]),0);
        parent.appendChild(lr)
    }
    else 
        return;
    return id
};
function CT_clear(l)
{
    CT_HTML(l,'')
};
function CT_vis(l,v)
{
    l=CT_el(l);
    l[1].visibility=v=='i'?"inherit":v?ua.nn4?"show":"visible":ua.nn4?"hide":"hidden"
};
function CT_inhvis(l,v)
{
    CT_vis(l,v?'i':0)
};
function CT_show(l)
{
    CT_vis(l,1)
};
function CT_hide(l)
{
    CT_vis(l,0)
};
function CT_showAt(l,x,y)
{
    l=CT_el(l);
    CT_moveTo(l[0],x,y);
    CT_show(l[0])
};
function CT_z(l,z)
{
    l=CT_el(l);
    l[1].zIndex=z
};
function CT_setWidth(l,w)
{
    l=CT_el(l);
    if(ua.nn4)
        l[0].resizeTo(w,CT_getHeight(l[0]));
    else if(ua.oldOpera)
        l[1].pixelWidth=w;
    else 
        l[1].width=w+"px"
};
function CT_setHeight(l,h)
{
    l=CT_el(l);
    if(ua.nn4)
        l[0].resizeTo(CT_getWidth(l[0]),h);
    else if(ua.oldOpera)
        l[1].pixelHeight=h;
    else 
        l[1].height=h+"px"
};
function CT_resize(l,w,h)
{
    l=CT_el(l);
    if(ua.nn4)
        l[0].resizeTo(w,h);
    else
    {
        CT_setHeight(l[0],h);
        CT_setWidth(l[0],w)
    }
};
function CT_setTop(l,y)
{
    l=CT_el(l);
    if(ua.nn4)
        l[1].y=y;
    else if(ua.oldOpera)
        l[1].pixelTop=y;
    else 
        l[1].top=y+"px"
};
function CT_setLeft(l,x)
{
    l=CT_el(l);
    if(ua.nn4)
        l[1].x=x;
    else if(ua.oldOpera)
        l[1].pixelLeft=x;
    else 
        l[1].left=x+"px"
};
function CT_moveTo(l,x,y)
{
    l=CT_el(l);
    if(ua.nn4)
        l[0].moveTo(x,y);
    else
    {
        CT_setTop(l[0],y);
        CT_setLeft(l[0],x)
    }
};
function CT_moveRel(l,dx,dy)
{
    l=CT_el(l);
    CT_moveTo(l[0],CT_getLeft(l[0])+dx,CT_getTop(l[0])+dy)
};
function CT_setBgColor(l,c)
{
    l=CT_el(l);
    if(!ua.nn4&&!ua.oldOpera)
        l[1].backgroundColor=c;
    else if(ua.nn4)
        l[1].bgColor=c;
    else if(ua.opera)
        l[1].background=c
};
function CT_setBgImage(l,url)
{
    l=CT_el(l);
    if(!ua.nn4&&!ua.oldOpera)
        l[1].backgroundImage='url('+url+')';
    else 
        l[1].background.src=url
};
function CT_clip(l,x,y,w,h)
{
    l=CT_el(l);
    if(ua.nn4)
    {
        var area=l[1].clip;
        area.top=y;
        area.left=x;
        area.width=w;
        area.height=h
    }
    else if(!ua.oldOpera)
        l[1].clip='rect('+y+'px '+(x+w)+'px '+(y+h)+'px '+x+'px)';
};
function CT_display(l,d)
{
    l=CT_el(l);
    l[1].display=d
};
function CT_overflow(l,o)
{
    l=CT_el(l);
    l[1].overflow=o
};
function CT_alpha(l,a)
{
    if(ua.ie)
    {
        if(ua.ie55up)
        {
            l=CT_el(l);
            l[1].filter='progid:DXImageTransform.Microsoft.Alpha(Opacity="'+a+'")'
        }
    }
    else 
        l[1].opacity=al/100
};
function CT_getVis(l)
{
    l=CT_el(l);
    var v=l[1].visibility;
    return Def(v)?v=="show"||v=="visible":v
};
function CT_getSize(l)
{
    l=CT_el(l);
    return[CT_getWidth(l[0]),CT_getHeight(l[0])]
};
function CT_getContentWidth(l)
{
    l=CT_el(l);
    return ua.nn4?l[0].document.width:ua.oldOpera?l[1].pixelWidth:ua.ie&&ua.win?l[0].scrollWidth:l[0].offsetWidth
};
function CT_getContentHeight(l)
{
    l=CT_el(l);
    return ua.nn4?l[0].document.height:ua.oldOpera?l[1].pixelHeight:ua.ie&&ua.win?l[0].scrollHeight:l[0].offsetHeight
};
function CT_getPos(l)
{
    l=CT_el(l);
    return[CT_getLeft(l[0]),CT_getTop(l[0])]
};
function CT_getAbsPos(l)
{
    l=CT_el(l);
    return[CT_getAbsLeft(l[0]),CT_getAbsTop(l[0])]
};
function CLayer()
{
    var a=arguments,t=this;
    t._ex=false;
    if(a.length==2&&typeof(a[0])=='number')
    {
        t._w=parseInt(a[0]);
        t._h=parseInt(a[1])
    }
    else if(a.length>=1&&typeof a[0]=='string')
        t.assignLayer(CodeThat.findLayer(a[0],a[1]));
    t._id=t._id||CodeThat.newID();
    t._HTML='';
    t._ev=[];
};

{
    var CLp=CLayer.prototype;
    CLp.assignLayer=function(oLr)
                    {
                        var t=this;
                        if(Undef(oLr))
                            oLr=t._id;
                        oLr=CT_el(oLr);
                        t._lr=oLr[0];
                        t._st=oLr[1];
                        t._ex=1;
                        return t
                    };
    CLp.setHTML=function(s)
                {
                    this._HTML=s;
                    if(this._ex)
                        CT_HTML(this._lr,s)
                };
    CLp.appendHTML=function(s)
                    {
                        this.setHTML(this._HTML+s)
                    };
    CLp.clear=function()
                {
                    this.setHTML('')
                };
    CLp.setVisible=function(v)
                    {
                        this._v=v;
                        if(this._ex)
                            CT_vis(this._lr,v)
                    };
    CLp.show=function()
                {
                    this.setVisible(1)
                };
    CLp.hide=function()
                {
                    this.setVisible(0)
                };
    CLp.showAt=function(x,y)
                {
                    CT_showAt(this._lr,x,y)
                };
    CLp.setZIndex=function(z)
                    {
                        this._z=z;
                        if(this._ex)
                            CT_z(this._lr,z)
                    };
    CLp.setWidth=function(w)
                    {
                        this._w=w;
                        if(this._ex)
                            CT_setWidth(this._lr,w);
                    };
    CLp.setHeight=function(h)
                    {
                        this._h=h;
                        if(this._ex)
                            CT_setHeight(this._lr,h)
                    };
    CLp.resize=CLp.setSize=function(w,h)
                            {
                                this.setHeight(h);
                                this.setWidth(w)
                            };
    CLp.setTop=function(y)
                {
                    this._t=y;
                    if(this._ex)
                        CT_setTop(this._lr,y)
                };
    CLp.setLeft=function(x)
                {
                    this._l=x;
                    if(this._ex)
                        CT_setLeft(this._lr,x)
                };
    CLp.moveTo=CLp.setPos=function(x,y)
                            {
                                var t=this;
                                t._l=x;
                                t._t=y;
                                if(t._ex)
                                    CT_moveTo(t._lr,x,y)
                            };
    CLp.setRel=function(r)
                {
                    this._rel=r
                };
    CLp.moveRel=function(dx,dy)
                {
                    this.moveTo(this.getLeft()+dx,this.getTop()+dy)
                };
    CLp.setCSS=function(css)
                {
                    this._css=css;
                    if(this._ex)
                        CT_css(this._lr,css)
                };
    CLp.setID=function(id)
                {
                    if(!this._ex)
                        this._id=id||CodeThat.newID();
                };
    CLp.setBgColor=function(c)
                    {
                        this._bgC=c;
                        if(this._ex)
                            CT_setBgColor(this._lr,c)
                    };
    CLp.setBgImage=function(url)
                    {
                        this._bgI=url;
                        if(this._ex)
                            CT_setBgImage(this._lr,url)
                    };
    CLp.clip=function(x,y,w,h)
                {
                    this._cl=[y,x+w,y+h,x];
                    if(this._ex)
                        CT_clip(this._lr,x,y,w,h)
                };
    CLp.setDisplay=function(d)
                    {
                        this._dsp=d;
                        if(this._ex)
                            CT_display(this._lr,d)
                    };
    CLp.setOverflow=function(o)
                    {
                        this._ov=o;
                        if(this._ex)
                            CT_overflow(this._lr,o)
                    };
    CLp.addEventHandler=function(ev,src)
                        {
                            this._ev.push([ev.toLowerCase(),src]);
                        };
    CLp.clearHandlers=function()
                        {
                            this._ev=[]
                        };
    CLp.setAlpha=function(a)
                    {
                        this._al=a;
                        if(this._ex)
                            CT_al(this._lr,a)
                    };
    CLp.addStyle=function(st)
                    {
                        this._sty=st
                    };
    CLp.object=function()
                {
                    return this._lr
                };
    CLp.getHTML=function()
                {
                    return this._HTML
                };
    CLp.getVisible=function()
                    {
                        return this._ex?CT_getVis(this._lr):this._v
                    };
    CLp.getWidth=function()
                    {
                        var t=this;
                        if(t._ex&&(!ua.nn4||Undef(t._w)))
                            t._w=CT_getWidth(t._lr);
                        return t._w
                    };
    CLp.getHeight=function()
                    {
                        var t=this;
                        if(t._ex&&(!ua.nn4||Undef(t._h)))
                            t._h=CT_getHeight(t._lr);
                        return t._h
                    };
    CLp.getSize=function()
                {
                    return[this.getWidth(),this.getHeight()]
                };
    CLp.getContentWidth=function()
                        {
                            return this._ex?CT_getContentWidth(this._lr):this._w
                        };
    CLp.getContentHeight=function()
                            {
                                return this._ex?CT_getContentHeight(this._lr):this._h
                            };
    CLp.getTop=function()
                {
                    return this._ex?CT_getTop(this._lr):this._t
                };
    CLp.getLeft=function()
                {
                    return this._ex?CT_getLeft(this._lr):this._l
                };
    CLp.getPos=function()
                {
                    return[this.getLeft(),this.getTop()]
                };
    CLp.getAbsoluteTop=function()
                        {
                            return this._ex?CT_getAbsTop(this._lr):this._t
                        };
    CLp.getAbsoluteLeft=function()
                        {
                            return this._ex?CT_getAbsLeft(this._lr):this._l
                        };
    CLp.getAbsolutePos=function()
                        {
                            return[this.getAbsoluteLeft(),this.getAbsoluteTop()]
                        };
    CLp.getID=function()
                {
                    return this._ex?this._lr.id||this._lr.name:this._id
                };
    CLp.getCSS=function()
                {
                    return this._ex?this._lr.className:this._css
                };
    CLp.remapEv=function()
                {
                    var i,e=this._ev,ev=[];
                    for(i=0; i<e.length; i++)
                    {
                        ev[2*i]=e[i][0].substr(2);
                        ev[2*i+1]=e[i][1]
                    }
                    return ev
                };
    CLp.getSource=function()
                    {
                        var t=this;
                        return CT_lrSource(t._id,t._w,t._h,t._t||0,t._l||0,!t._rel,t._v,t._css,t._bgC,t._bgI,t._cl,t._ov,t._dsp,t._st,t._z,t._al,t.remapEv(),t._HTML)
                    };
    CLp.create=function(p)
                {
                    var t=this;
                    if(t._ex)
                        return;
                    if(Def(CT_createLayer(t._id,t._w,t._h,t._t||0,t._l||0,!t._rel,t._v,t._css,t._bgC,t._bgI,t._cl,t._ov,t._dsp,t._st,t._z,t._al,t.remapEv(),t._HTML)))
                        t.assignLayer()
                };
}
function CTimer(p,id,sig,oS,n,ps,bef,betw,aft)
{
    this._par=p;
    this._id=id;
    this._sig=sig;
    this._o=oS;
    this._n=n;
    this._ps=ps||100;
    this._scr=[bef,betw,aft]
};

{
    var CTp=CTimer.prototype;
    CTp.run=function()
            {
                if(Undef(this._o))
                    return;
                this._i=0;
                if(Def(this._scr[0]))
                    eval(this._scr[0]);
                this._to=setTimeout(this+'.step()',this._ps)
            };
    CTp.step=function()
                {
                    var t=this;
                    if(t._o)
                        t._o.onTimer();
                    if(Def(t._scr[1]))
                        eval(t._scr[1]);
                    t._i++;
                    if(t._i<t._n)
                        t._to=setTimeout(t+'.step()',t._ps);
                    else 
                        t.finish()
                };
    CTp.stop=function()
                {
                    this.pause();
                    this.finish()
                };
    CTp.pause=function()
                {
                    clearTimeout(this._to);
                    this._to=null
                };
    CTp.paused=function()
                {
                    return this._to==null
                };
    CTp.on=function()
            {
                this.step()
            };
    CTp.finish=function()
                {
                    if(Def(this._scr[2]))
                        eval(this._scr[2]);
                    if(this._sig)
                        this._par.sig_stop(this._id)
                };
    CTp.toString=function()
                    {
                        return this._par.getObjPath(this._id)
                    };
}
function CSlideAnimation(oPar,id,sig,aCL,aP,df,dt,bef,betw,aft)
{
    var i,dx,dy,n,t=this;
    t.base=CTimer;
    t._l=aCL;
    t._x=[];
    t._y=[];
    t._st_x=[];
    t._st_y=[];
    for(i=0; i<t._l.length; i++)
    {
        t._x[i]=t._l[i].getLeft();
        t._y[i]=t._l[i].getTop();
        dx=aP[i][0]-t._x[i];
        dy=aP[i][1]-t._y[i];
        if(!i)
            n=Math.floor(Math.sqrt(dx*dx+dy*dy)/df);
        t._st_x[i]=dx/n;
        t._st_y[i]=dy/n
    }
    t.base(oPar,id,sig,t,n,dt,bef,betw,aft)
};
CSlideAnimation.prototype=new CTimer;
CSlideAnimation.prototype.onTimer=function()
                                    {
                                        var i,t=this;
                                        for(i=0; i<t._l.length; i++)
                                        {
                                            t._x[i]+=t._st_x[i];
                                            t._y[i]+=t._st_y[i];
                                            t._l[i].moveTo(Math.round(t._x[i]),Math.round(t._y[i]))
                                        }
                                    };
function CClipAnimation(oPar,id,sig,oCL,aP,n,ps,bef,betw,aft)
{
    var i,t=this;
    t.base=CTimer;
    t._l=oCL;
    t._c=oCL.getClip();
    t._st=[];
    for(i=0; i<4; i++)
        t._st[i]=(aP[i]-t._c[i])/n;
    this.base(oPar,id,sig,t,n,ps,bef,betw,aft)
};
CClipAnimation.prototype=new CTimer;
CClipAnimation.prototype.onTimer=function()
                                    {
                                        var i=0,c=this._c;
                                        for(; i<4; i++)
                                            c[i]+=this._st[i];
                                        this._l.clip(c[3],c[0],c[1]-c[3],c[2]-c[0])
                                    };
function CAniCollection(id)
{
    var t=this;
    t._id=id;
    t._c=0;
    t._a=[];
    t.slideAni=CSlideAnimation;
    t.clipAni=CClipAnimation;
    t.SLIDE='slideAni';
    t.CLIP='clipAni'
};

{
    var CCp=CAniCollection.prototype;
    CCp.add=function()
            {
                var id='s'+this._c++,a=arguments;
                var o=new this[a[0]](this,id,a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]);
                this._a[id]=o;
                return id
            };
    CCp.remove=function(t_id)
                {
                    delete this._a[t_id]
                };
    CCp.run=function(t_id)
            {
                if(Undef(this._a[t_id]))
                    return;
                this._a[t_id].run()
            };
    CCp.obj=function(t_id)
            {
                return this._a[t_id]
            };
    CCp.sig_stop=function(t_id)
                    {
                        setTimeout(this._id+".remove('"+t_id+"')",1)
                    };
    CCp.getObjPath=function(t_id)
                    {
                        return this._id+'._a.'+t_id
                    };
    var CLp=CLayer.prototype;
    CLp.slide=function(x,y,st,tm,bef,betw,aft)
                {
                    var a=arguments;
                    var s=CodeThat.Ani.add(CodeThat.Ani.SLIDE,true,[this],[[x,y]],st,tm,bef,betw,aft);
                    CodeThat.Ani.run(s);
                    return s
                };
    CLp.slideRel=function(dx,dy,st,tm,bef,betw,aft)
                    {
                        var a=arguments;
                        var s=CodeThat.Ani.add(CodeThat.Ani.SLIDE,true,[this],[[this.getLeft()+dx,this.getTop()+dy]],st,tm,bef,betw,aft);
                        CodeThat.Ani.run(s);
                        return s
                    };
    CLp.clipSlide=function(l,t,r,b,n,tm,bef,betw,aft)
                    {
                        var s=CodeThat.Ani.add(CodeThat.Ani.CLIP,true,this,[t,r,b,l],n,tm,bef,betw,aft);
                        CodeThat.Ani.run(s);
                        return s
                    };
    CLp.clipMove=function(l,t,n,tm,bef,betw,aft)
                    {
                        var c=this.getClip();
                        var dx=l-c[3],dy=t-c[0];
                        var s=CodeThat.Ani.add(CodeThat.Ani.CLIP,true,this,[t,c[1]+dx,c[2]+dy,l],n,tm,bef,betw,aft);
                        CodeThat.Ani.run(s);
                        return s
                    };
}

CodeThat.Ani=new CAniCollection('CodeThat.Ani');