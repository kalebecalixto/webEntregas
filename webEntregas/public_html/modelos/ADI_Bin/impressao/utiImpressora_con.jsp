<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/impressao/utiImpressora_con.jsp */ %>
<%/*
ADI Informatica
Descricao: Itens do Menu
Autor: Alexandre Ubaldo
*/%>
<jsp:useBean id="xsql" scope="page" class="adi.componentes.xml.xmlSQL" />
<jsp:useBean id="xman" scope="page" class="adi.componentes.xml.xmlManutencao" />
<jsp:useBean id="xvet" scope="page" class="adi.componentes.xml.vetorXml" />
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<jsp:useBean id="criticas" scope="page" class="adi.componentes.xml.criticas" />
<%
xmlTelas.botoesTela = "FAVNI";
xmlTelas.nomeTela= "Impressoras - Consulta";
xmlTelas.siglaSistema = "util";
xmlTelas.codTela = "UTIT0009";
xmlTelas.versao = "01.000";
xmlTelas.nomeArquivo = "utiImpressoras";
xmlTelas.tipoTela = "inc";
xmlTelas.geraCabecalho(out,request,response);
%>
<%  
  String sql = "";
  sql = " select descrImpressora, portaImpressora "+
        " from \\utilitario\\impressao\\impressoras.xml ";
  xsql.sqlToXML(sql);
  xvet = xman.consulta(xsql);
//  xvet.vt = xsql.orderBy(xvet.vt,2,2);
%>
<script>
    function manutencao(seq) {
        self.location = "utiImpressora_man.jsp?porta="+seq;
    }    
</script>
<form name=consulta>
<script language="JavaScript" src="/adiNet/scripts/janelas.js"></script>
<script language="JavaScript" src="/adiNet/scripts/estilo.js"></script>
<script language="JavaScript" src="/adiNet/scripts/auxScript.js"></script>
<BR><BR><center>Lista de Impressoras Cadastradas<BR><BR>
<TABLE border="0" width=100% cellpadding="0" cellspacing="1">
<tr bgcolor="navy">
  <td><font size=2 color=white><b>&nbsp;Nome da Impressora</td>
  <td><font size=2 color=white><b>&nbsp;Porta</td>
</tr>
<%
  if (xvet!=null) {
    for ( int x=0; x<xvet.vt.size();) {
%>
        <tr><Td colspan=2 bgcolor="#C3C3C3" width=1 height=1><img src="/adiNet/imagens/genericas/blank.gif" width=1 height=1></td></tr>
        <tr bgcolor="#efefef">
            <td><font size=2>
              &nbsp;<%=xvet.vt.elementAt(x+0)%>
            </td>
            <td><font size=2>
              &nbsp;
              <a href="javascript:manutencao('<%=xvet.vt.elementAt(x+1)%>')">
              <%=xvet.vt.elementAt(x+1)%>
              </a>
            </td>
        </tr>
<%
    x=x+2;
    }
  }
%>
        <tr><Td colspan=2 bgcolor="gray" width=1 height=1><img src="/adiNet/imagens/genericas/blank.gif" width=1 height=1></td></tr>
</table>
</form>
<%=xmlTelas.fechaHtml()%>
