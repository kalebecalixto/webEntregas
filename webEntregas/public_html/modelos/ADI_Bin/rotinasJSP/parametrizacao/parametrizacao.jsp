<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/parametrizacao/parametrizacao.jsp -->
<%/*
    ADI Informatica
    Descricao: Parametrização
    Autor: Marcos - 02/02/2006
    Data ultima alteração: 26/06/2006 - Marcos
    Alteração Efetuada: Modificado tratamento de excecao da parametrizacao
*/%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%@ page import="java.util.*" %>
<%@ page import="adi.componentes.xml.parametrizacao.ParametrizacaoXmlParser" %>
<%  
    StringBuilder bin = new StringBuilder( "binPath_" );
    bin.append( request.getParameter( "siglaSistema" ) );

    StringBuilder pathXml = new StringBuilder( "" );
    pathXml.append( application.getInitParameter( String.valueOf( bin ) ) );
    pathXml.append( "/telas/" );
    pathXml.append( request.getParameter( "codTela" ) );
    pathXml.append( ".xml" );

    ParametrizacaoXmlParser man = new ParametrizacaoXmlParser( String.valueOf( pathXml ) );

    String nomeComponente = "";
    String nomeHtml = "";
    Iterator i = null;
    
    try
    {
        i = man.getComponentes().iterator();
    }
    catch( Exception e )
    {
        session.setAttribute( "exception", e );
        out.write( "<script>parent.location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/alerta.jsp\";</script>" );
        return;
    }
