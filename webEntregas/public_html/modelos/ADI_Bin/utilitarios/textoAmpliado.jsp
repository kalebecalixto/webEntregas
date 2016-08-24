<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/textoAmpliado.jsp */ %>
<%/*

                 Cabeçalho Da Telas
                  Empresa: ADI Informática
                Descrição: Texto Ampliado
                    Autor: Fabio Faria
             Data criação: 21/11/2006
    Data ultima alteração: 24/11/2006 - Elimir Elias
       Alteração Efetuada: Inclusão dos parametros colunas,linhas,titulo se quizer alterar o tamanho do componente
    */
%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<% 

//Contexto
xmlTelas.setContext(application);
//Sessão
xmlTelas.setSessao(session);

String texto         = String.valueOf( request.getParameter("texto") );
String campo         = String.valueOf( request.getParameter("campo") );
String tamanho       = String.valueOf( request.getParameter("tamanho") );

String titulo        = String.valueOf( request.getParameter("titulo") );
String colunas       = String.valueOf( request.getParameter("colunas") );
String linhas        = String.valueOf( request.getParameter("linhas") );

colunas = !colunas.equals("null")&&!colunas.trim().equals("") ? colunas : "69";
linhas  = !linhas.equals("null")&&!linhas.trim().equals("") ? linhas : "26";
titulo  = !titulo.equals("null")&&!titulo.equals("") ? titulo : "Texto Ampliado";

xmlTelas.codTela         = "BAST0106";
xmlTelas.versao          = "01.000";
xmlTelas.nomeTela        = titulo;
xmlTelas.siglaSistema    = "bas";
xmlTelas.botoesTela      = "AN";
xmlTelas.geraCabecalho(out,request,response); 
%>
<script>
    function fechaTela(){
        if( opener ){
            if( document.forms[0].txtTexto.value.length > 0 ){                
                if ( document.forms[0].txtTexto.value.length <= <%=tamanho%> ){
                    opener.document.forms[0].<%=campo%>.value = document.forms[0].txtTexto.value;
                    window.close();
                }else{
                    alert(" O campo não pode ultrapassar <%=tamanho%>");
                    return;
                }
            }
        }
    }
</script>
<form method="post" name="frmAmpl" target="_parent" action="" >
    <center>
        <table  cellspacing='0' cellpadding='0' border='0'>
        <% 
            xmlTelas.layoutDefault = false;
            xmlTelas.geraLabel = false;
            xmlTelas.insereConteudo( texto, 0);
            xmlTelas.geraTelas(out,"S", xmlTelas.codTela);
        %>
        <tr><td align='center'><font size="2"><b><%=titulo%>:</b></font></td></tr> 
        <tr><td><%=xmlTelas.impComp(0)%></td></tr>
        </table>
        <br>
    </center>
   <table>
    <tr>
        <td><input title='Retornar(ALT + R)' class='botoes' type='button' name='Retornar' value=' Retornar ' accesskey='r' onclick='javaScript:fechaTela( )'></td>
    </tr>
   </table>
</form>
</table>
<script>
    document.forms[0].txtTexto.value = opener.document.forms[0].<%=campo%>.value;
    document.forms[0].txtTexto.cols = "<%=colunas%>";
    document.forms[0].txtTexto.rows = "<%=linhas%>";
</script>
<%= xmlTelas.fechaHtml() %>