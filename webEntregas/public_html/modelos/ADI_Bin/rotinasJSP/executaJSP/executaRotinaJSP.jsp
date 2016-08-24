<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/executaJSP/executaRotinaJSP.jsp */ %>
<%/*
    ADI Informática
    Descrição: Tela para execução de rotinas pesadas
    Autor: lucas hermano
    Data criação: 02.09.2008
    Data última alteração: 12.09.2008 lucas hermano
    Alteração Efetuada: implementada a visualização da mensagem de erro
*/%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />

<%
    xmlTelas.setSessao( session );
    xmlTelas.setContext( application );

    // Parâmetros para Tela
    xmlTelas.codTela = "0";
    xmlTelas.siglaSistema = "bas";
    xmlTelas.versao = "01.000";
    xmlTelas.nomeTela = "Executa Rotina JSP";
    xmlTelas.parametrosBody = "text=\"#666666\" leftmargin=\"2\" topmargin=\"2\" rightmargin=\"0\" bottommargin=\"0\" marginwidth=\"0\" marginheight=\"0\"";

    out.write( xmlTelas.iniciaHtml( request ) );
    xmlTelas.trataPermissao( out, request, response );
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
    var executando = true;
    var ts;
    
    var mensagemRotina        = "";
    var mensagemErroRotinaJSP = "";
    var statusRotina          = 0;
    
    function buscaMensagens(  )
    {
        var retornoMensagem = "";
        
        splitMensagem = mensagemRotina.split( "^" );
        
        for( x = 0; x < splitMensagem.length; x++ )
        {
            if( splitMensagem[ x ] != "" )
                retornoMensagem += "<br> "+splitMensagem[ x ];
        }
        return retornoMensagem;
    }

    function updateInfo( )
    {
        if( executando )
        {
            id = window.setTimeout( "updateInfo( )", 3000 );
            
            atualizaStatus(  );
        }
        else
        {
            changeResultTab( );
        }
    }

    function changeResultTab( )
    {
        ts.setCurrTab( "Resultado" );

        atualizaStatus(  );
    }
    
    function atualizaStatus(  )
    {
        out = document.getElementById( "resultado_rotina" );
        conteudoDivResultado = "";
        if( out )
        {
            conteudoDivResultado = "<pre> "+buscaMensagens(  )+" </pre>";
            
            if( mensagemErroRotinaJSP != "" )
            {
                conteudoDivResultado += "<pre><br>Clique [ <a href=\"javascript:abreErroRotinaJSP(  )\">aqui</a> ] para visualizar o erro.</pre>";
            }
            
            out.innerHTML = conteudoDivResultado;
            
        }
    }
    
    function abreErroRotinaJSP(  )
    {
        janelaUrl     = mensagemErroRotinaJSP;
        janelaTamanho = "M";
        janelaTarget  = "janelaMensagemErroJSP";
        janela(  );
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
    <form name="frmCalculo" method="post" action="">
        
    </form>
    <tr> 
        <td height="33" colspan="3" class="borda">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="29"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong><font color="#000000">&nbsp;GRP-MAXNETADI</font></strong><font color="#000000"></font></font></td>
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
                <td height="19"><font color="#000000" size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong>&nbsp;&nbsp;</strong></font></td>
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
                            {
                                text : 'Resultado',
                                hint : '<div id="resultado_rotina"></div>',
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