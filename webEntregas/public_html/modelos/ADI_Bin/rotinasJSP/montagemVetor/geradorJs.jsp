<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/montagemVetor/geradorJs.jsp */ %>
<% /* ADI_MaxNetADI/package/iptu/relatorios */%><%!
adi.componentes.sql.vetorSqlPlus man265 = new adi.componentes.sql.vetorSqlPlus();
HttpServletRequest request265;
int auxCont=0;%><%
man265.setContext(application);
man265.setSessao( request.getSession(true));
request265=request;
auxCont=0;%><%!
/*
   Descricao: Função Substituta do buscaEndereco
       Autor: Alan Nunes Voiski
Data criação: 15/07/2004
*
//Include=================>
include file="/ADI_Programacao/ADI_Bin/rotinasJSP/montagemVetor/geradorJs.jsp"
//Parametros==============>
sql				= sql a ser executado para retorno de informações para montagem vetor javascript
num				= número de colunas do sql
mascara			= formato para cada linha retornada no sql para ser montada no vetor
				  PS:quando for montar a mascara, utilizando "new Array", colocar \\(duas barras)
				     antes das virgulas dos elementos deste array
//Retorno=================>
String vetorRes com vetor javascript montado para uso em conjunto com preencheCombo em ../rotinasJS/multiple.js
//Exemplo=================>
  out.write(insereCmdSql(sql,3,"0,1,1-2"));
*/
String insereCmdSql(String sql,int num,String mascara) throws java.sql.SQLException,java.io.IOException{
	man265.buscaRegistro( sql, request265, num );
	String vetorRes="<script>vetor"+(auxCont++)+"= new Array('";
	//Formatação para prevenção de trocas erradas na mascara(ps:tratamento de números que sao fixos na máscara)
	for(int y=num-1;y>-1;y--)
            mascara=mascara.replaceAll("\\\\"+y,"L%P"+(num+y)).replaceAll(y+"","%A"+y+"%B").replaceAll("L%P"+(num+y),"\\\\"+y).replace("%B%A","").replace("%B%B","%B").replace("%A%A","%A");
	//Colocando ' para conter valores a serem substituidos
	mascara=mascara.replaceAll("'","\"").replaceAll("\\\\,","%G1").replaceAll(",","','").replaceAll("%G1",",");
	//Preenxendo mascara nos devidos lugares
	for(int x=0;x<man265.vt.size();x+=num){
		String mascaraAux=mascara;//Auxiliar montagem
		//Substituindo valores(ps: os 2 últimos replaces são prevenções de erros devido as aspas que caso ocorram livremente neste momento, dará erro de javascript por constante não finalizada
		for(int y=num-1;y>-1;y--)mascaraAux=mascaraAux.replaceAll("%A"+y+"%B",(man265.vt.elementAt(x+y)+"").replaceAll("'","\\\\\\\\u0022").replaceAll("\"","\\\\\\\\u0027"));
		vetorRes+=(x==0?"":"','")+mascaraAux.replaceAll("'","\\'");//juntando resultados parciais com final
	}
	//String vetor JS final
	vetorRes=vetorRes+"');</script>\n";
	man265.vt.clear();
	return vetorRes;
}//rotina JS abaixo é apenas um implemento, útil para se utilizar com campos select em prenximentos de combos sem utilizar reloads
%><script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/multiple.js"></script>
