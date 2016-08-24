<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql/binBuscaReceita.jsp */ %>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql */ %><%/*
ADI Informatica 
Descricao:  Busca Receita
Autor: lucas
Data criação: 05/09/2003
Data ultima alteração:
Alteração Efetuada:
*/%><%!
String buscaReceita(adi.componentes.sql.consultas consulta, String sql, String tabelaRelacao) throws java.io.IOException
{
	if(sql.equals("")) return "a1 a2 a3 a4 a5 a6 a7 a8 ";
	else{
		//Partes do sql do endereco
			String sqlParte1 =	" BR.seqReceita, BR.a1, BR.a2, BR.a3, BR.a4, BR.a5, BR.a6, BR.a7, BR.a8";
			String sqlParte2 =  " (select "+
								" R.seqReceita, "+
								" codDaContaReceita as a1, "+
								" siglaDaReceita as a2, "+
								" tituloDaContaReceita as a3, "+
								" usaValorMinimoLancamento as a4, "+
								" idIsencaoValorMinimo as a5, "+
								" usaValorMaximoLancamento as a6, "+
								" idGeraPontuacaoFiscal as a7, "+
								" idIncidenciaDeDesconto as a8 "+
								" from "+
								" basReceitas R, "+
								" orcPlanoContasReceita PCR, "+
								" basReceitasClassificadas RC "+
								" where R.seqReceita = RC.seqReceita and "+
								" PCR.seqContaReceita = R.seqContaReceita and "+
								" PCR.seqExercicio = R.seqExercicio and "+
								" RC.idAtivo = 1 ) BR, ";
			String sqlParte3 =	"BR.seqReceita = "+tabelaRelacao+".seqReceita ";
			String sqlParte4 =	" BR.seqReceita, BR.a1, BR.a2, BR.a3, BR.a4, BR.a5, BR.a6, BR.a7, BR.a8";
		//concatenando sql com estrutura do endereco===============>
			if(sql.indexOf(" where ")>0){
				sqlParte3 = " and "+sqlParte3;
			}else{
				sqlParte3 = " where "+sqlParte3;
			}
		//colocando campos selecionados e relacionamento e ordenação
			if(sql.indexOf(" order ")<sql.indexOf(" by ") && sql.indexOf(" order ")>0){//coloca campos selecionados apos os mandados com sql
				sql = sql.substring(0,sql.indexOf(" from"))+","+sqlParte1+sql.substring(sql.indexOf(" from"),sql.indexOf("order"))+//campos selecionados
					  sqlParte3+sql.substring(sql.indexOf("order"),sql.length())+","+sqlParte4;
			}else{//coloca campos selecionados antes dos mandados com sql
				sql = sql.substring(0,sql.indexOf("select")+6)+sqlParte1+","+//campos selecionados
					  sql.substring(sql.indexOf("select")+6,sql.length())+sqlParte3+"order by"+sqlParte4;//relacionamento/ordenação
			}
		//colocando tabela sub-sql
			sql = sql.substring(0,sql.indexOf("from")+5)+sqlParte2+sql.substring(sql.indexOf("from")+5,sql.length());
		//Formatação e ordenação pela classe
			consulta.ordenaColuna("a7");
			consulta.ordenaColuna("a3");
			consulta.ordenaColuna("a4");
			consulta.ordenaColuna("a6");
			consulta.multiOrdena=true;
		//retorno da função
			return(sql);
	}
}
String retornaSqlReceita(String sql, String tabelaRelacao) throws java.io.IOException
{
	//retorna somente o sql com o relacionamento 
		String sqlParte1 =	" BR.a1, BR.a2, BR.a3, BR.a4, BR.a5, BR.a6, BR.a7, BR.a8";
		String sqlParte2 =  " (select "+
							" R.seqReceita, "+
							" codDaContaReceita as a1, "+
							" siglaDaReceita as a2, "+
							" tituloDaContaReceita as a3, "+
							" usaValorMinimoLancamento as a4, "+
							" idIsencaoValorMinimo as a5, "+
							" usaValorMaximoLancamento as a6, "+
							" idGeraPontuacaoFiscal as a7, "+
							" idIncidenciaDeDesconto as a8 "+
							" from "+
							" basReceitas R, "+
							" orcPlanoContasReceita PCR, "+
							" basReceitasClassificadas RC "+
							" where R.seqReceita = RC.seqReceita and "+
							" PCR.seqContaReceita = RC.seqContaReceita and"+ 
							" PCR.seqExercicio = RC.seqExercicio and "+
							" RC.idAtivo = 1 ) BR, ";
		String sqlParte3 =	"BR.seqReceita = "+tabelaRelacao+".seqReceita ";
		String sqlParte4 =	" BR.a1, BR.a2, BR.a3, BR.a4, BR.a5, BR.a6, BR.a7, BR.a8";
		if(sql.indexOf(" where ")>0){
			sqlParte3 = " and "+sqlParte3;
		}else{
			sqlParte3 = " where "+sqlParte3;
		}
	//colocando campos selecionados e relacionamento e ordenação
		if(sql.indexOf(" order ")<sql.indexOf(" by ") && sql.indexOf(" order ")>0){//coloca campos selecionados apos os mandados com sql
			sql = sql.substring(0,sql.indexOf(" from"))+","+sqlParte1+sql.substring(sql.indexOf(" from"),sql.indexOf("order"))+//campos selecionados
				  sqlParte3+sql.substring(sql.indexOf("order"),sql.length())+","+sqlParte4;
		}else{//coloca campos selecionados antes dos mandados com sql
			sql = sql.substring(0,sql.indexOf("select")+6)+sqlParte1+","+//campos selecionados
				  sql.substring(sql.indexOf("select")+6,sql.length())+sqlParte3+"order by"+sqlParte4;//relacionamento/ordenação
		}
	//colocando tabela sub-sql
		sql = sql.substring(0,sql.indexOf("from")+5)+sqlParte2+sql.substring(sql.indexOf("from")+5,sql.length());
		return(sql);
}
%>
