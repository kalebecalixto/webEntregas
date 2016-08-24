<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/parcelas.js -->

/**
 * Função que monta campos de parcelas dentro de uma <div>
 *  . Função já retirado os Sábados/Domingos e Feriados.
 * @version 30/06/2006
 * @author Elimir / Marcos F
 * @ultima revisão 14/11/2006 - Retirado sab/Dom/feriados
 * @param auxParcelas => Quantidade de Parcelas a serem geradas
 * @param auxTitulo   => Título do cabecalho
 *
 *************************** OBRIGATÓRIO ************************** 
  - obrigatório colocar estas rotinasJS, estanciar a classe e criar o <form name="frmAjax"...> conforme abaixo:
 
  <jsp:useBean id="calendario"  scope="page" class="adi.sistemas.basico.calendarioGeral" /><%calendario.setContext(application);calendario.setSessao(session);%>
  
  <% calendario.feriadosNoIntervalo(Integer.parseInt(seqExercicio), 9999,out); %>
  
  <script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/somaDias.js"></script> 
  <script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/proximoDiaUtil.js"></script>
  <script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/ajax.js"></script>
  <script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/multiple.js"></script> 
 
  <form name="frmAjax" action="<%=application.getInitParameter("ajaxRequest_srvPath")%>" method="post">
  <input type="hidden" name="sql1" value="">
  </form>  
  
 ******************************************************************
 * Exemplo de como chamar a funcao
 *
 *  <table width="95%" border="0">
 *      <tr>
 *          <td>
 *              <div id="dv_parcelas" width="100%">
 *              </div>
 *          </td>
 *      </tr>
 *  </table>
 *
 *  imprimeParcelas( document.forms[0].cboQteParcelas.value, 'Vencimento da(s) Parcela(s)', 'div_parcelas' );
**/


function imprimeParcelas( auxParcelas, auxTitulo, auxDiv )
{

    vencParcelas = "";
    auxTitulo    = ( auxTitulo == undefined ? "Vencimento da(s) Parcela(s)" : auxTitulo );

    if( auxParcelas != "0" ) {
        vencParcelas += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>";
        vencParcelas += "       <td align='center' bgcolor='#e6e6e6'><font size='2'>"+auxTitulo+"</font></td>";
        vencParcelas += "</tr></table>";

                if( auxParcelas != "1" ) {
                    vencParcelas += "<center><table cellpadding='0' cellspacing='2' border='0' width='98%'><tr>";
                    vencParcelas += "       <td align='right' bgcolor='#f2f2f2' width='30%'><select name='cboIntervalo'><option value='0'>Intervalo de<option value='1'>Somente dia</select></td>";
                    vencParcelas += "       <td bgcolor='#f2f2f2' width='10%' align='left' >&nbsp;<input type='text' maxlength='3' size='4' name='txtQtePosterior' onkeypress='somenteNumeros(event)' value='1'></input></font></td>";
                    vencParcelas += "       <td bgcolor='#f2f2f2' width='20%'><input onClick='preencheDataPosterior("+auxParcelas+")' type='button' name='Atualizar' class='botoes' value='Atualizar' accesskey='i' size='10'></input></font></td>";
                    vencParcelas += "</tr></table>";                    
                 }
    }

    vencParcelas += "<center><table cellpadding='0' cellspacing='2' border='0' width='99%'><tr>";

    for( x = 1; x <= auxParcelas; x+=2 )
    {
        vencParcelas += "<tr>"+
                        "   <td width='5%'>&nbsp;</td>"+
                        "   <td bgcolor='#f2f2f2' width='25%'><font size='2'>"+(x==1&&auxParcelas>1?"<b>":"")+acreEspaco(x,3)+"ª Parcela:&nbsp;</b></font></td>"+
                        "   <td bgcolor='#f2f2f2' width='27%'><input onkeypress='editaData(this,event)' onchange='document.forms[0].semana"+(x)+".value=\"(\"+diaSemana(this.value, \"A\")+\")\"' class='texto' type=text name='datatelatxtDtVencimento"+ x +"' onkeydown=enter(event) "+(x==1&&auxParcelas>1?"style='background-color:#CEFFFF' title='Utilize esta Parcela para definir um intervalo de datas entre as demais Parcelas'"+"'":"title='Data de Vencimento da "+x+"ª Parcela'")+" size='12'></td>"+
                        "   <td width='5%'><input type='text' size='5' style='border:0px solid black' readonly name='semana"+ (x) +"' value=''></td>";

        if( x + 1 <= auxParcelas )
        {
            vencParcelas += "   <td width='5%'>&nbsp;</td>"+
                            "   <td bgcolor='#f2f2f2' width='25%'><font size='2'>"+acreEspaco((x+1),3)+"ª Parcela:&nbsp;</font></td>"+
                            "   <td bgcolor='#f2f2f2' width='27%'><input onkeypress='editaData(this,event)' onchange='document.forms[0].semana"+(x+1)+".value=\"(\"+diaSemana(this.value, \"A\")+\")\"' class='texto' type=text name='datatelatxtDtVencimento"+ (x+1) +"' title='Data de Vencimento da "+(x+1)+"ª Parcela' onkeydown='enter(event)' size='12' value=''></td>"+
                            "   <td width='5%'><input type='text' size='5' style='border:0px solid black' readonly name='semana"+ (x+1) +"' value=''></td>";
        }
        else
        {
            vencParcelas += "   <td width='5%'>&nbsp;</td>"+
                            "   <td width='25%'>&nbsp</td>"+
                            "   <td width='27%'>&nbsp</td>"+
                            "   <td width='5%'>&nbsp;</td>";
        }

        vencParcelas += "</tr>";
    }

    vencParcelas += "</tr></table>";

    obj = document.getElementById( auxDiv );
    if( obj )
        obj.innerHTML = vencParcelas;
        
}

