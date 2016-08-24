<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/ADI_CalculosUI/execucao/calculo.jsp */ %>
<%/*
    ADI Informática
    Descrição: Tela para execução das fórmulas de cálculo.
    Autor: Marcos
    Data criação: 16/06/2008
    Data ultima alteração: 26/01/2010 - Fábio Henrique
    Alteração Efetuada: Adicionada função que desabilita complementos evitando que o cálculo seja executado várias vezes.
*/%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<jsp:useBean id="query"    scope="page" class="adi.componentes.sql.query" />
<%
    xmlTelas.setSessao( session );
    xmlTelas.setContext( application );

    query.setContext( application );
    query.setSessao( session );

    // Parâmetros para Tela
    xmlTelas.codTela = "0";
    xmlTelas.siglaSistema = "bas";
    xmlTelas.versao = "01.000";
    xmlTelas.nomeTela = "Cálculo";
    xmlTelas.parametrosBody = "text=\"#666666\" leftmargin=\"2\" topmargin=\"2\" rightmargin=\"0\" bottommargin=\"0\" marginwidth=\"0\" marginheight=\"0\"";

    out.write( xmlTelas.iniciaHtml( request ) );
    xmlTelas.trataPermissao( out, request, response );
    String sistema = query.retornaDescricao( "SELECT descrSistema FROM segSistema WHERE codSistema = " + request.getParameter( "par_codSistema" ) );
%>
<style>
    td.borda
    {
        border: 1px solid #cccccc;
    }

    a
    {
        text-decoration: none;
    }

    input, textarea
    {
        border: 1px solid #999999;
        font-family: Verdana;
        font-size: 12px;
        padding: 2px;
    }

    input.text
    {
        background: white;
    }

    span.erro, span.info, span.code
    {
        font-family: Verdana;
        font-size: 10px;
    }

    span.erro
    {
        color: red;
    }

    span.code
    {
        font-style: italic;
        font-weight: bold;
    }

    .tabs_over
    {
        background-color: #ffff00;
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 10px;
    }

    .tabs, .tabs_curr
    {
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: bold;
    }

    .tabs
    {
        background-color: #efefef;
    }

    .tabs_hint
    {
    }

    .tabs_curr
    {
        background-color: #ffffff;
    }
