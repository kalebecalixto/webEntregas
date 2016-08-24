<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/criticaDeCampos.js -->

/** 
 * Este arquivo gera as criticas dos campos no browser
 * acessando o cadastro webXml.xml de mensagens
 * @@autor Vanderson Martins
 * Data criação: 26/04/2001
 * ultima alteração: 01/01/2003 - Cleiton Ferreira
 * Data ultima alteração: 13/08/2008 - Júnio
 * Alteração Efetuada: idObrigatoriedade no multibox
 */

/*
* Variavel contendo nome do objeto tipo form necessário para localização do componente
*/
formPadrao = "document.forms[0]";
/*
* Variável com ano do campo de tipo dataDM. automizando sua formatação e uso em
* sqls. Atençaõ, este ano deve ser setado após a inclusão da crítica, e NÃO antes.
*/
var ano_DM="";
/* ---------------------- function rollBackCombos() ------------------------------*/ 
//objeto que irá guardar as propriedades do combo para rollBack caso a crítica volte false
    rollBackCombos = new Array();
    function rollBackValores()
    {
        for( i = 0 ;i < rollBackCombos.length ; i += 2 )
        {
            if( rollBackCombos[ i + 1 ].length<1 ) //Em especial para select_multiple que permite este campo vazio
                continue;
            campoRBCombo = eval( formPadrao + "." + rollBackCombos[ i ] );
            campoRBCombo.options[ campoRBCombo.selectedIndex ].value = rollBackCombos[ i + 1 ];
        }
        rollBackCombos = new Array();
    }

/* ---------------------- function definicaoCampo() ------------------------------*/ 
//objeto que irá guardar as propriedades do componente
    function definicaoCampo() 
    { }
    definicaoCampo = new definicaoCampo();

var idForcaObrigatoriedade="";
/* ---------------------- function chamaCriticas(definicaoCampo) ----------------------*/
//faz as chamadas das criticas dos parametros recebidos
    function chamaCriticas(definicaoCampo) 
    {
        if( idForcaObrigatoriedade.length > 0 )
            definicaoCampo.idObrigatoriedade = idForcaObrigatoriedade;
        if (!criticaParam(definicaoCampo)) 
        {
            return false;
        } else if (!criticaCampo(definicaoCampo)) 
                {
                    rollBackValores();
                    return false;
                } else return true;
    }//fim da function chamaCriticas


