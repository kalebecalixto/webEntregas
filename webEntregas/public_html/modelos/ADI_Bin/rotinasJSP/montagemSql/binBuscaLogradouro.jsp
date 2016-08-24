<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql/binBuscaLogradouro.jsp */ %>
<% /* ADI_MaxNetADI/package/iptu/relatorios */ %><%
/*
                  ADI Informatica
            Descricao: Busca Endereço do Imóvel
                Autor: Alan N Voiski
         Data criação: 22/08/2003
Data ultima alteração:
   Alteração Efetuada:
*
//Include=================>
include file="/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql/binBuscaLogradouro.jsp"
//Parametros==============>
sql				= sql a ser relacionado
				 PS1:No 'select' ou no 'order by' onde ficam os componentes selecionados, coloque
				  	 um "Lx" onde x é um número relacionado aos dados a serem retornados...
				  	 Coloque '%logradouro' para que retorne todos campos...
				 PS2:caso queira retorno apenas do formato campos logradouro, passar
				  	 este sql vazio
tabelaRelacao	= tabela a ser relacionada com logradouro, caso tenha que haver
				  relacionamento com bairro passar segunda tabela na mesma string
				  separada por:^
				  PS:caso seja mesma tabela, apenas colocar o '^' depois da primeira
				  	 tabela.
//Retorno=================>
String sql montado relacionado e ordenado
PS1: com opcional "%logradouro"(veja acima) sql retornado todos os dados seja no select ou no order by
//Exemplo=================>
  //retornar sql montado
	sql=buscaLogradouro(sql,"iptInscricaoSecao^");
  //retornar formato logradouro padrão
	consulta.adicionaColunaFormatada(buscaLogradouro("",""),4);
*/
%><%!
String buscaLogradouro(String sql, String tabelaRelacao) throws java.io.IOException
{
	if(sql.equals("")) return "codTipoLograd codTitNobreza codPreposicao nucleoNomeLogradouro, descrBairro";
	//Verificando segunda tabela de relação com bairro
		String tabelaRelacao2="";
		if(tabelaRelacao.indexOf("^")>-1){
			tabelaRelacao2=tabelaRelacao.substring(tabelaRelacao.indexOf("^")+1,tabelaRelacao.length());
			tabelaRelacao=tabelaRelacao.substring(0,tabelaRelacao.indexOf("^"));
			if(tabelaRelacao2.equals(""))tabelaRelacao2=tabelaRelacao;
		}
	//Campos padrões
		String[] camPad={"LOGA.codTipoLograd,LOGA.codTitNobreza,LOGA.codPreposicao,LOGA.nucleoNomeLogradouro,LOGC.descrBairro",//0 - Padrao
						"LOGA.seqLogradouro",//1
						"LOGC.seqBairro",//2
						"LOGA.codTipoLograd",//3
						"LOGA.codTitNobreza",//4
						"LOGA.codPreposicao",//5
						"LOGA.nucleoNomeLogradouro",//6
						"LOGC.descrBairro",//7
						"LOGA.idExclusao",//8
						"LOGA.codLogradouro"//9
						};
		//Montagem sql - 1a parte - select
			if(sql.indexOf("%logradouro")>0)
				for(int x=1;x<camPad.length;x++){sql=sql.replaceAll("%logradouro",camPad[x]+",%logradouro");}
			for(int x=camPad.length-1;x>-1;x--){sql=sql.replaceAll("L"+x,camPad[x]);}
			sql=sql.replaceAll(",%logradouro","").toLowerCase();
		//Montagem sql - 2a parte - from
			String sqlFrom= ((tabelaRelacao+tabelaRelacao2).equals("")?" basLogradouros as LOGA ":
								" inner join basLogradouros as LOGA on "+
								(tabelaRelacao.equals("")?"1=1":" LOGA.seqLogradouro="+tabelaRelacao+".seqLogradouro ")
							)+
							"inner join basBairroLogradouro as LOGB on LOGA.seqLogradouro=LOGB.seqLogradouro "+
							"inner join basBairro as LOGC on LOGB.seqBairro=LOGC.seqBairro "+
							(tabelaRelacao2.equals("")?"":" and  LOGC.seqBairro="+tabelaRelacao2+".seqBairro ");
		//Verificando existência do where para uso na montagem...
			int    auxVer =  adi.componentes.sql.consultas.buscaEstruturaSqlPrincipal(sql,"where");
			if(auxVer==-1)auxVer=adi.componentes.sql.consultas.buscaEstruturaSqlPrincipal(sql,"group by");//caso naum se ache o where
			if(auxVer==-1)auxVer=adi.componentes.sql.consultas.buscaEstruturaSqlPrincipal(sql,"order by");// caso naum se ache tb o group
			if(auxVer==-1)auxVer=sql.length();
		//Montagem sql - 3a parte - Juntando
		//Juntando sql com dados do 'from' montados anteriormente
			sql=sql.substring(0,auxVer)+sqlFrom+sql.substring(auxVer,sql.length());
		//===============================================\\
		//Retorno========================================//
			return(sql);
}
/*
                  ADI Informatica
            Descricao: Função para consultas de logradouro
                Autor: Alan N Voiski
         Data criação: 22/08/2003
Data ultima alteração:
   Alteração Efetuada:
*
//Parametros==============>
consulta	= classe consulta
coluna101	= posição, coluna onde será inserido a coluna formatada
//Retorno=================>
nenhum
A função esconde os campos devidos, ordena e incere formatacao padrao na pos~ção informada
//Exemplo=================>
	buscaLogradouroConsulta(consulta,1);
*/
void buscaLogradouroConsulta(adi.componentes.sql.consultas consulta,int coluna101) throws java.io.IOException
{
	consulta.escondeColuna("codTitNobreza");
	consulta.escondeColuna("codPreposicao");
	consulta.escondeColuna("nucleoNomeLogradouro");
	consulta.escondeColuna("descrBairro");
	consulta.escondeColuna("codTipoLograd");
	consulta.adicionaColunaFormatada(buscaLogradouro("",""), coluna101);
	consulta.ordenaColuna("nucleoNomeLogradouro");
	consulta.ordenaColuna("descrBairro");
	consulta.ordenaColuna("codTipoLograd");
	consulta.multiOrdena=true;
}
%>
