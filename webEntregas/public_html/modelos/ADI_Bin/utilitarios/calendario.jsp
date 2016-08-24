<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/calendario.jsp */ %>
<html>
	<head>
		<script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/calendario.js"></script>
		<script>
			//variaveis do scriptGeral.js
			imagensGenericasPath = "";
			BinPath              = "";
			AjudaPath            = "";
			notasPessoaisPath    = "";
			function Timer(){}
		</script>
		<script language="JavaScript" src="<%= application.getInitParameter( "rotinasJSPath" )%>/scriptGeral.js"></script>
		<script>
			<%
			String componente = String.valueOf( request.getParameter( "componente" ) );
			%>
			dtSistema   = "<%= ( new adi.componentes.data.datas().dataSistema("YYYY/MM/DD" ) ) %>";
			<%
				if( componente.equals( "null" ) )
				{
					%>
					/*
					 * Função que envia a data para o campo do formulário.
					 */
					function enviaData( dia )
					{
						return;
					}
					<%
				}
				else
				{
					%>
					objDataTela = eval( "self.opener.document.forms[0].datatela<%=componente%>" );
					objData     = eval( "self.opener.document.forms[0].<%=componente%>" );
					/*
					 * Função que envia a data para o campo do formulário.
					 */
					function enviaData( dia )
					{
						dia = ( ( dia*1 + 100 ) + "" ).substring( 1, 3 );
						mes = ( ( document.forms[0].tbSelMonth.value*1 + 100  ) + "" ).substring( 1, 3 );
						ano = ( ( document.forms[0].tbSelYear.value*1 + 10000 ) + "" ).substring( 1, 5 );
						objDataTela.value = dia+"/"+mes+"/"+ano;
						objData.value     = ano+"-"+mes+"-"+dia;
						if( objDataTela.onchange )
                                                    objDataTela.onchange( );
						self.close( );
					}
					if( objDataTela.value != "" )
						dtSistema = ( formataDatas( objDataTela.value, "DD/MM/YYYY", "YYYY/MM/DD" ) );
					<%
				}
				%>
		</script>
		<style>
		 select.mes { background: white; font-size:12px; width:162px }
		 select.ano { background: white; font-size:12px; width:91px }
		 .dias { cursor: hand; background-image: url("<%=application.getInitParameter("imagensGenericasPath")%>/utilitarios/calendario/bgdia.jpg"); width: 28px; height: 28px; border: 1px solid #999999 }
		 .mes { background-image: url("<%=application.getInitParameter("imagensGenericasPath")%>/utilitarios/calendario/bgsem.jpg"); width: 28px; height: 16px; border: 1px solid #666666 }
		</style>
		<title>ADI - Calendário</title>
	</head>
	<body topmargin=0 leftmargin=0>
	<form name="frmCalendarSample" method="post" action="">
		<input type="hidden" name="calSelectedDate" value="">
		<table border="0">
			<tr>
				<td>
					<center>
						<select name="tbSelMonth" onchange='fUpdateCal(frmCalendarSample.tbSelYear.value, frmCalendarSample.tbSelMonth.value)' class="mes">
							<option value="1">Janeiro</option>
							<option value="2">Fevereiro</option>
							<option value="3">Março</option>
							<option value="4">Abril</option>
							<option value="5">Maio</option>
							<option value="6">Junho</option>
							<option value="7">Julho</option>
							<option value="8">Agosto</option>
							<option value="9">Setembro</option>
							<option value="10">Outubro</option>
							<option value="11">Novembro</option>
							<option value="12">Dezembro</option>
						</select>
						<script language="JavaScript">
						  var ano=1980;
						  document.write("<select name='tbSelYear' onchange='fUpdateCal(frmCalendarSample.tbSelYear.value, frmCalendarSample.tbSelMonth.value)' class='ano'>");
						  while(ano<=2099){
						     document.write("<option value="+ano+">"+ano+"</option>");
						     ano++;
						  }
						  document.write("</select>");
						</script>  
					</center>
					<script language="JavaScript">
						var dCurDate = new Date(dtSistema);
						frmCalendarSample.tbSelMonth.options[dCurDate.getMonth()].selected = true;
						for (i = 0; i < frmCalendarSample.tbSelYear.length; i++)
						{
							if (frmCalendarSample.tbSelYear.options[i].value == dCurDate.getFullYear())
								frmCalendarSample.tbSelYear.options[i].selected = true;
						}
					</script>
				</td>
			</tr>
			<tr>
				<td>
				<script language="JavaScript">
				  var dCurDate = new Date(dtSistema);
				  fDrawCal(dCurDate.getFullYear(), dCurDate.getMonth()+1, 30, 30, "12px", "", 1);
				</script>
				</td>
			</tr>
		</table>
</form>
</body>
</html>
