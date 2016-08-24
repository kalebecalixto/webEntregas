<html>
<head>
<title></title>

</head>
<%
String nomeRotina            = String.valueOf( request.getSession(  ).getAttribute( "nomeRotina" ) );
String mensagemRotina        = String.valueOf( request.getSession(  ).getAttribute( "mensagemRotina" ) );
String statusRotina          = String.valueOf( request.getSession(  ).getAttribute( "statusRotina" ) );
String mensagemErroRotinaJSP = String.valueOf( request.getSession(  ).getAttribute( "mensagemErroRotinaJSP" ) );

if( nomeRotina.equals( "null" ) )
    nomeRotina = "";

if( mensagemRotina.equals( "null" ) )
    mensagemRotina = "";

if( statusRotina.equals( "null" ) )
    statusRotina = "0";

if( mensagemErroRotinaJSP.equals( "null" ) )
    mensagemErroRotinaJSP = "";

%>
<script>
	parent.mensagemRotina        = "<%= mensagemRotina %>";
    parent.mensagemErroRotinaJSP = "<%= mensagemErroRotinaJSP %>";
    function update( )
    {
        if( "<%= statusRotina %>" == "0" )
            window.setTimeout( "updateStatusSessao()", 1000 );
        else
            parent.executando = false;
    }
    
    function updateStatusSessao(  )
    {
		location.href = location.href;
    }

</script>
<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><div align="center">

      </div></td>
  </tr>
  <tr>
    <td height="20">&nbsp;</td>
  </tr>
  <tr>
    <td><div id="dv_botoesCalculo" align="center"><%= nomeRotina %>
      </div></td>
  </tr>
</table>
</body>
<script>
    update( );
</script>
</html>