/* ---------------------- function criticaCampo(definicaoCampo) ----------------------*/
//efetua a critica dos campos de acordo com as suas definicoes e de acordo com o 
//tipo de componente html
    function criticaCampo(definicaoCampo) 
    {
                historicoManutencao( definicaoCampo );

        objCampo = eval(formPadrao+"."+definicaoCampo.nomeHtml);
        
        if(opcaoSubmete == "excluir")
        {
            if (definicaoCampo.tipoDeDado=="D") 
            {    
                if ( objCampo && objCampo.value=="") 
                {
                    objDataTela = objCampo;
                    objCampo = eval(formPadrao+"."+trocaString(objDataTela.name,"datatela", ""));
                    objCampo.value = "null";
                }
            }
            return true;    
        }
        
        if( definicaoCampo.tipoDoComponente == "label" )
            return true;    
        
        if (objCampo==undefined) return true;
        else if (objCampo.disabled) return true;
        else if ( objCampo.style.visibility == "hidden" )
        { 
            //tratanto a excessao da data vazia mesmo quando o componente estiver escondido
            if( definicaoCampo.tipoDeDado == "D" )
            {
                if (objCampo.value=="") 
                {
                    objDataTela = objCampo;
                    objCampo = eval(formPadrao+"."+trocaString(objDataTela.name,"datatela", ""));
                    objCampo.value = "null";
                }

            }
            return true; 
        }
        
            //verifica se o campo é um campo do tipo Radio  e faz a critica
            //e chama rotina específica: critOption(objCampo)
            tipoCampo = objCampo.type;
            if (tipoCampo=="undefined") 
            {
                tipoCampo = objCampo[0].type;
                if (tipoCampo=="undefined") 
                {
                    alert( GENBA0047 + ", campo: " + objCampo.name);
                    return false;
                }
            } else if (tipoCampo=="hidden") 
                    {
                        if (eval(formPadrao+".opcao"+definicaoCampo.nomeHtml)) 
                        {
                            objCampo = eval(formPadrao+".opcao"+definicaoCampo.nomeHtml+"[0]")
                            tipoCampo=objCampo.type;
                        }
                    }
            tipoCampo = tipoCampo.toUpperCase();
            if (definicaoCampo.tipoDoComponente=="textCodHie") 
            {
                if (criticaCodigoHierarquico(padraoCodigoHierarquico,objCampo.value)) 
                {
                    return true;
                } else {
                            alert( GENBA0048 + "\n\n" + GENBA0050 );
                            objCampo.focus();
                            return false;
                        }
            }
            if (tipoCampo=="RADIO"||tipoCampo=="CHECKBOX") 
            {
                if (definicaoCampo.idObrigatoriedade!="N") 
                {
                    if (!critRadio(definicaoCampo)) 
                    {
                        return false;
                    } else { return true };
                } else { return true };
            }
            //joga o nome do campo para uma string
            strName = definicaoCampo.nomeHtml;
            //verifica se o campo é um campo do tipo caixa de combinacao
            //e chama rotina específica: critSelecao(definicaoCampo)
            if (tipoCampo.indexOf("SELECT")>-1) 
            {
                rollBackCombos[ rollBackCombos.length ] = definicaoCampo.nomeHtml ;
                rollBackCombos[ rollBackCombos.length ] = eval(formPadrao+"."+definicaoCampo.nomeHtml+".value");
                selecionaCombo(eval(formPadrao+"."+definicaoCampo.nomeHtml),0);
                if (!critSelect(definicaoCampo)) 
                {
                    return false;
                }
                return true
            }
            //retira carcateres brancos do final do do campo
            objCampo.value = tiraCaracter(objCampo.value, ' ','T')
            //verifica se o campo é um campo texto com consulta
            //em outra tela e chama rotina específica: critTextoSelecao(definicaoCampo)
            if (definicaoCampo.enderecoNovosItens!="") 
            {
                if (definicaoCampo.tipoDoComponente!="label") 
                {
                    if (!critTextoSelecao(definicaoCampo)) 
                    {
                        return false;
                    }
                }      
                return true
            }
            if ( tipoCampo != 'HIDDEN' )
            {
                //joga o foco para o campo
                try{
                    objCampo.focus();
                   }catch( ex ) { }
            }

            //verifica se o campo é numérico 
            //e faz a crítica específica: criticaNumerico(objCampo)
            if (definicaoCampo.tipoDeDado=="N") 
            {
                if( objCampo.value == "" )
                    objCampo.value = "0";
                
                if (!criticaNumerico(definicaoCampo)) 
                {
                    return false;
                }
            }
            
            //Força sincronia do valor do campo digitável com campo hidde que armazena valor para uso no sql
            //evitando um pal que apenas atualizava-se o valor, quando se saia do campo, sendo quando usado alt+i(exemplo)
            // um atalho, ele continuava no campo e com valor do hid desatualizado.
            if ( definicaoCampo.tipoDoComponente == 'textEdit' )
            {
                var objCampoAux = eval( formPadrao+".hid"+definicaoCampo.nomeHtml.substring( 3, definicaoCampo.nomeHtml.length ) );
                if( objCampoAux )
                    objCampoAux.value = preparaValor( objCampo.value, 1 );
            }

            //efetua critica de tamanho do campo
            if ((definicaoCampo.tamanhoMin > 0 && definicaoCampo.idObrigatoriedade!="N")||definicaoCampo.idObrigatoriedade=="S") 
            {
                var strCampo = objCampo.value;
                //if (strCampo.length==0 || ( definicaoCampo.tipoDeDado=="N" && preparaValor( strCampo ) == .0 ) ) 
                if (strCampo.length==0 ) 
                {
                    mensagem = GENBA0043;
                    alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
                    return false;
                }
                if (strCampo.length<definicaoCampo.tamanhoMin) 
                {
                    mensagem = GENBA0046;
                    mensagem = trocaString(mensagem,"^%1^", definicaoCampo.label);
                    mensagem = trocaString(mensagem,"^%2^", definicaoCampo.tamanhoMin);
                    mensagem = trocaString(mensagem,"^%3^", definicaoCampo.tamanhoMax);
                    alert(mensagem);
                    return false;
                }
            }
            
            // faz a critica do tamanho maximo de um textarea
            if (tipoCampo=="TEXTAREA"){
                if(objCampo.value.length > definicaoCampo.tamanhoMax){
                    msg = GENBA0046;
                    msg = trocaString(msg,"^%1^", definicaoCampo.label);
                    msg = trocaString(msg,"^%2^", definicaoCampo.tamanhoMin);
                    msg = trocaString(msg,"^%3^", definicaoCampo.tamanhoMax);
                    alert(msg);        
                    objCampo.select();
                    return false;
                }
            }
                
            //verifica se o campo é de data e chama rotina
            //específica de crítica: criticaData(definicaoCampo)
            
            if(definicaoCampo.tipoDoComponente != "label")
            {
                if (definicaoCampo.tipoDeDado=="D") 
                {    
                    if (objCampo.value=="") 
                    {
                        objDataTela = objCampo;
                        objCampo = eval(formPadrao+"."+trocaString(objDataTela.name,"datatela", ""));
                        objCampo.value = "null";
                    } else {
                                objDataTela = objCampo;
                                objCampo = eval(formPadrao+"."+trocaString(objDataTela.name,"datatela", ""));        
                                if (this.objDataTela) 
                                {
                                    if (!criticaData(objDataTela.value)) 
                                    {
                                        mensagem = GENBA0073;
                                        alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
                                        return false;
                                    }
                                } else {
                                            alert( "O campo datatela "+ objCampo.name + " " + GENBA0015 + " \n" + GENBA0049 );
                                            return false;          
                                        }          
                                vr = objDataTela.value;
                                dataParaSQL = vr.substr( 6, 10 ) + '-' + vr.substr( 3, 2 ) + '-' + vr.substr( 0, 2 ); 
                                objCampo.value = dataParaSQL;          
                                return true;
                            }
                }else if (definicaoCampo.tipoDeDado=="DM"){    
                    if (objCampo.value=="") 
                    {
                        objDataTela = objCampo;
                        objCampo = eval(formPadrao+"."+trocaString(objDataTela.name,"datatela", ""));
                        objCampo.value = "null";
                    } else {
                                objDataTela = objCampo;
                                objCampo = eval(formPadrao+"."+trocaString(objDataTela.name,"datatela", ""));
                                if (this.objDataTela) 
                                {
                                    if (!criticaData(objDataTela.value+"/2000")) 
                                    {
                                        mensagem = GENBA0073;
                                        alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
                                        return false;
                                    }
                                } else {
                                            alert("O campo datatela "+ objCampo.name + " " + GENBA0015 + " \n" + GENBA0049 );
                                            return false;          
                                        }        
                                if( ano_DM != "" )
                                    objCampo.value = ano_DM + "-" + objDataTela.value.substr( 3, 2 ) + '-' + objDataTela.value.substr( 0, 2 );
                                else
                                    objCampo.value = objDataTela.value.substr( 3, 2 ) + '-' + objDataTela.value.substr( 0, 2 );
                                return true;
                            }
                }
            }
            //verifica se o campo é de hora e 
            //chama rotina de critica específica: critHora(definicaoCampo)
            if (definicaoCampo.tipoDeDado == "H") 
            {
                if (!critHora(definicaoCampo)) 
                {
                    return false;
                }
                return true;
            }
            //verifica se o campo é de hora e 
            //chama rotina de critica específica: critHora(definicaoCampo)
            if (definicaoCampo.tipoDeDado == "HM") 
            {
                if (!critHora(definicaoCampo)) 
                {
                    return false;
                }
                return true;
            }
            //critica de valor minimo
            if (definicaoCampo.valorMinimo!="0")
            {
                if( preparaValor( objCampo.value ) < preparaValor( definicaoCampo.valorMinimo ) ) 
                {
                    mensagem = GENBA0041;
                    mensagem = trocaString(mensagem,"^%1^", definicaoCampo.label)
                    mensagem = trocaString(mensagem,"^%2^", definicaoCampo.valorMinimo)
                    mensagem = trocaString(mensagem,"^%3^", definicaoCampo.valorMaximo)      
                    alert(mensagem);
                    return false;
                }
            }
            //critica de valor máximo
            if (definicaoCampo.valorMaximo!="0") 
            {
                if( preparaValor( objCampo.value ) > preparaValor( definicaoCampo.valorMaximo ) ) 
                {
                    mensagem = GENBA0069;
                    mensagem = trocaString(mensagem,"^%1^")
                    mensagem = trocaString(mensagem,"^%2^", definicaoCampo.valorMaximo)
                    alert(mensagem);
                    return false;
                }
            }

            while( objCampo.value.indexOf( "\'" ) >= 0 )
                objCampo.value = objCampo.value.replace( "\'", "" );

            if( tipoCampo == "TEXT" )
            {
                while( objCampo.value.indexOf( "\"" ) >= 0 )
                    objCampo.value = objCampo.value.replace( "\"", "" );
            }
                
            return true;
    }// fim da function criticaCampo

