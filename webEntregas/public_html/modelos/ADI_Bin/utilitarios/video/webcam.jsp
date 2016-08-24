<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/video/webcam.jsp */ %>
<%/* ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/ADI_Bin/utilitarios/video/webcam.jsp */ %>
<%
/*
 * ADI Informática Ltda.
 * Descrição: Exibe imagens capturadas de uma webcam.
 * Autor: Diego R. Drumond
 * Data Criação: 09/03/2004
 */
%>
<jsp:useBean scope="page" id="xmlTelas" class="adi.componentes.xml.telas" />
<jsp:useBean scope="page" id="dt" class="adi.componentes.data.datas" />
<jsp:useBean scope="page" id="hr" class="adi.componentes.data.horas" />
<%
xmlTelas.setContext( application );
xmlTelas.setSessao( session );
xmlTelas.codTela      = "";
xmlTelas.siglaSistema = "";
xmlTelas.nomeTela     = "Webcam";
xmlTelas.usaPermissao = false;
xmlTelas.classePrincipal = "bastipotratamento";
xmlTelas.chavesPrimarias.add( "siglatipotratamento" );
xmlTelas.geraCabecalhoOculto( out, request, response );
%>
<form name="form1">
<table width="100%" height="100%">
  <tr>
  	<td align="center">
  		<table cellpadding="1" cellspacing="0" bgcolor="black">
  			<tr>
    			<td><img name="cam" src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/mensagens/carregando.jpg" height="240" width="320"></td>
    		</tr>
    		<tr><td bgcolor="black"><font color="white" size="2" face="Verdana"><input size="35" readonly name="txtDataHora" style="border: 1px solid black; background-color: black; color: white; font-family: Verdana"></td></tr>
    	</table>
  	</td>
  </tr>
  <tr>
    <td align="center"><font face="Verdana" size="1">[ <a href="javascript:self.close( )"><font color="black" face="Verdana" size="1" style="text-decoration: none">Fechar</font></a> ]</font></td>
  </tr>
</table>
<script>
<!--
function reload( )
{
	document.cam.src = "<%= application.getInitParameter( "webcam_srvPath" ) %>";
	setTimeout( "reload()", 1000 );
}
<%
String dtsys = dt.dataSistema( "YYYY-MM-DD" );
String hrsys = hr.horaSistema( );
%>
dd_sys   = <%= dtsys.substring( 8, 10 ) %>;
MM_sys   = <%= dtsys.substring( 5, 7 ) %> - 1;
aaaa_sys = <%= dtsys.substring( 0, 4 ) %>;
hh_sys   = <%= hrsys.substring( 0, 2 ) %>;
mm_sys   = <%= hrsys.substring( 3, 5 ) %>;
ss_sys   = <%= hrsys.substring( 6, 8 ) %>;
function horario( )
{
	meses = new Array( "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" );
	dt    = new Date( aaaa_sys, MM_sys, dd_sys, hh_sys, mm_sys, ss_sys );
	dd    = ( parseInt( dt.getDate( ) ) + 100 ).toString( ).substring( 1, 3 );
	MM    = meses[ dt.getMonth( ) ];
	aaaa  = ( parseInt( dt.getFullYear( ) ) + 10000 ).toString( ).substring( 1, 5 );
 	hh    = ( parseInt( dt.getHours( ) ) + 100 ).toString( ).substring( 1, 3 );
 	mm    = ( parseInt( dt.getMinutes( ) ) + 100 ).toString( ).substring( 1, 3 );
 	ss    = ( parseInt( dt.getSeconds( ) ) + 100 ).toString( ).substring( 1, 3 );
	ss_sys++;
	datahora = dd + " de " + MM + " de " + aaaa + ", " + hh + ":" + mm + ":" + ss;
	document.form1.txtDataHora.value = datahora;
	setTimeout( "horario()", 1000 );
}
reload( );
horario( );
-->
</script>
</body>
</html>
