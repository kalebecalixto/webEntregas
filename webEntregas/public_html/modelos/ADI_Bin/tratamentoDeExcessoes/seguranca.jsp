<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/ADI_Bin/tratamentoDeExcessoes/seguranca.jsp */%>
<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<%
/*
Cabeçalho da Classe
Empresa: ADI Informática
Descrição: Tela para exibição de mensagens de erro de segurança.
Autor: Diego R. Drumond
Data criação: 29.11.2007
*/
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>MaxNet ADI - Notifica&ccedil;&atilde;o de Erro</title>
        <style type="text/css">
            <!--
            body,td,th,pre {
                font-family: Verdana, Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #000000;
            }
            a:link {
                color: #CCCC00;
                text-decoration: none;
            }
            a:visited {
                text-decoration: none;
                color: #CCCC00;
            }
            a:hover {
                text-decoration: none;
                color: #000000;
            }
            a:active {
                text-decoration: none;
            }
            a {
                font-family: Verdana, Arial, Helvetica, sans-serif;
                font-weight: bold;
                font-size: 12px;
            }
            body {
                margin-left: 0px;
                margin-top: 0px;
                margin-right: 0px;
                margin-bottom: 0px;
            }
            input.file {
                border-right: black 1px solid;
                border-top: gray 1px solid;
                border-left: gray 1px solid;
                border-bottom: black 1px solid;
                font-size: 8pt;
                font-weight: bold;
                font-family: Courier;
            }
            input.button {
                font-family: Arial;
                border-right: black 1px solid;
                border-top: gray 1px solid;
                border-left: gray 1px solid;
                border-bottom: black 1px solid;
                font-weight: bold;
                font-size: 9pt;
                color: #000000;
                background-color: #efefef;
                font-weight: bold;
            }
            
            label
            {
                font-weight: bold;
            }
            -->
        </style>
        <script>
            function voltar( )
            {
                history.go( -1 );
            }
            
            function sair( )
            {
                location.href = "<%= request.getContextPath( ) %>/AuthenticationServlet?mode=logout";
            }
        </script>
    </head>
    <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
        <%
        String action   = "voltar";
        Class exception = Class.forName( request.getParameter( "exception" ) );
        %>
        <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td valign="top"><br>
                    <table border="0" align="center" cellpadding="0" cellspacing="0" width="300">
                        <tr>
                            <td colspan="2" align="left"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/mensagens/atencao.jpg" width="548" height="62"></td>
                        </tr>
                        <tr>
                            <td height="50" colspan="2" align="center">
                                <% 
                                if( exception == br.com.adi.maxnet.security.TimeNotAllowedException.class )
                                {
                                    %><%= adi.componentes.telas.Mensagem.SEGBA0011 %><%
                                    action = "sair";
                                }
                                else if( exception == br.com.adi.maxnet.security.HostNotAllowedException.class )
                                {
                                    %><%= adi.componentes.telas.Mensagem.SEGBA0010 %><%
                                    action = "sair";
                                }
                                else if( exception == br.com.adi.maxnet.security.ForcedLogoutException.class )
                                {
                                    %>
                                    <META HTTP-EQUIV="Refresh" CONTENT="10; URL=<%= request.getContextPath( ) %>/AuthenticationServlet?mode=logout">
                                    <%= adi.componentes.telas.Mensagem.SEGBA0008 %><br>
                                    <pre><%= session.getAttribute( "br.com.adi.maxnet.login.force-logout" ) %></pre><%
                                    action = "sair";
                                }
                                else if( exception == br.com.adi.maxnet.security.AuthorizationException.class )
                                {
                                    %><%= adi.componentes.telas.Mensagem.SEGBA0004 %><%
                                }
                                else if( exception == br.com.adi.maxnet.security.license.InvalidLicenseException.class )
                                {
                                    %><%= adi.componentes.telas.Mensagem.SEGBA0019 %><%
                                }
                                else if( exception == br.com.adi.maxnet.security.license.LicenseException.class )
                                {
                                    %><%= adi.componentes.telas.Mensagem.GENBA0053 %></td></tr><tr>
                                    <td colspan="2" align="center">
                                        <table>
                                            <form method="post" action="<%= request.getContextPath( ) %>/LicenseManagerServlet" enctype="multipart/form-data">
                                            <input type="hidden" name="responseURL" value="<%= request.getAttribute( "request-from" ) %>">
                                            <tr>
                                                <td align="right"><label>Empresa: </label></td>
                                                <td><%= request.getAttribute( "company" ) %></td>
                                            </tr>
                                            <tr>
                                                <td align="right"><label>Módulo: </label></td>
                                                <td><%= ( ( String ) request.getAttribute( "module" ) ).toUpperCase( ) %></td>
                                            </tr>
                                            <tr>
                                                <td align="right"><label>Licença (.key): </label></td>
                                                <td><input name="licenseFile" type="file" size="30" class="file"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" align="center"><br/><input type="submit" value="Gravar Licença" class="button"></td>
                                            </tr>
                                            </form>
                                        </table><%
                                }
                                %>
                            </td>
                        </tr>
                        <tr>
                            <td height="30" colspan="2" nowrap>&nbsp;</td>
                        </tr>
                        <tr align="center">
                            <td colspan="2" nowrap>[ <a onmousemove="window.status='Voltar'" onmouseout="window.status=''" href="javascript:<%= action %>( )">Voltar</a> ]</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="right" valign="bottom"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/logotiposADI/maxnetadiTransparente.jpg"></td>
            </tr>
        </table>
    </body>
</html>
