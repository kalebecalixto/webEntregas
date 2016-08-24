<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/relatorios/configurarImpressaoEspecial.jsp */ %>
<%/*
ADI Informática Ltda.
Descrição: Tela para configuração da impressão das consultas específicas, e relatórios.
Autor: Alan Nunes Voiski
Data criação: 30.08.2006
 
$Revision: 1.12 $
$Author: fabioh $
$Date: 2012/10/26 11:36:43 $ 
 
*/
%>
<jsp:useBean scope="page" id="man"      class="adi.componentes.sql.vetorSqlPlus"/>
<%

man.setSessao( session );
man.setContext( application );

String seqRelatorio      = String.valueOf( request.getParameter( "seqRelatorio" ) );

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
    Cookie formato    = new Cookie( "rel_formato", String.valueOf( request.getParameter( "idGravaCookie" ) ) );
    response.addCookie( formato );
}
else
{%>
<jsp:useBean scope="page" id="xmlTelas3" class="adi.componentes.xml.telas"        />
<%
    xmlTelas3.setContext( application );
    xmlTelas3.setSessao( session );
    xmlTelas3.usaPermissao = false;
    xmlTelas3.nomeTela     = "Configurar Impressora";
    xmlTelas3.imagemFundo  = application.getInitParameter( "imagensGenericasPath" ) + "/imagensDeFundo/fundoAdi.jpg";
    xmlTelas3.geraCabecalhoOculto( out, request, response );
    
    String optFormatoExportacao = null;

    Cookie[ ] cookies = request.getCookies( );
    
    for( int i = 0; i < cookies.length; i++ )
        if( cookies[ i ].getName( ).equals( "rel_formato" ) )
            optFormatoExportacao = cookies[ i ].getValue( );
%>
<script language="JavaScript" src="<%= application.getInitParameter( "rotinasJSPath" )%>/ajax.js"></script>
<script language="JavaScript" type="text/JavaScript">
    valAux = "";
    
    
    
    function enviar()
    {
    	var botaoIncluir = document.getElementById( "btnOk" );
        botaoIncluir.disabled = 'true';
        botaoIncluir.value = "Aguarde...";
        
        for( var i = 0; i < document.forms[ 0 ].formatoExportacao.length; i++ )
            if( document.forms[ 0 ].formatoExportacao[ i ].checked )
            {
                valAux = document.forms[ 0 ].formatoExportacao[ i ].value;
                break;
            }
            
        /*if( valAux.length==0 )
        {
            alert( "<%=adi.componentes.telas.Mensagem.GENBA0041%>".replace( "^%1^", "opção" ) );
            return;
        }*/
        document.forms[0].action="<%=application.getInitParameter("relatoriosPath")%>configurarImpressaoEspecial.jsp?seqRelatorio=<%=seqRelatorio%>&idGravaCookie=" + valAux;
        ajaxRequest(document.forms[0],enviarFinal);
        botaoIncluir.disabled = 'false';
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
                if(opener)
                {
                    if( opener.parent.consulta? opener.parent.consulta.documentoImpresso : false ){
                        opener.parent.consulta.documentoImpresso = true;
                    }
                    
                    document.forms[0].action="<%=application.getInitParameter("relatorioJR_srvPath")%>";
                    document.forms[0].target= "relatorio" + hora();
                    window.open( "", document.forms[0].target, "width=700,heigth=500,toolbar=no,resizable=yes,status=yes,top=0,left=0,menubar=yes,scrollbars=yes" );
                    document.forms[ 0 ].submit( );
                    window.close( );
                }
                else
                {
                    if( parent.consulta? parent.consulta.documentoImpresso : false ){
                        parent.consulta.documentoImpresso = true;
                    }
                    
                    formulario = parent.formPdfEspecial;
                    document.forms[0].action="<%=application.getInitParameter("relatorioJR_srvPath")%>";
                    ajaxRequest(formulario,relatorioGerado);
                }
            }
        }
    }
    
    function relatorioGerado()
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                loadIframe("abrirPdfSemPopup", "<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/abrirRelatorio.jsp");
            }
        }
    }
    
    function loadIframe(iframeName, url)
    {
        window.frames[iframeName].location = url;
    }
    
    function abrirRelatorio(caminhoRelatorio)
    {
        janelaTamanho = "G";
        janelaUrl = caminhoRelatorio;
        janelaTarget = "Rel_" + hora();
        janela();
        
    	if(opener)
   		{
    		window.close( );
   		}
    	else if(parent)
   		{
    		if(parent.botaoGerarRelatorio)
   			{
    			parent.botaoGerarRelatorio.style.visibility = 'visible';
    			
    		    var iframePdfSemPopup = parent.document.getElementById("iframePdfSemPopup");
    		    
    		    if(iframePdfSemPopup != null)
    		    {
    		        iframePdfSemPopup.style.height = "0px";
    		        iframePdfSemPopup.style.width = "0px";
    		    }
   			}
   		}
    }
    
    function botaoCancelarPressionado()
    {
    	if(opener)
   		{
    		window.close( );
   		}
    	else if(parent)
   		{
    		if(parent.botaoGerarRelatorio)
   			{
    			parent.botaoGerarRelatorio.style.visibility = 'visible';
    			
    		    var iframePdfSemPopup = parent.document.getElementById("iframePdfSemPopup");
    		    
    		    if(iframePdfSemPopup != null)
    		    {
    		        iframePdfSemPopup.style.height = "0px";
    		        iframePdfSemPopup.style.width = "0px";
    		    }
   			}
   		}
    }
