<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/critTextoSelecao.js -->
/**
 * Função para crítica de campos texto que são selecionados em outra tela.
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param objCampo Campo a ser criticado
 * @return true se o campo for válido, false se for inválido
 */


function critTextoSelecao(objCampo)
{// inicio da function critTextoSelecao(objCampo)
   if (objCampo.value=="modificado")
   {
 	    msgErroSel = "Campo foi alterado e deve ser selecionado, clique no título para seleciona-lo";
   } else msgErroSel = "Campo deve ser selecionado, clique no título para sleciona-lo";

			if ((objCampo.value==""||objCampo.value=="modificado")&&tamMin>0) //#1
			{
      indLink = 0;
      nomeLink = strName.replace('hidCod','consulta');
      //pega o link do campo de consulta
      for (indLink=0;indLink<document.links.length;indLink++)
      {
         if (document.links[indLink].name==nomeLink)
         {
	           break;
         }
      }
      if (indLink!=document.links.length)
      {
         document.links[indLink].focus();
      } else { eval("document.forms[0]."+strName.replace("hidCod","txt")+".focus()");
             }
      alert(msgErroSel)
      return false;
   }// fim #1
return true;
}// fim da function critTextoSelecao(objCampo)
