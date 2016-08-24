<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/iptu/calculos/iptCalculoPorUnidade.jsp */ %>
<%/*
     ADI Informática
    Descricao: Agendar Calculo
    Autor: Marcos F. S.
    Data Criação: 22/08/2006
    Data ultima alteração: -
    Alteração Efetuada: -
*/%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas"/><% xmlTelas.setContext(application); xmlTelas.setSessao(session); %>
<%
    xmlTelas.nomeTela     = "Agendar Calculo";
    xmlTelas.geraCabecalhoOculto( out, request, response );
%>
<script>
    function enviaAgenda()
    {
        var tempoTotal = 0;
        var dataAtual  = new Date();
        var horaAtual = "";
        
        if( validaDatas( document.frmAgenda.data.value ) )
        {
            if( trim( document.frmAgenda.hora.value ) != '' )
                horaAtual = document.frmAgenda.hora.value;
                
             var dt2 = formataDatas( document.frmAgenda.data.value, 'DD/MM/YYYY', 'MM/DD/YYYY' );         
             var dataTotal = new Date( dt2 +" " +horaAtual )

             /*
             alert( dataAtual )
             alert( dataTotal )
            alert( dataTotal.getTime() - dataAtual.getTime() );
            */
            
            tempoTotal = dataTotal.getTime(  ) - dataAtual.getTime(  );

            opener.window.tempoAgenda = tempoTotal;
            opener.window.acionaAgenda();
            window.close();
        }
    }
    
        function teste()
        {
            alert( "alan eh gay" )
        }
</script>
<form name="frmAgenda" action="" method="post">
<table width="500" height="200" border="0">
  <tr>
    <td align="center" valign="middle"> 
      <table width="100%" border="0">
        <tr> 
          <td colspan="4">&nbsp;</td>
        </tr>
        <tr> 
          <td width="60">Data:</td>
          <td>
                <input onkeypress='editaData(this,event)'   class='texto' type=text name='data' value= '' title='Informar adata apartir da qual o log vai ser limpo - [ Formato: 99/99/9999 | Obrig.: N ]' onkeydown=enter(event) size='12'>
                <input type='button' style='background-image: url(/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/botoes/btnCalendario.gif); background-repeat: no-repeat; background-position: center bottom; background-color: #FFFFFF; border: 0px solid black; width: 18px; height: 18px; cursor: hand' onClick="javascript:selecionaDataCalendario('txtDtNasFundacao')">
          </td>
          <td width="60">Hora:</td>
          <td>
                <input onkeypress='formataHora(this,event)'   class='texto' type=text name='hora' value= '' title='Informar adata apartir da qual o log vai ser limpo - [ Formato: 99:99:99 | Obrig.: N ]' onkeydown=enter(event) size='12'>                
          </td>
        </tr>
        <tr> 
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr align="center" valign="middle"> 
          <td colspan="4"> 
            <input type="button" name="Submit" value="Enviar" onclick="javascript:enviaAgenda()">
          </td>
        </tr>
      </table></td>
  </tr>
</table>
</form>
<%=xmlTelas.fechaHtml()%>