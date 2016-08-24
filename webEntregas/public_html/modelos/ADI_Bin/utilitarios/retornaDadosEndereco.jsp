<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/retornaDadosEndereco.jsp */ %>
<%
/*
ADI Informatica
Descricao:  
Autor:  
Data criação:  
*/
%>
<jsp:useBean id="man"      scope="page" class="adi.componentes.sql.vetorSql" />
<%
man.setContext(application);
man.setSessao(session);
String seqDoNucleoDoEndereco = ""+request.getParameter("seqDoNucleoDoEndereco");
String sql = " select lograd.codTipoLograd,lograd.codPreposicao,lograd.codTitNobreza,"+
	         " lograd.nucleoNomeLogradouro,ende.numDoEndereco,nucleo.codTipoComplEndereco,"+
		     " nucleo.numeroDoTipoDoComplemento,nucleo.suplementoDoCompleEndereco,"+
		     " ende.cepCorreio,descrBairro,descrMunicipio,descricaoUF,descrPais, "+
		     " nucleo.seqDoNucleoDoEndereco,ende.seqEndereco "+
		     " from basLogradouros lograd,basCadastroDeEnderecos ende, basNucleoDoEndereco nucleo, "+
		     " basCepLogradouro CEP,basBairro bairro, basBairroLogradouro bairroLog, "+
    		 " basMunicipio mun,basUF uf, basPais pais "+
     		 " where ende.seqLogradouro = lograd.seqLogradouro and "+
      		 " nucleo.seqEndereco = ende.seqEndereco and CEP.seqLogradouro = ende.seqLogradouro"+
      		 " and bairro.seqBairro = bairroLog.seqBairro and "+
		     " lograd.seqLogradouro = bairroLog.seqLogradouro and "+
		     " mun.codMunicipio = bairro.codMunicipio and uf.seqUF = mun.seqUF "+
		     " and pais.codPais = uf.codPais  and "+
		     " nucleo.seqDoNucleoDoEndereco = "+seqDoNucleoDoEndereco;
		     man.buscaRegistro (sql,request,15);
%>
<script>
      arrayEndereco = new Array();
      arrayEndereco = ["<%=man.vt.elementAt(0).toString()%>","<%=man.vt.elementAt(1).toString()%>","<%=man.vt.elementAt(2).toString()%>","<%=man.vt.elementAt(3).toString()%>","<%=man.vt.elementAt(4).toString()%>","<%=man.vt.elementAt(5).toString()%>","<%=man.vt.elementAt(6).toString()%>","<%=man.vt.elementAt(7).toString()%>","<%=man.vt.elementAt(8).toString()%>","<%=man.vt.elementAt(9).toString()%>","<%=man.vt.elementAt(10).toString()%>","<%=man.vt.elementAt(11).toString()%>","<%=man.vt.elementAt(12).toString()%>","<%=man.vt.elementAt(13).toString()%>","<%=man.vt.elementAt(14).toString()%>"]
      self.opener.enviarExtra(arrayEndereco);
      window.close();
</script>
