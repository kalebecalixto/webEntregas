<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/persona/dadosPessoa.js -->
/**
 * 
 *
 * @version 1.0 14.09.2007
 * @author Bruno César
 * Retorna dados pessoais da pessoa informada onde o cod é = "codPessoa"
 * Alterações: Implementacao do tipo de deficiencia e grau de parentesco e incluir data do servidor
exemplo jsp:
function teste( cod )
{
    pegaDadosPessoa( cod );
}
function afterDadosPessoa(  ) 
{
    alert(descrsexo);
}
*/
var descrSexo = ""; //sexo
var dtnasfundacao = ""; //data Nascimento
var numerocpf = ""; //CPF
var numerorg = ""; //RG
var numpispasep = ""; //Pis/Pasep
var numerotiteleitor = ""; //Título Eleitor
var descrmunicipio = "";//Naturalidade
var descrGrauInstrucaoRais = ""; //Formacao Escolar
var descrTipoTratamento = ""; //tipo de tratamento
var descrtipodeficiencia = ""; //Tipo de deficiência
var descrparentesco ="";//grau parentesco
var seqparentesco = "";// codigo do grau de parentesco
var codtipodeficiencia = "";//codigo de deficiencia
var dtiniciodeficiencia = "";//data do inicio da deficiencia
var dtfimdeficiencia = "";//data do fim da deficiencia
var idfalecencerramento = "";//id falecimento



function pegaDadosPessoa( cod )
{    
    dataServidorFormatada = formataDatas(dataServidor, "MM/DD/YYYY", "YYYY-MM-DD");
      document.frmAjax.sql1.value = " SELECT S.descrsexo, P.dtnasfundacao, CPF.numerocpf, IP.numerorg, "+
                                    " PP.numpispasep, B.numerotiteleitor, M.descrmunicipio, G.descrgrauinstrucaorais, TT.descrTipoTratamento, "+
                                    " TD.descrtipodeficiencia, GP.descrparentesco, GP.seqparentesco, TD.codtipodeficiencia, DP.dtInicio, DP.dtFinal, P.idFalecEncerramento "+
                                    " FROM basPessoas P "+
                                    " INNER JOIN basPessoaFisica PF ON P.codPessoa = PF.codPessoa "+
                                    " INNER JOIN basTipoTratamento TT ON TT.siglaTipoTratamento = PF.siglaTipoTratamento "+
                                    " INNER JOIN basSexo S ON PF.codSexo = S.codSexo "+
                                    " LEFT JOIN basPessoaFisParente PFP ON PFP.codPessoa = PF.codPessoa "+
                                    " LEFT JOIN basGrauParentesco GP ON PfP.seqParentesco = GP.seqParentesco"+
                                    " left JOIN basDeficienciasDaPessoa DP ON DP.codPessoa = P.codPessoa and "+
                                    " ( ('"+dataServidorFormatada+"'>=DP.dtInicio and '"+dataServidorFormatada+"'<=DP.dtFinal ) or DP.dtFinal is null ) "+
                                    " LEFT JOIN basCPF CPF ON CPF.codPessoa = PF.codPessoa "+
                                    " LEFT JOIN basIdentidadesDaPessoa IP ON IP.codPessoa = PF.codPessoa "+
                                    " LEFT JOIN basPisPasep PP ON PP.codPessoa = PF.codPessoa "+
                                    " LEFT JOIN basTituloEleitor B ON B.codPessoa = PF.codPessoa "+
                                    " LEFT JOIN basMunicipio M ON M.codMunicipio = PF.codMunicipio "+
                                    " LEFT JOIN basFormacaoEscolarDaPessoa FE ON P.codPessoa = FE.codPessoa "+
                                    " LEFT JOIN basGrauInstrucao G ON FE.seqGrauInstrucao = G.seqGrauInstrucao "+
                                    " LEFT JOIN basTipoDeficiencia TD ON TD.codTipoDeficiencia = DP.codTipoDeficiencia "+
                                    " and TD.codTipoDeficiencia <> 0 AND TD.codTipoDeficiencia <> 6 "+
                                    " WHERE P.codPessoa = "+cod;

      ajaxRequest( document.frmAjax, dados );
}

