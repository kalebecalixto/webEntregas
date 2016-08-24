<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/parametrizacao/parametrizacao.jsp -->
<jsp:useBean id="valida" scope="page" class="adi.componentes.xml.parametrizacao.ValidaServlet" />
<%
    StringBuilder bin = new StringBuilder( "binPath_" );
    bin.append( request.getParameter( "siglaSistema" ) );
    
    StringBuilder pathXml = new StringBuilder( "" );
    pathXml.append( application.getInitParameter( String.valueOf( bin ) ) );
    pathXml.append( "/telas/" );
    pathXml.append( request.getParameter( "codTela" ) );
    pathXml.append( ".xml" );
    
    String strCritica = valida.getDevolveCriticas( String.valueOf( pathXml ), request, response );
%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <title>Parametriza&ccedil;&atilde;o</title>
        <style>
            #ToolTip
            {
                background-color: #ffffff;
                border: 1px solid black;
                position: absolute;
                visibility: hidden;
                z-index: 100;
                width: 250;
                padding: 5px;
                filter: Alpha( opacity = 85 );
                opacity: 0.85;
            }

            .tooltipcontent
            {
                color: #000000;
                text-decoration: none; 
                cursor: Default;
                font: 8pt Verdana;
                font-weight: bold;
                height: 18px;
                text-align: center;
            }
            
            .borda
            {
                border: 1px solid #cccccc;
            }
            
            a
            {
                text-decoration: none;
            }
			
            td.botoes, td.botoes_highlight. td.botoes_selected
            {
                font-family: Verdana;
                font-size: 10px;
            }
			
            td.botoes, td.botoes_highlight, td.botoes_selected
            {
                border: 1px solid #000000;
                color: #000000;
                text-align: center;
                font-weight: bold;
            }
            
            td.botoes
            {
                background-color: #f7f7f7;
            }
            
            td.botoes_highlight
            {
                background-color: #6699ff;
            }
			
            td.botoes_selected
            {
                background-color: #cfcfcf;
            }
        </style>
        <script language="JavaScript" type="text/JavaScript">
            /**
             * Array com as parametrizações criadas pelo usuário. Em cada posição
             * do array existe uma string no formato definido pela api de parametrização
             * contendo todos os dados de uma parametrização.
             */
             
            str = "<%=strCritica%>";
            if ( str != "" )
                var parametrizacoes = str.split( "%" );
            else
                var parametrizacoes = new Array( );
                
            for( var i = 0; i < parametrizacoes.length; i++ )
                parametrizacoes[ i ] += '%';
            
            /**
             * Contém a posição do registro no array 'parametrizacoes' que está sendo
             * editado pelo usuário. Caso o valor de 'edicao' seja -1, indica que o registro
             * que está sendo editado é novo, ou seja, ainda não existe no array de
             * parametrizações.
             */
            var edicao = -1;
            
            /**
             * Envia as parametrizações criadas e modificadas pelo usuário para o servlet
             * responsável por gravar os dados no XML da tela.
             */
            function salvar( )
            {
                for( var i = 0; i < parametrizacoes.length; i++ )
                    document.forms[ 0 ].hidParametrizacao.value += parametrizacoes[ i ];
                document.forms[ 0 ].submit( );                
            }

            /**
             * Cria uma nova parametrização.
             */
            function addParametrizacao( )
            {
                edicao = -1;
                ifrmParametrizacao.location.href = 'parametrizacao.jsp?codTela=<%=request.getParameter( "codTela" )%>&siglaSistema=<%=request.getParameter( "siglaSistema" )%>';
            }

            /**
             * Exclui uma parametrização criada pelo usuário.
             */
            function excluirParametrizacao( i )
            {
                var paramTmp = new Array( );

                if( !confirm( "Deseja realmente excluir esta parametrização?" ) )
                    return;

                for( var j = 0; j < parametrizacoes.length; j++ )
                {
                    if( j != i )
                        paramTmp[ paramTmp.length ] = parametrizacoes[ i ];
                }
                parametrizacoes = paramTmp;
                addParametrizacao( );
                imprimeParametrizacoes( );
            }

            /**
             * Alterna para o modo de edição de uma parametrização.
             */
            function editarParametrizacao( i )
            {
                edicao = i;

                //reinicia os campos da tela.
                ifrmParametrizacao.removeUltimoGrupo( ifrmParametrizacao.grupo[ 3 ] );
                ifrmParametrizacao.grupo = new Array( );
                ifrmParametrizacao.criaGrupoComponentes( );

                str2 = parametrizacoes[ i ].split( '#' );
                str3 = null;

                for( var j = 0; j < str2.length; j++ )
                {
                    if( str2[ j ].charAt( 0 ) == '^' )
                        str2[ j ] = str2[ j ].substring( 1, str2[ j ].length );

                    if( str2[ j ].charAt( str2[ j ].length - 1 ) == '^' )
                        str2[ j ] = str2[ j ].substring( 0, str2[ j ].length - 1 );

                    str3 = str2[ j ].split( '^' );

                    if( str3.length >= 3 )
                    {
                        ifrmParametrizacao.grupo[ ifrmParametrizacao.grupo.length - 4 ].setValue( str3[ 0 ] );
                        ifrmParametrizacao.grupo[ ifrmParametrizacao.grupo.length - 3 ].setValue( str3[ 1 ] );

                        if( str3[ 2 ].charAt( 0 ) == '$' )
                            str3[ 2 ] = str3[ 2 ].substring( 1, str3[ 2 ].length );

                        ifrmParametrizacao.grupo[ ifrmParametrizacao.grupo.length - 2 ].setValue( str3[ 2 ] );

                        if( str3.length >= 4 )
                            ifrmParametrizacao.document.forms[ 0 ].txtMensagem.value = str3[ 3 ];
                    }
                    else
                        ifrmParametrizacao.grupo[ ifrmParametrizacao.grupo.length - 1 ].setValue( str3[ 0 ] );
                }

                mostrarParametrizacoes( );
            }
            
            /**
             * Exibe o div com as parametrizações criadas pelo usuário.
             */
            function mostrarParametrizacoes( )
            {
                if( MM_findObj( 'dvParametrizacoes' ).style.visibility == 'hidden' )
                    MM_showHideLayers( 'dvParametrizacoes', '', 'show' );
                else
                {
                    MM_showHideLayers( 'dvParametrizacoes', '', 'hide' );
                    MM_findObj( 'btnParam' ).className = 'botoes';
                }
            }

            /**
             * Faz a impressão das parametrizações no div que é exibido ao clicar no botão
             * 'Parametrizações' da tela.
             */
            function imprimeParametrizacoes( )
            {
                var result = '<table width="100%" border="0" align="center" cellpadding="1" cellspacing="1" bgcolor="#FFFFFF">';

                for( var i = 0; i < parametrizacoes.length; i++ )
                {
                    str2 = parametrizacoes[ i ].split( '#' );
                    str3 = null;

                    result += '<tr valign="middle" bgcolor="#F6F6F6">' +
                                '<td width="25"><strong><font size="1" face="Verdana, Arial, Helvetica, sans-serif">' +
                                '#' + ( i + 1 ) + '</font></strong></td>';

                    result += '<td bgcolor="#F6F6F6"><font size="1" face="Verdana, Arial, Helvetica, sans-serif"><strong>';

                    var strCampos = '';
                    var mensagem  = '';

                    for( var j = 0; j < str2.length; j++ )
                    {
                        if( str2[ j ].charAt( 0 ) == '^' )
                            str2[ j ] = str2[ j ].substring( 1, str2[ j ].length );

                        if( str2[ j ].charAt( str2[ j ].length - 1 ) == '^' )
                            str2[ j ] = str2[ j ].substring( 0, str2[ j ].length - 1 );

                        str3 = str2[ j ].split( '^' );

                        if( str3.length >= 3 )
                        {
                            strCampos += ifrmParametrizacao.grupo[ 0 ].getTextFromValue( str3[ 0 ] ) + ' ' +
                                            ifrmParametrizacao.grupo[ 1 ].getTextFromValue( str3[ 1 ] ) + ' ';
                            
                            if( str3[ 2 ].charAt( 0 ) == '$' )
                                strCampos += str3[ 2 ].substring( 1, str3[ 2 ].length );
                            else
                                strCampos += ifrmParametrizacao.grupo[ 2 ].getTextFromValue( str3[ 2 ] );

                            if( str3.length >= 4 )
                                mensagem = str3[ 3 ];
                        }
                        else
                            strCampos += ' ' + ifrmParametrizacao.grupo[ 3 ].getTextFromValue( str3[ 0 ] ) + ' ';
                    }
                    //
                    if( strCampos.length > 40 )
                        strCampos = '<label onMouseOver=\"tip(\''+strCampos+'\')\" onMouseOut=\"notip()\">' + strCampos.substring( 0, 40 ) + '...<label>';
                    //
                    if( mensagem.length > 40 )
                        mensagem = '<label onMouseOver=\"tip(\''+mensagem+'\')\" onMouseOut=\"notip()\">' + mensagem.substring( 0, 40 ) + '...<label>';

                    result += strCampos + '</strong></font></td>' +
                                '<td><font size="1" face="Verdana, Arial, Helvetica, sans-serif"><strong>Mensagem: ' +
                                mensagem + '</strong></font></td>' +
                                '<td width="45" align="center"><strong><font color="#000000" size="1" face="Verdana, Arial, Helvetica, sans-serif">' +
                                '<a href="javascript:editarParametrizacao('+i+')">editar</a></font></strong></td>' +
                                '<td width="45" align="center"><strong><font size="1" face="Verdana, Arial, Helvetica, sans-serif">' +
                                '<a href="javascript:excluirParametrizacao('+i+')"><font color="#BB0000">excluir</font></a></font>' +
                                '<font color="#000000" size="1" face="Verdana, Arial, Helvetica, sans-serif">' +
                                '</font></strong></td></tr>';
                }
                result += '</table>&nbsp;';

                document.getElementById( "dvParametrizacoesContent" ).innerHTML = result;
            }
            
            function MM_reloadPage( init )
            {  //reloads the window if Nav4 resized
                if( init == true )
                    with( navigator )
                    {
                        if( ( appName == "Netscape" ) && ( parseInt( appVersion ) == 4 ) )
                        {
                            document.MM_pgW = innerWidth; 
                            document.MM_pgH = innerHeight;
                            onresize = MM_reloadPage;
                        }
                    }
                else if( innerWidth != document.MM_pgW || innerHeight != document.MM_pgH ) 
                    location.reload( );
            }
            MM_reloadPage( true );

            function MM_findObj( n, d )
            { //v4.01
                var p,i,x;

                if( !d )
                    d = document;

                if( ( p = n.indexOf( "?" ) ) > 0 && parent.frames.length )
                {
                    d = parent.frames[ n.substring( p + 1 ) ].document;
                    n = n.substring( 0, p );
                }
                if( !( x = d[ n ] ) && d.all )
                    x = d.all[ n ];

                for( i = 0; !x && i < d.forms.length; i++ )
                    x = d.forms[ i ][ n ];

                for( i = 0; !x && d.layers && i < d.layers.length; i++ )
                    x = MM_findObj( n, d.layers[ i ].document );

                if( !x && d.getElementById )
                    x = d.getElementById( n );

                return x;
            }

            function MM_showHideLayers( )
            { //v6.0
                var i,p,v,obj,args = MM_showHideLayers.arguments;

                for( i = 0; i < ( args.length - 2 ); i += 3 )
                if( ( obj = MM_findObj( args[ i ] ) ) != null )
                {
                    v = args[ i + 2 ];
                    if( obj.style )
                    {
                        obj = obj.style;
                        v = ( v == 'show' ) ? 'visible' : ( v == 'hide' ) ? 'hidden' : v;
                    }
                    obj.visibility = v;
                }
            }
        </script>
    </head>
    
    <body text="#666666" leftmargin="2" topmargin="2" rightmargin="0" bottommargin="0" marginwidth="0" marginheight="0">
    
        <div id="ToolTip"></div>
        <script type="text/javascript" src="<%=application.getInitParameter( "rotinasJSPath" )%>/tooltip.js"></script>
        
        <div id="dvParametrizacoes" style="position: absolute; left:0px; top:85px; width:100%; height:230px; z-index:1; visibility: hidden; overflow: auto;"> 
            <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td valign="top" bgcolor="#F6F6F6" class="borda"> 
                        <div id="dvParametrizacoesContent">&nbsp;</div>
                    </td>
                </tr>
            </table>
        </div>
        <table width="100%" height="100%" border="0" cellpadding="2" cellspacing="2">
            <form name="frmParametrizacao" action="<%= application.getInitParameter( "Parametrizacao_srvPath" ) %>" method="post" onsubmit="javascript:window.close();">
                <input type="hidden" name="hidParametrizacao" value="">
                <input type="hidden" name="hidCaminhoXML" value="">
                <input type="hidden" name="usuario" value="<%= session.getAttribute( "codUser" ) %>">
                <tr> 
                    <td height="33" colspan="3" class="borda">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td height="29"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong><font color="#000000">&nbsp;GRP-MAXNETADI</font></strong><font color="#000000"> 
                                - Parametriza&ccedil;&atilde;o da tela <em><%= request.getParameter( "codTela" ) %></em></font></font></td>
                            
                                <td align="right" valign="bottom"><a href="javascript:salvar();"><img src="<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnIncluir.jpg" border="0" width="25" height="25"></a><a href="#"><img src="<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnAjuda.jpg" width="25" height="25" border="0"></a><a href="#"><img src="<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnFechar.jpg" width="25" height="25" border="0"></a><font size="1">&nbsp;</font></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr> 
                    <td width="33%" height="9" bgcolor="#EFEFEF" class="borda"><font color="#000000" size="1" face="Verdana, Arial, Helvetica, sans-serif"><strong> 
                    &nbsp;Usu&aacute;rio:</strong> <%= session.getAttribute( "codUser" ) %></font></td>
                    <td height="9" colspan="2" bgcolor="#EFEFEF" class="borda"><font color="#000000" size="1" face="Verdana, Arial, Helvetica, sans-serif"><strong>
                    &nbsp;Empresa:</strong> <%= session.getAttribute( "nomeEmp" ) %></font></td>
                </tr>
                <tr valign="top"> 
                    
                    <td colspan="3" class="borda"> 
                        <table height="20" width="100%" border="0" align="center" cellpadding="2" cellspacing="2">
          
                            <tr> 
                                
            <td align="right"><font size="2" face="Verdana, Arial, Helvetica, sans-serif">&nbsp; 
              </font></td>
                                <td id="btnParam" width="130" align="center" bgcolor="#EFEFEF" class="botoes" onclick="imprimeParametrizacoes( );mostrarParametrizacoes( );" onmouseover="this.className = 'botoes_highlight'" onmouseout="this.className = ( MM_findObj( 'dvParametrizacoes' ).style.visibility == 'hidden' ) ? 'botoes' : 'botoes_highlight';"> 
                                <label><font size="1" face="Verdana, Arial, Helvetica, sans-serif">Parametriza&ccedil;&otilde;es</font></label></td>
                                <td width="130" align="center" bgcolor="#EFEFEF" class="botoes" onclick="addParametrizacao( );" onmouseover="this.className = 'botoes_highlight'" onmouseout="this.className = 'botoes';"> 
                                <label><font size="1" face="Verdana, Arial, Helvetica, sans-serif">Adicionar</font></label></td>
                            </tr>
                            <tr> 
                                <td height="5" colspan="3" align="right"></td>
                            </tr>
                        </table>
                        <table width="100%" height="89%" border="0" align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td><iframe name="ifrmParametrizacao" frameborder="0" height="100%" width="100%" align="center" src="parametrizacao.jsp?codTela=<%=request.getParameter( "codTela" )%>&siglaSistema=<%=request.getParameter( "siglaSistema" )%>"></iframe></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </form>
        </table>
    </body>
</html>
