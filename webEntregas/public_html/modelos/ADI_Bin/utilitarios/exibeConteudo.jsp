<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/exibeConteudo.jsp -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<%
String limite = String.valueOf( request.getParameter("limite") );
%>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
        <title>Conteúdo do campo</title>
        <style>
            input.botoes
            {
                font-family: Arial;
                border-right: black 1px solid; 
                border-top: gray 1px solid; 
                border-left: gray 1px solid;
                border-bottom: black 1px solid;
                font-weight: bold; 
                font-size: 9pt; 
                color: #000000;   
                background-color: #efefef;
                font-weight: bold;
            }
        </style>
        <script>

        var limiteMax = 0;

        function update( )
        {
            if( opener )
            {
                document.getElementById( "content" ).value = opener._contentField.value;
                limiteMax = opener.limiteMax;
            }

            verificaTamanho();
            document.getElementById( "content" ).focus();
        }
        
        function send( )
        {
            verificaTamanho(false);
            
            if( opener && opener._contentField && opener._contentField.readOnly == false)
                opener._contentField.value = document.getElementById( "content" ).value;
                
            self.close( );
        }
        function verificaTamanho( alerta )
        {
            if(limiteMax == undefined)
            {
                limiteMax = 1000;
            }

            document.forms[0].limite.value = limiteMax;
            document.forms[0].atual.value = document.getElementById( "content" ).value.length;
            document.forms[0].restante.value = (limiteMax - document.getElementById( "content" ).value.length);

            if(document.forms[0].restante.value < 0)
            {
                document.getElementById( "content" ).value = document.getElementById( "content" ).value.substring(0,limiteMax)
                document.forms[0].restante.value = "0";
                document.forms[0].atual.value = limiteMax;
                if(alerta)
                    alert("Foi atingido o limite máximo de caracteres.")
                verificaTamanho(false);
            }
        }
        </script>
    </head>
    <body onload="update()">
        <form name="exibe">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" height="90%">
        <tr>
            <td height="95%">
                <textarea id="content" onkeyup="javascript:verificaTamanho(true)" onkeydown="javascript:verificaTamanho(true)" style="border: 0px solid black; width: 100%; height: 100%"></textarea>
            </td>
        </tr>
        </table>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" height="10%">
        <tr>
            <td valign="bottom" align="left"><b>Caracteres:</b></td>
            <td valign="bottom" align="left">Limite: <input type="text" name="limite" value="0" style="border: 0px" size="4"></input></td>
            <td valign="bottom" align="left">Atual: <input type="text" name="atual" value="0" style="border: 0px" size="4"></td>
            <td valign="bottom" align="left">Restante: <input type="text" name="restante" value="0" style="border: 0px" size="4"></td>
            <td valign="bottom" align="right" width="40%"><input type="button" value="    Enviar    " onclick="send()" class="botoes" /></td>
        </tr>
        </table>
        </form>
    </body>
</html>