%>
<html>
    <head>
        <title></title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <link href="<%=application.getInitParameter( "BinPath" )%>/estilosCSS/fscombo.css" rel="stylesheet" />
        <style>
            td, input.mensagem, input.botoes, input.botoes_highlight
            {
            font-family: Verdana;
            font-size: 10px;
            }
            
            input.mensagem, input.botoes, input.botoes_highlight
            {
            border: 1px solid black;
            color: #000000;
            height: 20px;
            }
            
            input.mensagem
            {
            width: 100%;
            margin: 1px;
            padding: 3px 2px 3px 2px;
            }
                        
            input.botoes, input.botoes_highlight
            {
            width: 80px;
            text-align: center;
            font-weight: bold;
            }
            
            input.botoes
            {
            background-color: #f7f7f7;
            }
            
            input.botoes_highlight
            {
            background-color: #6699ff;
            }
        </style>
        <script type="text/javascript" src="<%=application.getInitParameter( "rotinasJSPath" )%>/fscombo.js"></script>
        <script type="text/javascript" src="<%=application.getInitParameter( "rotinasJSPath" )%>/fscombo_effects.js"></script>
        <script>
            /**
            * Array que guarda os combos da tela. Os combos formam grupos de 
            * 4 elementos, onde o 1º contém a lista de campos, o 2° a lista de
            * operadores, o 3° contém outra lista de campos, mas com a possibilidade
            * de digitação do valor e por último uma lista de operadores lógicos.
            */
            grupo = new Array( );
            
            /**
            * Função invocada quando o combo de operadores têm seu valor alterado.
            * Ele faz a criação de um novo grupo de componentes caso o valores
            * do grupo anterior tenham sido preenchidos, e que ele seja o último
            * grupo da lista. Caso o usuário altere o operador para vazio, remove
            * todos os grupos(debaixo para cima) abaixo do seu grupo.
            */
            function cboOperadoresLogicosOnChange( fscombo )
            {
            var i = grupo.length;
            if( fscombo.value != '' )
            {
            if( eval( fscombo.name ) == grupo[ grupo.length - 1 ] )
            {
            if( !validaComponentesAnteriores( fscombo ) )
            {
            fscombo.selectIndex( 0 );
            return;
            }
            criaGrupoComponentes( );
            imprimeComponentes( i );
            }
            }
            else
            removeUltimoGrupo( fscombo.name );
            }

            /**
            * Valida o grupo de componentes anteriores ao combo(combo de operadores lógicos)
            * atual, verificando se os campos 1, 2 e 4 estão preenchidos(o campo 3 não é obrigatório).
            */
            function validaComponentesAnteriores( fscombo )
            {
            for( var i = 0; grupo[ i ] != fscombo && i < grupo.length; i += 4 )
            {
            if( grupo[ i ].value == null || grupo[ i + 1 ].value == null || grupo[ i + 3 ].value == null )
            {
            alert( 'Preencha os campos antes de adicionar outra regra.' );
            return false;
            }
            }
            return true;
            }
            
            /**
            * Remove todos os grupos posteriores ao grupo do combo passado como
            * parametro. A remoção ocorre debaixo para cima.
            */
            function removeUltimoGrupo( obj )
            {
            if( grupo.length == 4 )
            return;

            var obj = eval( obj );
            var tmp = new Array( );

            for( var i = 0; grupo[ i ] != obj && i < grupo.length; i++ )
            tmp[ i ] = grupo[ i ];

            tmp[ tmp.length ] = grupo[ tmp.length ];

            for( var i = grupo.length; i >= tmp.length; i -= 4 )
            document.getElementById( "componentes" + ( i / 4 ) ).innerHTML = "";

            grupo = tmp;
            }

            /**
            * Cria o grupo de combos, mantendo uma configuração padrão. Toda vez que
            * o usuário seleciona um operador lógico(diferente de vazio) ele cria
            * um novo grupo com 4 elementos, que são adicionados ao array "grupo" nas
            * últimas posições.
            */
            function criaGrupoComponentes( )
            {

            var i = grupo.length;

            grupo[ i ] = new FSCombo( "grupo["+i+"]", 200, 20, true, "<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnSeta.gif" );
            <%
                while( i.hasNext(  ) )
                {
                    nomeComponente = ( String )i.next();
                    nomeHtml = ( String )i.next();

                    out.print( "                grupo[ i ].addOption( \"" );
                    out.print( nomeComponente );
                    out.print( "\", \"" );
                    out.print( nomeHtml );
                    out.print( "\");" );
                    out.print("\n");
                }
            %>

            grupo[ i ].animations[ 0 ] = animClipDown;
            grupo[ i ].animations[ 1 ] = animFade;
            grupo[ i ].animSpeed = 20;

            i++;
            grupo[ i ] = new FSCombo( "grupo["+i+"]", 130, 20, true, "<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnSeta.gif" );
            grupo[ i ].addOption( "Igual a", "==" );
            grupo[ i ].addOption( "Diferente de", "!=" );
            grupo[ i ].addOption( "Maior que", ">" );
            grupo[ i ].addOption( "Maior ou igual a", "=>" );
            grupo[ i ].addOption( "Menor que", "<" );
            grupo[ i ].addOption( "Menor ou igual a", "<=" );

            grupo[ i ].animations[ 0 ] = animClipDown;
            grupo[ i ].animations[ 1 ] = animFade;
            grupo[ i ].animSpeed = 20;
            grupo[ i ].alignment = "center";

            i++;
            grupo[ i ] = new FSCombo( "grupo["+i+"]", 200, 20, false, "<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnSeta.gif", '' );

            <%
                i = man.getComponentes().iterator();
                while( i.hasNext(  ) )
                {
                    nomeComponente = ( String )i.next();
                    nomeHtml = ( String )i.next();

                    out.print( "                grupo[ i ].addOption( \"" );
                    out.print( nomeComponente );
                    out.print( "\", \"" );
                    out.print( nomeHtml );
                    out.print( "\");" );
                    out.print("\n");
                }
            %>

            grupo[ i ].animations[ 0 ] = animClipDown;
            grupo[ i ].animations[ 1 ] = animFade;
            grupo[ i ].animSpeed = 20;

            i++;
            grupo[ i ] = new FSCombo( "grupo["+i+"]", 60, 20, true, "<%=application.getInitParameter( "imagensGenericasPath" )%>/botoes/btnSeta.gif", '' );
            grupo[ i ].addOption( " ", "" );
            grupo[ i ].addOption( "e", "&&" );
            grupo[ i ].addOption( "ou", "||" );
            grupo[ i ].alignment = "center";

            grupo[ i ].animations[ 0 ] = animClipDown;
            grupo[ i ].animations[ 1 ] = animFade;
            grupo[ i ].animSpeed = 20;

            grupo[ i ].onchange = cboOperadoresLogicosOnChange;
            }

            /**
            * Imprime um grupo de componentes a partir do índice informado no parâmetro.
            */
            function imprimeComponentes( i )
            {
            for( ; i < grupo.length; i += 4 )
            {
            var texto = "<table border='0' cellpadding='2' cellspacing='0'><tr>";
            texto += "<td>" + grupo[ i + 0 ] + "</td>";
            texto += "<td>" + grupo[ i + 1 ] + "</td>";
            texto += "<td>" + grupo[ i + 2 ] + "</td>";
            texto += "<td>" + grupo[ i + 3 ] + "</td>";
            texto += "</tr></table></div><div id='componentes"+( ( i / 4 ) + 1 )+"'>";

            document.getElementById( "componentes" + ( i / 4 ) ).innerHTML += texto;
            }
            }

            /**
            * Cria uma string de acordo com as especificações da API de parametrização
            * do java, e adiciona o resultado ao array com as parametrizações que serão
            * submetidas pelo formulário para o servlet de parametrização.
            */
            function montaStringParametros( )
            {
            var parametro = "";

            if( document.forms[ 0 ].txtMensagem.value == '' )
            {
            alert( '<%= adi.componentes.telas.Mensagem.GENBA0002 %>' );
            return false;
            }

            for( var i = 0; i < grupo.length; i += 4 )
            {
            if( grupo[ i ].value == undefined )
            break;

            parametro += grupo[ i ].value + '^';
            parametro += grupo[ i + 1 ].value + '^';

            if( grupo[ i + 2 ].selectedIndex == -1 )
            parametro += '$';

            parametro += grupo[ i + 2 ].value + '^';

            if( grupo[ i + 3 ].value != '' )
            parametro += '#' + grupo[ i + 3 ].value + '#';
            }
            if( parametro != '' )
            {
            parametro += document.forms[ 0 ].txtMensagem.value + '^%';

            if( parent.top.edicao < 0 )
            parent.top.parametrizacoes[ parent.top.parametrizacoes.length ] = parametro;
            else
            parent.top.parametrizacoes[ parent.top.edicao ] = parametro;

            return true;
            }
            else
            {
            alert( '<%= adi.componentes.telas.Mensagem.GENBA0002 %>' );
            return false;
            }
            }
            
            /**
            * Envia os dados deste formulário para o formulário da página que
            * contém esta. Antes de enviar os dados eles são validados. Após o envio,
            * a página é recarregada para adição de uma nova parametrização.
            */
            function submete( )
            {
            if( !validaComponentesAnteriores( grupo[ grupo.length ] ) )
            return;

            if( montaStringParametros( ) )
            location.href = location.href;
            }
        </script>
    </head>

    <body>
        <form name="frmCondicaoParametrizacao" method="post" action="">
            <table border="0" align="center" cellpadding="0" cellspacing="0">
                <tr> 
                    <td colspan="2"><label>Condição:</label></td>
                </tr>
                <tr> 
                    <td width="5"></td>
                    <td>
                        <div id="componentes0"> 
                            <script>
                                criaGrupoComponentes( );
                                imprimeComponentes( 0 );
                            </script>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" height="10"></td>
                </tr>
                <tr>
                    <td colspan="2"><label>Mensagem:</label></td>
                </tr>
                <tr>
                    <td width="5"></td> 
                    <td><input class="mensagem" type="text" name="txtMensagem" onFocus="_hideActive()"></td>
                </tr>
                <tr>
                    <td colspan="2" height="10"></td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <input onclick="submete();" onmouseover="this.className = 'botoes_highlight';" onmouseout="this.className = 'botoes';" class="botoes" type="button" name="btnOk" value="OK">&nbsp;
                        <input onclick="parent.addParametrizacao();" onmouseover="this.className = 'botoes_highlight';" onmouseout="this.className = 'botoes';"  class="botoes" type="button" name="btnCancela" value="Cancelar">
                    </td>
                </tr>
            </table>
        </form>
    </body>
    <script>
        parent.document.forms[ 0 ].hidCaminhoXML.value = "<%= pathXml %>";
    </script>
</html>