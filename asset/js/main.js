var painel=document.getElementById("campoTela")
var lista=[];
var listaNumTudo=[];
var simbolos=[];
var expressao=[]
var num="",num2="";

//concatena o numero
function meunumero(n1)
{
    if(n1!="=")num+=n1;
}

//refaz a lista
function verifica(n2){
    if(n2!="+" && 
       n2!="*"&&
       n2!="/" && 
       n2!="%"&&n2!="-"  ){
            meunumero(n2)
    }else{
            lista.push(num)
            num="";
    }
}

//valida o primeiro numero digitado
function validaPrimeiroNumero(n4){
    if(n4=="_")return true
    if(typeof n4=== "number"){
        return true
    }
    if(typeof parseInt(n4)!=="number"){
        return false
    }

}

//pega os valores digitados e separa
function calculadoraConcatena(event){
    var obj=event.target;
    painel.innerHTML+=obj.dataset.simbolo+" "
    listaNumTudo.push(obj.dataset.simbolo)
    if(validaPrimeiroNumero(num2)==true && validaPrimeiroNumero(listaNumTudo[1])==true && validaPrimeiroNumero(obj.dataset.simbolo)==true && obj.dataset.simbolo!="="){
        listaNumTudo.splice(0,1);
        lista=[]
        num2=""
        num=""
        painel.innerHTML="";
        painel.innerHTML+=obj.dataset.simbolo+" "

    }
    if(validaPrimeiroNumero(listaNumTudo[0])==false && validaPrimeiroNumero(num2)==false && validaPrimeiroNumero(lista[0])==false  ){
        if(obj.dataset.simbolo=="-"){
            alert("clique no botão +/- para deixar o numero negativo")
            listaNumTudo=[]
        }
        else{
            alert("Inválido, adicone o numero primeiro "+ lista[0])
            listaNumTudo=[]
        }
         painel.innerHTML="";
    }
    else{
            if(obj.dataset.simbolo=="_" && num!=""){
                lista.push(num);
                num="";
            }
            
            if(obj.dataset.simbolo=="%"  && num!=""){
                meunumero("x");
            }
            if(obj.dataset.simbolo=="="){
                lista.push(num) 
                valida();
            }
            if( obj.dataset.simbolo=="+" ||
                obj.dataset.simbolo=="-" ||
                obj.dataset.simbolo=="/" ||
                obj.dataset.simbolo=="*" ||
                obj.dataset.simbolo=="%"){
                    simbolos.push(obj.dataset.simbolo)
                    lista.push(num)
                    num=""
                    console.log("Numero inserido na lista: "+lista)
            }
     
            else{
                meunumero(obj.dataset.simbolo)
            }
    }
}

//verifica antes da operação se o ultimo caracter e um numero
function valida(){
    var tam=listaNumTudo.length-1;
    if( listaNumTudo[tam]=="*" || 
        listaNumTudo[tam]=="/" || 
        listaNumTudo[tam]=="-" || 
        listaNumTudo[tam]=="+" || 
        listaNumTudo[tam]=="_"  ||validaPrimeiroNumero(listaNumTudo[0])==false || listaNumTudo==[]
        && validaPrimeiroNumero(listaNumTudo[tam-2])==true
    ){
        alert("operacao invalida!!!")
    }else{
        igual()
        num=""
    }
}



//operação

function operacao(){
    var op;
    var tamSim=simbolos.length;
    if(tamSim==0)return expressao[0];
    for(var j=0;j<tamSim;j++){
        if(simbolos[j]=="%"){
            expressao[j]=parseFloat(expressao[j]/100)
            if(simbolos[j-1]=="+"){
                op=expressao[j-1]*expressao[j];
                expressao[j]=op
                console.log(op)
                simbolos.splice(j,1)
                j--;
            }
            if(simbolos[j-1]=="-"){
                op=(expressao[j-1])*expressao[j];
                expressao[j]=op
                simbolos[j-1]="por"
                simbolos.splice(j,1)
                console.log(op)
                j--;
            }
            
    }  
}
    console.log("fase 1 ok: "+ expressao+ " simbolos "+simbolos) 
    console.log(simbolos)
    for(var j=0;j<tamSim;j++){
        if(simbolos[j]=="/"){
            op=expressao[j]/expressao[j+1];
            expressao[j]=op.toFixed(2)
            expressao.splice(j+1,1)
            simbolos.splice(j,1)
            j--;
        } 
        if(simbolos[j]=="*"){
                op=expressao[j]*expressao[j+1];
                expressao[j]=op;
                expressao.splice(j+1,1)
                simbolos.splice(j,1)
                j--;     
        }     
    }    
    console.log("fase 2 ok: "+ expressao +  " simbolos "+simbolos) 
    for(var j=0;j<tamSim;j++){
          if(simbolos[j]=="+"){
            op=parseFloat(expressao[j])+parseFloat(expressao[j+1]);
            expressao[j]=op;
            expressao.splice(j+1,1)
            simbolos.splice(j,1)
       
            j--     
        }  
        if(simbolos[j]=="-"){
            op=expressao[j]-(expressao[j+1]);
            console.log(expressao[j]-expressao[j+1])
            expressao[j]=op;
            expressao.splice(j+1,1)
            simbolos.splice(j,1)
            j-- 
        } 
        if(simbolos[j]=="por"){
            op=expressao[j]+(-1*expressao[j+1]);
            console.log("lalalal "+op)
            expressao[j]=op;
            expressao.splice(j+1,1)
            simbolos.splice(j,1)
            j-- 
        } 
        
    }    
    console.log("fase 3 ok: "+ expressao + " simbolos "+simbolos) 
    lista=[];
    listaNumTudo=[] 
    simbolos=[]
    num2=op;
    lista[0]=num2.toString();
    listaNumTudo[0]=num2.toString();
    console.log("lista atual: "+lista)
    return op;
}

