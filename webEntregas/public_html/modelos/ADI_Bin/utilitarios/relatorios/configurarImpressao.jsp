<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/relatorios/configurarImpressao.jsp */ %>
<jsp:useBean scope="page" id="vtSQL"    class="adi.componentes.sql.vetorSqlPlus" />
<jsp:useBean scope="page" id="xmlTelas" class="adi.componentes.xml.telas"        />
<%
/*
* $Revision: 1.24 $
* $Author: kalebe.calixto $
* $Date: 2013/04/12 15:25:59 $
*/
%><%
    vtSQL.setContext( application );
    vtSQL.setSessao( session );
    xmlTelas.setContext( application );
    xmlTelas.setSessao( session );
    xmlTelas.usaPermissao = false;
    xmlTelas.nomeTela     = "Configurar Impressora";
    xmlTelas.imagemFundo  = application.getInitParameter( "imagensGenericasPath" ) + "/imagensDeFundo/fundoAdi.jpg";
    xmlTelas.geraCabecalhoOculto( out, request, response );
    String sql;

    String hidSqlRelatorioPdf   = String.valueOf( request.getParameter( "hidSqlRelatorioPdf"   ) );
    String hidOrientacao        = String.valueOf( request.getParameter( "hidOrientacao"        ) );
    String hidTipoPapel         = String.valueOf( request.getParameter( "hidTipoPapel"         ) );
    String hidFormatoExportacao = String.valueOf( request.getParameter( "hidFormatoExportacao" ) );
    String voltou = String.valueOf( request.getParameter( "hidVoltou" ) );


    //System.out.println("hidSqlRelatorioPdf  "+hidSqlRelatorioPdf);
    //adi.componentes.sql.DBConnection dbc = (adi.componentes.sql.DBConnection)request.getSession().getAttribute( "datasource" );
    //java.sql.Connection conn = dbc.abreConexao( true );

    String optTipoPapel         = null;
    String optOrientacao        = null;
    String optFormatoExportacao = null;

    //String usuario = String.valueOf( session.getAttribute( "codUser" ) );

    Cookie[ ] cookies = request.getCookies( );

    for( int i = 0; i < cookies.length; i++ )
    {
        if( cookies[ i ].getName( ).equals( "rel_papel" ) )
            optTipoPapel = cookies[ i ].getValue( );

        else if( cookies[ i ].getName( ).equals( "rel_orientacao" ) )
            optOrientacao = cookies[ i ].getValue( );

        else if( cookies[ i ].getName( ).equals( "rel_formato" ) )
            optFormatoExportacao = cookies[ i ].getValue( );
    }

    boolean geraFormAdicional = false;

    String xml = "";
    String nomeEmp = "";
    String codUser = "";
    StringBuilder logotipo = new StringBuilder();

    if( !hidSqlRelatorioPdf.equals( "null" ) )
    {
    	geraFormAdicional = true;

        String caminhoPersona;
        Cookie papel, orientacao, formato;

        papel      = new Cookie( "rel_papel", hidTipoPapel );
        orientacao = new Cookie( "rel_orientacao", hidOrientacao );
        formato    = new Cookie( "rel_formato", hidFormatoExportacao );

        logotipo       = new StringBuilder( 50 );
        caminhoPersona = application.getInitParameter( "baseUploadPath" ) + "/empresa" + session.getAttribute( "idEmpresa" ) + "/persona/pessoa";

        if( session.getAttribute( "idEmpresa" ) != null )
        {
            vtSQL.buscaRegistro( "SELECT D.codPessoa, logotipo "+
                "FROM basPessoas C, segEmpresa D "+
                "WHERE D.codPessoa = C.codPessoa AND D.codEmpresa = " + session.getAttribute( "codEmpresa" ), request, 2 );

            logotipo = new StringBuilder( caminhoPersona+vtSQL.vt.elementAt( 0 ) + "/" + vtSQL.vt.elementAt( 1 ) );

            if( !new java.io.File( String.valueOf( logotipo ) ).exists( ) )
                logotipo.delete( 0, logotipo.length( ) );

            logotipo = new StringBuilder( caminhoPersona + vtSQL.vt.elementAt( 0 ) + "/" + vtSQL.vt.elementAt( 1 ) );

            if( !new java.io.File( logotipo.toString( ) ).exists( ) )
                logotipo = new StringBuilder( "" );
        }

        response.addCookie( papel );
        response.addCookie( orientacao );
        response.addCookie( formato );

        xml = new adi.componentes.impressao.ImpressaoConsulta( request ).geraXMLJasperReports( );


        nomeEmp = String.valueOf(session.getAttribute( "nomeEmp" ));
        codUser = String.valueOf(session.getAttribute( "codUser" ));
/*
        out.write("<form name='frmNext' method='post' action='/ADI_Intranet_Root/servlet/adi.componentes.relatorio.RelatorioJasperReports'>");
        out.write("<input type='hidden' name='stringJRXML'          value='" + xml + "'>");
        out.write("<input type='hidden' name='formatoExportacao'    value='" + hidFormatoExportacao + "'>");
        out.write("<input type='hidden' name='NOME_EMPRESA'         value='" + nomeEmp + "'>");
        out.write("<input type='hidden' name='USUARIO'              value='" + codUser + "'>");
        out.write("<input type='hidden' name='LOGOTIPO'             value='" + logotipo.toString( ) + "'>");
        out.write("</form>");

        out.write("<script>");
        out.write("   document.frmNext.submit();");
        out.write("</script>");
*/
    }
