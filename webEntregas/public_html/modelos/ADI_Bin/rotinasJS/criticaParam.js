<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/criticaParam.js -->
/**
 * Fun��o que critica os par�metros do campo enviados para a cr�tica
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Campo a ser criticado
 * @param tipoDado Tipo de dado do campo
 * @param tamMin Tamanho m�nimo que o campo deve ter
 * @param numDecimais N�mero de casas decimais que o campo deve ter
 * @return true se os par�metros forem v�lidos, false se forem inv�lidos
 */

function criticaParam(campo,tipoDado,tamMin,numDecimais)
{// inicio da function criticaParam(campo,tipoDado,tamMin,numDecimais)
  objCampo = eval("document.forms[0]."+campo);
  titErro = "Erro na Passagem de Parametros p/ a cr�tica\n\n"
  if (!this.objCampo)
  {
      alert (GENBA0027);
      return false;
  }
  if (tipoDado!="N"&&tipoDado!="A"&&tipoDado!="D"&&tipoDado!="H"&&tipoDado!="S"&&tipoDado!="M"&&tipoDado!="O")
  {
     alert(GENBA0027);
     return false;
  }
  if (tamMin*1!=tamMin)
  {
      alert (GENTX0200);
      return false;
  }
  if (numDecimais*1!=numDecimais)
  {
     alert (GENTN0100);
     return false;
  }
  return true
}// fim da function criticaParam(campo,tipoDado,tamMin,numDecimais)
