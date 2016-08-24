    var campoTb = ""
    var divAguarde;

    function FCKeditor_OnComplete( editorInstance )
    {
            editorInstance.Commands.GetCommand( 'FitWindow' ).Execute(  );
    }

    function maximizar(  ) 
    {
            window.moveTo ( -4, -4 );
            window.resizeTo ( screen.availWidth + 8, screen.availHeight + 8 );
    }

    /**
     * Abre a janela que aponta para o editor RichText
     * 
     * @version 1.0 12/12/2007
     * @author Marcos
     */
    function abreEditorAdi( campo, codSistema )
    {	
        campoTb = campo;
        window.open( BinPath + '/utilitarios/FCKeditor/adiEditorRichText.jsp?campoTb=' + campoTb + '&codSistema=' + codSistema, 'nomeForm', 'location=no,status=yes,scrollbars=no, resizable=yes, top=0, left=0, width=800,height=600');
    }

    function abreJanelaTexto( codSistema, campo, tabela, where, parametros, naoImprimeLogo )
    {
        janelaEditor  = window.open( BinPath + '/utilitarios/FCKeditor/exibeTexto.jsp?campo=' + campo + '&codSistema=' + codSistema + '&tabela=' + tabela + '&where=' + where + '&parametros=' + parametros+'&naoImprimeLogo='+naoImprimeLogo, 'nomeForm', 'location=no,status=yes, scrollbars=yes ,resizable=yes, top=0, left=0, width=800,height=600');
    }

    function defineSQL(  )
    {
        var documento = parent.parent.opener.document;
        for( i = 0; i < documento.forms.length; i++ )
            for( x = 0; x < documento.forms[ i ].elements.length; x++ )
            {
                if( documento.forms[ i ].elements[ x ].name == ( "tabela" + document.frmEditor.campo.value ) )
                    document.frmEditor.tabela.value = documento.forms[ i ].elements[ x ].value;

                if( documento.forms[ i ].elements[ x ].name == ( "where" + document.frmEditor.campo.value ) )
                    document.frmEditor.where.value = documento.forms[ i ].elements[ x ].value;
            }

        if( document.frmEditor.tabela.value == '' )
        {
            alert( "O Parametro TABELA 'tabela" + document.frmEditor.campo.value + "' tem que ser definido em algum formulario de seu documento " );
            throw( "O Parametro TABELA 'tabela" + document.frmEditor.campo.value + "' tem que ser definido em algum formulario de seu documento " );	
            return;
        }

        if( document.frmEditor.where.value == '' )
        {
            alert( "O Parametro WHERE 'where" + document.frmEditor.campo.value + "' tem que ser definido em algum formulario de seu documento " );
            throw( "O Parametro WHERE 'where" + document.frmEditor.campo.value + "' tem que ser definido em algum formulario de seu documento " );
            return;
        }
        return "";
    }

    /**
     * Função para substituir um substring dentro de um texto por outro.
     * @version 1.0 01/04/2000
     * @author Alexandre
     * @param textoString String onde haverá a substituicao
     * @param stringDe Substring dentro do texto a ser substituido
     * @param stringPara Substring de suibstituição
     * @return String com substring substituída
     */
    function trocaString(textoString, stringDe, stringPara)
    {
        retorno = "";
        posInicial = 0;
        if (textoString == null)
        {
            return "";
        }
        if (stringPara == null)
        {
            stringPara = "";
        }
        while ((posInicial = textoString.indexOf(stringDe)) != -1)
        {
            retorno += textoString.substring(0, posInicial) + stringPara;
            textoString    =   textoString.substring(posInicial + stringDe.length);
        }
        retorno += textoString;
        return retorno;
    }

    function buscaTextoEditor(  )
    {
        if(parent.parent.opener.document.forms[0].valorEditorRetorno)
        {
            document.frmEditor.MaxNetEditor.value = parent.parent.opener.document.forms[0].valorEditorRetorno.value;
            return;
        }

        document.frmAjax.sql1.value =  " SELECT " + document.frmEditor.campo.value + " AS campo ";
        document.frmAjax.sql1.value += "\n FROM " + document.frmEditor.tabela.value;
        document.frmAjax.sql1.value += "\n " + document.frmEditor.where.value;

        ajaxRequest( document.frmAjax, retornaTextoAjax );
    }

    function retornaTextoAjax( )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                var sqls = ajax_request.responseXML.getElementsByTagName( "campo" );

                if( !sqls[0] || (sqls[0].childNodes[0].nodeValue == 'NULL' || sqls[0].childNodes[0].nodeValue == 'null' || sqls[0].childNodes[0].nodeValue == ''))
                    return;

                document.frmEditor.MaxNetEditor.value = sqls[ 0 ].childNodes[ 0 ].nodeValue;
            }
        }
    }

    function escondeDiv(  )
    {
        escondeCombos( document.forms[ 0 ], 1 )

        if( divAguarde )
        {
            divAguarde.style.visibility = 'hidden';
            divAguarde.style.overflow = 'hidden'
            divAguarde = null;            
        }
    }

    function inicializaDivEditor( valor, evento ) 
    {
        divAguarde = document.getElementById( 'divEditor' );
        if( divAguarde == null )
        {
            divAguarde = document.createElement( 'div' );
            divAguarde.id = 'divEditor';
            divAguarde.innerHTML = "<table width='100%' height='100%'><tr><td align='center' valign='middle' class='tooltipcontent2'>" + valor + "</td></tr></table>";

            divAguarde.style.position = 'absolute';

            divAguarde.style.width = 400;
            divAguarde.style.height = 200;
            divAguarde.style.color = 'black';
            divAguarde.style.border = '1px solid #000000';
            divAguarde.style.backgroundColor = '#FFFFFF';
            divAguarde.style.zIndex = '1';
            divAguarde.style.fontFamily = 'Verdana, Arial, Helvetica, sans-serif';
            divAguarde.style.fontSize = '11px';
            divAguarde.style.fontColor = '#FFFFFF';
            divAguarde.style.filter = 'Alpha( opacity = 85 )';
            divAguarde.style.opacity = '0.85';
        }
        escondeCombos( document.forms[ 0 ], 0 )
        divAguarde.style.visibility = 'visible';
        divAguarde.focus();

        try	
        {
            if( document.forms[ 0 ] )
                document.forms[ 0 ].appendChild( divAguarde );
        }
        catch( e2 ){}
    }

    function escondeCombos( formulario, esconder )
    {
        var esconde = "";

        if( esconder == 0 )
            esconde = "hidden"
        else
            esconde = "visible"

        for( i = 0; i < formulario.length; i++ )
        {
            if( formulario[ i ].type == 'select-one' )
                formulario[ i ].style.visibility = esconde;
        }
    }

    //Função que cria AJAX Request
    function createRequest(  )
    {
        try 
        {
            request = new XMLHttpRequest(  );
        } 
        catch ( trymicrosoft )
        {
            try 
            {
                request = new ActiveXObject( "Msxml2.XMLHTTP" );
            } 
            catch ( othermicrosoft ) 
            {
                try 
                {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } 
                catch ( failed ) 
                {
                    request = false;
                }
            }
      }

      if ( !request )
            alert("Error initializing XMLHttpRequest!");
      else
            return request;
    }

    document.onmousemove = positiontip;

    function positiontip( e )
    {
        if( divAguarde )
        {
            var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
            var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
            //Find out how close the mouse is to the corner of the window
            var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20;
            var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20;

            var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000;

            //if the horizontal distance isn't enough to accomodate the width of the context menu
            if( rightedge < divAguarde.offsetWidth )
            {
                //move the horizontal position of the menu to the left by it's width
                divAguarde.style.left= ie? ietruebody().scrollLeft+event.clientX-divAguarde.offsetWidth+"px" : window.pageXOffset+e.clientX-divAguarde.offsetWidth+"px";
            }else if (curX < leftedge)
            {
                divAguarde.style.left="5px";
            }else
            {
                divAguarde.style.left=curX+offsetxpoint+"px";//position the horizontal position of the menu where the mouse is positioned
            }
            //same concept with the vertical position
            if (bottomedge<divAguarde.offsetHeight)
            {
                divAguarde.style.top=ie? ietruebody().scrollTop+event.clientY-divAguarde.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-divAguarde.offsetHeight-offsetypoint+"px";
            }
            else
            {
                divAguarde.style.top=curY+offsetypoint+"px";
            }
        }
    }


    function mostraConteudoEditorTip( campo, executor, evento  )
    {
        if( executor == '' )
            return;

        // verifica se ja tem conteudo no "cache" do campo
        // se ja ouver nao vai no banco novamente busca-lo
        // este cache eh limpo ao modificar o campo

        cacheEditor = document.getElementById( 'cacheEditor' + campo )
        if( cacheEditor )
            if( cacheEditor.value.length > 2 )
            {
                inicializaDivEditor( cacheEditor.value, evento );
                return;
            }

        var acResult;
        var ajaxReq = createRequest(  );
        if ( ajaxReq != undefined )
        {
            ajaxReq.open( "POST", executor, true );
            ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajaxReq.onreadystatechange = function(  )
            {
                if( ajaxReq.readyState == 4 )
                {
                    if( ajaxReq.status == 200 )
                    {
                        var resultado = ajaxReq.responseXML.getElementsByTagName( "editor" );
                        var valor = "";
                        if( resultado.length > 0 )
                        {
                            if( resultado[ 0 ].childNodes[ 1 ] )
                                valor = resultado[ 0 ].childNodes[ 1 ].nodeValue;
                            else
                                valor = resultado[ 0 ].childNodes[ 0 ].nodeValue;

                            cacheEditor = document.getElementById( 'cacheEditor' + campo );
                            if( cacheEditor )
                                cacheEditor.value = valor;

                            inicializaDivEditor( valor , evento );
                        }
                        else
                            escondeDiv(  );
                    }
                }
            }

            var whereR = "";
            var tabelaR = "";

            for( i = 0; i < document.forms.length; i++ )
                for( x = 0; x < document.forms[ i ].elements.length; x++ )
                {
                    if( document.forms[ i ].elements[ x ].name == ( "tabela" + campo ) )
                        tabelaR = document.forms[ i ].elements[ x ].value;

                    if( document.forms[ i ].elements[ x ].name == ( "where" + campo ) )
                        whereR = document.forms[ i ].elements[ x ].value;
                }

            if( tabelaR == '' || whereR == '' )
                return;

            var param = 'tabela=' + escape( tabelaR ) + '&where=' + escape( whereR ) + '&campo=' + escape( campo );
            ajaxReq.send( param );
        }
    }