<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/barrasMenu/barra1.js -->
    <STYLE TYPE=text/css>
    A:link {color:navy; TEXT-DECORATION: none;}
    A:visited {color:navy; TEXT-DECORATION: none;}
    A:hover {color:red; TEXT-DECORATION: underline;}
    input.botoes  { BACKGROUND-COLOR: #efefef; COLOR: black; FONT-SIZE: 10pt; FONT-WEIGHT: normal; border-right:2px solid black; border-left:1px solid gray; border-top:1px solid gray; border-bottom:2px solid black;}
    </STYLE>


<style type="text/css">

</style>


<script type="text/javascript" language="JavaScript">
/********************************************************************************
Copyright (C) 1999 Thomas Brattli
This script is made by and copyrighted to Thomas Brattli at www.bratta.com
Visit for more great scripts. This may be used freely as long as this msg is intact!
I will also appriciate any links you could give me.
********************************************************************************/
//Default browsercheck, added to all scripts!

var isMinNS4=(navigator.appName.indexOf("Netscape")>=0&&parseFloat(navigator.appVersion)>=4) ? 1 : 0;
var isMinIE4=(document.all) ? 1 : 0;
var isMinIE5=(isMinIE4&&navigator.appVersion.indexOf("5.")>=0) ? 1 : 0;

var larguraTela = screen.width;
var altura = "height='100%' ";   
var largura = " width='170' ";
  
//desenha a tabela que envolve todo o menu (de acordo com a resolucao)
function desenhaTabela(siglaDoSistema,nomeSistema ,nomeRealSistema,versao)
{
    linha = "<BR><BR>";                       
    desenhaInicioTabela(siglaDoSistema, nomeSistema, nomeRealSistema, altura, largura);
    document.writeln(linha);
    desenhaFinalTabela(siglaDoSistema, nomeSistema, nomeRealSistema, altura, largura,versao);
}

function desenhaInicioTabela(siglaDoSistema, nomeSistema,nomeRealSistema, altura, largura) {
    texto = "";
    texto += "<table "+altura+"><Tr><Td bgcolor='black' "+altura+"><table "+largura+" "+altura+" bgcolor='white' cellspacing=1 cellpadding=0 border=0 >";
    if(nomeRealSistema == "ADI_ControleDeProjetos" || nomeRealSistema == "ADI_HelpDesk" || nomeRealSistema == "ADI_GerenciaDeTelas" || nomeRealSistema == "ADI_LicencaSistema" || nomeRealSistema == "ADI_DamAnual" || nomeRealSistema == "ADI_AtualizacaoDeSistema" || nomeRealSistema == "ADI_Implantacao" || nomeRealSistema == "ADI_Conversao") {
        texto += "<tr><td height=15 background='/ADI_Intranet_Root/"+ nomeRealSistema +"/bin/imagens/barraCor.jpg'><center><font size=2 face='Helvetica'>"+ nomeSistema +"</td></tr>";
    } else if (nomeRealSistema == "segurancaIntranet"){
	    		texto += "<tr><td height=15 background='/ADI_Intranet_Root/ADI_Intranet/package/"+nomeRealSistema+"/bin/imagens/barraCor.jpg'><center><font size=2 face='Helvetica'>"+ nomeSistema +"</td></tr>";
               }else {
                      texto += "<tr><td height=15 background='/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/"+ nomeRealSistema +"/bin/imagens/barraCor.jpg'><center><font size=2 face='Helvetica'>"+ nomeSistema +"</td></tr>";
                     }
    texto += "<Tr><Td "+altura+" bgcolor='#efefef' valign='top'>";
    document.writeln(texto);    

}    

function desenhaFinalTabela(siglaDoSistema, nomeSistema,nomeRealSistema, altura, largura, versao)
{
    texto = "";
    texto += "</td></tr>";
    if(nomeRealSistema == "ADI_ControleDeProjetos" || nomeRealSistema == "ADI_HelpDesk" || nomeRealSistema == "ADI_GerenciaDeTelas" || nomeRealSistema == "ADI_LicencaSistema"  || nomeRealSistema == "ADI_DamAnual" || nomeRealSistema == "ADI_AtualizacaoDeSistema" || nomeRealSistema == "ADI_Implantacao" || nomeRealSistema == "ADI_Conversao") {
        texto += "<tr><td height=15 background='/ADI_Intranet_Root/"+nomeRealSistema+"/bin/imagens/barraCor.jpg' align='right'><font size=1 face='Helvetica'>v"+ versao +"&nbsp;</td></Tr>";
    } else if (nomeRealSistema == "segurancaIntranet"){
	    		texto += "<tr><td height=15 background='/ADI_Intranet_Root/ADI_Intranet/package/"+nomeRealSistema+"/bin/imagens/barraCor.jpg' align='right'><font size=1 face='Helvetica'>v"+ versao +"&nbsp;</td></Tr>";
               }else {
	                   texto += "<tr><td height=15 background='/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/"+nomeRealSistema+"/bin/imagens/barraCor.jpg' align='right'><font size=1 face='Helvetica'>v"+ versao +"&nbsp;</td></Tr>";
                     }
    texto += "</table></td></tr></table>";   
    document.writeln(texto);    
    var comecoTabela;

}

function preparaTabela(){
}

//define o tamanho máximo do menu
function definirTamanhoMaximo()
{
    oFoldMenu.maxheight = "100%";
    oFoldMenu.width = 160; 
}

function checkBrowser(){
    this.ver=navigator.appVersion
    this.dom=document.getElementById?1:0
    this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom)?1:0;
    this.ie4=(document.all && !this.dom)?1:0;
    this.ns5=(this.dom && parseInt(this.ver) >= 5) ?1:0;
    this.ns4=(document.layers && !this.dom)?1:0;
    this.bw=(this.ie5 || this.ie4 || this.ns4 || this.ns5)
    return this
}
bw=new checkBrowser()
/************************************************************************************
Making cross-browser objects
************************************************************************************/
function makeMenuObj(obj,nest,img,offimage,onimage){
    nest=(!nest) ? '':'document.'+nest+'.'
    this.css=bw.dom? document.getElementById(obj).style:bw.ie4?document.all[obj].style:bw.ns4?eval(nest+"document.layers." +obj):0;
    this.el=bw.dom?document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?eval(nest+'document.'+obj):0;
    this.ref=bw.dom || bw.ie4? document:bw.ns4?this.css.document:0;
    this.x=(bw.ns4 || bw.ns5)? this.css.left:this.css.offsetLeft;
    this.y=(bw.ns4 || bw.ns5)? this.css.top:this.css.offsetTop;
    this.height=bw.ns4?this.ref.height:this.el.offsetHeight;
    this.hideIt=b_hideIt; this.showIt=b_showIt; this.movey=b_movey
    this.status=0;
    this.swap=b_swap
    if(onimage)this.onimage=onimage.src
    this.offimage=offimage
    if(img)this.img=this.ref.images[img]
    return this
}
function b_showIt(){this.css.visibility="visible"; this.status=1}
function b_hideIt(){this.css.visibility="hidden"; this.status=0}
function b_movey(y){this.y=y; this.css.top=this.y}
function b_swap(on){
    if(this.onimage && on){
        this.img.src=this.onimage
    }else if(this.onimage && !on){
        this.img.src=this.offimage
    }
}

