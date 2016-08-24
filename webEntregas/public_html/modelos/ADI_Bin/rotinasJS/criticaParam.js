<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/criticaParam.js -->
/**
 * Função que critica os parâmetros do campo enviados para a crítica
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Campo a ser criticado
 * @param tipoDado Tipo de dado do campo
 * @param tamMin Tamanho mínimo que o campo deve ter
 * @param numDecimais Número de casas decimais que o campo deve ter
 * @return true se os parâmetros forem válidos, false se forem inválidos
 */

function criticaParam(campo,tipoDado,tamMin,numDecimais)
{// inicio da function criticaParam(campo,tipoDado,tamMin,numDecimais)
  objCampo = eval("document.forms[0]."+campo);
  titErro = "Erro na Passagem de Parametros p/ a crítica\n\n"
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
