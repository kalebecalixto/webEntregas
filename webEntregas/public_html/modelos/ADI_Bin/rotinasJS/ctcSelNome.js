<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcSelNome.js -->
/**
 * Fun��o que critica a sele��o de campo quanto a exist�ncia ou altera��o
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function ctcSelNome()
{// in�cio da function ctcSelNome
	aux_txtCompomente=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;").toLowerCase();
	aux_hidNome=eval("document."+arrayCriticas[0]+"."+arrayAux[3]+".value;").toLowerCase();
	men="";
	if (aux_txtCompomente=="") // #1
	{
		men="Campo obrigat�rio.";
	} else if (aux_hidNome=="") // #2
			{
				men="O nome deve ser selecionado do banco de dados.";
			} else if (aux_txtCompomente!=aux_hidNome) // #3
					{
						men="O nome selecionado n�o pode ser alterado.";
					}//fim #3
					if (men!="") // #4
					{
						mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". "+men;
						if (salto=="") // #5
						{
							componenteRetorno=arrayAux[1];
							salto="\n";
						}// fim #5
					}//fim #4
}// fim da function ctcSelNome
