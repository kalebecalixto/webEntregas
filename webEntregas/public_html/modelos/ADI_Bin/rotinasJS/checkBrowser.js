<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/checkBrowser.js -->
/**
 * Função que identifica o nome do brawser
 * @version 1.0 01/01/2003
 * @author Copyright (C) 1999 Thomas Brattli - Adaptado por Alexandre
 * @return Navegador
 * @see makeObj
 * @see b_moveIt
 * @see newsScroll
 * @see newsScrollInit
 */

/********************************************************************************
Copyright (C) 1999 Thomas Brattli
********************************************************************************/
//Default browsercheck, added to all scripts!
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

//The pixel value of where you want the layer to start (from the top)
lstart=170

//Set this to false if you just want it to go one time
loop=true

//Set the speed, lower value gives more speed
speed=50

//Set this to how many pixels you want it to go for each step, this also changes the speed.
pr_step=1


/**
 * Função que define o objeto construtor
 * @version 1.0 01/01/2003
 * @author Copyright (C) 1999 Thomas Brattli - Adaptado por Alexandre
 * @param obj objeto de visualização
 * @param nest Formulário do browser
 * @return objeto objeto relacionado com o browser
 * @see b_moveIt
 * @see newsScroll
 * @see newsScrollInit
 * @see checkBrowser
 */

 function makeObj(obj,nest){
    nest=(!nest) ? '':'document.'+nest+'.'
    this.el=bw.dom?document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?eval(nest+'document.'+obj):0;
    this.css=bw.dom?document.getElementById(obj).style:bw.ie4?document.all[obj].style:bw.ns4?eval(nest+'document.'+obj):0;
    this.scrollHeight=bw.ns4?this.css.document.height:this.el.offsetHeight
    this.newsScroll=newsScroll;
    this.moveIt=b_moveIt; this.x; this.y;
    this.obj = obj + "Object"
    eval(this.obj + "=this")
    return this
}


/**
 * Função que define a css utilizada
 * @version 1.0 01/01/2003
 * @author Copyright (C) 1999 Thomas Brattli - Adaptado por Alexandre
 * @param x Posição x do plano Carteziano
 * @param y Posição y do plano Carteziano
 * @see makeObj
 * @see newsScroll
 * @see newsScrollInit
 * @see checkBrowser
 */
function b_moveIt(x,y){
    this.x=x;this.y=y
    this.css.left=this.x
    this.css.top=this.y
}


/**
 * Função que define velocidade e tempo da abertura de scroll
 * @version 1.0 01/01/2003
 * @author Copyright (C) 1999 Thomas Brattli - Adaptado por Alexandre
 * @param speed Velocidade de abertura
 * @see makeObj
 * @see b_moveIt
 * @see newsScrollInit
 * @see checkBrowser
 */
function newsScroll(speed){
    if(this.y>-this.scrollHeight)
				{
        this.moveIt(0,this.y-pr_step)
        setTimeout(this.obj+".newsScroll("+speed+")",speed)
    }else if(loop)
				      {
             this.moveIt(0,lstart)
             eval(this.obj+".newsScroll("+speed+")")
          }
}


/**
 * Função que define um novo scroll de início
 * @version 1.0 01/01/2003
 * @author Copyright (C) 1999 Thomas Brattli - Adaptado por Alexandre
 * @see makeObj
 * @see b_moveIt
 * @see newsScroll
 * @see checkBrowser
 */
//Makes the object
function newsScrollInit(){
    oNewsCont=new makeObj('divNewsCont')
    oNewsScroll=new makeObj('divNewsText','divNewsCont')
    oNewsScroll.moveIt(0,lstart)
    oNewsCont.css.visibility='visible'
    oNewsScroll.newsScroll(speed)
}

//Call the init on page load
onload=newsScrollInit;