/* ---------------------- function criticaNumerico(definicaoCampo) ----------------------*/
//funcao para critica de campos numéricos
function criticaNumerico( definicaoCampo )
{
    if( isNaN( preparaValor( objCampo.value ) ) && objCampo.value != "" )
    {
        mensagem = GENBA0072;
        alert( trocaString( mensagem, "^%1^", definicaoCampo.label ) );
        return false;
    }
    return true;
}// fim da function criticaNumerico

/* ---------------------- function critRadio(definicaoCampo) ----------------------*/
//funcao para critica de campos do tipo RADIO
//definicaoCampo = objeto com a definicao de todos as carcateristicas do campo
//gerado pelo componente que lê XML xmlTelas.java
    function critRadio(definicaoCampo) 
    {
        if (tipoCampo=="RADIO") 
        {
            objCampo = eval(formPadrao+".opcao"+definicaoCampo.nomeHtml);
        }
        ctChecado = false;
        for (iTam=0;iTam<objCampo.length;iTam++) 
        {
            if (objCampo[iTam].checked) 
            {
                ctChecado = true;
                break;
            }
        }
        if (!ctChecado) 
        {
            mensagem = GENBA0070;
            alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
            objCampo[0].focus();
        }
        return ctChecado;
    }// fim da function critRadio

