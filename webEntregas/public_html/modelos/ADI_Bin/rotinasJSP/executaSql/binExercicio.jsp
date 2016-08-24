<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/executaSql/binExercicio.jsp */ %>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/executaSql/ */ %><%!
/*
             Cabe�alho Da Telas
              Empresa: SIGMA
            Descri��o: Rotina que retorna o exercicio corrente do sistema
                Autor: lucas hermano
         Data cria��o: 08/01/2004
*/
String buscaExercicioCorrente(String codSistema, HttpServletRequest request, ServletContext application) throws java.sql.SQLException
{
	adi.componentes.sql.query query = new adi.componentes.sql.query( );
	query.setContext(application);	
	query.setSessao( request.getSession(true));
	String seqExercicio = query.retornaDescricao( " select seqExercicio from basEmpresaExercicioCorrente where codEmpresa="+request.getSession(true).getAttribute("codEmpresa")+" and codSistema = "+codSistema+" and statusExercicio = 1 " );
	if( seqExercicio.equals("") )
		seqExercicio = "0";
	return seqExercicio;
}
/*
             Cabe�alho Da Telas
              Empresa: ADI Inform�tica
            Descri��o: Rotina que retorna o ano do exercicio
                Autor: lucas hermano
         Data cria��o: 08/01/2004
*/
String buscaAnoExercicio(String seqExercicio, HttpServletRequest request, ServletContext application) throws java.sql.SQLException
{
	adi.componentes.sql.query query = new adi.componentes.sql.query( );
	query.setContext(application);	
	query.setSessao( request.getSession(true));
	return query.retornaDescricao( " select ano from basExercicio where seqExercicio = "+seqExercicio );
}
%>
