<%-- 
    Document   : confirmaLogout
    Created on : 13/01/2011, 15:06:04
    Author     : luciano.paula
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<script>


    if (confirm("Deseja sair da sessão?")) {    location.href ="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/finalizaSecao.jsp?final=1";   }

</script>
