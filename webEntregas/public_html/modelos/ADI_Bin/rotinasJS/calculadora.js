<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/calculadora.js -->
/**
 * Função que adiciona um caracter e um campo
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
 * Função que calcula Cosseno do campo display de um formulário
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function cos(form)
{
	form.display.value = Math.cos(form.display.value);
}

/**
 * Função que calcula Seno do campo display de um formulário
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function sin(form)
{
	form.display.value = Math.sin(form.display.value);
}

/**
 * Função que calcula Tangente do campo display de um formulário
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function tan(form)
{
	form.display.value = Math.tan(form.display.value);
}

/**
 * Função que calcula Raiz Quadrada do campo display de um formulário
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function sqrt(form)
{
	form.display.value = Math.sqrt(form.display.value);
}

/**
 * Função que calcula Logaritmo neperiano (base 10) do campo display de um formulário
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function ln(form)
{
	form.display.value = Math.log(form.display.value);
}

/**
 * Função que calcula Exponencial do campo display de um formulário
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function exp(form)
{
	form.display.value = Math.exp(form.display.value);
}

/**
 * função que deleta o último caracter de um campo
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param input Campo do formulário
 */
function deleteChar(input)
{
	input.value = input.value.substring(0, input.value.length - 1)
}

/**
 * Função que muda o sinal do valor do campo especificado
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param input Campo do formulário
 */
function changeSign(input)
{
	if(input.value.substring(0, 1) == "-") input.value = input.value.substring(1, input.value.length)
	else input.value = "-" + input.value
}

/**
 * Função que executa um comando javaScript que estiver no campo display
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function compute(form)
{
	form.display.value = eval(form.display.value)
}

/**
 * Função que eleva ao quadrado o valor que estiver no campo display
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param form Formulário onde o campo display se encontra
 */
function square(form)
{
	form.display.value = eval(form.display.value) * eval(form.display.value)
}

/**
 * Função que verifica se a string é um valor numérico válido
 * @version 1.0 11/09/2002
 * @author Cleiton Ferreira
 * @param str String a ser verificada
 * @return true se for válida, false se for inválida
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
				alert("Entrada Inválida !")
				return false
			}
		}
	}
	return true
}