</script>
<iframe src="" frameborder="0" id="abrirPdfSemPopup" name="abrirPdfSemPopup" scrolling="no" width="0" height="0"></iframe>
<form action="" method="POST" name="frmRelatorio" target="relatorio" id="frmRelatorio">
<%
String campo, valor;

    for( java.util.Enumeration e = request.getParameterNames( ); e.hasMoreElements( ); )
    {
            campo = e.nextElement( ).toString();
            valor = request.getParameter(campo).toString();

            if (campo.equals("seqRelatorio"))
                            seqRelatorio = valor;

            out.write("\n<input type=hidden name=\""+campo+"\" value=\""+valor+"\">");
    }


/* Verifica quais opçoes de impressao estão disponíveis para o usuario */
String sqlBasModeloDoRelatorio = "";
String resultadoSql = "1111111111";
String numeroRelatorio = "0";
int qteExtensao = 0;

try
{
    if (!seqRelatorio.equals("") && !seqRelatorio.equals("null") && !seqRelatorio.equals(null))
    {
        /* Primeiro verifica se existe o relatorio em BASMODELOSDORELATORIO, depois pega o EXTENSAOPERMITIDA */
        String sqlVerificaExisteRelatorio = " SELECT COUNT (*) FROM BASMODELOSDORELATORIO WHERE SEQRELATORIO = '" + seqRelatorio +
            "' AND IDATIVO = 1 ";
        
        man.vt.clear();
        man.buscaRegistro(sqlVerificaExisteRelatorio);
        
        if (man.vt.size() > 0)
        {        
            numeroRelatorio = man.vt.elementAt(0); 
        }

        if (!numeroRelatorio.equals("0"))
        {
            sqlBasModeloDoRelatorio = " SELECT EXTENSAOPERMITIDA FROM BASMODELOSDORELATORIO WHERE SEQRELATORIO = '" + seqRelatorio +
                "' AND IDATIVO = 1 ";

            man.vt.clear();
            man.buscaRegistro(sqlBasModeloDoRelatorio);

            if (man.vt.size() > 0)
            {
                resultadoSql = man.vt.elementAt(0);
                
                for(int i = 0; i < resultadoSql.length(); i++)
                {
                    if(resultadoSql.charAt(i) ==  '1' )
                        qteExtensao++;
                }
                
            }
        
        }
    }
}
catch (Exception e)
{
    e.printStackTrace();
}