/********************************************************************************
Making menuobjects
********************************************************************************/
function foldoutMenuObj(name){
    this.menus=new Array()
    this.name=name;
    this.makeStyle=fold_style
    this.make=fold_make
    this.construct=fold_construct
    this.fold=fold
    this.foldstay=fold_stay
    this.foldsub=fold_sub
    this.foldsubstay=fold_sub_stay
    this.foldsub2=fold_sub2
    this.foldsub2stay=fold_sub2_stay
    this.foldsub3=fold_sub3
    this.foldsub3stay=fold_sub3_stay
    this.foldsub4=fold_sub4
    this.foldsub4stay=fold_sub4_stay
    this.placeAll=fold_placeAll;
    this.menus=new Array()
    this.a=0; this.b; this.c; this.d; this.e; this.f
    this.initexec=''
    this.opn=fold_opn;
}


/********************************************************************************
Initiating page, making objects..
********************************************************************************/
function fold_construct(){
    this.container=new makeMenuObj('div'+this.name+'Cont')
    this.menu=new Array()
    menuheight=0;
    for(i=0;i<this.menus.length;i++){
        this.menu[i]=new makeMenuObj('div'+this.name+i,'div'+this.name+'Cont',this.menus[i].img,this.menus[i].offimage,this.menus[i].onimage)
        this.menu[i].subs=this.menus[i].subs
        this.menu[i].sub=new Array()
        for(j=0;j<this.menu[i].subs;j++){
            this.menu[i].sub[j]=new makeMenuObj('div'+this.name+i+"_"+j,'div'+this.name+'Cont',this.menus[i][j].img,this.menus[i][j].offimage,this.menus[i][j].onimage)
            this.menu[i].sub[j].subs=this.menus[i][j].subs
            this.menu[i].sub[j].sub=new Array()
            for(a=0;a<this.menu[i].sub[j].subs;a++){
                this.menu[i].sub[j].sub[a]=new makeMenuObj('div'+this.name+i+"_"+j+"_"+a,'div'+this.name+'Cont',this.menus[i][j][a].img,this.menus[i][j][a].offimage,this.menus[i][j][a].onimage)
                this.menu[i].sub[j].sub[a].subs=this.menus[i][j][a].subs
                this.menu[i].sub[j].sub[a].sub=new Array()
                for(o=0;o<this.menu[i].sub[j].sub[a].subs;o++){
                    this.menu[i].sub[j].sub[a].sub[o]=new makeMenuObj('div'+this.name+i+"_"+j+"_"+a+"_"+o,'div'+this.name+'Cont',this.menus[i][j][a][o].img,this.menus[i][j][a][o].offimage,this.menus[i][j][a][o].onimage)
                    this.menu[i].sub[j].sub[a].sub[o].subs=this.menus[i][j][a][o].subs
                    this.menu[i].sub[j].sub[a].sub[o].sub=new Array()
                    for(p=0;p<this.menu[i].sub[j].sub[a].sub[o].subs;p++){
                        this.menu[i].sub[j].sub[a].sub[o].sub[p]=new makeMenuObj('div'+this.name+i+"_"+j+"_"+a+"_"+o+"_"+p,'div'+this.name+'Cont',this.menus[i][j][a][o][p].img,this.menus[i][j][a][o][p].offimage,this.menus[i][j][a][o][p].onimage)
                        this.menu[i].sub[j].sub[a].sub[o].sub[p].subs=this.menus[i][j][a][o][p].subs
                        this.menu[i].sub[j].sub[a].sub[o].sub[p].sub=new Array()
                        for(z=0;z<this.menu[i].sub[j].sub[a].sub[o].sub[p].subs;z++){
                            this.menu[i].sub[j].sub[a].sub[o].sub[p].sub[z]=new makeMenuObj('div'+this.name+i+"_"+j+"_"+a+"_"+o+"_"+p+"_"+z,'div'+this.name+'Cont')
                        }
                    }
                }
            }
        }
    }
    this.menus=""
    if(this.initexec) eval(this.initexec)
    else this.placeAll()
    this.container.showIt()
}
function fold_opn(a,b,c,d,e,f){
    if(a>-1) this.initexec+="this.fold("+a+","+this.substay+");"
    if(b>-1) this.initexec+="this.foldsub("+a+","+b+","+this.sub2stay+");"
    if(c>-1) this.initexec+="this.foldsub2("+a+","+b+","+c+","+this.sub3stay+");"
    if(d>-1) this.initexec+="this.foldsub3("+a+","+b+","+c+","+d+","+this.sub4stay+");"
    if(e>-1) this.initexec+="this.foldsub4("+a+","+b+","+c+","+d+","+e+","+this.sub5stay+");"
    if(f>-1) this.initexec+="this.foldsub5("+a+","+b+","+c+","+d+","+e+","+f+","+this.sub6stay+");"
}
/********************************************************************************
The first sub menus
********************************************************************************/
function fold_stay(a){
    for(z=0;z<this.menu.length;z++){
        if(z!=a) this.fold(z,1,1)
    }
    this.fold(a,1,0)
}
function fold(a,fromtop,noplace){
    if(fromtop){
        for(b=0;b<this.menu[a].subs;b++){
            if(this.menu[a].sub[b].status || noplace){
                this.menu[a].sub[b].hideIt()
                this.menu[a].swap(0)
                this.foldsub(a,b,1,1)
            }else{
                this.menu[a].sub[b].showIt()
                this.menu[a].swap(1)
            }
        }
        if(!noplace) this.placeAll()
    }else this.foldstay(a)
}
/********************************************************************************
The second sub level menus
********************************************************************************/
function fold_sub_stay(a,b){
    for(z=0;z<this.menu[a].subs;z++){
        if(b!=z) this.foldsub(a,z,1,1)
    }
    this.foldsub(a,b,1,0)
}
function fold_sub(a,b,fromtop,noplace){
    if(fromtop){
        for(c=0;c<this.menu[a].sub[b].subs;c++){
            if(this.menu[a].sub[b].sub[c].status || noplace){
                this.menu[a].sub[b].sub[c].hideIt()
                this.menu[a].sub[b].swap(0)
                this.foldsub2(a,b,c,1,1)
            }else{
                this.menu[a].sub[b].sub[c].showIt()
                this.menu[a].sub[b].swap(1)
            }
        }
        if(!noplace) this.placeAll()
    }else this.foldsubstay(a,b)
}
/********************************************************************************
The third sub level menus
********************************************************************************/
function fold_sub2_stay(a,b,c){
    for(z=0;z<this.menu[a].sub[b].subs;z++){
        if(c!=z) this.foldsub2(a,b,z,1,1)
    }
    this.foldsub2(a,b,c,1,0)
}
function fold_sub2(a,b,c,fromtop,noplace){
    if(fromtop){
        for(d=0;d<this.menu[a].sub[b].sub[c].subs;d++){
            if(this.menu[a].sub[b].sub[c].sub[d].status || noplace){
                this.menu[a].sub[b].sub[c].sub[d].hideIt()
                this.menu[a].sub[b].sub[c].swap(0)
                this.foldsub3(a,b,c,d,1,1)
            }else{
                this.menu[a].sub[b].sub[c].sub[d].showIt()
                this.menu[a].sub[b].sub[c].swap(1)
            }
        }
        if(!noplace) this.placeAll()
    }else this.foldsub2stay(a,b,c)
}
/********************************************************************************
The fourth sub level menus
********************************************************************************/
function fold_sub3_stay(a,b,c,d){
    for(z=0;z<this.menu[a].sub[b].sub[c].subs;z++){
        if(z!=d) this.foldsub3(a,b,c,z,1,1)
    }
    this.foldsub3(a,b,c,d,1,0)
}
function fold_sub3(a,b,c,d,fromtop,noplace){
    if(fromtop){
        for(e=0;e<this.menu[a].sub[b].sub[c].sub[d].subs;e++){
            if(this.menu[a].sub[b].sub[c].sub[d].sub[e].status || noplace){
                this.menu[a].sub[b].sub[c].sub[d].sub[e].hideIt()
                this.menu[a].sub[b].sub[c].sub[d].swap(0)
                this.foldsub4(a,b,c,d,e,1,1)
            }else{
                this.menu[a].sub[b].sub[c].sub[d].sub[e].showIt()
                this.menu[a].sub[b].sub[c].sub[d].swap(1)
            }
        }
        if(!noplace) this.placeAll()
    }else this.foldsub3stay(a,b,c,d)
}
/********************************************************************************
The fifth sub level menus
********************************************************************************/
function fold_sub4_stay(a,b,c,d,e){
    for(z=0;z<this.menu[a].sub[b].sub[c].sub[d].subs;z++){
        if(z!=e) this.foldsub4(a,b,c,d,z,1,1)
    }
    this.foldsub4(a,b,c,d,e,1,0)
}
function fold_sub4(a,b,c,d,e,fromtop,noplace){
    if(fromtop){
        for(f=0;f<this.menu[a].sub[b].sub[c].sub[d].sub[e].subs;f++){
            if(this.menu[a].sub[b].sub[c].sub[d].sub[e].sub[f].status || noplace){
                this.menu[a].sub[b].sub[c].sub[d].sub[e].sub[f].hideIt()
                this.menu[a].sub[b].sub[c].sub[d].sub[e].swap(0)
            }else{
                this.menu[a].sub[b].sub[c].sub[d].sub[e].sub[f].showIt()
                this.menu[a].sub[b].sub[c].sub[d].sub[e].swap(1)
            }
        }
        if(!noplace) this.placeAll()
    }else this.foldsub4stay(a,b,c,d,e)
}
/********************************************************************************
Placing all layers correctly
********************************************************************************/
function fold_placeAll(){
    menuheight=0;
    for(i=0;i<this.menu.length;i++){
        this.menu[i].movey(menuheight)
        menuheight+=this.menu[i].height+this.menubetween
        for(j=0;j<this.menu[i].subs;j++){
            this.menu[i].sub[j].movey(menuheight)
            if(this.menu[i].sub[j].status) menuheight+=this.menu[i].sub[j].height+this.menubetween
            for(a=0;a<this.menu[i].sub[j].subs;a++){
                this.menu[i].sub[j].sub[a].movey(menuheight)
                if(this.menu[i].sub[j].sub[a].status) menuheight+=this.menu[i].sub[j].sub[a].height+this.menubetween
                for(o=0;o<this.menu[i].sub[j].sub[a].subs;o++){
                    this.menu[i].sub[j].sub[a].sub[o].movey(menuheight)
                    if(this.menu[i].sub[j].sub[a].sub[o].status) menuheight+=this.menu[i].sub[j].sub[a].sub[o].height+this.menubetween
                    for(p=0;p<this.menu[i].sub[j].sub[a].sub[o].subs;p++){
                        this.menu[i].sub[j].sub[a].sub[o].sub[p].movey(menuheight)
                        if(this.menu[i].sub[j].sub[a].sub[o].sub[p].status) menuheight+=this.menu[i].sub[j].sub[a].sub[o].sub[p].height+this.menubetween
                        for(z=0;z<this.menu[i].sub[j].sub[a].sub[o].sub[p].subs;z++){
                            this.menu[i].sub[j].sub[a].sub[o].sub[p].sub[z].movey(menuheight)
                            if(this.menu[i].sub[j].sub[a].sub[o].sub[p].sub[z].status) menuheight+=this.menu[i].sub[j].sub[a].sub[o].sub[p].sub[z].height+this.menubetween
                        }
                    }
                }
            }
        }
    }
}