%>
<script language="JavaScript" src="<%= application.getInitParameter( "rotinasJSPath" )%>/multiple.js"></script>
<script language="JavaScript" type="text/JavaScript">

    if(<%= voltou %> == "1")
    {
        window.close( );
    }

    function buscaDadosRel( )
    {
        document.forms[ 0 ].hidRelatorio.value       = parent.top.opener.document.relatorioPdf.relatorio.value;
        document.forms[ 0 ].hidSubTitulo.value       = parent.top.opener.document.relatorioPdf.subTituloPdf.value;
        document.forms[ 0 ].hidPrograma.value        = parent.top.opener.document.relatorioPdf.programa.value;
        document.forms[ 0 ].hidSqlRelatorioPdf.value = parent.top.opener.document.relatorioPdf.sqlRelatorioPdf.value;
        document.forms[ 0 ].hidTipoPapel.value       = parent.top.opener.document.relatorioPdf.papel.value;
        document.forms[ 0 ].hidColunas.value         = parent.top.opener.document.relatorioPdf.colunas.value;
        //campos opcionais do relatório.
        if( parent.top.opener.document.relatorioPdf.colunasVisiveis != undefined )
            document.forms[ 0 ].hidColunasVisiveis.value = parent.top.opener.document.relatorioPdf.colunasVisiveis.value;
        if( parent.top.opener.document.relatorioPdf.formataColunas != undefined )
            document.forms[ 0 ].hidFormataColunas.value = parent.top.opener.document.relatorioPdf.formataColunas.value;
        if( parent.top.opener.document.relatorioPdf.substituiValores != undefined )
            document.forms[ 0 ].hidSubstituiValores.value = parent.top.opener.document.relatorioPdf.substituiValores.value;
        if( parent.top.opener.document.relatorioPdf.colunasFormatadas != undefined )
            document.forms[ 0 ].hidColunasFormatadas.value = parent.top.opener.document.relatorioPdf.colunasFormatadas.value;
        if( parent.top.opener.document.relatorioPdf.totalizaColunas != undefined )
            document.forms[ 0 ].hidTotalizaColunas.value = parent.top.opener.document.relatorioPdf.totalizaColunas.value;
        if( parent.top.opener.document.relatorioPdf.colunasSQL != undefined )
            document.forms[ 0 ].hidColunasSQL.value = parent.top.opener.document.relatorioPdf.colunasSQL.value;
    }
    //
    function enviar( )
    {
            document.forms[ 0 ].hidTipoPapel.value         = document.forms[ 0 ].cboPapel.value;
            document.forms[ 0 ].hidOrientacao.value        = ( document.forms[ 0 ].rdoOrientacao[ 0 ].checked ) ? 0 : 1;

            for( var i = 0; i < document.forms[ 0 ].rdoFormatoExportacao.length; i++ )
            {
                if( document.forms[ 0 ].rdoFormatoExportacao[ i ].checked )
                {
                    document.forms[ 0 ].hidFormatoExportacao.value = document.forms[ 0 ].rdoFormatoExportacao[ i ].value;
                    break;
                }
            }

            window.open( "", "relatorio", "width=700,heigth=500,toolbar=no,resizable=yes,status=yes,top=0,left=0,menubar=yes,scrollbars=yes" );

            document.forms[ 0 ].submit( );
            window.close( );
    }
    //
    function findObj( n, d )
    {
        var p;
        var i;
        var x;
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
            x = findObj( n, d.layers[ i ].document );

        if( !x && d.getElementById )
            x = d.getElementById( n );

        return x;
    }
    //
    function preloadImages( )
    {
        var d = document;
        if( d.images )
        {
            if( !d.MM_p )
                d.MM_p = new Array( );

            var i;
            var j = d.MM_p.length;
            var a = preloadImages.arguments;
            for( i = 0; i < a.length; i++ )
            {
                if( a[ i ].indexOf( "#" ) != 0 )
                {
                    d.MM_p[ j ] = new Image;
                    d.MM_p[ j++ ].src = a[ i ];
                }
            }
        }
    }
    //
    function swapImgRestore( )
    {
        var i;
        var x;
        var a = document.MM_sr;
        for( i = 0; a && i < a.length && ( x = a[ i ] ) && x.oSrc;i ++ )
            x.src = x.oSrc;
    }
    //
    function swapImage( )
    {
        var i;
        var j = 0;
        var x;
        var a = swapImage.arguments;
        document.MM_sr = new Array;
        for( i = 0; i < ( a.length - 2 ); i += 3 )
        {
            if( ( x = findObj( a[ i ] ) ) != null )
            {
                document.MM_sr[ j++ ] = x;
                if( !x.oSrc )
                    x.oSrc = x.src;

                x.src = a[ i + 2 ];
            }
        }
    }

