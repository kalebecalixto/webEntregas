<%
String codSistema = String.valueOf(request.getParameter("codSistema"));
String campo = String.valueOf(request.getParameter("campoTb"));
String tipoGravacao = String.valueOf(request.getParameter("tipoGravacao"));
%>
<%@ include file="/ADI_Programacao/ADI_Bin/tratamentoDeDados/criticaDeCampos.jsp"  %>
<script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/ajax.js"></script>
<script>
function buscaTextoEditor2(  )
{
    if(parent.opener.document.forms[0].valorEditorRetorno)
    {
        texto = parent.opener.document.forms[0].valorEditorRetorno.value;
        loadIframe("Ifck", "<%=application.getInitParameter("BinPath")%>/utilitarios/FCKeditor/adiEditorRichText2.jsp?tipoGravacao=<%=tipoGravacao%>&campoTb=<%=campo%>&codSistema=<%=codSistema%>");
        return;
    }


    var tabela = "";
    var where = "";
    var documento = parent.opener.document;

    for( i = 0; i < documento.forms.length; i++ )
        for( x = 0; x < documento.forms[ i ].elements.length; x++ )
        {
            if( documento.forms[ i ].elements[ x ].name == ( "tabela<%=campo%>" ) )
                tabela = documento.forms[ i ].elements[ x ].value;

            if( documento.forms[ i ].elements[ x ].name == ( "where<%=campo%>" ) )
                where = documento.forms[ i ].elements[ x ].value;
        }

    document.frmAjax.sql1.value =  " SELECT <%=campo%> AS campo ";
    document.frmAjax.sql1.value += "\n FROM " + tabela;
    document.frmAjax.sql1.value += "\n " + where;

    ajaxRequest( document.frmAjax, retornaTextoAjax2 );
}

var texto = "";

function retornaTextoAjax2( )
{
    if( ajax_request.readyState == 4 )
    {
        if( ajax_request.status == 200 )
        {
            var sqls = ajax_request.responseXML.getElementsByTagName( "campo" );

            if( !sqls[0] || (sqls[0].childNodes[0].nodeValue == 'NULL' || sqls[0].childNodes[0].nodeValue == 'null' || sqls[0].childNodes[0].nodeValue == ''))
                texto = "";
            else
                texto = sqls[ 0 ].childNodes[ 0 ].nodeValue;

            loadIframe("Ifck", "<%=application.getInitParameter("BinPath")%>/utilitarios/FCKeditor/adiEditorRichText2.jsp?tipoGravacao=<%=tipoGravacao%>&campoTb=<%=campo%>&codSistema=<%=codSistema%>");
        }
    }
}

function loadIframe(iframeName, url)
{
    window.frames[iframeName].location = url;
}

function pegarTexto()
{
    return texto;
}
</script>
<html>
<head>
  <title>Editor de Texto</title>
</head>
    <body>
    <form name="frmInc" action="<%=application.getInitParameter("controleManutencao_srvPath")%>" method="post" target="_parent">
        <iframe type="hidden" src="" frameborder="0" id="Ifck" name="Ifck" scrolling="no" width="100%" height="100%"></iframe>
    </form>
    <form name="frmAjax" action="<%=application.getInitParameter("ajaxRequest_srvPath")%>" method="POST">
        <input type="hidden" name="sql1">
    </form>
    </body>
</html>
<script>

//Ele verificar se o browswer é o Internet Explorer ou o Mozilla.

if (navigator.appName.indexOf('Microsoft') != -1)
    location.href = "<%=application.getInitParameter("BinPath")%>/utilitarios/FCKeditor/adiEditorRichText2.jsp?tipoGravacao=<%=tipoGravacao%>&campoTb=<%=campo%>&codSistema=<%=codSistema%>";
else
    buscaTextoEditor2(  );


</script>