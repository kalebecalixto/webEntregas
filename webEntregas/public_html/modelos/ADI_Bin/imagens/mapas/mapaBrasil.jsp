<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/mapas/mapaBrasil.jsp */ %>
<%/*
    Cabeçalho da tela
    Descricao: Mapa do Brasil
    Autor: -
    Data criação: -
    Data ultima alteração: 21/06/2007 - Marcos
    Alteração Efetuada: Correcao no estado do Amapa
*/%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%
xmlTelas.setContext(application);
xmlTelas.setSessao(session);
xmlTelas.geraCabecalhoOculto(out,request,response);
%>
<center>
<script>
function link(estado) {        
    if (estado=="ro") estado = "11";
    if (estado=="ac") estado = "12";
    if (estado=="am") estado = "13";
    if (estado=="rr") estado = "14";
    if (estado=="pa") estado = "15";
    if (estado=="ama") estado = "16";
    if (estado=="to") estado = "17";
    if (estado=="ma") estado = "21";
    if (estado=="pi") estado = "22";
    if (estado=="ce") estado = "23";
    if (estado=="rn") estado = "24";
    if (estado=="pb") estado = "25";
    if (estado=="pe") estado = "26";
    if (estado=="al") estado = "27";
    if (estado=="se") estado = "28";
    if (estado=="ba") estado = "29";
    if (estado=="mg") estado = "31";
    if (estado=="es") estado = "32";
    if (estado=="rj") estado = "33";
    if (estado=="sp") estado = "35";
    if (estado=="pr") estado = "41";
    if (estado=="sc") estado = "42";
    if (estado=="rs") estado = "43";
    if (estado=="mt") estado = "50";
    if (estado=="ms") estado = "51";
    if (estado=="go") estado = "52";             
    self.opener.location = "/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/endereco/basEndereco_inc.jsp?hidpais=30&hiduf="+estado;        
    window.close();
}
</script>
<script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/scriptGeral.js"></script>
<table border="0" width='250' cellspacing="0" cellpadding="0">
<tr> 
<td><img alt="" border=0 height=30  src="<%=application.getInitParameter("imagensGenericasPath")%>/mapas/brasil/cima_escolha.jpg" name="escolha" width=246 ></td>
</tr>
<tr> 
<td><img border=0 height=245 src="<%=application.getInitParameter("imagensGenericasPath")%>/mapas/brasil/mapaBrasil.jpg" usemap=#mapa width=246 > 
<map name="mapa"> <area shape=poly coords="161,132,156,132,160,135,162,131" onMouseOver="imgOn('df');" onMouseOut="imgOff('df');"  onClick="link(produto.value,'df',uf.value,cidade.value,bairro.value);" href="javascript:link('df')"> 
<area shape=poly coords="9,76,55,95,69,82,79,88,97,86,101,78,100,75,110,47,101,44,97,33,90,33,88,39,84,37,78,40,69,21,65,27,56,33,45,30,47,24,29,27,34,33,30,36,33,62,16,69,11,78,9,76" onMouseOver="imgOn('am');" onMouseOut="imgOff('am');" href="javascript:link('am')"> 
<area shape=poly coords="60,10,71,10,90,5,86,22,91,21,90,28,98,26,97,32,90,32,87,40,84,36,77,39,69,19,60,10" onMouseOver="imgOn('rr');" onMouseOut="imgOff('rr');" href="javascript:link('rr')"> 
<area shape=poly coords="117,18,116,21,104,21,97,26,100,44,111,45,99,73,101,77,107,93,145,93,151,85,150,72,155,72,158,66,156,64,163,58,171,41,163,37,156,42,156,36,138,36,134,40,128,25,117,18"   onMouseOver="imgOn('pa');" onMouseOut="imgOff('pa');"  href="javascript:link('pa')"> 
<area shape=poly coords="142,9,143,20,149,24,136,40,130,25,119,18,131,19,142,9"   onMouseOver="imgOn('ama');" onMouseOut="imgOff('ama');"  href="javascript:link('ama')"> 
<area shape=poly coords="30,101,29,92,23,95,22,97,14,95,10,81,12,77,51,93,41,101,31,102,30,101"   onMouseOver="imgOn('ac');" onMouseOut="imgOff('ac');"  href="javascript:link('ac')"> 
<area shape=poly coords="60,91,62,106,69,110,78,112,84,117,88,117,92,112,92,103,82,99,81,87,69,82,61,92,60,93,61,96,62,98,60,91"   onMouseOver="imgOn('ro');" onMouseOut="imgOff('ro');"  href="javascript:link('ro')"> 
<area shape=poly coords="90,130,90,115,91,103,80,99,80,87,97,87,102,78,107,94,146,93,143,103,144,118,132,133,129,146,127,138,119,141,111,137,104,143,103,134,90,130"   onMouseOver="imgOn('mt');" onMouseOut="imgOff('mt');"  href="javascript:link('mt')"> 
<area shape=poly coords="142,107,168,107,168,103,170,97,165,91,165,86,168,82,161,79,162,67,155,64,157,74,150,73,150,87,143,94,141,104,142,107"   onMouseOver="imgOn('to');" onMouseOut="imgOff('to');"  href="javascript:link('to')"> 
<area shape=poly coords="179,47,170,42,161,59,156,63,158,66,162,66,161,78,168,80,163,86,165,90,170,97,173,79,182,74,189,74,186,69,189,68,189,57,195,52,188,50,178,54,179,47"   onMouseOver="imgOn('ma');" onMouseOut="imgOff('ma');"   href="javascript:link('ma')"> 
<area shape=poly coords="184,97,184,92,193,93,194,90,197,89,200,86,203,74,200,69,201,64,200,58,199,54,195,52,189,57,190,70,188,69,189,75,183,74,174,80,171,97,175,101,181,98,182,98,185,97,184,97"   onMouseOver="imgOn('pi');" onMouseOut="imgOff('pi');"   href="javascript:link('pi')"> 
<area shape=poly coords="208,53,199,52,201,63,203,78,207,77,212,82,213,77,213,69,218,64,208,53"   onMouseOver="imgOn('ce');" onMouseOut="imgOff('ce');"   href="javascript:link('ce')"> 
<area shape=poly coords="216,106,215,102,217,98,216,91,220,95,225,96,226,97,217,103,216,106"   onMouseOver="imgOn('se');" onMouseOut="imgOff('se');"   href="javascript:link('se')"> 
<area shape=poly coords="234,90,228,91,227,92,222,92,220,90,217,91,216,92,210,87,203,94,201,90,200,88,203,80,208,80,212,82,216,82,221,80,226,83,230,84,233,83,234,91,234,90"   onMouseOver="imgOn('pe');" onMouseOut="imgOff('pe');"   href="javascript:link('pe')"> 
<area shape=poly coords="233,81,232,83,226,83,225,86,222,83,224,80,222,77,216,83,214,79,210,80,216,74,221,74,225,76,234,74,233,81"   onMouseOver="imgOn('pb');" onMouseOut="imgOff('pb');"   href="javascript:link('pb')"> 
<area shape=poly coords="225,97,217,92,225,92,232,90,233,90,226,97,225,97"   onMouseOver="imgOn('al');" onMouseOut="imgOff('al');"   href="javascript:link('al')"> 
<area shape=poly coords="220,65,214,71,214,76,222,75,222,77,227,77,227,75,234,75,235,68,223,69,220,66,218,67,218,68,216,69,216,70,215,71,214,73,214,75,220,65"   onMouseOver="imgOn('rn');" onMouseOut="imgOff('rn');"   href="javascript:link('rn')"> 
<area shape=poly coords="205,147,202,143,200,139,204,134,203,131,197,132,187,125,178,123,171,127,170,106,168,104,170,96,173,97,176,100,182,98,186,96,185,92,193,92,195,90,199,87,202,92,209,88,216,92,217,99,215,102,217,105,216,110,211,115,209,143,205,147"  onMouseOver="imgOn('ba');" onMouseOut="imgOff('ba');"   href="javascript:link('ba')"> 
<area shape=poly coords="143,151,130,147,128,143,131,133,143,118,143,107,168,108,169,127,166,125,162,131,154,132,155,134,161,135,162,144,145,147,142,149,143,151"  onMouseOver="imgOn('go');" onMouseOut="imgOff('go');"   href="javascript:link('go')"> 
<area shape=poly coords="124,180,144,155,142,149,131,146,129,142,128,138,120,140,112,137,104,142,106,147,103,153,106,168,120,168,119,177,125,177,125,179"   onMouseOver="imgOn('ms');" onMouseOut="imgOff('ms');"   href="javascript:link('ms')"> 
<area shape=poly coords="175,172,189,165,192,166,195,168,196,169,191,176,176,177,175,172"   onMouseOver="imgOn('rj');" onMouseOut="imgOff('rj');"   href="javascript:link('rj')"> 
<area shape=poly coords="201,145,197,147,190,164,196,168,204,156,203,146,201,145"   onMouseOver="imgOn('es');" onMouseOut="imgOff('es');"   href="javascript:link('es')"> 
<area shape=poly coords="150,154,153,157,162,155,168,173,174,172,188,163,197,146,201,139,204,133,203,131,196,132,187,124,177,123,170,126,164,128,162,130,161,135,163,143,143,146,142,147,143,154,151,153,150,154"   onMouseOver="imgOn('mg');" onMouseOut="imgOff('mg');"   href="javascript:link('mg')"> 
<area shape=poly coords="129,171,139,170,148,175,149,184,159,186,164,179,173,177,174,173,166,173,160,154,150,155,149,154,140,154,140,156,140,157,129,171"   onMouseOver="imgOn('sp');" onMouseOut="imgOff('sp');"   href="javascript:link('sp')"> 
<area shape=poly coords="122,189,128,188,127,193,136,195,140,197,143,194,152,195,154,189,156,187,150,185,148,175,139,171,129,170,125,177,123,181,122,190,122,189"   onMouseOver="imgOn('pr');" onMouseOut="imgOff('pr');"   href="javascript:link('pr')"> 
<area shape=poly coords="127,200,128,195,140,196,151,194,154,200,147,213,142,212,147,208,140,206,132,201,127,199,128,198,127,200"  onMouseOver="imgOn('sc');" onMouseOut="imgOff('sc');"   href="javascript:link('sc')"> 
<area shape=poly coords="126,239,130,233,114,220,114,215,111,216,108,218,107,217,116,205,123,201,131,201,139,205,146,208,144,212,146,217,144,223,139,230,137,228,141,220,132,228,131,237,129,239,126,238,127,240,128,237,126,239"   onMouseOver="imgOn('rs');" onMouseOut="imgOff('rs');"   href="javascript:link('rs')"> 
</map></td>
</tr>
</table>