function dados(  )
{    
    if( ajax_request.readyState == 4 )
    {
        if( ajax_request.status == 200 )
        {
            descrsexo               = ajax_request.responseXML.getElementsByTagName( "descrsexo" );
            dtnasfundacao           = ajax_request.responseXML.getElementsByTagName( "dtnasfundacao" );
            numerocpf               = ajax_request.responseXML.getElementsByTagName( "numerocpf" );
            numerorg                = ajax_request.responseXML.getElementsByTagName( "numerorg" );
            numpispasep             = ajax_request.responseXML.getElementsByTagName( "numpispasep" );
            numerotiteleitor        = ajax_request.responseXML.getElementsByTagName( "numerotiteleitor" );
            descrmunicipio          = ajax_request.responseXML.getElementsByTagName( "descrmunicipio" );        
            descrGrauInstrucaoRais  = ajax_request.responseXML.getElementsByTagName( "descrgrauinstrucaorais" );        
            descrTipoTratamento     = ajax_request.responseXML.getElementsByTagName( "descrtipotratamento" );            
            descrtipodeficiencia    = ajax_request.responseXML.getElementsByTagName( "descrtipodeficiencia" );            
            descrparentesco         = ajax_request.responseXML.getElementsByTagName( "descrparentesco" );            
            seqparentesco           = ajax_request.responseXML.getElementsByTagName( "seqparentesco" );
            codtipodeficiencia      = ajax_request.responseXML.getElementsByTagName( "codtipodeficiencia" );
            dtiniciodeficiencia     = ajax_request.responseXML.getElementsByTagName( "dtinicio" );
            dtfimdeficiencia        = ajax_request.responseXML.getElementsByTagName( "dtfinal" );
            idfalecencerramento     = ajax_request.responseXML.getElementsByTagName( "idfalecencerramento" );

            if( descrsexo.length > 0 )              descrsexo              = (descrsexo[0].childNodes[0].nodeValue).replace("null","0");
            if( dtnasfundacao.length > 0 )          dtnasfundacao          = (dtnasfundacao[0].childNodes[0].nodeValue).replace("null","");
            if( numerocpf.length > 0 )              numerocpf              = (numerocpf[0].childNodes[0].nodeValue).replace("null","");
            if( numerorg.length > 0 )               numerorg               = (numerorg[0].childNodes[0].nodeValue).replace("null","");
            if( numpispasep.length > 0 )            numpispasep            = (numpispasep[0].childNodes[0].nodeValue).replace("null","");
            if( numerotiteleitor.length > 0 )       numerotiteleitor       = (numerotiteleitor[0].childNodes[0].nodeValue).replace("null","");
            if( descrmunicipio.length > 0 )         descrmunicipio         = (descrmunicipio[0].childNodes[0].nodeValue).replace("null","");
            if( descrGrauInstrucaoRais.length > 0 ) descrGrauInstrucaoRais = (descrGrauInstrucaoRais[0].childNodes[0].nodeValue).replace("null","");
            if( descrTipoTratamento.length > 0 )    descrTipoTratamento    = (descrTipoTratamento[0].childNodes[0].nodeValue).replace("null","");
            if( descrtipodeficiencia.length > 0 )   descrtipodeficiencia   = (descrtipodeficiencia[0].childNodes[0].nodeValue).replace("null","");            
            if( descrparentesco.length > 0 )        descrparentesco        = (descrparentesco[0].childNodes[0].nodeValue).replace("null","");
            if( seqparentesco.length > 0 )          seqparentesco          = (seqparentesco[0].childNodes[0].nodeValue).replace("null","5");
            if( codtipodeficiencia.length > 0 )     codtipodeficiencia     = (codtipodeficiencia[0].childNodes[0].nodeValue).replace("null","0");
            if( dtiniciodeficiencia.length > 0 )    dtiniciodeficiencia    = (dtiniciodeficiencia[0].childNodes[0].nodeValue).replace("null","");
            if( dtfimdeficiencia.length > 0 )       dtfimdeficiencia       = (dtfimdeficiencia[0].childNodes[0].nodeValue).replace("null","");
            if( idfalecencerramento.length > 0 )    idfalecencerramento    = (idfalecencerramento[0].childNodes[0].nodeValue).replace("null","");                        

            afterDadosPessoa(  );
        }	
    }    
}	
function afterDadosPessoa(  ) 
{
}
