<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/email/enviaEmail.jsp */ %>
<%
/*             Cabeçalho Da Telas
              Empresa: ADI Informática
            Descrição: Envia email com as propriedades que estao no arquivo /WEB-INF/email.properties
           Parametros: corpo = corpo do email em html
                       usuarioDestinatario = usuario(s) que receberao o email separados por virgula Ex: "joao,maria,jose"
                       tituloEmail = titulo do email a ser enviado
                       caminhoRetorno = caminho o qual irá retornar após o envio do e-mail
                Autor: júnio gonçalves
         Data criação: 01/12/2008
Data ultima alteração: 21/07/2008 - Rafael C
Alteração Efetuada: Alterações do envio de email.
*/
%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" /><%xmlTelas.setContext(application);xmlTelas.setSessao(session);%>
<%
    String servidor = null;
    String remetente = null;
    String senha = null;
    String finalEmail = null;
    String corpo = String.valueOf( request.getParameter( "corpo" ) );
    String usuarioDestinatario = request.getParameter( "usuarioDestinatario" );

    String tituloEmail = request.getParameter( "tituloEmail" );
    String caminhoRetorno = request.getParameter( "caminhoRetorno" );
    java.io.InputStream entrada = application.getResourceAsStream( "/WEB-INF/email.properties" );
    java.util.Properties props = new java.util.Properties(  );
    try
    {
        props.load( entrada );
        servidor = props.getProperty( "servidor_smtp" );
        remetente = props.getProperty( "remetente" );
        senha = props.getProperty( "senha_remetente" );
        finalEmail = props.getProperty( "final" );
    }
    catch ( java.io.FileNotFoundException ex )
    {
        ex.printStackTrace( );
    } 
    catch ( java.io.IOException ex2 )
    {
        ex2.printStackTrace(  );
    }

    String[] split = usuarioDestinatario.split(",");
    StringBuilder usuarioDestinatarioMontado = new StringBuilder(  );
    

    for (int i = 0; i < split.length; i++)
    {
        if( session.getAttribute("idEmail").equals("0"))
        {            
            if (i == 0)
                usuarioDestinatarioMontado.append( split[i] ).append( finalEmail );
            else
                usuarioDestinatarioMontado.append( "," ).append( split[i] ).append( finalEmail );
        }
        else
        {
            if (i == 0)
                usuarioDestinatarioMontado.append( split[i] );
            else
                usuarioDestinatarioMontado.append( "," ).append( split[i] );
        }
    }

    out.write( xmlTelas.iniciaHtml( request ) );
%>
<body>
<script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/ajax.js"></script>
<script>

function executa (  )
{
    divCarregando( 1 );
    ajaxRequest(document.frmEmail, callBack);
}

function callBack(  )
{
    if( ajax_request.readyState == 4 )
    {
        if( ajax_request.status == 200 )
        {
            divCarregando( 0 );
            location.href = "<%=caminhoRetorno%>";
        }
    }
}

</script>

<form name="frmEmail" action="<%=application.getInitParameter("sendMailServlet_srvPath")%>" method="post">
    <input type="hidden" name="txtServidorSmtp" value="<%=servidor%>">
    <input type="hidden" name="txtRemetente"    value="<%=remetente%>">
    <input type="hidden" name="txtSenha"        value="<%=senha%>">
    <input type="hidden" name="txtDestinatario" value="<%=usuarioDestinatarioMontado%>">
    <input type="hidden" name="txtHtmlMensagem" value="<%=corpo%>">
    <input type="hidden" name="txtTituloEmail"  value="<%=tituloEmail%>">
</form>
</body>
<script>
    executa(  );
</script>