var ferIado = false;

function preencheDataPosterior( auxParcelas ) {

    if( document.forms[0].datatelatxtDtVencimento1.value == "" ) {
        document.forms[0].datatelatxtDtVencimento1.value=data();
        document.forms[0].semana1.value="("+diaSemana( data(), "A")+")";
        preencheDataPosterior( auxParcelas );
    }

    var pData = document.forms[0].datatelatxtDtVencimento1.value;
    var y = ( document.forms[0].txtQtePosterior.value * 1 );
    var z = ( document.forms[0].txtQtePosterior.value * 1 );
    document.forms[0].datatelatxtDtVencimento1.value = pData;

    if( document.forms[0].cboIntervalo.value == 1 ) 
    {
        dData = document.forms[0].txtQtePosterior.value;
        vData = dData;
        mData = pData.substring(3,5);
        aData = pData.substring(6,10);
        b = ( mData * 1 ) + 1;

        if( document.forms[0].txtQtePosterior.value > 31 ) {
            alert( "Dia inválido!" );
            document.forms[0].datatelatxtDtVencimento1.focus();
            return;
        }

        for( x = 2; x <= auxParcelas; x++ )
        {   
                if( (dData*1) > 29 ) 
                {
                   if( b == 4 || b == 6 || b == 9 || b == 11 ) {
                       dData = 30;
                   }
                   if( b == 2 ) 
                   {
                      if( ( (aData*1) % 4 ) == 0 ) {
                          dData = 29;
                      } else {
                          dData = 28;
                      }
                   }
                }
                if( (dData*1) == 29 ) {
                   if( b == 2 && ((aData*1)%4) != 0 ) { 
                      dData = 28;
                   }
                }

                qteData = acreZero(dData,2) + "/" + acreZero(b,2) + "/" + aData;
                
                feriadoP = verFeriado(qteData);
                qteData = proximoDiaUtil(qteData);               
                
                semana  = diaSemana( qteData, "A");
                
                eval( "document.forms[0].datatelatxtDtVencimento" + x + ".value = '" + qteData + "';" );
                eval( "document.forms[0].semana" + x + ".value = '(" + semana + ")';" );
                y+=z;b++;
                if( (b*1)>12 ){ b=1; aData=(aData*1)+1; }
                dData = vData;
        }
    }
    else 
    {
        qteData = pData;
        for( x = 2; x <= auxParcelas; x++ )
        {   
            qteData = somaDias(qteData, z, "dd/mm/yyyy", "dd/mm/yyyy");
            qteData = proximoDiaUtil(qteData);
            
            semana  = diaSemana( qteData, "A" );
            
            eval( "document.forms[0].datatelatxtDtVencimento" + x + ".value = '" + qteData + "';" );
            eval( "document.forms[0].semana" + x + ".value = '(" + semana + ")';" );
            y+=z; 
        }
    }
    
}
function diaSemana(dtParam, formaToSaida)
{
    auxData = dtParam;
    diaDaSemana = ( new Date( formataDatas( auxData, "DD/MM/YYYY", "MM/DD/YYYY" ) ) ).getDay();    
    objetoData = diaDaSemana;

    if(diaDaSemana=="0") objetoData = "Dom";
    else if(diaDaSemana=="1") objetoData = "Seg";
    else if(diaDaSemana=="2") objetoData = "Ter";
    else if(diaDaSemana=="3") objetoData = "Qua";
    else if(diaDaSemana=="4") objetoData = "Qui";
    else if(diaDaSemana=="5") objetoData = "Sex"
    else objetoData = "Sab";
    
    return objetoData;
}












/**
 * Função que imprime as parcelas de um parcelamento da agenda de vencimentos
 * @version 30/06/2006
 * @author Elimir
 * @param codSistema    => Sistema que chama a Agenda de vencimentos
 * @param seqExericio   => Exercício da Agenda escolhida
 * @param seqAgenda     => sequencial da agenda escolhida ou (não obrigatório) sistema pega o parcelamento idAtivo = 1
 * @param divParc       => nome da <div> que será impressa as parcelas
 * @Obrigatório.: É nescessário estanciar o multiple e Ajax, criar o form do Ajax com componente sql1 no jsp que o chama
 *
 * @Exemplo de como usar a função.:
 * imprimeParcelamento( 12, document.forms[0].cboSeqExercicio.value, document.forms[0].cboSeqAgendaVencimento.value );
**/