/* ---------------------- function critSelect(definicaoCampo) ----------------------*/
//funcao para critica de caixas de combinação (combo box), tipo Select.
//definicaoCampo = objeto com a definicao de todos as carcateristicas do campo
//gerado pelo componente que lê XML xmlTelas.java
    function critSelect(definicaoCampo) 
    {
        objCampo = eval(formPadrao+"."+definicaoCampo.nomeHtml);
        //verifica se o campo é multiplo select ou select simples
        opcao = objCampo.multiple;
        if (!opcao) 
        {
            if (objCampo.options[objCampo.selectedIndex].value=="") 
            {
                mensagem = GENBA0070;
                alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
                objCampo.focus();
                return false;
            } else if ((objCampo.options[objCampo.selectedIndex].value=="0"&&objCampo.options[objCampo.selectedIndex].text=="-- Selecione um(a)")
                        &&definicaoCampo.idObrigatoriedade=="S") 
                    {
                        mensagem = GENBA0070;
                        alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
                        objCampo.focus();
                        return false;
                    }
                    return true;
        } else {
                    ctSelecionados = 0;
                    for (indSel=0;indSel<objCampo.length;indSel++) 
                    {
                        if (objCampo.options[indSel].selected) 
                        {
                            ctSelecionados++;
                        }
                    }
                    if (ctSelecionados==0 && definicaoCampo.idObrigatoriedade=="S")
                    {
                        mensagem = GENBA0070;
                        alert(trocaString(mensagem,"^%1^", definicaoCampo.label));
                        objCampo.focus();
                        return false;
                    }
                    return true;
                }
    }// fim da function critSelect
    
