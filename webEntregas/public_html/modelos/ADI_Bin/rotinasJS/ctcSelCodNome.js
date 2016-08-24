<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcSelCodNome.js -->
/**
 * Função que critica a seleção de campos atraves do codigo do nome
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function ctcSelCodNome()
{// inicio da function ctcSelCodNome
	 aux_txtCompomente=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;").toLowerCase();
	 aux_hidCodigo=eval("document."+arrayCriticas[0]+"."+arrayAux[3]+".value;");
	 aux_hidNome=eval("document."+arrayCriticas[0]+"."+arrayAux[4]+".value;").toLowerCase();
	 men="";
	 if (aux_txtCompomente=="") men="Campo obrigatório.";
	 else if (aux_hidCodigo=="" && aux_txtCompomente!="") men="O nome deve ser selecionado do banco de dados.";
	 else if (aux_txtCompomente!=aux_hidNome) men="O nome selecionado não pode ser alterado.";
	 if (men!="")// #1
  {
	  	mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". "+men;
		  if (salto=="") // #2
    {
			   componenteRetorno=arrayAux[1];
			   salto="\n";
		  }// fim #2
	 }	// fim #1
}// fim da function ctcSelCodNome