//transforma os caracteres em numeros
function igual(){
    var numbers=/\d+/g, regex1=/(\d+(\.\d+)?%)/,regex2=/[$-\[\]]/;
    expressao=[]
    console.log("lista atual antes : "+lista);
    console.log("simbolos atual: "+simbolos);
    if(lista[0]==num2.toString()){
        for(var i=0;i<lista.length;i++){
                if(lista[i]=="=" || lista[i]==""){
                lista.splice(i,1)   
            }
        }
        for(var i=0;i<listaNumTudo.length;i++){
            if(listaNumTudo[i]=="="){
                listaNumTudo.splice(i,1)   
        }
    }
    }
    console.log("lista atual agora : "+lista);
    if(lista.length<=16){
        for(var i=0;i<lista.length;i++){
            if(lista[i].match(/_/)){
                        var n3=lista[i].replaceAll('_', '');
                        console.log(n3)
                        parseFloat(n3)
                        expressao.push(n3*(-1));   
                }
            else if(lista[i].match(/x/)){
                    var n3=lista[i].replaceAll('x', '');
                    parseFloat(n3)
                    expressao.push(n3);       
            }
            else if(lista[i].match(numbers) ||lista[i].match(/./)){
                    expressao.push(parseFloat(lista[i]));            
            }  
        }
          
            painel.innerHTML=operacao()
          
    }
    else{
        alert("Limite excedido")
     }
    
}

//remove apenas um numero
function limpaUm()
{
        simbolos=[]
        lista=[];
        listaNumTudo.pop(); 
        painel.innerHTML="";
        num="";
        num2=""
        for(var p of listaNumTudo)
        {
            if(p=="+"||p=="-"||p=="*"||p=="/"||p=="%"){
                simbolos.push(p);
                lista.push(num)
                num=""
            }
            else{
               meunumero(p);
            }
        }
      for(var p of listaNumTudo)
        {  
            painel.innerHTML+=p+" ";
        }
   
}
 
function inicia(){
    document.getElementById("c1").addEventListener("click",calculadoraConcatena)
    document.getElementById("c2").addEventListener("click",limpaUm)
    document.getElementById("c3").addEventListener("click",function() {
        //limpa tudo
        painel.innerHTML="";
        lista=[];
        listaNumTudo=[];
        simbolos=[];
        num=""
        num2=""
    })
    document.getElementById("c4").addEventListener("click",calculadoraConcatena)
    document.getElementById("c5").addEventListener("click",calculadoraConcatena)
    document.getElementById("c6").addEventListener("click",calculadoraConcatena)
    document.getElementById("c7").addEventListener("click",calculadoraConcatena)
    document.getElementById("c8").addEventListener("click",calculadoraConcatena)
    document.getElementById("c9").addEventListener("click",calculadoraConcatena)
    document.getElementById("c10").addEventListener("click",calculadoraConcatena)
    document.getElementById("c11").addEventListener("click",calculadoraConcatena)
    document.getElementById("c12").addEventListener("click",calculadoraConcatena)
    document.getElementById("c13").addEventListener("click",calculadoraConcatena)
    document.getElementById("c14").addEventListener("click",calculadoraConcatena)
    document.getElementById("c15").addEventListener("click",calculadoraConcatena)
    document.getElementById("c16").addEventListener("click",calculadoraConcatena)
    document.getElementById("c17").addEventListener("click",calculadoraConcatena)
    document.getElementById("c18").addEventListener("click",calculadoraConcatena)
    document.getElementById("c19").addEventListener("click",calculadoraConcatena)
    document.getElementById("c20").addEventListener("click",calculadoraConcatena)
}

window.addEventListener("load", inicia);
