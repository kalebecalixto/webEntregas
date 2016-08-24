<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/critica.js -->
/**
 * Função que critica os campos ao submeter o formulário (N=Text Numérico, A=Text Alfanumerico D=Data H=Hora S=select simples M=Multiselect O=Option Box)
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @return true se todos os campos forem válidos, false se um campo for inválido
 * @see criticaParam
 * @see criticaCampo
 */


arrayCampos = new Array();
function critica()
{// inicio da function critica()
   retorno = true;
   for (indCrit=0;indCrit<arrayCampos.length;indCrit++)
   {//inicio for i
      strArray = arrayCampos[indCrit];
      indCritAtual = indCrit;
      posFinalNome = strArray.indexOf("^");
      nomeCampo = 	strArray.substring(0,posFinalNome)
      tipoDado = strArray.substring(posFinalNome + 1, posFinalNome + 2)
      posFinalTamMin = strArray.indexOf("^",posFinalNome + 3);
      tamMin = strArray.substring(posFinalNome + 3, posFinalTamMin);
      numDecimais = strArray.substring(posFinalTamMin + 1, strArray.length);

      if (!criticaParam(nomeCampo,tipoDado,tamMin,numDecimais))
	  {
         retorno = false;
         break;
      } else if (!criticaCampo(nomeCampo,tipoDado,tamMin,numDecimais))
             {
                retorno = false;
	               objCampo = eval("document.forms[0]."+nomeCampo);
	               break;
	            }
   }//fim for i
return retorno;
}// fim da function critica()