/* ---------------------- function criticaCodigoHierarquico (padraoCodigoHierarquico,codigo)-*/
//Esta funcao verifica a estrutura de um codigo hierarquico
    function criticaCodigoHierarquico (padraoCodigoHierarquico,codigo) 
    {
        i=0;
        if (criticaTamanhoCodigoHierarquico(padraoCodigoHierarquico,codigo)) 
        {
            valor = codigo+".";
            for (x=0; x<padraoCodigoHierarquico.length; x++) 
            {
                aux = valor.substring(padraoCodigoHierarquico[x],padraoCodigoHierarquico[x]+1);
                for (y=0; y<padraoCodigoHierarquico[x]; y++) 
                {
                    aux1 = valor.charAt(y);
                    if (aux1<'0' || aux1>'9') 
                    {
                        i=0;
                    } else {
                                i=1;
                            }
                }
                if (aux == "." && i!=0) 
                {
                    i=1;
                } else {
                            i=0;
                            break;
                        }
                valor = valor.substring(padraoCodigoHierarquico[x]+1,valor.length);
            }
        }
        if (i==1) 
        {
            return true;
        }
        return true;
    }// fim da function criticaCodigoHierarquico

/* ---------------------- function criticaTamanhoCodigoHierarquico(padraoCodigoHierarquico,valorCodigo)-*/
//Esta funcao faz o calculo do tamnho e critica um codigo hierarquico
    function criticaTamanhoCodigoHierarquico(padraoCodigoHierarquico,valorCodigo) 
    {
        valor = valorCodigo;
        tam = 0;
        for (x=0; x<padraoCodigoHierarquico.length; x++) 
        {
            tam = tam+padraoCodigoHierarquico[x];
        }
        tamValor = valor.length;
        if ((tam)+(padraoCodigoHierarquico.length-1)==tamValor) 
        {
            return true;
        } else {
                    return false;
        }
    }// fim da function criticaTamanhoCodigoHierarquico

/* ---------------------- function critTextoSelecao(definicaoCampo) -----------------------------------*/
//funcao para crítica de campos texto que são selecionados em outra tela.
//definicaoCampo = objeto com a definicao de todos as carcateristicas do campo
//gerado pelo componente que lê XML xmlTelas.java
    function critTextoSelecao(definicaoCampo) 
    {
        objCampo = eval(formPadrao+"."+definicaoCampo.nomeHtml);
        nomeAnt = eval(formPadrao+"."+definicaoCampo.nomeHtml+"Ant");
        //Retirando os espaços do final para igualar condição anterior
        nomeAnt.value = tiraCaracter(nomeAnt.value, ' ','T');
        if (!this.nomeAnt) 
        {      
            mensagem = GENBA0045 + '.' + GENBA0049;
            mensagem = trocaString(mensagem,"^%1^", objCampo.name + "Ant")
            alert (titErro+mensagem);
            return false;
        }
        indiceLink = 0;
        nomeLink = 'consulta' + definicaoCampo.nomeHtml;
        //pega o link do campo de consulta
        indiceLink = achaLink(document, nomeLink);
        if (nomeAnt.value!=objCampo.value && definicaoCampo.idObrigatoriedade == "S")
        {
            mensagem = GENBA0071;  
            msgErroSel = trocaString(mensagem,"^%1^", definicaoCampo.label);
            if (indiceLink>=0) 
            {
                document.links[indiceLink].focus();
            }
            alert(msgErroSel)
            return false;       
        } 
        if (nomeAnt.value == "" && definicaoCampo.idObrigatoriedade == "S")
        {
            mensagem = GENBA0071;
            msgErroSel = trocaString(mensagem,"^%1^", definicaoCampo.label);
            if (indiceLink>=0) 
            {
                document.links[indiceLink].focus();
            }
            alert(msgErroSel)
            return false;
        }
        return true;
    }// fim da function critTextoSelecao

/* ---------------------- function criticaData(dtparam) --------------------------*/
//funcao para critica de datas
//dtparam - campo dadta no format dd/mm/yyyy
    function criticaData(dtparam) 
    {
        dtparam =   tiraCaracter(dtparam, ' ','T')
        var diaparam   = dtparam.substring(0,2);
        var mesparam = dtparam.substring(3,5);
        var anoparam = dtparam.substring(6,10);
        var barra1 = dtparam.substring(2,3);
        var barra2 = dtparam.substring(5,6);
        if ((barra1 != '/')||(barra2!='/')) 
        {
            return false;
        }
        if (isNaN(diaparam)) 
        {
            return false;
        }
        if (isNaN(mesparam)) 
        {
            return false;
        }
        if (mesparam > 12) 
        {
            return false 
        } 
        if (isNaN(anoparam)) 
        {
            return false;
        }
        if (anoparam.length < 4) 
        {
            return false; 
        }
        if ((mesparam == 2)&&(diaparam > 29)) 
        {
            return false; 
        }
        if (diaparam==31) 
        {
            if ((mesparam!=1)&&(mesparam!=3)&&(mesparam!=5)&&(mesparam!=7)&&(mesparam!=8)&&(mesparam!=10)&&(mesparam!=12)) 
            {
                return false; 
            }
        }
        if (diaparam>31) 
        {
            return false; 
        }
        var bis = anoparam % 4
        if (diaparam == 29) 
        {
            if ((mesparam == 2)&&(bis!=0)) 
            {
                return false; 
            } 
        }
        return true; 
    }// fim da function criticaData       

