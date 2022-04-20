function formataCampo(campo, Mascara, evento){ 
      var boleanoMascara; 

      var Digitato = evento.keyCode;
      let exp = /\D/g
      let campoSoNumeros = campo.value.toString().replace( exp, "" )
      var posicaoCampo = 0;    
      var NovoValorCampo="";
      var TamanhoMascara = Mascara.toString().replace( exp, "" ).length 
      if (Digitato != 8) { // backspace 
              for(let i=0; i< TamanhoMascara; i++) { 
                      boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                              || (Mascara.charAt(i) == "/")) 
                      boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                              || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                      if (boleanoMascara) { 
                              NovoValorCampo += Mascara.charAt(i); 
                                TamanhoMascara++;
                      }else { 
                              NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                              posicaoCampo++; 
                        }              
                }      
              campo.value = NovoValorCampo;
                return true; 
      }else { 
              return true; 
      }
}
function validatePressInteger(){
    if (event.keyCode < 48 || event.keyCode > 57){
            event.returnValue = false;
            return false;
    }
    return true;
}
function mascaraCep(cep){  
    if(validatePressInteger(cep)==false){
        event.returnValue = false;
    }       
    return formataCampo(cep, '00000-000', event);
}

function decodeHtml(str){
    const translate_re = /&(nbsp|amp|quot|lt|gt|#x27;|#x2F;);/g
    let result = null

      const translate = {
          'nbsp': ' ', 
          'amp' : '&', 
          'quot': '"',
          'lt'  : '<', 
          'gt'  : '>',
          '#x27;': "'",
          '#x2F;': '/' 
      },
      translator = function($0, $1) { 
          return translate[$1]; 
      };
      
      if(str){
        result = str.replace(translate_re, translator)  
      }
      
      return result
}

module.exports = {
    mascaraCep,
    decodeHtml
};