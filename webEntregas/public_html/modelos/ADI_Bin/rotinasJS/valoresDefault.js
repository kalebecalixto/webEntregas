<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/valoresDefault.js -->
/**
 * Função script para setar valores default de acordo com o template de tipo de dado escolhido
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param combo Combo selecionado
 * @param opção Opção a ser marcada do seu tipo
 */

 function valoresDefault(combo, opcao) {
   if (combo.selectedIndex==1) { //basDefSmall01
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value   = 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value = 1");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value = 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value = 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value = 9");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==2) { //basDefSmall02
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value = 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value = 2");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value = 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value = 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value = 99");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==3) { //basDefSmall03
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 3");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 999");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==4) { //basDefSmall04
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 4");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 9999");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==5) { //basDefSmall05
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 5");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 32767");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==6) { //basDefInt06
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 6");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 999999");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==7) { //basDefInt07
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 7");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 9999999");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==8) { //basDefInt08
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 9");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 99999999");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==9) { //basDefInt09
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 9");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 999999999");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==10) { //basDefInt10
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 10");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 2147483647");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==11) { //basDefSN
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 1");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 1");
   } else if (combo.selectedIndex==12) { //basDefData
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 10");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 3");
   } else if (combo.selectedIndex==13) { //basDefHora
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 5");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 4");
   } else if (combo.selectedIndex==14) { //basDefValDec6
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 12");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 6");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==15) { //basDefValDec2
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 17");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 2");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==16) { //basDefValDC
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 1");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 2");
   } else if (combo.selectedIndex==17) { //char
      eval("document.forms[0].xml"+ opcao +"tamanhoMin1.value= 1");
      eval("document.forms[0].xml"+ opcao +"tamanhoMax1.value= 0");
      eval("document.forms[0].xml"+ opcao +"qteDeCasasDecimais1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMinimo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"valorMaximo1.value= 0");
      eval("document.forms[0].xml"+ opcao +"tipoDeDado1.selectedIndex = 1");
   }
 }
