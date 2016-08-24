<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/procura.js -->
/**
 * Função para procurar um nome qualquer a partir de consultas feitas por rotinas "_con.jsp"
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param name
 */

 
function procura(name) 
{// início da função procura
  tipoProcura=name;
  arrayNames = new Array("optApartir","optRadical","optQualquer","optFinal");
  for (i=0;i<arrayNames.length;i++) 
  {
    auxName=arrayNames[i];
    end=document[auxName].src;
    pos=end.indexOf('O');
    ini=end.substring(0,pos-1);
    fim=end.substring(pos);
    document[auxName].src=ini+"0"+fim;
  }
  end=document[name].src;
  pos=end.indexOf('O');
  ini=end.substring(0,pos-1);
  fim=end.substring(pos);
  document[name].src=ini+"1"+fim;
}// fim da função procura
