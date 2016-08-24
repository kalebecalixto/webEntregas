<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/permissao.jsp */ %>
<html>
<head>
  <title>SIGMA - Sigma</title>
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
	//Passagem de parametros para os setContext 
	xml.setContext(application);
	texto.setContext(application);
	//Variáveis auxiliares que se repetem 
	String aux1 = " " +adi.componentes.telas.Mensagem.GENBA0049;
	String aux2 = adi.componentes.telas.Mensagem.GENBA0067;
	String aux3 = adi.componentes.telas.Mensagem.GENBA0063;
	//Array de strings para substituição dos tipos em relação as msgs do Webxml
	String[] substituicao = new String[46];
	substituicao[0]= "";
	substituicao[1]= adi.componentes.telas.Mensagem.SEGBA0004+" "+adi.componentes.telas.Mensagem.SEGBA0000;
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
	substituicao[32]= adi.componentes.telas.Mensagem.GENBA0065;
	substituicao[33]= adi.componentes.telas.Mensagem.SEGBA0004;
	substituicao[34]= adi.componentes.telas.Mensagem.SEGBA0007;
	substituicao[35]= adi.componentes.telas.Mensagem.SEGBA0008+"";
	substituicao[36]= adi.componentes.telas.Mensagem.GENBA0092+"";
	substituicao[37]= adi.componentes.telas.Mensagem.SEGBA0004+" "+adi.componentes.telas.Mensagem.SEGBA0010;
	substituicao[38]= adi.componentes.telas.Mensagem.SEGBA0004+" "+adi.componentes.telas.Mensagem.SEGBA0011;
	substituicao[39]= adi.componentes.telas.Mensagem.SEGBA0004+" "+adi.componentes.telas.Mensagem.SEGBA0012;
	substituicao[40]= adi.componentes.telas.Mensagem.SEGBA0004+" "+adi.componentes.telas.Mensagem.SEGBA0013;
	substituicao[41]= adi.componentes.telas.Mensagem.SEGBA0004+" "+adi.componentes.telas.Mensagem.SEGBA0014;
        substituicao[42]= adi.componentes.telas.Mensagem.SEGBA0015;
        substituicao[43]= adi.componentes.telas.Mensagem.SEGBA0016;
        substituicao[44]= adi.componentes.telas.Mensagem.SEGBA0017;
        substituicao[45]= adi.componentes.telas.Mensagem.SEGBA0018;
  // recebe o codigo de mensagem passado como parametro
  String indMens = ""+request.getParameter("tipo");
  if (indMens==null) {
      indMens = "0";
  }
  // verifica se está zerado ou em branco caso esteja seta o codigo de mensagem para o
  // padrão de mensagens não definidas
  if ((""+request.getParameter("tipo")).equals("0") || (""+request.getParameter("tipo")).equals("")) {
     indMens = "13";
  } else indMens = request.getParameter("tipo");
  String opcaoLogout = "";
  // link para sair do sistema caso a sessão expire
  if ((""+request.getParameter("tipo")).equals("6")) opcaoLogout = "[ <a  href='/ADI_Intranet_Root/ADI_Intranet/package/finalizaSecao/finalizaSecao.jsp' target='_top'>Sair do Sistema</a> ]";
  //definição da substituição do índice passado pela classe java (tipo)
  //pela msg correspondente no Webxml
  String mensagem = "";
  int indMensInt = Integer.parseInt(indMens);
  if (indMensInt >= 0 && indMensInt <= 45)
  {
       mensagem = substituicao[indMensInt];
  } else {
            mensagem = "Codigo de mensagem não encontrado: " + indMens;
         }
  //verifica se a mensagem tem algum parametro a ser substituido pelo
  //conteudo das variaveis recebidas
  int i = 1;
  String variavel = "";
  while (request.getParameter("variavel"+i) != null) 
  {
     variavel =  "^%"+i+"^";
     //mensagem = application.getInitParameter(mensagem);
     mensagem = texto.replace(mensagem, variavel, request.getParameter("variavel"+i));
     mensagem = texto.replace(mensagem, "_", " ");
     i++;
  }
%>
<body text="black" bgcolor="white">
<basefont size=2 face="Verdana, Arial, Helvetica">
<center>
<br>
<table width=400 border=0 cellpadding=0 cellspacing=0>
	<tr>
		<td align=center width=100>
			<img src="<%=application.getInitParameter("imagensGenericasPath")%>/mensagens/erroDeAcesso.jpg" border=0>
		</td>
		<td><font size=1>
      <%
      //imprime a mensagem montada de acordo com os parametros recebidos
      out.write(mensagem);
      //imprime outra opção de parametro que possa ter sido recebido
      if (request.getParameter("parametro")!=null)
        out.write ("<BR>"+request.getParameter("parametro"));
      if (request.getParameter("descrErro")!=null)
       out.write(""+request.getParameter("descrErro"));        
        %>
    </td>
    </tr>
    <tr><td align=center colspan=2><font size=2><BR>
   	  <%
   	  if( ( "" + request.getParameter( "idFechar" ) ).equals( "null" ) )
   	  {
                if ((""+request.getParameter("tipo")).equals("6"))
                      out.write( opcaoLogout );
                else
                {
                    %><img alt="Voltar" title="Voltar" name="imagemVoltar" style="cursor: hand" onClick="javaScript:voltar()" onMouseOver="javaScript:self.status = 'Voltar'; return true;" onMouseOut="javaScript:self.status = ''; return true;" src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/menuHtml/voltar.gif"><%
                }
	  }
	  else
	  {
		  %><img alt="Fechar" title="Fechar" name="imagemFechar" style="cursor: hand" onClick="javaScript:fechar()" onMouseOver="javaScript:self.status = 'Fechar'; return true;" onMouseOut="javaScript:self.status = ''; return true;" src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/menuHtml/fechar.gif"><%
	  }
      %>
      </td></tr>
    </table>
    <script>
    function voltar()
    {
    	history.go(-<%= ( ( ""+request.getParameter( "redirect" ) ).equals( "null" ) ) ? "1" : ""+request.getParameter( "redirect" ) %>);
    }
	function fechar()
    {
    	top.close();
    }
    
    if("<%=String.valueOf(request.getParameter("tipo"))%>" === "6")
    {
        window.location.href = "/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/startupMaxNet/semSessao.jsp";
    }
    
    </script>
</body>
</html>
