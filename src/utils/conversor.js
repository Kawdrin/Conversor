var valores_extenso_texto = {0:'', 1:'um', 2:'dois', 3:'três',  4:'quatro', 5:'cinco', 6:'seis', 7:'sete', 8:'oito', 9:'nove', 10:'dez', 11:'onze',  12:'doze',  13:'treze',  14:'quatorze',  15:'quinze', 16:'dezesseis',  17:'dezessete',  18:'dezoito',  19:'dezenove', 20: 'vinte', 30:'trinta', 40:'quarenta', 50:'cinquenta', 60:'sessenta', 70:'setenta', 80:'oitenta', 90:'noventa', 100:'cento', 200:'duzentos', 300:'trezentos', 400:'quatrocentos', 500:'quinhentos', 600:'seiscentos', 700:'setecentos', 800:'oitocentos', 900:'novecentos'}
var valores_especificos = { 0: ["bilhões", "um bilhão"], 1: ["milhões", "um milhão"], 2: ["mil", "mil"], 3: ["", "um"]}

function coleta_centena_dezena_unidade_do_valor(valor){
    var valor_divizorio = 100000000000
    var lista_numeros = []
    for(var valor_especifico in valores_especificos){
        var valor_centena = parseInt((valor - (valor%valor_divizorio)) / valor_divizorio)
        valor %= valor_divizorio
        valor_divizorio /= 10

        var valor_dezena = parseInt((valor - (valor%valor_divizorio)) / valor_divizorio)
        valor %= valor_divizorio
        valor_divizorio /= 10


        var valor_unidade = parseInt((valor - (valor%valor_divizorio)) / valor_divizorio)
        valor %= valor_divizorio
        valor_divizorio /= 10
        lista_numeros.push([valor_centena, valor_dezena, valor_unidade])
    }
    valor_dezena_centavos = parseInt((Math.round(valor*100) - (Math.round(valor*100)%10)) / 10)
    valor_unidade_centavos = (Math.round(valor*100)%10)/1
    return [lista_numeros, [valor_dezena_centavos, valor_unidade_centavos]]
}

function calcula_numero_extenso(valor, valor_extenso_lista){
    return valor>0 && valor_extenso_lista!= 0? 'e ' + valores_extenso_texto[valor_extenso_lista] : valores_extenso_texto[valor_extenso_lista]
}

function coletar_valor_extenso(lista_valor_extenso){
    var valor_extenso = ""
    valor_extenso = lista_valor_extenso.toString()
    return valor_extenso.replace(/( {2,})/g, ' ').replace(/^(,*)|(,{2,})/g,'').replace(/(,$)/g,'').replace(/(,)/g,' e ').trim()
}

function tranformar_itens_lista_em_valores_extenso(lista_numeros){

    var lista_valores_extensos = []

    lista_valores_extensos = lista_numeros.map(function(nums){
        var centena_valor = nums[0]
        var dezena_valor = nums[1]
        var unidade_valor = nums[2]

        if(centena_valor == 0 && dezena_valor == 0 && unidade_valor == 1){
            return valores_especificos[lista_numeros.indexOf(nums)][1];
        };

        if((unidade_valor + dezena_valor + centena_valor) !=0){
            var centena_extenso = valores_extenso_texto[nums[0]*100]
            if(dezena_valor == 1 && unidade_valor < 10){
                var dezena_extenso = calcula_numero_extenso(centena_valor, dezena_valor*10+unidade_valor);
                var unidade_extenso = ''
            }else{
                var dezena_extenso = calcula_numero_extenso(centena_valor, dezena_valor*10);
                var unidade_extenso = calcula_numero_extenso(dezena_valor+centena_valor, unidade_valor);
            }
           	var azul= centena_extenso + " " + dezena_extenso + " " +unidade_extenso + " " +valores_especificos[lista_numeros.indexOf(nums)][0]
        	return azul
        }
        return ''
    })
    return lista_valores_extensos
}

function calcula_centavos_extenso(lista_centavos){
    if(lista_centavos[0] != 0 || lista_centavos[1] != 0 ){
        if(lista_centavos[0] == 1 && lista_centavos[1] > 0 && lista_centavos[1] < 10){
            return ' e ' + valores_extenso_texto[lista_centavos[0]*10+lista_centavos[1]] + ' centavos'
        }else{
            var dezena_centavo = lista_centavos[0]*10;
            var unidade_centavo = lista_centavos[1];
            return unidade_centavo > 0 ? ' e ' + valores_extenso_texto[lista_centavos[0]*10] + ' e ' + valores_extenso_texto[lista_centavos[1]] + ' centavos' : ' e ' + valores_extenso_texto[lista_centavos[0]*10] + ' centavos'
        }
    }
    return ""
}

function calcula(value){
    var lista_numeros  = coleta_centena_dezena_unidade_do_valor(Number(value))

    var valor_extenso_lista = tranformar_itens_lista_em_valores_extenso(lista_numeros[0])
    var valor_extenso = coletar_valor_extenso(valor_extenso_lista)
    var valor_extenso_centavos = calcula_centavos_extenso(lista_numeros[1])
    return valor_extenso + " reais"+ valor_extenso_centavos
}

module.exports = calcula