/* ---------------------- function critHora(definicaoCampo) ------------------------------*/
//funcao para critica de horas
//objCampo - campo input do html que contem a hora  
    function critHora(definicaoCampo) 
    {
        if( objCampo.value.length == 0 )
        {
            if( definicaoCampo.idObrigatoriedade == "N" )
            {
                objCampo.value = '00:00:00';
                return true;
            }
            else
            {
                mensagem = GENBA0043;
                 alert( trocaString( mensagem, "^%1^", definicaoCampo.label ) );
                 objCampo.select( );
                 return false;
            }
        }

        if( definicaoCampo.tipoDeDado == "HM" ){
            if( objCampo.value.charAt( 2 ) != ':' || objCampo.value.length != 5 )
			{
				mensagem = GENBA0044;
				mensagem = trocaString( mensagem, "^%1^", definicaoCampo.label );
				mensagem = trocaString( mensagem, "^%2^", "HH:MM");
				alert( mensagem );
				objCampo.select( );
				return false;
			}

			hh = parseFloat( objCampo.value.substring( 0, 2 ) );
			mm = parseFloat( objCampo.value.substring( 3, 5 ) );

			if( isNaN( hh ) || isNaN( mm ) )
			{
				mensagem = GENBA0072;
				alert( trocaString( mensagem, "^%1^", "Horas" ) );
				objCampo.select( );
				return false;
			}

			if( hh < 0 || hh > 23 )
			{
				mensagem = GENHR0001;
				alert( mensagem );
				objCampo.select( );
				return false;
			}

			if( mm < 0 || mm > 59 )
			{
				mensagem = GENHR0001;
				alert( mensagem );
				objCampo.select( );
				return false;
			}

			return true;

		}else{
			if( objCampo.value.charAt( 2 ) != ':' || objCampo.value.charAt( 5 ) != ':' )
			{
				mensagem = GENBA0044;
				mensagem = trocaString( mensagem, "^%1^", definicaoCampo.label );
				mensagem = trocaString( mensagem, "^%2^", "HH:MM:SS");
				alert( mensagem );
				objCampo.select( );
				return false;
			}

			hh = parseFloat( objCampo.value.substring( 0, 2 ) );
			mm = parseFloat( objCampo.value.substring( 3, 5 ) );
			ss = parseFloat( objCampo.value.substring( 6, 8 ) );

			if( isNaN( hh ) || isNaN( mm ) || isNaN( ss ) )
			{
				mensagem = GENBA0072;
				alert( trocaString( mensagem, "^%1^", "Horas" ) );
				objCampo.select( );
				return false;
			}

			if( hh < 0 || hh > 23 )
			{
				mensagem = GENHR0001;
				alert( mensagem );
				objCampo.select( );
				return false;
			}

			if( mm < 0 || mm > 59 )
			{
				mensagem = GENHR0001;
				alert( mensagem );
				objCampo.select( );
				return false;
			}

			if( ss < 0 || ss > 59 )
			{
				mensagem = GENHR0001;
				alert( mensagem );
				objCampo.select( );
				return false;
			}
			return true;
		}
    }

