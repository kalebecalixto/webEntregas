<%-- 
    Document   : logout
    Created on : 14/01/2011, 11:32:51
    Author     : luciano.paula
--%>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/logout.jsp */ %>
<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <title>SIGMA</title>
    </head>
    <body background="imagens/imagensDeFundo/fundoAdi2.jpg">
       <script>
        if (confirm("Deseja sair do sistema?"))
        {
            location.href ="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/finalizaSecao.jsp?final=1";
        }else{
            self.history.back();
        }
    </script>
    </body>
</html>
    

