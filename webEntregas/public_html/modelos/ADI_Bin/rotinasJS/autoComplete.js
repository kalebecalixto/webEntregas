<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/autoComplete.js -->
/**
 * 
 *
 * @version 1.0 14.03.2007
 * @author Bruno César
 * Retorna uma div com autoCompletar
 * Alterações: limitação do tamanho da palavra para 3, e limitação dos caracteres
 * aceitos, ambos para evitar overhead( 04.10.2007 Alan )
 //Instanciar objeto( caso seja montado via evento de um campo, usar onfocus )
 //   var AC = new dmsAutoComplete('nomeComponte','acDiv','array'); 
 //   AC.ajaxTarget = "caminhoJsp";//monta sql para o ajax
 //   AC.chooseFunc = function(id,label)
 //   {
        //jogar label no comp..
 //   }

*/
function pegaElementoAjax( elemX )
{
    var campo = document.getElementById ? document.getElementById( elemX ) : ( document.all ? document.all[ elemX ] : null );
    return campo;
}
naoEsconde = new Array();
function dmsAutoComplete(elem,divname,com,opcaoEscondeCombo)
{
       //Retirando a opção do onchange do componente do autocompletar que é chamado depois da escolha do item da lista do autocompletar pelo browser firefox
        if( eval( "document.forms[0]."+elem ) && eval( "document.forms[0]."+elem+".onchange" ) )
            eval( "document.forms[0]."+elem+".onchange='';" );
	//alert(opcaoEscondeCombo); //Debug
	var opcaoRequest = opcaoEscondeCombo == '' || opcaoEscondeCombo == null || opcaoEscondeCombo == '<null>' || opcaoEscondeCombo == 'undefined' ? true : false;
	//alert(opcaoRequest);//Debug
	var me = this;
	this.elem = pegaElementoAjax(elem);
	this.highlighted = -1;
	this.arrItens = new Array();
	this.ajaxTarget = '';
	this.chooseFunc = null; //Função para executar com obj selecionado
        
	this.div = pegaElementoAjax(divname);
        
	//funcao para esconder/aparecer combos da tela
	function escondeCombos( x )
	{   
            if( x * 1 == 0 )
            {
                for( i = 0; i < document.forms.length; i++ )
                {
                    for( j = 0; j < document.forms[ i ].elements.length; j++ )
                    {
                        if( document.forms[ i ].elements[ j ].type == "select-one" )
                        {
                            naoEsconde[i+""+j] = document.forms[ i ].elements[ j ].style.visibility;
                            document.forms[ i ].elements[ j ].style.visibility = "hidden";
                        }
                    }
                }
            }
            else
            {
                for( i = 0; i < document.forms.length; i++ )
                {
                    for( j = 0; j < document.forms[ i ].elements.length; j++ )
                    {
                        if( document.forms[ i ].elements[ j ].type == "select-one" )
                        {
                            if(naoEsconde[i+""+j] != 'hidden' || naoEsconde[i+""+j] != '')
                                document.forms[ i ].elements[ j ].style.visibility = "visible";
                        }
                    }
                }
            }
	}

	//Keycodes que devem ser monitorados
	var TAB = 9;
	var ESC = 27;
	var KEYUP = 38;
	var KEYDN = 40;
	var ENTER = 13;
	
	//Tamanho do DIV = Tamanho do campo
	this.div.style.width = this.elem.style.width;
	
	//Desabilitar autocomplete IE
	me.elem.setAttribute("autocomplete","off");
	
	//Crate AJAX Request
	this.ajaxReq = createRequest();

	//Ação a ser executada no KEYDOWN (funções de navegação)
	me.elem.onkeydown = function(ev)
	{
		var key = me.getKeyCode(ev);

		switch(key)
		{
			//case TAB:
			case ENTER:
				if (me.highlighted.id != undefined){
					me.acChoose(me.highlighted.id);
				}
				me.hideDiv();
                                return false;
			break;

			case ESC:
				me.hideDiv();
                                return false;
			break;

			case KEYUP:
				me.changeHighlight('up');
				return false;
			break;

			case KEYDN:
				me.changeHighlight('down');
				return false;
			break;
		}
		
	};
	
	this.setElemValue = function(){
		var a = me.highlighted.firstChild;
		me.elem.value = a.innerTEXT;
	}
	
	this.highlightThis = function(obj,yn){
		if (yn = 'y'){
			me.highlighted.className = '';
			me.highlighted = obj;
			me.highlighted.className = 'selected';
			//me.setElemValue(obj);
			
		}else{
			obj.className = '';
			me.highlighted = '';
		}
	}
	
	this.changeHighlight = function(way){
		
		if (me.highlighted != '' && me.highlighted != null ){
			me.highlighted.className = '';
			switch(way){
				case 'up':
					if(me.highlighted.parentNode.firstChild == me.highlighted){
						me.highlighted = me.highlighted.parentNode.lastChild;
					}else{
						me.highlighted = me.highlighted.previousSibling;
					}
				break;
				case 'down':
					if(me.highlighted.parentNode.lastChild == me.highlighted){
						me.highlighted = me.highlighted.parentNode.firstChild;
					}else{
						me.highlighted = me.highlighted.nextSibling;
					}
				break;
				
			}
			me.highlighted.className = 'selected';
			//me.setElemValue();
		}else{
			switch(way){
				case 'up':
					me.highlighted = me.div.firstChild.lastChild;
				break;
				case 'down':
					me.highlighted = me.div.firstChild.firstChild;
				break;
				
			}
			me.highlighted.className = 'selected';
			//me.setElemValue();
		}
		
	}

    var timerAutoComplete = null;
	
	//Rotina no KEYUP (pegar input)
	me.elem.onkeyup = function(ev) 
	{
		var key = me.getKeyCode(ev);

		switch(key)
		{
		//The control keys were already handled by onkeydown, so do nothing.
		//case TAB:
		case ENTER:
			return false;
			break;
		default:
                        //Eliminando os caracteres de comando especial, etc que não são úteis na pesquisa
                        if( (key < 41 || key > 126 || key == 45 ) && key != 8 )
                            return;
                        //Menor que 3 caractéres não executa
                        if( me.elem.value.length<3)
                        {
                            me.showDiv();
                            me.div.innerHTML = '';
                            var ul = document.createElement('ul');
                            me.div.appendChild(ul);

                            var li = document.createElement('li');
                            li.id = '';

                            var a = document.createElement('a');
                            a.href = '#';
                            a.innerHTML = 'Aguardando mínimo de 3 caracteres';
                            a.innerTEXT = 'Aguardando mínimo de 3 caracteres';

                            li.appendChild(a);
                            ul.appendChild(li);
                            
                            //return;
                        }
                        else
                        {
                            //Cancelar requisicao antiga
                            me.ajaxReq.abort();
                            //Enviar query por AJAX
                            if (me.ajaxReq != undefined)
                            {
                                if(timerAutoComplete != null)
                                    clearInterval(timerAutoComplete)

                                timerAutoComplete = setTimeout(

                                    function()
                                    {
                                        me.showDiv();
                                        me.div.innerHTML = '';
                                        var ul = document.createElement('ul');
                                        me.div.appendChild(ul);

                                        var li = document.createElement('li');
                                        li.id = '';

                                        var a = document.createElement('a');
                                        a.href = '#';
                                        a.innerHTML = 'Pesquisando...';
                                        a.innerTEXT = 'Pesquisando...';

                                        li.appendChild(a);
                                        ul.appendChild(li);


                                        me.ajaxReq.open("POST", me.ajaxTarget, true);
                                        me.ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                        me.ajaxReq.onreadystatechange = me.acResult;

                                        var param = 'string=' + me.elem.value;

                                        me.ajaxReq.send(param);
                                    }

                                ,500);



                                me.showDiv();
                                me.div.innerHTML = '';
                                var ul = document.createElement('ul');
                                me.div.appendChild(ul);

                                var li = document.createElement('li');
                                li.id = '';

                                var a = document.createElement('a');
                                a.href = '#';
                                a.innerHTML = 'Digitando...';
                                a.innerTEXT = 'Digitando...';

                                li.appendChild(a);
                                ul.appendChild(li);

                            }

                            //Remover elementos highlighted
                            me.highlighted = '';
                       }
		}
	};
	
	//Sumir com autosuggest

    if(me.elem.onblur == null)
    {
        me.elem.onblur = function()
        {
            me.hideDiv();
        }
    }
    else
    {
        if((me.elem.onblur+"").indexOf("hideDiv()") == -1)
        {
            me.elem.onblur = function()
            {
                me.hideDiv();
            }
        }
    }
	
	//Ajax return function
	this.acResult = function(){
		
		if (me.ajaxReq.readyState == 4){
				
			//alert(me.ajaxReq.responseText); //DEBUG
			
			me.showDiv()
			
			//Pegar resposta do servidor
			var xmlRes = me.ajaxReq.responseXML;
			
			me.div.innerHTML = '';
			var ul = document.createElement('ul');
			me.div.appendChild(ul);
                        
			//verificar conteudo
			if (xmlRes == undefined)
                            return false;
			
			var itens = xmlRes.getElementsByTagName('item');
			var itCnt = itens.length;
			
			if(itCnt > 0)
                        {
                            for (i=0; i<itCnt; i++)
                            {
                                //Popular array global
                                me.arrItens[itens[i].getAttribute("id")] = new Array();
                                me.arrItens[itens[i].getAttribute("id")]['label'] = itens[i].getAttribute("label");
                                me.arrItens[itens[i].getAttribute("id")]['flabel'] = itens[i].getAttribute("flabel");
                                me.arrItens[itens[i].getAttribute("id")]['title'] = itens[i].getAttribute("title");

                                //Adicionar LI
                                var li = document.createElement('li');
                                li.id = itens[i].getAttribute("id");
                                li.onmouseover = function(){ this.className = 'selected'; me.highlightThis(this,'y')}
                                li.onmouseout  = function(){ this.className = '';  me.highlightThis(this,'n')}
                                li.onmousedown = function() {
                                        me.acChoose(this.id);
                                        me.hideDiv();
                                        return false;
                                }

                                var a = document.createElement('a');
                                a.href = '#';
                                a.onclick = function() { return false; }
                                if( itens[i].getAttribute("title")!=null )
                                    a.title = unescape(itens[i].getAttribute("title"));
                                a.innerHTML = unescape(itens[i].getAttribute("label"));
                                if(itens[i].getAttribute("flabel") != null){
                                        a.innerTEXT = unescape(itens[i].getAttribute("flabel"));
                                }else{
                                        a.innerTEXT = unescape(itens[i].getAttribute("label"));
                                }

                                li.appendChild(a);
                                ul.appendChild(li);	
                            }
			}
                        else
                        {
                            var li = document.createElement('li');
                            li.id = '';

                            var a = document.createElement('a');
                            a.href = '#';
                            a.innerHTML = 'Nenhum registro encontrado!';
                            a.innerTEXT = 'Nenhum registro encontrado!';

                            li.appendChild(a);
                            ul.appendChild(li);
			}
		}
	}
	
	this.acChoose = function (id){
		
		if (id != '')
                {
                    me.setElemValue();
                    
                    //Função de retorno (Opcional)
                    if (me.chooseFunc != null)
                        me.chooseFunc(id,unescape(me.arrItens[id]['label']));
		}
                else
                {
                    this.elem.value = "";
                }
		
		//Esconder lista de clientes
		me.hideDiv();

	}

	this.positionDiv = function()
	{
		var el = this.elem;
		var x = 0;
		var y = el.offsetHeight;

		//Walk up the DOM and add up all of the offset positions.
		while (el.offsetParent && el.tagName.toUpperCase() != 'BODY')
		{
			x += el.offsetLeft;
			y += el.offsetTop;
			el = el.offsetParent;
		}

		x += el.offsetLeft;
		y += el.offsetTop;

		this.div.style.left = x + 'px';
		this.div.style.top = y + 'px';
	};

	this.hideDiv = function(){
		
		me.highlighted = '';
		me.div.style.display = 'none';
        if(opcaoRequest){escondeCombos( 1 );}

        if(me.cancelEvent)
            me.cancelEvent();		
	}

	this.showDiv = function(){

        if(me.elem.disabled != true)
        {
            me.highlighted = '';
            me.positionDiv();
            me.div.style.display = 'block';



            if(navigator.appName == 'Microsoft Internet Explorer')
            {
                me.div.style.width = '333px'
            }

            if(opcaoRequest){escondeCombos( 0 );}
        }
	
	}
	
	//HELPER FUNCTIONS
	
	/********************************************************
	//Helper function to determine the keycode pressed in a 
	//browser-independent manner.
	********************************************************/
	this.getKeyCode = function(ev)
	{
		if(ev)			//Moz
		{
			return ev.keyCode;
		}
		if(window.event)	//IE
		{
			return window.event.keyCode;
		}
	};

	/********************************************************
	//Helper function to determine the event source element in a 
	//browser-independent manner.
	********************************************************/
	this.getEventSource = function(ev)
	{
		if(ev)			//Moz
		{
			return ev.target;
		}
	
		if(window.event)	//IE
		{
			return window.event.srcElement;
		}
	};

	/********************************************************
	//Helper function to cancel an event in a 
	//browser-independent manner.
	//(Returning false helps too).
	********************************************************/
	this.cancelEvent = function(ev)
	{
		if(ev)			//Moz
		{
			ev.preventDefault();
			ev.stopPropagation();
		}
		if(window.event)	//IE
		{
			window.event.returnValue = false;
		}
	}
}