</style>
<link rel="stylesheet" type="text/css" href="progresso.css" />
<script language="javascript1.2" src="<%= application.getInitParameter( "rotinasJSPath" ) %>/codethatsdk.js"></script>
<script language="javascript1.2" src="<%= application.getInitParameter( "rotinasJSPath" ) %>/codethattabstd.js"></script>
<script language="javascript1.2" src="<%= application.getInitParameter( "rotinasJSPath" ) %>/ajax.js"></script>
<script>
    var EXECUTANDO = <%= br.com.adi.maxnet.calculo.core.Calcular.RODANDO %>;
    var PAUSADO = <%= br.com.adi.maxnet.calculo.core.Calcular.PAUSADO %>;
    var CANCELADO = <%= br.com.adi.maxnet.calculo.core.Calcular.CANCELADO %>;
    var FINALIZADO = <%= br.com.adi.maxnet.calculo.core.Calcular.FINALIZADO %>;

    // Sequenciais utilizados na gravação do cálculo
    var seqControlCalc = -1;
    var seqExercicio   = <%= String.valueOf( request.getParameter( "par_seqExercicio" ) ) %>;

    var seqReceita     = "<%= String.valueOf( request.getParameter( "par_receitaCalculo" ) ) %>";

    //
    var qtdeRegistros = 0;
    var registroAtual = 0;
    var statusCalculo = -1;
    var qtdeErros = 0;
    var qtdeAlertas = 0;
    var executando = true;
    var resultCalc = '';
    var ts;

    function updateInfo( )
    {
        if( executando )
        {
            ajaxRequest( document.frmCalculo, callback );
            id = window.setTimeout( "updateInfo( )", 1800 );
        }
        else
        {
            changeResultTab( );
        }
    }

    function changeResultTab( )
    {
        ts.setCurrTab( "Resultado" );

        out = document.getElementById( "resultado_calculo" )
        if( out )
        {
            if('<%=String.valueOf(request.getParameter( "par_codSistema" ))%>' == '6')
                if(window.opener)
                    window.opener.location.reload();

            out.innerHTML = "<pre>"+
                            "Status: " + statusCalculo + "\n" +
                            "Total de registros: " + qtdeRegistros + "\n" +
                            "Registros calculados: " + registroAtual + "\n" +
                            "Número de erros: " + qtdeErros + "\n" +
                            "<div id='erros_calculo'></div>\n" +
                            "Número de mensagens de alerta: " + qtdeAlertas +
                            "<div id='alertas_calculo'></div>\n" +
                            "</pre>";
            //
            if( qtdeErros * 1 > 0 )
            {
                ajaxRequest( document.frmCalculo, showErros );
            }
            //    
            if( qtdeAlertas * 1 > 0 )
            {
                ajaxRequest( document.frmCalculo, showAlertas );
            }

        }
    }

    
    var alertas = new Array(  );
    var erros;
    function callback( )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                if( trim( ajax_request.responseText ) == '' )
                {
                    executando = false;
                    return;
                }
                //alert( ajax_request.responseText )
                //responses[ responses.length ] = ajax_request.responseText;
                var campo = ajax_request.responseXML.getElementsByTagName( "status" );

                if( campo.length > 0 )
                {
                    statusCalculo = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "calculados" );
                    if( campo.length > 0 )
                        registroAtual = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "qtdeRegistros" );
                    if( campo.length > 0 )
                        qtdeRegistros = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "qtdeErros" );
                    if( campo.length > 0 )
                        qtdeErros = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "qtdeAlertas" );
                    if( campo.length > 0 )
                        qtdeAlertas = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "seqControlCalc" );
                    if( campo.length > 0 )
                        seqControlCalc = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "erro" );
                    if( campo.length > 0 )
                        erros = campo[ 0 ].childNodes[ 0 ].nodeValue;

                    campo = ajax_request.responseXML.getElementsByTagName( "alerta" );
                    for( i = 0; i < campo.length; i++ )
                        alertas[ alertas.length ] = campo[ i ].childNodes[ 0 ].nodeValue;
                }   
            }
            else
                alert( ajax_request.responseText );
        }
    }

    function showErros( )
    {
        out_erros = "<pre>";
        out_erros += erros;
        out_erros += "</pre>";

        out = document.getElementById( "erros_calculo" )
        if( out )
            out.innerHTML = out_erros;
    }

    function showAlertas( )
    {
        out_alertas = "<pre>";

        alerts = ajax_request.responseXML.getElementsByTagName( "alerta" );

        for( i = 0; i < alertas.length; i++ )
            out_alertas += alertas[ i ] + "<br>";

        out_alertas += "</pre>";

        out = document.getElementById( "alertas_calculo" )
        if( out )
            out.innerHTML = out_alertas;
    }
/*
    function showAlertas( )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                out_alertas = "<pre>";

                alerts = ajax_request.responseXML.getElementsByTagName( "alerta" );

                for( i = 0; i < alerts.length; i++ )
                    out_alertas += alerts[ i ].childNodes[ 0 ].nodeValue + "<br>";

                out_alertas += "</pre>";

                out = document.getElementById( "alertas_calculo" )
                if( out )
                    out.innerHTML = out_alertas;
            }
            else
                alert( ajax_request.responseText );
        }
    }
*/
    function cancelar( )
    {
        document.frmCalculo.acao.value = "<%=br.com.adi.maxnet.calculo.core.Calcular.CANCELADO%>";
        ajaxRequest( document.frmCalculo, callback );
    }

    function pausar( )
    {
        document.frmCalculo.acao.value = "<%=br.com.adi.maxnet.calculo.core.Calcular.PAUSADO%>";
        ajaxRequest( document.frmCalculo, callback );
    }

    function hideIt( )
    {
        if(bw.bw){
            div="divLoadCont"
            obj=bw.dom?document.getElementById(div).style:bw.ie4?document.all[div].style:bw.ns4?document[div]:0;
            obj.visibility='hidden'
        }
        temporizadorPesquisaCombo( );
        updateInfo( );
    }
