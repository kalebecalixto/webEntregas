<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/email/enviaEmail.jsp */ %>
<% /*
               Cabeçalho Da Telas
              Empresa: ADI Informática
            Descrição: Gera arquivo em formato CSV de acordo com as sentenças SQL informadas por parâmetro
           Parametros: separador : Delimitador de campos no arquivo CSV. Padrão ';'
                       quebraDeLinha : Delimitador de quebra de linha no arquivo CSV. Padrão '\n'
                       nomeArquivo : Nome do arquivo gerado. Espaços em branco são substituidos por '_'
                       sql, sql2, sql3 ... sqln : Sentenças SQL que serão executadas e impressas no arquivo em suas respectivas ordens.
                       colunasSql, colunasSql1, colunasSql2, colunasSql3 ... colunasSqln : Parâmetro que informa os nomes das colunas dos respectivos SQLs.
                                                                                           Os nomes devem ser separados por vírgula.
                       Ex: sql = 'SELECT dia, sum(dia) AS somaDia FROM basDia GROUP BY dia'
                           colunasSql = 'Dia,Soma Dia'
                Autor: Bruno Eustáquio
         Data criação: 09/01/2009
                  Obs: Para o funcionamento da geração do arquivo e necessário que o path 'rotinasJSPPath' seja informado no web.xml
    Ex. de Formulario: <form name="frmCSV" action="<%=application.getInitParameter("rotinasJSPPath")% >/geradorCSV/geradorCSV.jsp" method="post">
                            <input type=hidden name="separador"     value=";" />
                            <input type=hidden name="quebraDeLinha" value="\n" />
                            <input type=hidden name="nomeArquivo"   value="Cotação de preços" />
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
    // Parâmetros de configuração do arquivo
    String separador            = request.getParameter("separador");
    String quebraDeLinha        = request.getParameter("quebraDeLinha");
    String nomeArquivo          = request.getParameter("nomeArquivo");
    
    // Validação
    if("".equals(separador) || separador == null) separador = ";";
    if("".equals(quebraDeLinha) || quebraDeLinha == null) quebraDeLinha = "\n";
    if("".equals(nomeArquivo) || nomeArquivo == null) nomeArquivo = "Arquivo"; else nomeArquivo = nomeArquivo.replaceAll(" ","_");

    // String onde os campos serão concatenados
    StringBuilder arquivo = new StringBuilder("");

    // Variáveis de apoio
    int i = 0;
    String sql = null;
    String sqlColunas = null;
    int numeroColunas = 0;
    while(true){
          
        //  Recupera os parâmetros do escopo de requisição na ordem crescente 
        //  sql, sql1, sql2 ... sqlN
        //  colunasSql, colunasSql1, colunasSql3 ... colunasSqlN
        sql          = request.getParameter("sql" + (i > 0 ? i : ""));
        sqlColunas   = request.getParameter("colunasSql"+ (i > 0 ? i : ""));

        
        // Verifica o conteudo do sql
        // Caso tenha sido passado como uma string vazia apenas é ignorado e o algoritmo vai em busca do próximo sql
        // Caso esteja nulo é dado como último sql e o algoritmo é interrompido para a geração do arquivo
        if("".equals(sql)) continue;
        if(sql == null) break;

        // Caso não seja informado as colunas a string recebe null e não haverá cabeçalho para os valores retornados pela consulta
        // Caso tenha sido informado a vírgula é substituida pelo separador informado
        if(sqlColunas == null) sqlColunas = ""; 
        sqlColunas = sqlColunas.toUpperCase().replaceAll(",",separador);

        // Número de colunas da sentença execução da consulta
        numeroColunas = numeroColunas(sql);
        man.buscaRegistro(sql,request,numeroColunas);
        
        // Cabeçalho
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

    // Cabeçalho especificando tipo do conteúdo e o nome do arquivo a ser gerado
    response.addHeader("Content-Disposition", "attachment;filename=" + nomeArquivo + ".csv");
    response.addHeader("Content-Transfer-Encoding", "binary");
    response.setContentType("application/octet-stream");
    response.getOutputStream().write(arquivo.toString().getBytes());
    response.getOutputStream().flush();
    response.getOutputStream().close();
    
%><%!
    /**
     * Retorna o número de colunas que serão retornadas na sentença
     * Obs: Caso tenha sido informado * (Ex: SELECT * FROM basDia) será retornado 0
     * 
     * @param String sql - Sentença SQL
     * @return int número de colunas
     */
    public int numeroColunas(String sql){
        if(sql == null || "".equals(sql)) return 0;
        
        // Exressão regular que obtem todo o conteudo entre 'select' e 'from'
        Pattern pattern = Pattern.compile("select(.+)from");
        Matcher matcher = pattern.matcher(sql.toLowerCase());
        
        if(matcher.find()){
            return matcher.group(1).split(",").length;
        }

        return 0;
    }

    /**
     * Metodo que verifica se um determinado valor é do tipo Double ou possui casas decimais para que seja substituido o separador . por ,
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