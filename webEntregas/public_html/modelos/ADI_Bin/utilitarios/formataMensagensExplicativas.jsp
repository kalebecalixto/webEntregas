<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/formataMensagensExplicativas.jsp */ %>
<jsp:useBean id="arq"  scope="page" class="adi.componentes.arquivos.learquivo"        />
<jsp:useBean id="man"  scope="page" class="adi.componentes.sql.vetorSql"              />
<jsp:useBean id="tela" scope="page" class="adi.componentes.util.telas.TelasDoSistema" />
<html>
<head>
<title>ADI Informática - Autenticação de Usuários</title>
</head>
<body bgcolor="white">
<basefont size=2 face="Verdana, Arial, Helvetica">
<form name="frm" action="formataMensagensExplicativas.jsp"  method="post">
<BR><BR><BR><BR>
<%
man.setContext(application);
man.setSessao(session);
String sistema = String.valueOf( request.getParameter( "sistema" ) );
if( !sistema.equals( "null" ) )
{
	tela.setContext( application );
	out.write( "<pre><font size=2>Componentes Formatados:\n"+
	           "----------------------------------------------------------------------------"+
			   tela.formataMensagensExplicativas( sistema )+"</font></pre>" );
	%><script>alert( "Mensagens explicativas formatadas com sucesso!" );</script><%
}
else
{
String sql = "Select siglaSistema, descrSistema From segSistema order by descrSistema";
man.buscaRegistro(sql,request,2);
%>
<CENTER>
<table cellspacing=1 cellpadding=0 width=490><Tr><Td bgcolor="black">
<table cellspacing=1 cellpadding=0 border=1 width=100% bgcolor="white">
    <tr>
        <TD colspan=2 bgcolor=navy><center><font color=white><b>Formatação das Mensagens Explicativas dos Componentes das Telas</td>
    </tr>
    <Tr>
       <td>
         <center>
           <select name="sistema">
             <option value="">Escolha o Sistema</option>
             <option value="">----------------------------------</option>
             <% for(int i = 0; i < man.vt.size(); i+=2)
                {
                 out.write("<option value='" + man.vt.elementAt(i).toString() +"'>"+
                 man.vt.elementAt(i+1).toString() +"</option>");
                } %>
            </select>
          </center>
        </td>
        <Td width=40%><center><BR>
           <input type="submit" name="gera" value="  Formatar  "><BR><BR>
        </td>
    </tr>
</table>    
</td></tr></table>
</form>
<%
}
%>
</body>
</html>