var divParcelamento = "";
function imprimeParcelamento( codSistema, seqExercicio, seqAgenda, divParc )
{

    divParcelamento = divParc;

    if( codSistema == undefined || seqExercicio == undefined ) {
        alert("Envie o codSistema, seqExercicio na Função");
        return;
    }

    document.frmAjax.sql1.value = ""+
                " SELECT PAR.numparcela, PAR.percdototal, PAR.referenciaparcela, VEN.dtvencimento, AGV.descragendavencimentos "+
                " from basAgendaDeVencimentos AGV "+
                " left join basParcelamentosDaAgenda PAM on PAM.seqExercicio = AGV.seqExercicio and PAM.seqAgendaVencimentos = AGV.seqAgendaVencimentos and PAM.codSistema = AGV.codSistema and PAM.idAtivo = 1 "+
                " inner join basParcelasDoParcelamento PAR on PAR.seqAgendaVencimentos = PAM.seqAgendaVencimentos and PAR.numParcelamento = PAM.numParcelamento and PAR.seqExercicio = PAM.seqExercicio and PAR.codSistema = PAM.codSistema and PAR.idAtivo = 1 "+
                " left join basVencimentosDasParcelas VEN on VEN.seqAgendaVencimentos = PAR.seqAgendaVencimentos and VEN.numParcelamento = PAR.numParcelamento and VEN.seqParcela = PAR.seqParcela and VEN.seqExercicio = PAR.seqExercicio and VEN.codSistema = PAR.codSistema and VEN.idAtivo = 1 "+
                " where AGV.codSistema = "+codSistema+" and AGV.seqExercicio = "+seqExercicio+" and AGV.idAtivo = 1 "+
                        ( seqAgenda == undefined ? "" : " and AGV.seqAgendaVencimentos = "+seqAgenda )+
                " order by PAR.numParcela ";

    ajaxRequest( document.frmAjax, retornaSQLParcelas );
}

function retornaSQLParcelas( )
{
    if( ajax_request.readyState == 4 )
    {
        if( ajax_request.status == 200 )
        {

            //alert(ajax_request.responseText);

            var component   = 0;
            var saidaParc   = "";

            var numparcela          = ajax_request.responseXML.getElementsByTagName( "numparcela" );
            var percdototal         = ajax_request.responseXML.getElementsByTagName( "percdototal" );
            var referenciaparcela   = ajax_request.responseXML.getElementsByTagName( "referenciaparcela" );
            var dtvencimento        = ajax_request.responseXML.getElementsByTagName( "dtvencimento" );

            saidaParc += "<table cellpadding='0' cellspacing='2' border='0' width='100%'><tr>";
            saidaParc += "      <td align='center' bgcolor='#e6e6e6'><font size='2'>Parcelas da Agenda</font></td>";
            saidaParc += "</tr></table>";

            saidaParc += "<center><table cellpadding='0' cellspacing='1' border='0' width='98%'><tr>";
            saidaParc += "<td bgcolor='#e6e6e6' width='15%' align='center'><font size='2'>Parcela</font></td>";
            saidaParc += "<td bgcolor='#e6e6e6' width='25%' align='center'><font size='2'>Percentagem</font></td>";
            saidaParc += "<td bgcolor='#e6e6e6' width='18%' align='center'><font size='2'>Referência</font></td>";
            saidaParc += "<td bgcolor='#e6e6e6' width='40%' align='center'><font size='2'>Data de Vencimento</font></td>";

            for(var i = 0; i < numparcela.length; i++)
            {
                saidaParc += "<tr> ";
                saidaParc += "  <td bgcolor='#f2f2f2' align='center'><font size='2'>"+acreZero(numparcela[i].childNodes[0].nodeValue,2)+"</font></td>";
                saidaParc += "  <td bgcolor='#f2f2f2' align='center'><font size='2'>"+editaValor(percdototal[i].childNodes[0].nodeValue,6)+"</font></td>";
                saidaParc += "  <td bgcolor='#f2f2f2' align='center'><font size='2'>"+referenciaparcela[i].childNodes[0].nodeValue+"</font></td>";
                saidaParc += "  <td bgcolor='#f2f2f2' align='center'><font size='2'>"+formataDatas(dtvencimento[i].childNodes[0].nodeValue,"TIMESTAMP","DD/MM/YYYY")+"</font></td>";
                saidaParc += "</tr>";

                component++;
            }

            if( component == 0 ) {
                saidaParc += "</tr></table>"+
                             "<tr><table cellpadding='0' cellspacing='2' border='0' width='100%'><tr>"+
                                "<td align='center'><font size='2'><i>Nenhuma <b>Parcela</b> cadastrada!</i></td></tr>";
            }

            saidaParc += "</tr></table>";

            obj = document.getElementById( divParcelamento );
            if( obj )
                obj.innerHTML = saidaParc;
        }
    }
}