/********************************************************************************
Functions to write out the layers...Should be moved server-side
********************************************************************************/

function fold_style(){
    str='\n<style type="text/css">\n'
    str+='\tDIV.cl'+this.name+'{position:absolute; '+ this.clFold +'; width:'+this.width+'; height:20}\n'
    str+='\tDIV.cl'+this.name+'Sub{position:absolute; '+ this.clSub +';height:20; width:'+this.width+'; visibility:hidden}\n'
    str+='\tDIV.cl'+this.name+'Sub2{position:absolute; '+ this.clSub2 +';height:20; width:'+this.width+'; visibility:hidden}\n'
    str+='\tDIV.cl'+this.name+'Sub3{position:absolute; '+ this.clSub3 +';height:20; width:'+this.width+'; visibility:hidden}\n'
    str+='\tDIV.cl'+this.name+'Sub4{position:absolute; '+ this.clSub4 +';height:20; width:'+this.width+'; visibility:hidden}\n'
    str+='\tDIV.cl'+this.name+'Sub5{position:absolute; '+ this.clSub5 +';height:20; width:'+this.width+'; visibility:hidden}\n'
    str+='\t#div'+this.name+'Cont{'+this.clCont+'; left:'+this.left+'; top:'+this.top+'; height:'+this.maxheight+'; width:'+this.width+'; visibility:hidden}\n'
    str+='\tA.cl'+this.name+'Links{'+this.clFoldLinks+'}\n'
    str+='\tA.cl'+this.name+'1Links{'+this.clSubLinks+'}\n'
    str+='\tA.cl'+this.name+'2Links{'+this.clSub2Links+'}\n'
    str+='\tA.cl'+this.name+'3Links{'+this.clSub3Links+'}\n'
    str+='\tA.cl'+this.name+'4Links{'+this.clSub4Links+'}\n'
    str+='\tA.cl'+this.name+'5Links{'+this.clSub5Links+'}\n'
    str+='</style>\n\n\n'
    document.write(str)
}
function fold_make_link(text,lnk,target,offimage,id,cl,ev,acl){
    str2='\t<div id="div'+id+'" class="cl'+cl+'"><a href="'
    if(lnk)    str2+=lnk+'" '
    else str2+='#" '
    if(!lnk || target){
        str2+='onclick="'+ev+'; if(bw.ie5 || bw.ie4) this.blur()'
        if(!target) str2+='; return false'; str2+='"'
    }
    if(target) str2+=' target="'+target+'"'; str2+=' class="cl'+acl+'Links">'
    if(offimage) str2+='<img src="'+offimage+'" name="img'+id+'" border="0">'
    str2+=text+'</a><br></div>\n'
    return str2
}

