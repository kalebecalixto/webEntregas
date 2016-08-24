<%-- 
    Document   : filtrosPredefinidos
    Created on : 23/05/2016, 14:50:59
    Author     : kalebecalixto
--%>
<%@page import="java.net.URLDecoder"%>
<meta charset="utf-8">
<jsp:useBean id="xmlTelas" scope="page"    class="adi.componentes.xml.telas" />
<%@page import="com.horus.sigma.geral.client.model.PermissaoTelaModel"%><%@page import="com.horus.sigma.geral.server.DAO.GeralServiceDAO"%><%@page import="adi.sistemas.folha.DotacaoCalcFunc"%><%@page import="java.sql.*"%><%@page import="java.io.*"%><%@page import="horus.html5.JspJson"%><%@page import="com.google.gson.*"%><%@page pageEncoding="UTF-8"%><%
    Connection con = null;
    //System.out.println("teste 01");
    
    String acao = request.getParameter("acao");
    String dados = URLDecoder.decode(request.getParameter("dados"), "utf-8") ;
    String seqRelatorio = request.getParameter("seqRelatorio");
    String seqModelo = request.getParameter("seqModelo");
    String codUsuario = request.getParameter("codUsuario");
    String chave = request.getParameter("chave");
    
    
    //System.out.println(dados);
    
    
    String sqlListaReg = "";
    sqlListaReg += " select nomefiltro as nome, codusuario as usuario, (case when idpublico = false then 'Privado' else 'Publico' end) as status from basfiltrosrelatorio where codusuario = '"+codUsuario+"' and seqmodelodorelatorio = "+seqModelo+" and seqrelatorio = "+seqRelatorio+" group by nomefiltro, codusuario, idpublico; ";
    
    String sqlListaRegDet = "";
    sqlListaRegDet += " select seqrelatorio, seqmodelodorelatorio, nomefiltro as nome, codusuario as usuario, idpublico as status, tipocomp, nomecomp, valorcomp, indexcomp, textocomp, labelcomp from basfiltrosrelatorio where codusuario = '"+codUsuario+"' and seqmodelodorelatorio = "+seqModelo+" and seqrelatorio = "+seqRelatorio+"; ";
    
    String sqlInsert = "insert into basfiltrosRelatorio values ";
    
    sqlInsert += "";
    
    String sqlDelete = "delete from basfiltrosRelatorio where seqRelatorio = ? and seqmodelodorelatorio = ? and codUsuario = ? and nomefiltro = ? ";

    try
    {
        if(acao.equals("listar"))
        {
           //System.out.println("teste");
            //System.out.println(sqlListaReg.toString());
            //System.out.println(sqlListaRegDet.toString());
            con = JspJson.AbreCon(session);    
            PreparedStatement psLista = con.prepareStatement(sqlListaReg);
            PreparedStatement psListaDet = con.prepareStatement(sqlListaRegDet);
            
           //System.out.println("teste 03"); 
            
            ResultSet rsLista = psLista.executeQuery();
            ResultSet rsListaDet = psListaDet.executeQuery();

            String dadosListaJson = adi.componentes.sql.QueryOutput.ToJson(rsLista);
            String dadosListaDetJson = adi.componentes.sql.QueryOutput.ToJson(rsListaDet);
            
            
            //System.out.println(dadosListaJson);
            //System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++");
            //System.out.println(dadosListaDetJson);
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            jsonfinal.put("lista", dadosListaJson);
            jsonfinal.put("listaDet", dadosListaDetJson);

            rsLista.close();
            rsLista = null;
            rsListaDet.close();
            rsListaDet = null;

            JspJson.WriteJson(response, jsonfinal.toString());
            
        }
        if(acao.equals("inserir"))
        {
            
            //System.out.println("teste");
            //System.out.println(dados);
            con = JspJson.AbreCon(session);    
            PreparedStatement psUpdate = con.prepareStatement(sqlInsert+dados);

            psUpdate.execute();
        }
        if(acao.equals("delete"))
        {
            
            //System.out.println("teste");
            //System.out.println(dados);
            con = JspJson.AbreCon(session);    
            PreparedStatement psUpdate = con.prepareStatement(sqlDelete);
            psUpdate.setInt(1, Integer.parseInt(seqRelatorio));
            psUpdate.setInt(2, Integer.parseInt(seqModelo));
            psUpdate.setString(3, codUsuario);
            psUpdate.setString(4, chave);

            psUpdate.execute();
        }
        
        
    }
    catch(Exception ex) {
        if (con != null)
            con.rollback();
        
        out.print(JspJson.buildErrors(ex));
    } finally {
        JspJson.FechaCon(session, con);
    }
    
    

%>