</script>
<form action="configurarImpressao.jsp" method="post" name="frmRelatorio" target="relatorio" id="frmRelatorio">
    <table width="360" height="281" border="0" cellpadding="2" cellspacing="0">
        <tr>
            <td height="21" align="center" bgcolor="#F0F0F0" style="border: 1px solid #ccc; font-size: 12px; font-weight: bold; font-family: Arial, Helvetica, sans-serif">Tipo de papel</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; border-top: 0px solid #fff" bgcolor="#ffffff">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="70">
                            <input name="lblTamanho" type="text" id="lblTamanho" style="background-color: transparent; border: 0px solid transparent; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold" value="  Tamanho: " size="15" readonly="true">
                        </td>
                        <td>
                            <select name="cboPapel" size="1" id="select3" style="font-size: 14px; font-family: Arial, Helvetica, sans-serif">
                                <%
                                sql = "SELECT seqImpresTipoPapel, " +
                                        "       descrImpresTipoPapel " +
                                        "FROM parImpressoraTipoPapel " +
                                        "WHERE idUsoMatricial = 0";

                                vtSQL.vt.clear( );
                                vtSQL.buscaRegistro( sql, request, 2 );

                                for( int i = 0; i < vtSQL.vt.size( ); i += 2 )
                                {
                                    %><option value="<%= vtSQL.vt.elementAt( i ) %>"><%= vtSQL.vt.elementAt( i + 1 ) %></option><%
                                }
                                %>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <input name="lblOrientacao" type="text" id="lblOrientacao" style="background-color: transparent; border: 0px solid transparent; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold" value="  Orienta&ccedil;&atilde;o: " size="15" readonly="true">
                        </td>
                        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="8%" height="16"> <input name="rdoOrientacao" type="radio" onClick="swapImage('imgOrientacao','','<%= application.getInitParameter( "imagensGenericasPath" ) %>/utilitarios/retrato.gif',1)" value="0"></td>
                                    <td width="44%"><font size="2" face="Arial, Helvetica, sans-serif">
                                            <strong>
                                                <input name="optOrientacao1" type="text" id="optOrientacao1" style="background-color: transparent; border: 0px solid transparent; font-family: Arial, Helvetica, sans-serif; font-size: 13px;" value="Retrato" size="15" readonly="true">
                                    </strong></font></td>
                                    <td width="48%" rowspan="2"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/utilitarios/retrato.gif" name="imgOrientacao" width="32" height="32" id="imgOrientacao"></td>
                                </tr>
                                <tr>
                                    <td height="22">
                                    <input name="rdoOrientacao" type="radio" onClick="swapImage('imgOrientacao','','<%= application.getInitParameter( "imagensGenericasPath" ) %>/utilitarios/paisagem.gif',1)" value="1"></td>
                                    <td><strong>
                                            <input name="optOrientacao2" type="text" id="optOrientacao2" style="background-color: transparent; border: 0px solid transparent; font-family: Arial, Helvetica, sans-serif; font-size: 13px;" value="Paisagem" size="15" readonly="true">
                                    </strong></td>
                                </tr>
                        </table></td>
                    </tr>
            </table></td>
        </tr>
        <tr>
            <td height="21" align="center" bgcolor="#F0F0F0" style="border: 1px solid #ccc; border-top: 0px solid #fff; font-size: 12px; font-weight: bold; font-family: Arial, Helvetica, sans-serif">Formato de saída</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; border-top: 0px solid #fff" bgcolor="#ffffff">
                <table border="0" align="center" cellpadding="0" cellspacing="0">
                    <tr align="center" valign="middle">
                        <td>
                            <label>
                                <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/pdf.gif" width="67" height="52" align="absmiddle"><br>
                                <input type="radio" name="rdoFormatoExportacao" id="rdoFormatoExportacao" value="pdf">
                            </label>
                        </td>
                        <!--td>
                            <label>
                                <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/rtf.gif" width="67" height="52" align="absmiddle"><br>
                                <input type="radio" name="rdoFormatoExportacao" id="rdoFormatoExportacao" value="rtf">
                            </label>
                        </td
                        <td>
                            <label>
                                <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/html.gif" width="67" height="52" align="absmiddle"><br>
                                <input type="radio" name="rdoFormatoExportacao" id="rdoFormatoExportacao" value="html">
                            </label>
                        </td>
                        <td>
                            <label>
                                <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/txt.gif" width="67" height="52" align="absmiddle"><br>
                                <input type="radio" name="rdoFormatoExportacao" id="rdoFormatoExportacao" value="txt">
                            </label>
                        </td>
                        <td>
                            <label>
                                <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/xls.gif" width="67" height="52" align="absmiddle"><br>
                                <input type="radio" name="rdoFormatoExportacao" id="rdoFormatoExportacao" value="xls">
                            </label>
                        </td>-->
                        <td>
                            <label>
                                <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/csv.gif" width="67" height="52" align="absmiddle"><br>
                                <input type="radio" name="rdoFormatoExportacao" id="rdoFormatoExportacao" value="csv">
                            </label>
                        </td>
                    </tr>
                </table>
                <table width="356" height="35" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="2" height="35">&nbsp;</td>
                        <td width="354" align="right" valign="bottom">
                            <input name="btnOk" type="button" id="btnOk" style="FONT-FAMILY: Arial; BORDER-RIGHT: black 1px solid;BORDER-TOP: gray 1px solid; BORDER-LEFT: gray 1px solid; BORDER-BOTTOM: black 1px solid; FONT-WEIGHT: bold; FONT-SIZE: 9pt; COLOR: #000000; BACKGROUND-COLOR: #efefef; FONT-WEIGHT: bold; WIDTH: 65px;" onClick="enviar();" value="Ok">
                            &nbsp;
                            <input name="btnCancelar" type="button" id="btnCancelar" style="FONT-FAMILY: Arial; BORDER-RIGHT: black 1px solid;BORDER-TOP: gray 1px solid; BORDER-LEFT: gray 1px solid; BORDER-BOTTOM: black 1px solid; FONT-WEIGHT: bold; FONT-SIZE: 9pt; COLOR: #000000; BACKGROUND-COLOR: #efefef; FONT-WEIGHT: bold; WIDTH: 65px;" onClick="window.close( );" value="Cancelar">
                            &nbsp;
                        </td>
                    </tr>
            </table></td>
        </tr>
    </table>
    <input type="hidden" name="hidRelatorio"         value="">
    <input type="hidden" name="hidSubTitulo"         value="">
    <input type="hidden" name="hidPrograma"          value="">
    <input type="hidden" name="hidSqlRelatorioPdf"   value="">
    <input type="hidden" name="hidTipoPapel"         value="">
    <input type="hidden" name="hidColunas"           value="">
    <input type="hidden" name="hidColunasVisiveis"   value="">
    <input type="hidden" name="hidFormataColunas"    value="">
    <input type="hidden" name="hidSubstituiValores"  value="">
    <input type="hidden" name="hidColunasFormatadas" value="">
    <input type="hidden" name="hidTotalizaColunas"   value="">
    <input type="hidden" name="hidOrientacao"        value="">
    <input type="hidden" name="hidFormatoExportacao" value="">
    <input type="hidden" name="hidColunasSQL"        value="">
    <input type="hidden" name="hidVoltou"        value="1">
