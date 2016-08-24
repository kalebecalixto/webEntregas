<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/exibeMenu.js -->
/**
 * Função que exibe menu na tela
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function exibeMenu()
{
	if (menustatus==1)
	{
        if (document.layers)
        {
        	texto.visibility="hide";
        	menustatus=0;
        	return;
        } else {
        			texto.visibility="hidden";
        			menustatus=0;
        			return;
        		}
     }
	if (menustatus==0)
	{
        if (document.layers)
        {
        	texto.visibility="show";
        	menustatus=1;
        } else {
        			texto.visibility="visible";
        			menustatus=1;
        		}
    }
}


document.writeln("<style>");
document.writeln("#legenda {");
document.writeln("    visibility:hidden;");
document.writeln("    position:absolute;");
document.writeln("    top:25px;");
document.writeln("    left:1px;");
document.writeln("    border-color:black;");
document.writeln("    border-width:2px;");
document.writeln("    background-color:#2A4280;");
document.writeln("    color:white;");
document.writeln("}");
document.writeln("</style>");
