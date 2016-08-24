<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataInscSecaoIptu.js -->
/**
 * Função que cria uma mascara para inscrição da seção do IPTU
 * @version 1.0 29/11/2002
 * @author Alan Nunes Voiski
 * @param campo Campo da inscrição da seção (this)
 * @param teclapres Tecla pressionada (event)
 * @return
 */

function formataInscSecaoIptu(campo,teclapres)
{
	valorCampo = '';
	valorCampo = campo.value;
	tamanhoCampo = valorCampo.length;
	
  //despreza valores não numéricos	    
  if ( ( teclapres.keyCode >= 48 ) && (teclapres.keyCode <= 57 ) && (tamanhoCampo <= 23))
  {
  
	//acrescenta "." entre os códigos da estrutura de inscrição cadastral
	if (tamanhoCampo == 2) {//distrito-setor
		campo.value = valorCampo.substr(0,2) + '.';
	}else if (tamanhoCampo == 6) {//setor-quadra
		campo.value = valorCampo.substr(0,6) + '.';
	}else if (tamanhoCampo == 11) {//quadra-logradouro
		campo.value = valorCampo.substr(0,11) + '.';
	}else if (tamanhoCampo == 18) {//logradouro-seção
		campo.value = valorCampo.substr(0,18) + '.';
	}	
  }else if (((teclapres.keyCode>=65 && teclapres.keyCode<=90) || (teclapres.keyCode>=97 && teclapres.keyCode<=122)) && (tamanhoCampo>23 && tamanhoCampo<=25))
  {
	if (tamanhoCampo == 24) {//seção-letra
		campo.value = valorCampo.substr(0,24) + '-';
	}
  }else teclapres.keyCode=null;
}
