<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/tabelaDOM.js -->
/**
 * Função para esconder as linha de uma tabela via DOM
 * @version 1.0 22/09/2007
 * @author Alan
 * @param id string id de indentificação da tabela
 * @param posicoes podendo ser um vetor ou um unico valor informando posição da 
                   linha a ser escondida
 * @return valida true para mostrar o componente; false para sumir o componente
 * @return campos informa quaise campos serão escondidos, devendo ser passado ou
                  o objeto, ou um vetor com os objetos dos campos.
 */
    function escondeLinha( id, posicoes, valida, campos )
    {
        //Buscando a tabela
        var tabela = document.getElementById( id );
        //Status segundo a condição valida
        var position = valida? "relative" : "absolute";
        var visibility = valida? "visible" : "hidden";
        //Monta vetor com parâmetro posicoes caso não seja
        if( !(posicoes instanceof Array ) )
        {
            var x = posicoes;
            posicoes = new Array();
            posicoes[ 0 ] = x;
        }
        //Esconde ou mostra os componentes zerando seus valores
        if( campos != null )
        {
            //Monta vetor com parâmetro campos caso não seja
            if( !(campos instanceof Array ) )
            {
                var x = campos;
                campos = new Array();
                campos[ 0 ] = x;
            }
            for( var x=0;x < campos.length; x++ )
            {
                campos[x].style.visibility = visibility;
                if( campos[x].type.indexOf( "select" ) > -1 )
                    campos[x].options[ 0 ].selected = true;
                else
                    campos[x].value="";
            }
        }
            
        //Para navegador IE,no else serve para os demais destruindo e remontando
        // a linha escondida. Isso necessário devido ao desalinhamento efetuado
        // pelo firefox.
        if( !valida || navigator.appVersion.indexOf( "MSIE" ) >= 0 )
            for( var x=0; x < posicoes.length; x++ )
            {
                tabela.rows[ posicoes[ x ] ].style.position = position;
                tabela.rows[ posicoes[ x ] ].style.visibility = visibility;
            }
        else
            for( var x=0; x < posicoes.length; x++ )
            {
                if( tabela.rows[ posicoes[ x ] ].style.visibility != "hidden" )
                    continue;
                tabela.insertRow( posicoes[ x ] );
                for( var y=0; y< tabela.rows[ posicoes[ x ]+1 ].cells.length; y++ )
                {
                    tabela.rows[ posicoes[ x ] ].insertCell( y ).innerHTML=tabela.rows[ posicoes[ x ]+1 ].cells[ y ].innerHTML
                    tabela.rows[ posicoes[ x ] ].cells[ y ].align = tabela.rows[ posicoes[ x ] + 1 ].cells[ y ].align;
                    tabela.rows[ posicoes[ x ] ].cells[ y ].colSpan = tabela.rows[ posicoes[ x ] + 1 ].cells[ y ].colSpan;
                }
                tabela.deleteRow( posicoes[ x ]+1 );
            }
    }