%>
    <table id="outrosComponentes" width="480" height="181" border="0" cellpadding="2" cellspacing="0" align="center">
        <tr>
            <td height="21" align="center" bgcolor="#F0F0F0" style="border: 1px solid #ccc; border-top: 0px solid #fff; font-size: 12px; font-weight: bold; font-family: Arial, Helvetica, sans-serif">Formato de saída</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; border-top: 0px solid #fff" bgcolor="#ffffff">
            <table border="0" align="center" cellpadding="0" cellspacing="0">
                <tr align="center" valign="middle">
                    <% if (resultadoSql.substring(0,1).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/pdf.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="pdf" checked="true">
                        </label>
                    </td>
                    <% } %>
                    <% if (resultadoSql.substring(1,2).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/rtf.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="rtf">
                        </label>
                    </td>
                    <% } %>
                    <% if (resultadoSql.substring(2,3).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/html.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="html">
                        </label>
                    </td>
                    <% } %>
                    <% if (resultadoSql.substring(3,4).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/txt.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="txt">
                        </label>
                    </td>
                    <% } %>
                    <% if (resultadoSql.substring(4,5).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/xls.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="xls">
                        </label>
                    </td>
                    <% } %>
                    <% if (resultadoSql.substring(5,6).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/csv.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="csv">
                        </label>
                    </td>
                    <% } %>
                    <% if (resultadoSql.substring(6,7).equals("1")) { %>
                    <td>
                        <label>
                            <img src="<%= application.getInitParameter( "geradorDeRelatoriosPath" ) %>/bin/imagens/xml.gif" width="67" height="52" align="absmiddle"><br>
                            <input type="radio" name="formatoExportacao" id="formatoExportacao" value="xml">
                        </label>
                    </td>
                    <% } %>
                </tr>
            </table>
            <table width="356" height="35" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td width="2" height="35">&nbsp;</td>
                    <td width="354" align="right" valign="bottom"> 
                        <input name="btnOk" type="button" id="btnOk" style="FONT-FAMILY: Arial; BORDER-RIGHT: black 1px solid;BORDER-TOP: gray 1px solid; BORDER-LEFT: gray 1px solid; BORDER-BOTTOM: black 1px solid; FONT-WEIGHT: bold; FONT-SIZE: 9pt; COLOR: #000000; BACKGROUND-COLOR: #efefef; FONT-WEIGHT: bold; WIDTH: 65px;" onClick="enviar( );" value="Ok">
                        &nbsp; 
                        <input name="btnCancelar" type="button" id="btnCancelar" style="FONT-FAMILY: Arial; BORDER-RIGHT: black 1px solid;BORDER-TOP: gray 1px solid; BORDER-LEFT: gray 1px solid; BORDER-BOTTOM: black 1px solid; FONT-WEIGHT: bold; FONT-SIZE: 9pt; COLOR: #000000; BACKGROUND-COLOR: #efefef; FONT-WEIGHT: bold; WIDTH: 65px;" onClick="botaoCancelarPressionado();" value="Cancelar">
                        &nbsp;
                    </td>
                </tr>
            </table></td>
        </tr>
    </table>
</form>
</body>
<script>
    verificaExtensaoUnica();
    function verificaExtensaoUnica()
    {
        if("<%= qteExtensao %>" == "1")
        {
            enviar()
        }
    }
    for( var i = 0; i < document.forms[ 0 ].formatoExportacao.length; i++ )
    {
        if( '<%= optFormatoExportacao %>' == document.forms[ 0 ].formatoExportacao[ i ].value )
        {
            document.forms[ 0 ].formatoExportacao[ i ].click( );
            break;
        }
    }
</script>
</html>
<%}%>