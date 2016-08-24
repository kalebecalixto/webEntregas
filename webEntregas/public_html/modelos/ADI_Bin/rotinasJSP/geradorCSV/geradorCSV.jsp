<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/email/enviaEmail.jsp */ %>
<% /*
               Cabe�alho Da Telas
              Empresa: ADI Inform�tica
            Descri��o: Gera arquivo em formato CSV de acordo com as senten�as SQL informadas por par�metro
           Parametros: separador : Delimitador de campos no arquivo CSV. Padr�o ';'
                       quebraDeLinha : Delimitador de quebra de linha no arquivo CSV. Padr�o '\n'
                       nomeArquivo : Nome do arquivo gerado. Espa�os em branco s�o substituidos por '_'
                       sql, sql2, sql3 ... sqln : Senten�as SQL que ser�o executadas e impressas no arquivo em suas respectivas ordens.
                       colunasSql, colunasSql1, colunasSql2, colunasSql3 ... colunasSqln : Par�metro que informa os nomes das colunas dos respectivos SQLs.
                                                                                           Os nomes devem ser separados por v�rgula.
                       Ex: sql = 'SELECT dia, sum(dia) AS somaDia FROM basDia GROUP BY dia'
                           colunasSql = 'Dia,Soma Dia'
                Autor: Bruno Eust�quio
         Data cria��o: 09/01/2009
                  Obs: Para o funcionamento da gera��o do arquivo e necess�rio que o path 'rotinasJSPPath' seja informado no web.xml
    Ex. de Formulario: <form name="frmCSV" action="<%=application.getInitParameter("rotinasJSPPath")% >/geradorCSV/geradorCSV.jsp" method="post">
                            <input type=hidden name="separador"     value=";" />
                            <input type=hidden name="quebraDeLinha" value="\n" />
                            <input type=hidden name="nomeArquivo"   value="Cota��o de pre�os" />
                            <input type=hidden name="sql"           value="SELECT dia, sum(dia) AS somaDia FROM basDia GROUP BY dia" />
                            <input type=hidden name="colunasSql"    value="Dia, Soma Dia" />
                        </form>
*/ %>

<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" /><% xmlTelas.setContext(application);xmlTelas.setSessao(session); %>
<jsp:useBean id="query"    scope="page" class="adi.componentes.sql.query" /><% query.setContext(application); query.setSessao(session); %>
<jsp:useBean id="man"      scope="page" class="adi.componentes.sql.vetorSqlPlus"/> <% man.setContext(application); man.setSessao(session); %>
<%@ page import="java.util.regex.Matcher" %>  
<%@ page import="java.util.regex.Pattern" %>  

<%
    // Par�metros de configura��o do arquivo
    String separador            = request.getParameter("separador");
    String quebraDeLinha        = request.getParameter("quebraDeLinha");
    String nomeArquivo          = request.getParameter("nomeArquivo");
    
    // Valida��o
    if("".equals(separador) || separador == null) separador = ";";
    if("".equals(quebraDeLinha) || quebraDeLinha == null) quebraDeLinha = "\n";
    if("".equals(nomeArquivo) || nomeArquivo == null) nomeArquivo = "Arquivo"; else nomeArquivo = nomeArquivo.replaceAll(" ","_");

    // String onde os campos ser�o concatenados
    StringBuilder arquivo = new StringBuilder("");

    // Vari�veis de apoio
    int i = 0;
    String sql = null;
    String sqlColunas = null;
    int numeroColunas = 0;
    while(true){
          
        //  Recupera os par�metros do escopo de requisi��o na ordem crescente 
        //  sql, sql1, sql2 ... sqlN
        //  colunasSql, colunasSql1, colunasSql3 ... colunasSqlN
        sql          = request.getParameter("sql" + (i > 0 ? i : ""));
        sqlColunas   = request.getParameter("colunasSql"+ (i > 0 ? i : ""));

        
        // Verifica o conteudo do sql
        // Caso tenha sido passado como uma string vazia apenas � ignorado e o algoritmo vai em busca do pr�ximo sql
        // Caso esteja nulo � dado como �ltimo sql e o algoritmo � interrompido para a gera��o do arquivo
        if("".equals(sql)) continue;
        if(sql == null) break;

        // Caso n�o seja informado as colunas a string recebe null e n�o haver� cabe�alho para os valores retornados pela consulta
        // Caso tenha sido informado a v�rgula � substituida pelo separador informado
        if(sqlColunas == null) sqlColunas = ""; 
        sqlColunas = sqlColunas.toUpperCase().replaceAll(",",separador);

        // N�mero de colunas da senten�a execu��o da consulta
        numeroColunas = numeroColunas(sql);
        man.buscaRegistro(sql,request,numeroColunas);
        
        // Cabe�alho
        arquivo.append(sqlColunas + quebraDeLinha);
        
        for(int x = 0; x < man.vt.size(); x += numeroColunas){
            for(int j = 0; j < numeroColunas; j++){
                // Verifica o tipo do valor e concatena ao separador informado
                arquivo.append(verificaTipo(man.vt.elementAt(x + j)) + separador);
            }
            // Quebra de linha ao fim da linha
            arquivo.append(quebraDeLinha);
        }
        arquivo.append(quebraDeLinha);
        man.vt.clear();
        i++;
    }

    // Cabe�alho especificando tipo do conte�do e o nome do arquivo a ser gerado
    response.addHeader("Content-Disposition", "attachment;filename=" + nomeArquivo + ".csv");
    response.addHeader("Content-Transfer-Encoding", "binary");
    response.setContentType("application/octet-stream");
    response.getOutputStream().write(arquivo.toString().getBytes());
    response.getOutputStream().flush();
    response.getOutputStream().close();
    
%><%!
    /**
     * Retorna o n�mero de colunas que ser�o retornadas na senten�a
     * Obs: Caso tenha sido informado * (Ex: SELECT * FROM basDia) ser� retornado 0
     * 
     * @param String sql - Senten�a SQL
     * @return int n�mero de colunas
     */
    public int numeroColunas(String sql){
        if(sql == null || "".equals(sql)) return 0;
        
        // Exress�o regular que obtem todo o conteudo entre 'select' e 'from'
        Pattern pattern = Pattern.compile("select(.+)from");
        Matcher matcher = pattern.matcher(sql.toLowerCase());
        
        if(matcher.find()){
            return matcher.group(1).split(",").length;
        }

        return 0;
    }

    /**
     * Metodo que verifica se um determinado valor � do tipo Double ou possui casas decimais para que seja substituido o separador . por ,
     * Ex: 2.5 = 2,5
     * 
     * @param String valor - Valor a ser verificado
     * @return String substituida caso contenha casas decimais
     */
    public String verificaTipo(String valor){
        try{
            Double.parseDouble(valor);
            return valor.replaceAll("\\.",",");
        }catch(Exception e1){
            return valor;
        }
    }
    
%>