<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/imprime.js -->
/**
 * Função para a impressão de dados - chama arquivo imprime.jsp
 * @version 1.0 01/01/2000
 * @author Alexandre
 */

function imprime()
{// inicio da function imprime()
    janelaTarget = "janelaNova";
    janelaTamanho="P";
    janela();
    document.relatorio.tituloConsulta.value = xmlTelasNomeTela;
    document.relatorio.action = "/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/relatorios/index.jsp";
    document.relatorio.submit();
} // fim da function imprime()
