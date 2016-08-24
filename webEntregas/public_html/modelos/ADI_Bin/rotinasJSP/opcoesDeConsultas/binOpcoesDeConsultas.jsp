<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/opcoesDeConsultas/binOpcoesDeConsultas.jsp */ %>
<% /* ADI_MaxNetADI/ADI_Bin/rotinasJSP/opcoesDeConsultas */ %>
<%/*
ADI Informatica
Descricao:  Opções Solicitadas em Várias Consultas e Relatórios Do Sistema
Autor: Leo	
Data criação: 24/04/2003
Data ultima alteração:
Alteração Efetuada:
OBS: Usar /basico/bin/telas/OPCR0001.XML para implementar novos pedidos para consultas. 
EX: String codTela           = "OPCR0001";	
    xmlTelas.codTela         = codTela;
xmlTelas.versao = "01.000";
    xmlTelas.nomeTela        = "Agenda de Obrigações - Consulta Externa";
    xmlTelas.nomeArquivo     = "agoConsultaExterna.jsp";
    xmlTelas.siglaSistema    = "bas";
    xmlTelas.nomeRealSistema = "basico";
*/%>
<jsp:useBean id="xmlOptConsulta" scope="page" class="adi.componentes.xml.telas" />
<jsp:useBean id="data"      scope="page" class="adi.componentes.data.datas" />
<% 
xmlOptConsulta.setContext(application); 
xmlOptConsulta.setSessao(session);
String optTela = "OPCR0001";
xmlOptConsulta.codTela      = optTela;
xmlOptConsulta.nomeTela     = "Opções de Consulta";
xmlOptConsulta.nomeArquivo  = "binOpcoesDeConsultas.jsp";
xmlOptConsulta.siglaSistema = "bas";
xmlOptConsulta.versao	    = "01.000";
xmlOptConsulta.nomeRealSistema = "basico";
xmlOptConsulta.layoutDefault = false;
xmlOptConsulta.geraLabel = false;
xmlOptConsulta.defineMascara("4",18);
xmlOptConsulta.defineMascara("2",19);
xmlOptConsulta.defineMascara("1",20);
String[] msg = new String[3];
msg[0]="GENDT0007";
msg[1]="GENDT0008";
msg[2]="GENDT0003";
xmlOptConsulta.buscaMensagemWeb(msg,out);
%>
<script src="<%=application.getInitParameter("rotinasJSPath")%>/validaDatas.js"></script>
<script src="<%=application.getInitParameter("rotinasJSPath")%>/comparaData.js"></script>
<script>
function auxiliar1(){
	return 0;
}
function enviaDtInicialFinal(endereco)
{ dt=true;
	if(document.forms[0].datatelatxtDtInicial.value!="")
		{if(!validaDatas(document.forms[0].datatelatxtDtInicial.value))
			dt=false;
	}else if (document.forms[0].datatelatxtDtFinal.value=="")
					document.forms[0].datatelatxtDtInicial.value="<%=data.dataSistema()%>";				
	if(document.forms[0].datatelatxtDtFinal.value!="")
		if(!validaDatas(document.forms[0].datatelatxtDtFinal.value))
			dt=false;
	if (dt){
		if(!document.consultaExterna.datatelatxtDtFinal.value=="" && !document.forms[0].datatelatxtDtInicial.value==""){
			if (comparaData(document.forms[0].datatelatxtDtInicial.value, document.forms[0].datatelatxtDtFinal.value) != 1)
				{	
					parent.location.href=endereco+"dtInicial="+document.forms[0].datatelatxtDtInicial.value+"&dtFinal="+document.forms[0].datatelatxtDtFinal.value;
				}else{        
					msg = trocaString ("<%=adi.componentes.telas.Mensagem.GENBA0061%>","^%1^","Data Final")
					alert(trocaString(msg,"^%2^","Data de Inicio"));
					document.forms[0].datatelatxtDtFinal.focus();  
				}
			}else	parent.location.href=endereco+"dtInicial="+document.forms[0].datatelatxtDtInicial.value+"&dtFinal="+document.forms[0].datatelatxtDtFinal.value;
		}
}
</script>
<%!
String informaDataInicialFinal(adi.componentes.xml.telas xmlTelas) throws java.io.IOException
{return "<td align='left'><b>"+xmlTelas.impLabel(0)+"</b></td>"+
		"<td>"+xmlTelas.impComp(0)+"</td>"+
		"</tr><tr>"+
		"</td><td>"+
		"<td align='left'><b>"+xmlTelas.impLabel(1)+"</b></td>"+
		"<td>"+xmlTelas.impComp(1)+"</td>"+
		"</tr>";
}

String informaEstruturaOrganizacional(adi.componentes.xml.telas xmlTelas) throws java.io.IOException
{return "</td><td>"+
		"<td align='left'><b>"+xmlTelas.impLabel(18)+"</b></td>"+
		"<td>"+xmlTelas.impComp(18)+"</td>";	
}

String informaPeriodoInicialFinal(adi.componentes.xml.telas xmlTelas) throws java.io.IOException
{return "<td align='left'><b>"+xmlTelas.impLabel(19)+"</b></td>"+
		"<td>"+xmlTelas.impComp(19)+"</td>"+
		"</tr><tr>"+
		"</td><td>"+
		"<td align='left'><b>"+xmlTelas.impLabel(20)+"</b></td>"+
		"<td>"+xmlTelas.impComp(20)+"</td>"+
		"</tr>";
}

%>

