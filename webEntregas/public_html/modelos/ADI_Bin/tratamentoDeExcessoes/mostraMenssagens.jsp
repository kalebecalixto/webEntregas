<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/mostraMenssagens.jsp */ %>
<html>
<head>
  <title> MaxNetAdi( ATENÇÃO )</title>
</head>
    <script>      
    function fecharJanela() {
        if (confirm("Deseja fechar a janela")) {
            self.close();
        }      
    }      
    </script>      
<jsp:useBean id="xml" scope="page" class="adi.componentes.xml.vetorXml" />
<jsp:useBean id="texto" scope="page" class="adi.componentes.util.formata.textos" />
<%
  // recebe o codigo de mensagem passado como parametro
  String indMens = ""+request.getParameter("tipo");
  if (indMens==null) {
      indMens = "0";
  }
  // verifica se está zerado ou em branco
  // caso esteja seta o codigo de mensagem para o
  // padrão de mensagens não definidas
  if ((""+request.getParameter("tipo")).equals("0") || (""+request.getParameter("tipo")).equals("")) {
     indMens = "13";
  } else indMens = request.getParameter("tipo");
  String opcaoLogout = "";
  if ((""+request.getParameter("tipo")).equals("6")) opcaoLogout = "[ <a  href='/ADI_Intranet_Root/ADI_Intranet/package/finalizaSecao/finalizaSecao.jsp' target='_top'>Sair do Sistema</a> ]";
//definição da substituição do índice passado pela classe java (tipo)
  //pela msg correspondente no Webxml
  String mensagem = "";
  int indMensInt = Integer.parseInt(indMens);
  if (indMensInt >= 0 && indMensInt <= 32)
  {
       mensagem = substituicao[indMensInt];
  } else {
            mensagem = "Codigo de mensagem não encontrado: " + indMens;
         }
  //verifica se a mensagem tem algum parametro a ser substituido pelo
  //conteudo das variaveis recebidas
  int i = 1;
  String variavel = "";
  while (request.getParameter("variavel"+i) != null) {
   variavel =  "^%"+i+"^";
   mensagem = texto.replace(mensagem, variavel, request.getParameter("variavel"+i));
   mensagem = texto.replace(mensagem, "_", " ");
   i++;
  }
%>
<body text="black" bgcolor="white">
<basefont size=2 face="Verdana, Arial, Helvetica">
    <center>
    <br>
    <table width=100 align=center border=0 cellpadding=0 cellspacing=0><tr><td align=center>
    <img src="<%=application.getInitParameter("BinPath")%>/imagens/mensagens/atencao.jpg" border=0>
    </td>
    </tr>
    <tr><td align=center><font size=1><center>
      <%
      //imprime a mensagem montada de acordo com os parametros recebidos
      out.write(mensagem);
      //imprime outra opção de paramtero que possa ter sido recebido
      if (request.getParameter("parametro")!=null) {
        out.write ("<BR>"+request.getParameter("parametro"));
      }
    // imprime a descrição técnica do erro
    //este if deverá ser ativado quando o sistema for implementado
    //para que o usuário não veja a descricao tecnica do erro
    //qunado o erro tiver sido tratado.
    //  if (indMens.equals("13")) {
    %>
    <!--
        <BR><BR><b>Descrição Técnica do Erro:<BR></b>
     -->        
        <%
        if (request.getParameter("descrErro")!=null)
            out.write(""+request.getParameter("descrErro"));        
        %>
    <%        
    //  }
      %>
    </td>
    <tr><td align=center><font size=2><BR>
      [ <a href="javaScript:self.history.go(-2);"
      onMouseOver="javaScript:self.status = 'Voltar'; return true;"
      onMouseOut="javaScript:self.status = ''; return true;">Voltar</a>       
      ]
      <%=opcaoLogout%>      
    </td></tr>
    </table>
</body>
</html>
