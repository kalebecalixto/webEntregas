<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/montaSql.js -->
/**
 * Faz a montagem dos comandos sql para campos multiselect
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Objeto input do tipo select
 * @param cmdSql Parte inicial do comando sql one ser�o colocados os values
 * @param opcao S - pega s� os selecionados, T - pega todo o conte�do
 */

function montaSql(campo, cmdSql, opcao)
{// inicio da function montaSql(campo, cmdSql, opcao)
    indice=0;
    indice = totSql
    for (;;)
    {
		if (!eval("document.forms[0].sql"+indice)) break;
		eval("document.forms[0].sql"+indice+".value = ''");
		indice++;
    }
    indice = totSql;
    for (i=0; i<campo.length; i++)
    {
        if (campo.options[i].selected||opcao!="S")
		{
	    	cmdSql2 = cmdSql + "'" + campo[i].value + "')";
	    	eval("document.forms[0].sql"+indice+".value = \"" + cmdSql2 + "\"");
            indice++
		}
    }
}// fim da function montaSql(campo, cmdSql, opcao)
