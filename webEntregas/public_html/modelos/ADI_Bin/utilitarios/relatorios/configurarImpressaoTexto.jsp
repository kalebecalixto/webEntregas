<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/relatorios/configurarImpressaoTexto.jsp */ %>
<%/*
ADI Informática Ltda.
Descrição: Tela para configuração da impressão de relatórios em modo texto( efetivo matricial )
Autor: Alan Nunes Voiski
Data criação: 14.12.2007
Data ultima alteração: 12/02/2008 - Fábio Henrique
Alteração Efetuada: Adicionado ID no table para uso de include + innerHTML em outra tela
*/
%><%
if( request.getParameter( "idGravaCookie" ) != null )
{
    if( request.getParameter("sqlCtrImp")!=null )
    {
        StringBuilder sqlCtrImp = new StringBuilder( request.getParameter("sqlCtrImp").toString() );
        adi.componentes.util.formata.textos.replace( sqlCtrImp, "dataSistema", new adi.componentes.data.datas().dataSistema("YYYY-MM-DD"));
        adi.componentes.util.formata.textos.replace( sqlCtrImp, "horaSistema", new adi.componentes.data.horas().horaSistema() );
        try
        {
            adi.componentes.sql.query query = new adi.componentes.sql.query();
            query.setContext(application); query.setSessao(session);
            
            query.executaSQL( sqlCtrImp.toString(), "^", false );
        }
        catch( Exception e)
        {
            e.printStackTrace();
            out.write("erroSql");
        }
    }
    Cookie impressora = new Cookie( "rel_impressora", String.valueOf( request.getParameter( "cboImpressora" ) ) );
    Cookie papel = new Cookie( "rel_papel", String.valueOf( request.getParameter( "cboPapel" ) ) );
    Cookie orientacao = new Cookie( "rel_orientacao", String.valueOf( request.getParameter( "hidOrientacao" ) ) );
    response.addCookie( impressora );
    response.addCookie( papel );
    response.addCookie( orientacao );
}
else
{%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" /><% xmlTelas.setContext(application); xmlTelas.setSessao(session); %>
<jsp:useBean id="man"      scope="page" class="adi.componentes.sql.vetorSqlPlus" /><% man.setContext(application); man.setSessao(session); %>
<%
    xmlTelas.usaPermissao = false;
    xmlTelas.nomeTela     = "Configurar Impressora - Modo Texto";
    xmlTelas.imagemFundo  = application.getInitParameter( "imagensGenericasPath" ) + "/imagensDeFundo/fundoAdi.jpg";
    xmlTelas.geraCabecalhoOculto( out, request, response );
    
    String optImpressora        = null;
    String optTipoPapel         = null;
    String optOrientacao        = null;

    Cookie[ ] cookies = request.getCookies( );
    
    for( int i = 0; i < cookies.length; i++ )
    {
        if( cookies[ i ].getName( ).equals( "rel_impressora" ) )
            optImpressora = cookies[ i ].getValue( );

        else if( cookies[ i ].getName( ).equals( "rel_papel" ) )
            optTipoPapel = cookies[ i ].getValue( );

        else if( cookies[ i ].getName( ).equals( "rel_orientacao" ) )
            optOrientacao = cookies[ i ].getValue( );
    }
%>
<script language="JavaScript" src="<%= application.getInitParameter( "rotinasJSPath" )%>/ajax.js"></script>
<script language="JavaScript" src="<%= application.getInitParameter( "rotinasJSPath" )%>/multiple.js"></script>
<script language="JavaScript" type="text/JavaScript">
<!--
    //
    valAux = "";
    function enviar()
    {
        if( document.forms[0].cboImpressora.value=="" )
            msg = "impressora";
        else if( document.forms[0].cboPapel.value=="" )
            msg = "papel";
        else if( document.forms[0].rdoOrientacao[0].checked==false && document.forms[0].rdoOrientacao[1].checked==false )
            msg = "orientação";
        else
        {
            selecionaCombo( document.forms[0].cboPapel, 0 );
            document.forms[0].hidOrientacao.value = document.forms[ 0 ].rdoOrientacao[ 0 ].checked ? 0 : 1;
            document.forms[0].action="<%=application.getInitParameter("relatoriosPath")%>configurarImpressaoTexto.jsp?idGravaCookie=1";
            ajaxRequest(document.forms[0],enviarFinal);
            return;
        }
        alert( "<%=adi.componentes.telas.Mensagem.GENBA0041%>".replace( "^%1^", msg ) );
    }
    function hora()
    {
        hoje = new Date( );
        horaAtual  = ( (   hoje.getHours( ) + 100 ).toString( ) ).substring( 1, 3 );
        horaAtual += ( ( hoje.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 );
        horaAtual += ( ( hoje.getSeconds( ) + 100 ).toString( ) ).substring( 1, 3 );

        return horaAtual;
    }

    function enviarFinal( )
    {
        if(ajax_request.readyState==4)
        {
            if( ajax_request.status == 200 )
            {
                if( opener.parent.consulta? opener.parent.consulta.documentoImpresso : false ){
                    opener.parent.consulta.documentoImpresso = true;
                }
                document.forms[0].action="<%=request.getParameter("arquivoCompilado")%>";
                document.forms[0].target= "relatorio" + hora();
                window.open( "", document.forms[0].target, "width=800,heigth=500,toolbar=no,resizable=yes,status=no,top=0,left=0,menubar=no,scrollbars=yes" );
                document.forms[ 0 ].submit( );
                window.close( );
            }
        }
    }
    
    function buscaFolhas( campo )
    {
        matricial = campo.options[ campo.selectedIndex ].tipo==3? 1 : 0;
        document.frmAjax.sql1.value="SELECT seqImpresTipoPapel, descrImpresTipoPapel " +
                                    "FROM parImpressoraTipoPapel " +
                                    "WHERE idUsoMatricial = " + matricial+
                                    " order by descrImpresTipoPapel";
        montaComboAjax( new Array( "cboPapel^#0#^#1#" ) );
    }
    
    function afterMontaCombo()
    {
        document.frmRelatorio.cboPapel.options[ 0 ] = null;
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
    //-->
</script>
<form action="" method="POST" name="frmRelatorio" target="relatorio" id="frmRelatorio">
    <input type="hidden" name="hidOrientacao">
<%String campo, valor;
    for( java.util.Enumeration e = request.getParameterNames( ); e.hasMoreElements( ); )
    {
            campo = e.nextElement( ).toString();
            valor = request.getParameter(campo).toString();
            out.write("\n<input type=hidden name=\""+campo+"\" value=\""+valor+"\">");
    }
    man.buscaRegistro( "SELECT seqimpressora, marcaimpressora, modeloimpressora, descrtipoimpressora, ci.seqtipoimpressora " +
                       "FROM parcadastroimpressoras ci " +
                            "INNER JOIN bastiposimpressora ti on ci.seqtipoimpressora = ti.seqtipoimpressora " +
                       "WHERE idativo=1 " +
                       "ORDER BY seqimpressora"
    , request, 5 );
%>
    
    <table id="outrosComponentes" width="480" height="181" border="0" cellpadding="2" cellspacing="0" align="center">
        
            <tr>
                <td height="21" align="center" bgcolor="#F0F0F0" style="border: 1px solid #ccc; border-top: 0px solid #fff; font-size: 12px; font-weight: bold; font-family: Arial, Helvetica, sans-serif">Selecione uma Impressora</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; border-top: 0px solid #fff" bgcolor="#ffffff">
                    <table border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr align="center" valign="middle">
                            <td width="70">
                                <input name="lblTamanho" type="text" id="lblTamanho" style="background-color: transparent; border: 0px solid transparent; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold" value="  Impressora: " size="15" readonly="true">
                            </td>
                            <td> 
                                <select name='cboImpressora' onchange="buscaFolhas( this )"  size="1" style="font-size: 14px; font-family: Arial, Helvetica, sans-serif">
                                    <%
                                    StringBuilder sbCampo = new StringBuilder( 200 );
                                    int matricial = 0;
                                    for( int x=0; x < man.vt.size(); x+=5 )
                                    {
                                        sbCampo.delete( 0, sbCampo.length() )
                                               .append( "<option value=" ).append( man.vt.elementAt( x ) )
                                               .append( " tipo=" ).append( man.vt.elementAt( x + 4 ) );
                                        if( optImpressora!=null && optImpressora.equals( man.vt.elementAt( x ) ) )
                                        {
                                               sbCampo.append(" selected" );
                                               if( man.vt.elementAt( x + 4 ).equals( "3" ) )
                                                    matricial = 1;
                                        }
                                        sbCampo.append(">" )
                                               .append( man.vt.elementAt( x + 1 ) ).append( " " ).append( man.vt.elementAt( x + 2 ) )
                                               .append( "(" ).append( man.vt.elementAt( x + 3 ) ).append( ")" );
                                        out.write( sbCampo.toString()  );
                                    }
                                    %>
                                </select>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        
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
                                    man.vt.clear( );
                                    man.buscaRegistro( 
                                            "SELECT seqImpresTipoPapel, descrImpresTipoPapel " +
                                            "FROM parImpressoraTipoPapel " +
                                            "WHERE idUsoMatricial = " + matricial +
                                            " order by descrImpresTipoPapel"
                                    , request, 2 );

                                    for( int i = 0; i < man.vt.size( ); i += 2 )
                                    {
                                        %><option value="<%= man.vt.elementAt( i ) %>"><%= man.vt.elementAt( i + 1 ) %></option><%
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
                    </table>
                </td>
            </tr>
            <tr> 
                <td style="border: 1px solid #ccc; border-top: 0px solid #fff" bgcolor="#ffffff">

                    <table width="356" height="35" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="2" height="35">&nbsp;</td>
                            <td width="354" align="right" valign="bottom"> 
                                <input name="btnOk" type="button" id="btnOk" style="FONT-FAMILY: Arial; BORDER-RIGHT: black 1px solid;BORDER-TOP: gray 1px solid; BORDER-LEFT: gray 1px solid; BORDER-BOTTOM: black 1px solid; FONT-WEIGHT: bold; FONT-SIZE: 9pt; COLOR: #000000; BACKGROUND-COLOR: #efefef; FONT-WEIGHT: bold; WIDTH: 65px;" onClick="enviar( );" value="Ok">
                                &nbsp; 
                                <input name="btnCancelar" type="button" id="btnCancelar" style="FONT-FAMILY: Arial; BORDER-RIGHT: black 1px solid;BORDER-TOP: gray 1px solid; BORDER-LEFT: gray 1px solid; BORDER-BOTTOM: black 1px solid; FONT-WEIGHT: bold; FONT-SIZE: 9pt; COLOR: #000000; BACKGROUND-COLOR: #efefef; FONT-WEIGHT: bold; WIDTH: 65px;" onClick="window.close( );" value="Cancelar">
                                &nbsp;
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
    </table>
        
</form>
<form name="frmAjax" action="<%=application.getInitParameter("ajaxRequest_srvPath")%>" method="POST">
    <input type="hidden" name="sql1">
</form>
</body>
<script>
    document.forms[ 0 ].cboPapel.value = '<%= optTipoPapel %>';
    
    for( var i = 0; i < document.forms[ 0 ].rdoOrientacao.length; i++ )
    {
        if( '<%= optOrientacao %>' == document.forms[ 0 ].rdoOrientacao[ i ].value )
        {
            document.forms[ 0 ].rdoOrientacao[ i ].click( );
            break;
        }
    }
</script>
</html>
<%}%>