/* ---------------------- function criticaParam(definicaoCampo) ------------------------------*/
//critica os parametro passado no objeto definicaocampo estão corretos
    function criticaParam(definicaoCampo) 
    {
        objCampo = eval(formPadrao+"."+definicaoCampo.nomeHtml);
        titErro = mensagem = GENBA0042;
        if (!this.objCampo) 
        {
            return true;
        }

        if (definicaoCampo.tipoDeDado!="N"&&definicaoCampo.tipoDeDado!="A"&&definicaoCampo.tipoDeDado!="D"&&definicaoCampo.tipoDeDado!="H"&&definicaoCampo.tipoDeDado!="HM"&&definicaoCampo.tipoDeDado!="DM") 
        {
            alert( titErro + GENBA0047 + ", Campo: "+definicaoCampo.nomeHtml+" Tipo de Dado: "+ definicaoCampo.tipoDeDado +"\n\n" + GENBA0049 );
            return false;
        }
        if (  definicaoCampo.tamanhoMin*1!=  definicaoCampo.tamanhoMin) 
        {
            alert ( titErro + GENBA0052 + ", Campo: "+definicaoCampo.nomeHtml+" Tamanho: "+   definicaoCampo.tamanhoMin +"\n\n" + GENBA0049 );
            return false;
        }
        if (definicaoCampo.qteDeCasasDecimais*1!=definicaoCampo.qteDeCasasDecimais) 
        {
            alert (titErro + GENBA0051 + ", Campo: "+definicaoCampo.nomeHtml+" Casas decimais: "+ definicaoCampo.qteDeCasasDecimais +"\n\n" + GENBA0049 );
            return false;
        }
        return true
    }// fim da function criticaParam


/**
 * Função que prepara o valor para efeitos de cálculos, retirando os pontos e vírgulas
 * @version 2.0 14/12/2006
 * @author Alan
 * @return Valor normal sem formatadação caso o tenha.
 * @copia melhorada do preparaValor no scriptGeral.js
 * Alterações: implementacao da opcao para voltar o valor sem o parseFloat que estava arredondando valores muito grandes como por exemplo o valor maximo dos campos numericos ( 999999999999999.99 )
  */
function preparaValor(valor, tipo)
{
   var valorTexto = valor + "";
   var valorTexto2 = valorTexto.indexOf( "," ) > 0? //if
                        trocaString( valorTexto, ".", "" ).replace( "," , "." )
                      : //else
                        valor;
   return tipo==null? //if
            parseFloat( valorTexto2 ) 
            : //else
            valorTexto2;
}

/**
 * Função para substituir um substring dentro de um texto por outro.
 * @version 1.0 01/04/2000
 * @author Alexandre
 * @param textoString String onde haverá a substituicao
 * @param stringDe Substring dentro do texto a ser substituido
 * @param stringPara Substring de suibstituição
 * @return String com substring substituída
 */
function trocaString(textoString, stringDe, stringPara)
{
    retorno = "";
    posInicial = 0;
    if (textoString == null)
    {
        return "";
    }
    if (stringPara == null)
    {
        stringPara = "";
    }
    while ((posInicial = textoString.indexOf(stringDe)) != -1)
    {
        retorno += textoString.substring(0, posInicial) + stringPara;
        textoString    =   textoString.substring(posInicial + stringDe.length);
    }
    retorno += textoString;
    return retorno;
}


/**
 * Cria String com os dados visíveis do formulário para fazer o histórico
 * de manutenção dos registros.
 *
 * @versao 1.0 18.1.2005
 * @autor Diego R. Drumond
 */
function historicoManutencao( definicaoCampo )
{
    
    if( ! document.forms[ 0 ].ctrManutHistorico )
        return;
    
    nome  = definicaoCampo.nomeHtml;
    valor = "";

    objCampo = eval( formPadrao+"." + definicaoCampo.nomeHtml );
    
    if( objCampo == undefined )
        return;
        
    if( definicaoCampo.tipoDoComponente == "password" )
    {
        valor = "*******";
    }

    else if( definicaoCampo.tipoDoComponente == "select" )
    {
        valor = objCampo.options[ objCampo.selectedIndex ].text;
    }
    else if( definicaoCampo.tipoDoComponente == "checkbox" )
    {
        valor = objCampo.checked;
    }
    else if( definicaoCampo.tipoDoComponente == "multiSelect" )
    {
        for( i = 0; i < objCampo.length; i++ )
        {
            if( objCampo.options[ i ].selected )
                valor += objCampo.options[ i ].text + ",";
        }
        
        if( i > 0 )
            valor = valor.substring( 0, valor.length - 1 );
    }
    else
    {
        //label, textarea, radio, textEdit, textCodHie
        valor = objCampo.value;
    }
    
    document.forms[ 0 ].ctrManutHistorico.value += nome + "=" + valor + "^";
}