function fold_make(type,text,lnk,target,offimage,onimage,fc,opn,end){
    str="" ; fc=fc?fc+'; ':'';
    if(!offimage) offimage=""; if(!onimage) onimage=""
    if(this.a==0) str='<div id="div'+this.name+'Cont">\n'
    if(type=="top"){
        id=this.name+this.a
        str+=fold_make_link(text,lnk,target,offimage,this.name+this.a,this.name,fc+this.name+'.fold('+this.a+','+this.name+'.substay)',this.name)
        this.menus[this.a]=new Array()
        this.menus[this.a].subs=0
        if(onimage){ this.menus[this.a].onimage=new Image(); this.menus[this.a].onimage.src=onimage; this.menus[this.a].offimage=offimage; this.menus[this.a].img='img'+id}
        this.a++; this.b=0; if(opn) this.opn(this.a)
    }else if(type=="sub"){
        id=this.name+(this.a-1)+'_'+(this.b),this.name+'Sub'
        str+=fold_make_link(text,lnk,target,offimage,id,this.name+'Sub',fc+this.name+'.foldsub('+(this.a-1)+','+(this.b)+','+this.name+'.sub2stay)',this.name+'1')
        if(opn) this.opn(this.a-1,this.b)
        this.menus[this.a-1][this.b]=new Array()
        if(onimage){ this.menus[this.a-1][this.b].onimage=new Image(); this.menus[this.a-1][this.b].onimage.src=onimage; this.menus[this.a-1][this.b].offimage=offimage; this.menus[this.a-1][this.b].img='img'+id}
        this.b++; this.menus[this.a-1].subs=this.b; this.c=0
    }else if(type=="sub2"){
        id=this.name+(this.a-1)+'_'+(this.b-1)+'_'+(this.c)
        str+=fold_make_link(text,lnk,target,offimage,id,this.name+'Sub2',fc+this.name+'.foldsub2('+(this.a-1)+','+(this.b-1)+','+(this.c)+','+this.name+'.sub3stay)',this.name+'2')
        if(opn) this.opn(this.a-1,this.b-1,this.c)
        this.menus[this.a-1][this.b-1][this.c]=new Array()
        if(onimage){ this.menus[this.a-1][this.b-1][this.c].onimage=new Image(); this.menus[this.a-1][this.b-1][this.c].onimage.src=onimage; this.menus[this.a-1][this.b-1][this.c].offimage=offimage; this.menus[this.a-1][this.b-1][this.c].img='img'+id}
        this.c++; this.menus[this.a-1][this.b-1].subs=this.c; this.d=0
    }else if(type=="sub3"){
        id=this.name+(this.a-1)+'_'+(this.b-1)+'_'+(this.c-1)+'_'+(this.d)
        str+=fold_make_link(text,lnk,target,offimage,id,this.name+'Sub3',fc+this.name+'.foldsub3('+(this.a-1)+','+(this.b-1)+','+(this.c-1)+','+this.d+','+this.name+'.sub4stay)',this.name+'3')
        if(opn) this.opn(this.a-1,this.b-1,this.c-1,this.d)
        this.menus[this.a-1][this.b-1][this.c-1][this.d]=new Array()
        if(onimage){ this.menus[this.a-1][this.b-1][this.c-1][this.d].onimage=new Image(); this.menus[this.a-1][this.b-1][this.c-1][this.d].onimage.src=onimage; this.menus[this.a-1][this.b-1][this.c-1][this.d].offimage=offimage; this.menus[this.a-1][this.b-1][this.c-1][this.d].img='img'+id}
        this.d++; this.menus[this.a-1][this.b-1][this.c-1].subs=this.d; this.e=0
    }else if(type=="sub4"){
        id=this.name+(this.a-1)+'_'+(this.b-1)+'_'+(this.c-1)+'_'+(this.d-1)+'_'+(this.e)
        str+=fold_make_link(text,lnk,target,offimage,id,this.name+'Sub4',fc+this.name+'.foldsub4('+(this.a-1)+','+(this.b-1)+','+(this.c-1)+','+(this.d-1)+','+this.e+','+this.name+'.sub5stay)',this.name+'4')
        if(opn) this.opn(this.a-1,this.b-1,this.c-1,this.d-1,this.e)
        this.menus[this.a-1][this.b-1][this.c-1][this.d-1][this.e]=new Array()
        if(onimage){ this.menus[this.a-1][this.b-1][this.c-1][this.d-1][this.e].onimage=new Image(); this.menus[this.a-1][this.b-1][this.c-1][this.d-1][this.e].onimage.src=onimage; this.menus[this.a-1][this.b-1][this.c-1][this.d-1][this.e].offimage=offimage; this.menus[this.a-1][this.b-1][this.c-1][this.d-1][this.e].img='img'+id}
        this.e++; this.menus[this.a-1][this.b-1][this.c-1][this.d-1].subs=this.e; this.f=0
    }else if(type=="sub5"){
        str+='\t\t\t<div id="div'+this.name+(this.a-1)+'_'+(this.b-1)+'_'+(this.c-1)+'_'+(this.d-1)+'_'+(this.e-1)+'_'+(this.f)+'" class="cl'+this.name+'Sub5"><a href="'+lnk+'" onclick="'+fc+'" class="cl'+this.name+'5Links"'
        if(target) str+=' target="+target+"'
        str+='>'+text+'</a><br></div>\n'
        if(opn) this.opn(this.a-1,this.b-1,this.c-1,this.d-1,this.e-1,this.f)
        this.f++; this.menus[this.a-1][this.b-1][this.c-1][this.d-1][this.e-1].subs=this.f
    }
    if(end) str+="</div>"
    document.write(str)
}

</script>
