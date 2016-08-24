<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/mensagemDeErro.jsp */ %>
<html>
<head>
  <title>MaxNetADI - ( NOTIFICAÇÃO DE ERRO )</title>
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
	//Parametros para o context  
	xml.setContext(application);
	//Variáveis auxiliares que se repetem 
	String aux1 = " " + adi.componentes.telas.Mensagem.GENBA0049;
	String aux2 = adi.componentes.telas.Mensagem.GENBA0067;
	String aux3 = adi.componentes.telas.Mensagem.GENBA0063;
	//Array de strings para substituição dos tipos em relaçaõ as msgs do Webxml
	String[] substituicao = new String[34];
	substituicao[0]= "";
	substituicao[1]= adi.componentes.telas.Mensagem.SEGBA0004+aux1;
	substituicao[2]= adi.componentes.telas.Mensagem.GENBA0053+aux1;
	substituicao[3]= adi.componentes.telas.Mensagem.GENBA0054;
	substituicao[4]= adi.componentes.telas.Mensagem.GENBA0055;
	substituicao[5]= adi.componentes.telas.Mensagem.GENBA0056+aux2;
	substituicao[6]= adi.componentes.telas.Mensagem.GENBA0029;
	substituicao[7]= adi.componentes.telas.Mensagem.GENBA0057;
	substituicao[8]= adi.componentes.telas.Mensagem.GENBA0069;
	substituicao[9]= adi.componentes.telas.Mensagem.GENBA0070;
	substituicao[10]= adi.componentes.telas.Mensagem.GENBA0071;
	substituicao[11]= adi.componentes.telas.Mensagem.GENBA0071;
	substituicao[12]= adi.componentes.telas.Mensagem.GENBA0072;
	substituicao[13]= adi.componentes.telas.Mensagem.GENBA0058+aux1;
	substituicao[14]= adi.componentes.telas.Mensagem.GENBA0073;
	substituicao[15]= adi.componentes.telas.Mensagem.GENBA0046;
	substituicao[16]= adi.componentes.telas.Mensagem.GENBA0042;
	substituicao[17]= adi.componentes.telas.Mensagem.GENBA0043;
	substituicao[18]= adi.componentes.telas.Mensagem.GENBA0044;
	substituicao[19]= adi.componentes.telas.Mensagem.GENBA0045+aux1;
	substituicao[20]= adi.componentes.telas.Mensagem.GENBA0045+aux1;
	substituicao[21]= adi.componentes.telas.Mensagem.GENBA0059;
	substituicao[22]= adi.componentes.telas.Mensagem.GENBA0063;
	substituicao[23]= adi.componentes.telas.Mensagem.GENBA0046;
	substituicao[24]= substituicao[13];
	substituicao[25]= adi.componentes.telas.Mensagem.GENBA0046+aux1;
	substituicao[26]= adi.componentes.telas.Mensagem.GENBA0061;
	substituicao[27]= adi.componentes.telas.Mensagem.GENBA0062;
	substituicao[28]= adi.componentes.telas.Mensagem.GENBA0062+aux3;
	substituicao[29]= adi.componentes.telas.Mensagem.GENBA0064;
	substituicao[30]= adi.componentes.telas.Mensagem.GENBA0062+aux3;
	substituicao[31]= adi.componentes.telas.Mensagem.GENBA0065;
	substituicao[32]= adi.componentes.telas.Mensagem.GENBA0066;
        substituicao[33]= String.valueOf( request.getParameter("mensagem") );//Este existe para não vir nada mesmo, não fação besteira em mudá-lo pelo amor de Deus!!!
	// recebe o codigo de mensagem passado como parametro
	String indMens = request.getParameter("tipo")==null?"0":request.getParameter("tipo");
	if (indMens==null) 
	{
		indMens = "0";
	}
  // verifica se está zerado ou em branco caso esteja seta o codigo de mensagem para o
  // padrão de mensagens não definidas
  if( indMens.equals("0") || indMens.equals(""))
  {
     indMens = "13";
  }
  //acessa o cadastro xml de mensagens para pegar a descricao da mesma
  /*String path =  "\\criacaoDeXML\\mensagens.xml";
  String[] colunas = new String[2];
  colunas[0] = "seqMensagem";
  colunas[1] = "descrMensagemErro";
  int tamVetor = xml.listaXml(colunas, path, indMens, "seqMensagem","N");*/
  //definição da substituição do índice passado pela classe java (tipo)
  //pela msg correspondente no Webxml
  String mensagem = "";
  int indMensInt = Integer.parseInt(indMens);
  if (indMensInt >= 0 && indMensInt <= 33)
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
    <img src="<%=application.getInitParameter("BinPath")%>/imagens/mensagens/erro.jpg" border=0>
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
    //quando o erro estiver sendo tratado.
    //  if (indMens.equals("13")) {
        if (request.getParameter("descrErro")!=null)
        {
	        %><BR><BR><b>Descrição Técnica do Erro:<BR></b><%
            out.write(""+request.getParameter("descrErro"));
        }
        %>
    </td>
    <script>
    function voltar()
    {
	    	self.history.go(-1);
    }
    </script>
    <tr><td align=center><font size=2><BR>
      [ <a href="javaScript:voltar();"
      onMouseOver="javaScript:self.status = 'Voltar'; return true;"
      onMouseOut="javaScript:self.status = ''; return true;">Voltar</a>       
      ]      
    </td></tr>
    </table>
</body>
</html>
