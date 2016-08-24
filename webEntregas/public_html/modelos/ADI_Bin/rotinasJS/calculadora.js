<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/calculadora.js -->
/**
 * Fun��o que adiciona um caracter e um campo
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param input Campo
 * @param character Caracter a ser adicionado
 */
function addChar(input, character)
{
	if(input.value == null || input.value == "0") input.value = character
	else input.value += character
}

/**
 * Fun��o que calcula Cosseno do campo display de um formul�rio
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function cos(form)
{
	form.display.value = Math.cos(form.display.value);
}

/**
 * Fun��o que calcula Seno do campo display de um formul�rio
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function sin(form)
{
	form.display.value = Math.sin(form.display.value);
}

/**
 * Fun��o que calcula Tangente do campo display de um formul�rio
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function tan(form)
{
	form.display.value = Math.tan(form.display.value);
}

/**
 * Fun��o que calcula Raiz Quadrada do campo display de um formul�rio
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function sqrt(form)
{
	form.display.value = Math.sqrt(form.display.value);
}

/**
 * Fun��o que calcula Logaritmo neperiano (base 10) do campo display de um formul�rio
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function ln(form)
{
	form.display.value = Math.log(form.display.value);
}

/**
 * Fun��o que calcula Exponencial do campo display de um formul�rio
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function exp(form)
{
	form.display.value = Math.exp(form.display.value);
}

/**
 * fun��o que deleta o �ltimo caracter de um campo
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param input Campo do formul�rio
 */
function deleteChar(input)
{
	input.value = input.value.substring(0, input.value.length - 1)
}

/**
 * Fun��o que muda o sinal do valor do campo especificado
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param input Campo do formul�rio
 */
function changeSign(input)
{
	if(input.value.substring(0, 1) == "-") input.value = input.value.substring(1, input.value.length)
	else input.value = "-" + input.value
}

/**
 * Fun��o que executa um comando javaScript que estiver no campo display
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function compute(form)
{
	form.display.value = eval(form.display.value)
}

/**
 * Fun��o que eleva ao quadrado o valor que estiver no campo display
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formul�rio onde o campo display se encontra
 */
function square(form)
{
	form.display.value = eval(form.display.value) * eval(form.display.value)
}

/**
 * Fun��o que verifica se a string � um valor num�rico v�lido
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param str String a ser verificada
 * @return true se for v�lida, false se for inv�lida
 */
function checkNum(str)
{
	for (var i = 0; i < str.length; i++)
	{
		var ch = str.substring(i, i+1)
		if (ch < "0" || ch > "9")
		{
			if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "." && ch != "(" && ch!= ")")
			{
				alert("Entrada Inv�lida !")
				return false
			}
		}
	}
	return true
}
