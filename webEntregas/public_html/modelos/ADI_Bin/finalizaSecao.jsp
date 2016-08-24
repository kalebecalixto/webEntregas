<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/finalizaSecao.jsp */ %>
<jsp:useBean id="datasource" scope="session" class="adi.componentes.sql.DBConnection" />

<%
String termina = ""+request.getParameter("final");
String usuario = "";
// abre a sessão para pegar os usuario e fazer o historico e depois fechar a sessão
HttpSession seUsuario;
seUsuario = request.getSession(true);
usuario  = String.valueOf( seUsuario.getAttribute("codUser"));
if(!usuario.equals("null" ))
{
    %>
    <jsp:useBean id="log" scope="session" class="br.com.adi.maxnet.security.log.LogUser" />
    <jsp:useBean id="dt" scope="page" class="adi.componentes.data.datas" />
    <jsp:useBean id="hr" scope="page" class="adi.componentes.data.horas" />
    <jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
    
    <%
    xmlTelas.usaPermissao = false;
    xmlTelas.setContext(application);
    xmlTelas.setSessao(session);
    xmlTelas.geraCabecalhoOculto(out,request,response);
    %>

    <center>
    <img src="<%=application.getInitParameter("imagensGenericasPath")%>/logotiposADI/simbAdiNewPeq.jpg" alt="SIGMA">
    <BR><BR><BR><BR>
    <h3>FINALIZANDO SESSÃO</h3>

    <%
    //realiza o historico do usuario 
    //log.finalizaSecao(usuario,dt.dataSistema(),hr.horaSistema());
    String user = String.valueOf( session.getAttribute("codUser"));
    String emp  = String.valueOf( session.getAttribute("idEmpresa"));
    String path    = String.valueOf(  application.getRealPath(application.getInitParameter( "baseUploadPath" ).replace("/ADI_Intranet_Root/", "/") + "/empresa" + emp + "/usuarios/consulta/" + user + ".log" )) ;
    
    log.finalizaAcesso(path);

    for (java.util.Enumeration e = request.getSession().getAttributeNames() ; e.hasMoreElements() ;)
    {
        String atributo = String.valueOf(e.nextElement());
        request.getSession().removeAttribute(atributo);        
    }

    //encerrão sessão do usuário.
    seUsuario.invalidate();
    %>
    <script>barraProgresso(1000, "parent.top.location = '<%=application.getInitParameter("BinPath")%>/fechaBrowser.jsp'");</script>
    Obrigado por utilizar o sistema.<BR>Sua Sessão está sendo finalizada agora.
    <%
}
else
{
	%>
    <script>
        self.location = '<%= application.getInitParameter("excessoesPath") %>/permissao.jsp?tipo=6&idFechar=1';
    </script><%
}
%>
</body>
</html>
