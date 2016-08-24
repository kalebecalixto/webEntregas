<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/localizar.js -->
/**
 * Função para procura de palavras em um componente ou tela
 * @version 1.0 20/02/2003
 * @author Alan Nunes Voiski
 * @param valor Palavra a ser procurada (text)
 * @param campo Campo onde a procura vai ser feita
 * @return True se não encontrado e false se encontrado
 */

var NS4 = (document.layers);
var IE4 = (document.all);

var n   = 0;

function localizar(valor, campo)
{
	var txt, i, found;
	if (valor == "")
		return false;

	if (NS4) {
		if (!campo.find(valor))//verifica se existe a palavra no campo
			while(campo.find(valor, false, true))//acha o campo e o seleciona
				n++;//conta
		else
			n++;//conta
		if (n == 0)
			alert(valor + " não encontrado.");//caso não ache a palavra no campo
	}

	if (IE4) {
		txt = campo.createTextRange();
		for (i = 0; i <= n && (found = txt.findText(valor)) != false; i++) {//verifica se existe a palavrqa no campo
			txt.moveStart("character", 1);
			txt.moveEnd("textedit");
		}
		if (found) {//se existe
			txt.moveStart("character", -1);//posiciona
			txt.findText(valor);//localiza
			txt.select();//seleciona
			txt.scrollIntoView();//posiciona scroll na palavra selecionada
			n++;//conta
		} else {//caso não haja nenhuma palavra depois d ter achado a ultima, volta ao começo
			if (n > 0) {
				n = 0;
				localizar(valor,campo);
			} else//caso não exista a palavra no campo
				alert(valor + " não encontrado.");
		}
	}
	return false;
}
