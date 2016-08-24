<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/impressao/impressorasSistema.jsp */ %>
<jsp:useBean id="xsql" scope="page" class="adi.componentes.xml.xmlSQL" />
<jsp:useBean id="xman" scope="page" class="adi.componentes.xml.xmlManutencao" />
<jsp:useBean id="xvet" scope="page" class="adi.componentes.xml.vetorXml" />
      <select name=impressora>
        <%
        String sql1 = " select descrImpressora, portaImpressora "+
        " from \\utilitario\\impressao\\impressoras.xml ";
        xsql.sqlToXML(sql1);
        xvet = xman.consulta(xsql);
        for (int x=0; x<xvet.vt.size();) {
        %>
        <option value="<%=xvet.vt.elementAt(x+1)%>"><%=xvet.vt.elementAt(x+0)%>  
        <%
            x=x+2;            
        }
        %>      
        <option value="arquivoAdi">Arquivo
      </select>
