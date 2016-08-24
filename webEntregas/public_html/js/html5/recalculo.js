/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var recalculo = function(frm, params) {

    var check = function(frm, field) {
        if (! frm[field]) {
            var elm = document.createElement('input');
            elm.setAttribute("name", field);
            elm.setAttribute("type", "hidden");

            frm.appendChild(elm);
        }
    }


    if ( ! (window.recalculadocallerfunction) ) {
        window.recalculadocallerfunction = "(" + arguments.callee.caller.toString() + "());"

        if ( ! frm.original )
            frm.original = frm.submit;

        frm.submit = function() {
            eval(window.recalculadocallerfunction);
            this.original();
        }

        frm.addEventListener('submit', frm.submit);
    }

    
    var incpage = location.pathname.endsWith("_inc.jsp");
    
    if ( ! window.inccount )
        window.inccount = 1;
    else
        window.inccount++;
    
    
    if (incpage && inccount == 1)
        return;
    
    
    check(frm, 'idrecalculo');
    check(frm, 'roperacao');
    check(frm, 'rtabela');
    check(frm, 'rchave');
    check(frm, 'rmensagem');
    check(frm, 'rcodpessoa');
    check(frm, 'rseqfuncionario');
    check(frm, 'rsql');
    check(frm, 'rcampos');
    check(frm, 'rcodtela');

    frm.idrecalculo.value = 1;

    

    if (params['operacao'])
        frm['roperacao'].value = params['operacao'];
    else
        throw new Error('operacao is required');

    if (params['tabela'])
        frm['rtabela'].value = params['tabela'];
    else
        throw new Error('tabela is required');

    if (params['chave'])
        frm['rchave'].value = JSON.stringify(params['chave']);
    else
        throw new Error('chave is required');

    if (params['mensagem'])
        frm['rmensagem'].value = params['mensagem'];
    else
        throw new Error('mensagem is required');

    if (params['codpessoa'])
        frm['rcodpessoa'].value = params['codpessoa'];
    else
        throw new Error('codpessoa is required');

    if (params['seqfuncionario'])
        frm['rseqfuncionario'].value = params['seqfuncionario'];
    else
        throw new Error('seqfuncionario is required');

    if (params['sql'])
        frm['rsql'].value = params['sql'];

    if (params['campos'])
        frm['rcampos'].value = params['campos'];
    
    if (params['codtela'])
        frm['rcodtela'].value = params['codtela'];
}
