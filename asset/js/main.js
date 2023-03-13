var painel=document.getElementById("campoTela")
var lista=[];
var listaNumso=[];
var simbolos=[];
var expressao=[]
var num="",num2="";
var listaA=[]
var listasA=[]
var listan=[]
var listanumstr=['1','2','3','4','5','0','6','7','8','9']

//concatena o numero
function meunumero(n1)
{
    num+=n1;
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
function validaPrimeiro(n4){
    if(n4=="_")return true
    for(var compara of listanumstr){
        if(compara==n4){
            return true
        }
    }
    return false
}

//pega os valores digitados e separa
function definepainel(event){
     var obj=event.target;
     var ver;
    painel.innerHTML+=obj.dataset.simbolo+" "
    listaNumso.push(obj.dataset.simbolo)
    if(validaPrimeiro(listaNumso[0])==false){
        if(obj.dataset.simbolo=="-" ){
            alert("clique no botão +/- para deixar o numero negativo")
            listaNumso=[]
        }
        else{
            alert("Inválido")
            listaNumso=[]
        }
         painel.innerHTML="";
            
    }else{
      if(obj.dataset.simbolo=="_" && num!=""){
        lista.push(num);
        num="";
      }
      if(  obj.dataset.simbolo=="%" ){
        meunumero(obj.dataset.simbolo);
        lista.push(num);

      }
    if(obj.dataset.simbolo=="+"||
        obj.dataset.simbolo=="-"||
        obj.dataset.simbolo=="/"||
        obj.dataset.simbolo=="*"
        ){
            simbolos.push(obj.dataset.simbolo)
            lista.push(num)
            num=""
        }
        else{
            meunumero(obj.dataset.simbolo)
        }
    }
}

//verifica antes da operação se o ultimo caracter e um numero
function valida(){
    var tam=listaNumso.length-1;
    if(listaNumso[tam]=="*" || 
    listaNumso[tam]=="/" || 
    listaNumso[tam]=="-" || 
    listaNumso[tam]=="+" || 
    listaNumso[tam]=="_"  ||validaPrimeiro(listaNumso[0])==false || listaNumso==[]
    && validaPrimeiro(listaNumso[tam-2])==true
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
     for(var j=0;j<tamSim;j++){
          if(simbolos[j]=="+"){
            op=expressao[j]+expressao[j+1];
            expressao[j]=op;
            expressao.splice(j+1,1)
            simbolos.splice(j,1)
            j--     
        } 
        if(simbolos[j]=="-"){
            op=expressao[j]-(expressao[j+1]);
            expressao[j]=op;
            expressao.splice(j+1,1)
            simbolos.splice(j,1)
            j-- 
        } 
    }    
    num2=op;
    return op;
}

//transforma os caracteres em numeros
function igual(){
    var numbers=/\d+/g, regex=/^\d+%$/, regex2=/[$-\[\]]/;
    if(num2!=""){
        console.log("pp"+num)
        lista.push(num2.toString());
        console.log("pp"+num2);
        console.log("pp sim"+simbolos);
    }
    expressao=[]
    lista.push(num)
    console.log("iii lis"+lista);
    console.log("iii sim"+simbolos);
    if(lista.length<=16){
        for(var i=0;i<lista.length;i++){
            if(lista[i].match(/./)==1){
                    expressao.push(parseFloat(lista[i]))   
            }
            if(lista[i].match(/_/)){
                console.log(lista[i])
                    var n3=lista[i].replaceAll('_', '');
                    console.log(n3)
                    parseFloat(n3)
                    expressao.push(n3*(-1));   
            }
            else if(lista[i].match(regex)){
                var n3=lista[i].slice(0,1);
                n3=n3/100
                parseFloat(n3)
                expressao.push(n3);
                
                
                
        }
            else if(lista[i].match(numbers)){
                expressao.push(parseFloat(lista[i]));   
                
                      
        }  
        }
        console.log("antes "+expressao);
        lista=[]
        painel.innerHTML=operacao().toFixed(2)   
        console.log(expressao);
        
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
        listaNumso.pop(); 
        painel.innerHTML="";
        num="";
        num2=""
        for(var p of listaNumso)
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
    console.log("ddsds"+lista)
    
      for(var p of listaNumso)
        {
            
            painel.innerHTML+=p+" ";
    }
   
}
 
function inicia(){
    document.getElementById("c1").addEventListener("click",definepainel)
    document.getElementById("c2").addEventListener("click",limpaUm)
    document.getElementById("c3").addEventListener("click",function() {
        //limpa tudo
        painel.innerHTML="";
        lista=[];
        listaNumso=[];
        simbolos=[];
        num=""
    })
    document.getElementById("c4").addEventListener("click",definepainel)
    document.getElementById("c5").addEventListener("click",definepainel)
    document.getElementById("c6").addEventListener("click",definepainel)
    document.getElementById("c7").addEventListener("click",definepainel)
    document.getElementById("c8").addEventListener("click",definepainel)
    document.getElementById("c9").addEventListener("click",definepainel)
    document.getElementById("c10").addEventListener("click",definepainel)
    document.getElementById("c11").addEventListener("click",definepainel)
    document.getElementById("c12").addEventListener("click",definepainel)
    document.getElementById("c13").addEventListener("click",definepainel)
    document.getElementById("c14").addEventListener("click",definepainel)
    document.getElementById("c15").addEventListener("click",definepainel)
    document.getElementById("c16").addEventListener("click",definepainel)
    document.getElementById("c17").addEventListener("click",definepainel)
    document.getElementById("c18").addEventListener("click",definepainel)
    document.getElementById("c19").addEventListener("click",definepainel)
    document.getElementById("c20").addEventListener("click",valida);
}






window.addEventListener("load", inicia)
