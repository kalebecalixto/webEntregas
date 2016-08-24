<%@ taglib uri="http://fckeditor.net/tags-fckeditor" prefix="FCK" %>
<%@ page import="java.util.List, java.util.ArrayList" %>
<jsp:useBean id="man"      scope="page" class="adi.componentes.sql.vetorSql" /><%man.setContext(application);man.setSessao(session);%>

<html>
    <head>
        <title>Editor RichText</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../sample.css" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="adiEditor.js"></script>
        <script type="text/javascript" src="<%=application.getInitParameter( "rotinasJSPath" )%>/ajax.js"></script>
    </head>
    <body onload="defineSQL(  ); buscaTextoEditor(  ); maximizar(  );">
        <br>
        <%
            String codSistema = String.valueOf(request.getParameter("codSistema"));

            String campo = "";
            if( request.getParameter( "campoTb" )  != null )
                campo = request.getParameter( "campoTb" ).toString(  );

            String arquivoGravacao = "gravaDadosDB.jsp";
            if( String.valueOf( request.getParameter( "tipoGravacao" ) ).equals( "1" ))
                arquivoGravacao = "gravaDadosDisco.jsp";
        %>

        <%

            StringBuilder sql = new StringBuilder();
            sql.append("SELECT nomeVariavel, sqlDaObtencao " );
            sql.append("FROM basVariavelDeEdicao VE INNER JOIN basVariavelDeEdicaoSistema VES ON VE.seqVariavel = VES.seqVariavel ");
            if (!codSistema.equals("null"))
                sql.append("WHERE VES.codSistema = ").append(codSistema);
            sql.append (" ORDER BY nomeVariavel");

            String variaveis = "";
            String sqlDaObtencao = "";
try
{
            man.buscaRegistro( sql.toString(), request, 2 );

            for( int x=0; x< man.vt.size(); x+=2 ){

                variaveis += "~" + String.valueOf(man.vt.elementAt(x));
                sqlDaObtencao += "~"  + String.valueOf(man.vt.elementAt(x + 1));
            }
}
catch (Exception e)
{
    e.printStackTrace();
}
        %>
        <form action="<%=arquivoGravacao%>" method="post" target="_self" name="frmEditor">
            <input type="hidden" name="tabela" value="">
            <input type="hidden" name="where" value="">
            <input type="hidden" name="codSistema" id="codSistema" value="<%=codSistema%>">
            <input type="hidden" name="campo" value="<%=campo%>">
            <input type="hidden" name="variaveis" value="<%= variaveis%>">
            <input type="hidden" name="sqlDaObtencao" value="<%= sqlDaObtencao %>">
            <!-- Referente ao despacho do arquivo protocolo/movimentacao/enviar/proEnviarProcesso_inc.jsp -->
            <input type="hidden" name="apenasInsere" value="0">
            <FCK:editor id="MaxNetEditor" basePath="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/"
            skinPath="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/skins/office2003/"
            imageBrowserURL="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=connectors/jsp/connector"
            linkBrowserURL="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/filemanager/browser/default/browser.html?Connector=connectors/jsp/connector"
            flashBrowserURL="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/filemanager/browser/default/browser.html?Type=Flash&Connector=connectors/jsp/connector"
            imageUploadURL="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/filemanager/upload/simpleuploader?Type=Image"
            linkUploadURL="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/filemanager/upload/simpleuploader?Type=File"
            flashUploadURL="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/editor/filemanager/upload/simpleuploader?Type=Flash"
            height="520" customConfigurationsPath="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKeditor/adiConfig.config.js">
            </FCK:editor>
        <br>
     </form>

    <!-- Referente ao despacho do arquivo protocolo/movimentacao/enviar/proEnviarProcesso_inc.jsp -->
    <script>
        if( parent.parent.opener.document.frmInc.valorEditorRetorno )
            document.frmEditor.apenasInsere.value = "1";

        if(parent.pegarTexto)
            document.frmEditor.MaxNetEditor.value = parent.pegarTexto();
    </script>

    <!-- Form AJAX -->
    <form name="frmAjax" action="<%=application.getInitParameter("ajaxRequest_srvPath")%>" method="post" target="main">
        <input type=hidden name="sql1" value="select * from basMes">
    </form>
    </body>
    <script type="text/javascript" src="<%=application.getInitParameter( "rotinasJSPath" )%>/adiEditor.js"></script>
</html>