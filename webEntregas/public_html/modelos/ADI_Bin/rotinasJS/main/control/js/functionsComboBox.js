/** 
 * functionsComboBox.js 
 *  
 *  Copyright (c) 2005-2009, Adi Assessoria em Informática Ltda.
 * Todos os Direitos Reservados.
 *
 * Este software faz parte do maxnet um pacote de utilitários da ADI para Controle de processos da área pública.
 *  
 */

/** 
 * Contém funções específicas para o tipo de componente Combo.  
 * 
 * @author Lourdes Isabel Miranda
 * 
 * */

/*
* limpa todas as options existentes em um combo
* deve ser passado o objeto combo como parametro
*/
function clearCombo(cbo) {
        i = cbo.options.length-1;
        
        for (;;) {
            if (cbo.options.length>0) {
                cbo.options[i] = null;
            } else {
                break;
            }
            i--;
        }
}
    
/* seleciona o item passado como parametro */
function selecionaItem(cbo, codItem) {
    achou = false;

    for (i=0;i<cbo.options.length;i++) {
        strItem = cbo.options[i].value;
        arrValue = eval(strItem);
        if (arrValue[0]) {
            valor = arrValue[0];
        } else {
            valor = cbo.options[i].value;
        }

        if (valor+""==codItem+"") {
            cbo.selectedIndex = i;
            achou = true;
            break;
        }
    }

    if (!achou) {
        cbo.selectedIndex = 0;
    }
}