//Função que cria AJAX Request
function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (trymicrosoft) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = false;
      }
    }
  }

  if (!request)
    alert("Error initializing XMLHttpRequest!");
  else
  	return request;
}

//Preenxe Vetor de Combos
var com = new Array();
function buscaCombos( )
{
    var formularios = document.forms;
    var vetor = new Array( );

    for( var y=0; y< formularios.length;y++ )
        for( var x=0; x< formularios[y].elements.length;x++ )
            if( formularios[y].elements[ x ].type.indexOf( 'select' )>-1 && formularios[y].elements[ x ].style.visibility != 'hidden' )
                vetor[ vetor.length ] = "document.forms[" + y + "]." + formularios[y].elements[ x ].name;

    return vetor;
}

function dmsAutoCompleteAC1(elem,divname,com,opcaoEscondeCombo)
{
       //Retirando a opção do onchange do componente do autocompletar que é chamado depois da escolha do item da lista do autocompletar pelo browser firefox
        if( eval( "document.forms[0]."+elem ) && eval( "document.forms[0]."+elem+".onchange" ) )
            eval( "document.forms[0]."+elem+".onchange='';" );
	//alert(opcaoEscondeCombo); //Debug
	var opcaoRequest = opcaoEscondeCombo == '' || opcaoEscondeCombo == null || opcaoEscondeCombo == '<null>' || opcaoEscondeCombo == 'undefined' ? true : false;
	//alert(opcaoRequest);//Debug
	var me = this;
	this.elem = pegaElementoAjax(elem);
	this.highlighted = -1;
	this.arrItens = new Array();
	this.ajaxTarget = '';
	this.chooseFunc = null; //Função para executar com obj selecionado
        
	this.div = pegaElementoAjax(divname);
        
	//funcao para esconder/aparecer combos da tela
	function escondeCombos( x )
	{   
            if( x * 1 == 0 )
            {
                for( i = 0; i < document.forms.length; i++ )
                {
                    for( j = 0; j < document.forms[ i ].elements.length; j++ )
                    {
                        if( document.forms[ i ].elements[ j ].type == "select-one" )
                        {
                            naoEsconde[i+""+j] = document.forms[ i ].elements[ j ].style.visibility;
                            document.forms[ i ].elements[ j ].style.visibility = "hidden";
                        }
                    }
                }
            }
            else
            {
                for( i = 0; i < document.forms.length; i++ )
                {
                    for( j = 0; j < document.forms[ i ].elements.length; j++ )
                    {
                        if( document.forms[ i ].elements[ j ].type == "select-one" )
                        {
                            if(naoEsconde[i+""+j] != 'hidden' || naoEsconde[i+""+j] != '')
                                document.forms[ i ].elements[ j ].style.visibility = "visible";
                        }
                    }
                }
            }
	}

	//Keycodes que devem ser monitorados
	var TAB = 9;
	var ESC = 27;
	var KEYUP = 38;
	var KEYDN = 40;
	var ENTER = 13;
	
	//Tamanho do DIV = Tamanho do campo
	this.div.style.width = this.elem.style.width;
	
	//Desabilitar autocomplete IE
	me.elem.setAttribute("autocomplete","off");
	
	//Crate AJAX Request
	this.ajaxReq = createRequest();

	//Ação a ser executada no KEYDOWN (funções de navegação)
	me.elem.onkeydown = function(ev)
	{
		var key = me.getKeyCode(ev);

		switch(key)
		{
			//case TAB:
			case ENTER:
				if (me.highlighted.id != undefined){
					me.acChoose(me.highlighted.id);
				}
				me.hideDiv();
                                return false;
			break;

			case ESC:
				me.hideDiv();
                                return false;
			break;

			case KEYUP:
				me.changeHighlight('up');
				return false;
			break;

			case KEYDN:
				me.changeHighlight('down');
				return false;
			break;
		}
		
	};
	
	this.setElemValue = function(){
		var a = me.highlighted.firstChild;
		me.elem.value = a.innerTEXT;
	}
	
	this.highlightThis = function(obj,yn){
		if (yn = 'y'){
			me.highlighted.className = '';
			me.highlighted = obj;
			me.highlighted.className = 'selected';
			//me.setElemValue(obj);
			
		}else{
			obj.className = '';
			me.highlighted = '';
		}
	}
	
	this.changeHighlight = function(way){
		
		if (me.highlighted != '' && me.highlighted != null ){
			me.highlighted.className = '';
			switch(way){
				case 'up':
					if(me.highlighted.parentNode.firstChild == me.highlighted){
						me.highlighted = me.highlighted.parentNode.lastChild;
					}else{
						me.highlighted = me.highlighted.previousSibling;
					}
				break;
				case 'down':
					if(me.highlighted.parentNode.lastChild == me.highlighted){
						me.highlighted = me.highlighted.parentNode.firstChild;
					}else{
						me.highlighted = me.highlighted.nextSibling;
					}
				break;
				
			}
			me.highlighted.className = 'selected';
			//me.setElemValue();
		}else{
			switch(way){
				case 'up':
					me.highlighted = me.div.firstChild.lastChild;
				break;
				case 'down':
					me.highlighted = me.div.firstChild.firstChild;
				break;
				
			}
			me.highlighted.className = 'selected';
			//me.setElemValue();
		}
		
	}

    var timerAutoComplete = null;
	
	//Rotina no KEYUP (pegar input)
	me.elem.onkeyup = function(ev) 
	{
		var key = me.getKeyCode(ev);

		switch(key)
		{
		//The control keys were already handled by onkeydown, so do nothing.
		//case TAB:
		case ENTER:
			return false;
			break;
		default:
                        //Eliminando os caracteres de comando especial, etc que não são úteis na pesquisa
                        if( (key < 41 || key > 126 || key == 45 ) && key != 8 )
                            return;
                        //Menor que 1 caractéres não executa
                        if( me.elem.value.length<1)
                        {
                            me.showDiv();
                            me.div.innerHTML = '';
                            var ul = document.createElement('ul');
                            me.div.appendChild(ul);

                            var li = document.createElement('li');
                            li.id = '';

                            var a = document.createElement('a');
                            a.href = '#';
                            a.innerHTML = 'Aguardando mínimo de 1 caractere';
                            a.innerTEXT = 'Aguardando mínimo de 1 caractere';

                            li.appendChild(a);
                            ul.appendChild(li);
                            
                            //return;
                        }
                        else
                        {
                            //Cancelar requisicao antiga
                            me.ajaxReq.abort();
                            //Enviar query por AJAX
                            if (me.ajaxReq != undefined)
                            {
                                if(timerAutoComplete != null)
                                    clearInterval(timerAutoComplete)

                                timerAutoComplete = setTimeout(

                                    function()
                                    {
                                        me.showDiv();
                                        me.div.innerHTML = '';
                                        var ul = document.createElement('ul');
                                        me.div.appendChild(ul);

                                        var li = document.createElement('li');
                                        li.id = '';

                                        var a = document.createElement('a');
                                        a.href = '#';
                                        a.innerHTML = 'Pesquisando...';
                                        a.innerTEXT = 'Pesquisando...';

                                        li.appendChild(a);
                                        ul.appendChild(li);


                                        me.ajaxReq.open("POST", me.ajaxTarget, true);
                                        me.ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                        me.ajaxReq.onreadystatechange = me.acResult;

                                        var param = 'string=' + me.elem.value;

                                        me.ajaxReq.send(param);
                                    }

                                ,500);



                                me.showDiv();
                                me.div.innerHTML = '';
                                var ul = document.createElement('ul');
                                me.div.appendChild(ul);

                                var li = document.createElement('li');
                                li.id = '';

                                var a = document.createElement('a');
                                a.href = '#';
                                a.innerHTML = 'Digitando...';
                                a.innerTEXT = 'Digitando...';

                                li.appendChild(a);
                                ul.appendChild(li);

                            }

                            //Remover elementos highlighted
                            me.highlighted = '';
                       }
		}
	};
	
	//Sumir com autosuggest

    if(me.elem.onblur == null)
    {
        me.elem.onblur = function()
        {
            me.hideDiv();
        }
    }
    else
    {
        if((me.elem.onblur+"").indexOf("hideDiv()") == -1)
        {
            me.elem.onblur = function()
            {
                me.hideDiv();
            }
        }
    }
	
	//Ajax return function
	this.acResult = function(){
		
		if (me.ajaxReq.readyState == 4){
				
			//alert(me.ajaxReq.responseText); //DEBUG
			
			me.showDiv()
			
			//Pegar resposta do servidor
			var xmlRes = me.ajaxReq.responseXML;
			
			me.div.innerHTML = '';
			var ul = document.createElement('ul');
			me.div.appendChild(ul);
                        
			//verificar conteudo
			if (xmlRes == undefined)
                            return false;
			
			var itens = xmlRes.getElementsByTagName('item');
			var itCnt = itens.length;
			
			if(itCnt > 0)
                        {
                            for (i=0; i<itCnt; i++)
                            {
                                //Popular array global
                                me.arrItens[itens[i].getAttribute("id")] = new Array();
                                me.arrItens[itens[i].getAttribute("id")]['label'] = itens[i].getAttribute("label");
                                me.arrItens[itens[i].getAttribute("id")]['flabel'] = itens[i].getAttribute("flabel");
                                me.arrItens[itens[i].getAttribute("id")]['title'] = itens[i].getAttribute("title");

                                //Adicionar LI
                                var li = document.createElement('li');
                                li.id = itens[i].getAttribute("id");
                                li.onmouseover = function(){ this.className = 'selected'; me.highlightThis(this,'y')}
                                li.onmouseout  = function(){ this.className = '';  me.highlightThis(this,'n')}
                                li.onmousedown = function() {
                                        me.acChoose(this.id);
                                        me.hideDiv();
                                        return false;
                                }

                                var a = document.createElement('a');
                                a.href = '#';
                                a.onclick = function() { return false; }
                                if( itens[i].getAttribute("title")!=null )
                                    a.title = unescape(itens[i].getAttribute("title"));
                                a.innerHTML = unescape(itens[i].getAttribute("label"));
                                if(itens[i].getAttribute("flabel") != null){
                                        a.innerTEXT = unescape(itens[i].getAttribute("flabel"));
                                }else{
                                        a.innerTEXT = unescape(itens[i].getAttribute("label"));
                                }

                                li.appendChild(a);
                                ul.appendChild(li);	
                            }
			}
                        else
                        {
                            var li = document.createElement('li');
                            li.id = '';

                            var a = document.createElement('a');
                            a.href = '#';
                            a.innerHTML = 'Nenhum registro encontrado!';
                            a.innerTEXT = 'Nenhum registro encontrado!';

                            li.appendChild(a);
                            ul.appendChild(li);
			}
		}
	}
	
	this.acChoose = function (id){
		
		if (id != '')
                {
                    me.setElemValue();
                    
                    //Função de retorno (Opcional)
                    if (me.chooseFunc != null)
                        me.chooseFunc(id,unescape(me.arrItens[id]['label']));
		}
                else
                {
                    this.elem.value = "";
                }
		
		//Esconder lista de clientes
		me.hideDiv();

	}

	this.positionDiv = function()
	{
		var el = this.elem;
		var x = 0;
		var y = el.offsetHeight;

		//Walk up the DOM and add up all of the offset positions.
		while (el.offsetParent && el.tagName.toUpperCase() != 'BODY')
		{
			x += el.offsetLeft;
			y += el.offsetTop;
			el = el.offsetParent;
		}

		x += el.offsetLeft;
		y += el.offsetTop;

		this.div.style.left = x + 'px';
		this.div.style.top = y + 'px';
	};

	this.hideDiv = function(){
		
		me.highlighted = '';
		me.div.style.display = 'none';
        if(opcaoRequest){escondeCombos( 1 );}

        if(me.cancelEvent)
            me.cancelEvent();		
	}

	this.showDiv = function(){

        if(me.elem.disabled != true)
        {
            me.highlighted = '';
            me.positionDiv();
            me.div.style.display = 'block';



            if(navigator.appName == 'Microsoft Internet Explorer')
            {
                me.div.style.width = '333px'
            }

            if(opcaoRequest){escondeCombos( 0 );}
        }
	
	}
	
	//HELPER FUNCTIONS
	
	/********************************************************
	//Helper function to determine the keycode pressed in a 
	//browser-independent manner.
	********************************************************/
	this.getKeyCode = function(ev)
	{
		if(ev)			//Moz
		{
			return ev.keyCode;
		}
		if(window.event)	//IE
		{
			return window.event.keyCode;
		}
	};

	/********************************************************
	//Helper function to determine the event source element in a 
	//browser-independent manner.
	********************************************************/
	this.getEventSource = function(ev)
	{
		if(ev)			//Moz
		{
			return ev.target;
		}
	
		if(window.event)	//IE
		{
			return window.event.srcElement;
		}
	};

	/********************************************************
	//Helper function to cancel an event in a 
	//browser-independent manner.
	//(Returning false helps too).
	********************************************************/
	this.cancelEvent = function(ev)
	{
		if(ev)			//Moz
		{
			ev.preventDefault();
			ev.stopPropagation();
		}
		if(window.event)	//IE
		{
			window.event.returnValue = false;
		}
	}
}