</form>

<% if(geraFormAdicional) { %>


    <form action="/ADI_Intranet_Root/servlet/adi.componentes.relatorio.RelatorioJasperReports" method="post" name="frmNext" target="auxRelatorio" id="frmAuxRelatorio">
    <input type='hidden' name='stringJRXML'          value='<%=xml.replaceAll("á","a").replaceAll("é","e").replaceAll("í","i").replaceAll("ó","o").replaceAll("ú","u").replaceAll("ã","a").replaceAll("ê","e").replaceAll("à","a").replaceAll("õ","o").replaceAll("ã","a").replaceAll("ç","c") %>'>
    <input type='hidden' name='formatoExportacao'    value='<%=hidFormatoExportacao%>'>
    <input type='hidden' name='NOME_EMPRESA'         value='<%=nomeEmp%>'>
    <input type='hidden' name='USUARIO'              value='<%=codUser%>'>
    <input type='hidden' name='LOGOTIPO'             value='<%=logotipo.toString()%>'>
    <input type='hidden' name='telaOrigem'             value='configurarImpressao'>
    </form>

    <script>
       if(document.frmNext)
       {
           //document.frmNext.stringJRXML.value = converterPadraoISO8859( document.frmNext.stringJRXML.value );

    	   document.frmNext.submit();
       }


    </script>

<% } %>

<script>

    buscaDadosRel( );

    document.forms[ 0 ].cboPapel.value = '<%= optTipoPapel %>';

    for( var i = 0; i < document.forms[ 0 ].rdoFormatoExportacao.length; i++ )
    {
        if( '<%= optFormatoExportacao %>' == document.forms[ 0 ].rdoFormatoExportacao[ i ].value )
        {
            document.forms[ 0 ].rdoFormatoExportacao[ i ].click( );
            break;
        }
    }

    for( var i = 0; i < document.forms[ 0 ].rdoOrientacao.length; i++ )
    {
        if( '<%= optOrientacao %>' == document.forms[ 0 ].rdoOrientacao[ i ].value )
        {
            document.forms[ 0 ].rdoOrientacao[ i ].click( );
            break;
        }
    }

function removerDivCarregando()
{
    if(document.getElementById("divLoadCont"))
        document.getElementById("divLoadCont").innerHTML = "";
}


var timerCarregando = setTimeout("removerDivCarregando()", 3000);


</script>
</body>
</html>