</script>

<table width="100%" height="100%" border="0" cellpadding="2" cellspacing="2" bgcolor="#ffffff">
    <!-- formulario -->
    <form name="frmCalculo" method="post" action="<%=application.getInitParameter( "StatusCalculoServletPath" )%>">
        <input type="hidden" name="status" value="">
    </form>
    <tr> 
        <td height="33" colspan="3" class="borda">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="29"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong><font color="#000000">&nbsp;GRP-MAXNETADI</font></strong><font color="#000000"> 
                    - F&oacute;rmulas de C&aacute;lculo</font></font></td>
                    <td align="right" valign="bottom">
                        <img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/botoes/btnAjuda.jpg" width="25" height="25">
                        <img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/botoes/btnFechar.jpg" width="25" height="25">
                        <font size="1">&nbsp;</font>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr> 
        <td width="33%" height="9" bgcolor="#EFEFEF" class="borda"><font color="#000000" size="1" face="Verdana, Arial, Helvetica, sans-serif"><strong> 
        &nbsp;Usu&aacute;rio:</strong> <%= session.getAttribute( "codUser" ) %></font></td>
        <td height="9" colspan="2" bgcolor="#EFEFEF" class="borda"><font color="#000000" size="1" face="Verdana, Arial, Helvetica, sans-serif"><strong>&nbsp;Empresa:</strong> <%= session.getAttribute( "nomeEmp" ) %>
        </font></td>
    </tr>
    <tr valign="top"> 
        <td colspan="3" class="borda"> 
        <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
            <tr> 
                <td height="19"><font color="#000000" size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong>&nbsp;Sistema:&nbsp;<%=sistema%></strong></font></td>
            </tr>
            <tr> 
                <td height="20"></td>
            </tr>
            <tr> 
                <td valign="top">
                <script>
                    var tabDef = 
                    {
                        x : 10, 
                        y : 10,
                        width : '100%',
                        height : 300,
                        offset : 3,
                        spacing : 3,
                        padding : 8,
                        layout : 'top',
                        cssover : 'tabs_over',
                        css: 'tabs',
                        csshint : 'tabs_hint',
                        csscurr: 'tabs_curr',

                        border :
                        {
                            width : 1, 
                            color : '#cccccc'
                        },

                        tabs :
                        [
                            {
                                text : 'Progresso',
                                hint : '<iframe id="progresso" width="100%" height="100%" frameborder="0" src="progresso.jsp"></iframe>',
                                width : 130,
                                height : 17
                            },
//                            {
//                                text : 'Estatísticas',
//                                hint : '<h3>Estatíticas do cálculo.</h3>',
//                                width : 130,
//                                height : 17
//                            },
                            {
                                text : 'Resultado',
                                hint : '<div id="resultado_calculo"></div>',
                                width : 130,
                                height : 17,
                                action : { js : "changeResultTab( )" }
                            }
                        ]
                    };
                    ts = new CTabSet( 'ts' );
                    ts.create( tabDef );
                </script>
            </tr>
            <tr> 
                <td height="2"></td>
            </tr>
            <tr> 
                <td height="20" class="borda"> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr> 
                        <td width="15" height="10" bgcolor="#EFEFEF"></td>
                        <td rowspan="2" valign="top"><div id="dv_log">&nbsp;</div></td>
                        <td width="20" rowspan="2"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/botoes/detalhes.gif" width="16" height="16" border="0"></td>
                    </tr>
                    <tr> 
                        <td width="15" height="10" bgcolor="#EFEFEF"></td>
                    </tr>
                </table></td>
            </tr>
        </table>
        </td>
    </tr>
</table>
<%= xmlTelas.fechaHtml( ) %>