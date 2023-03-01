var painel=document.getElementById("campoTela")
var lista=[];
var listaNumso=[];
var simbolos=[];
var expressao=[]
var num="";

function meunumero(n1)
{
    num+=n1;
}
function verifica(n2){
    
    if(n2!="+" && 
       n2!="*"&&
        n2!="/" && 
       n2!="%"){
        meunumero(n2)
    }else{
        lista.push(num)
           num="";
    }
 


}
function definepainel(event){
    var obj=event.target;
    listaNumso.push(obj.dataset.simbolo)
    painel.innerHTML+=obj.dataset.simbolo+" ";
    if(obj.dataset.simbolo=="(-1)*"){
        meunumero("x")
    }else{
        if(obj.dataset.simbolo!="+" && 
        obj.dataset.simbolo!="*"&&
        obj.dataset.simbolo!="/" &&
        obj.dataset.simbolo!="-" &&
        obj.dataset.simbolo!="%"){
            meunumero(obj.dataset.simbolo)
           
        }
        
        else{
             simbolos.push(obj.dataset.simbolo);
              lista.push(num); 
              num=""
              console.log(lista);
              console.log(simbolos);
              
        }
       
        
    
    }
    }


function igual(){

    for(var i=0;i<lista.length;i++){
        if(lista[i].match(/./)==1){
            expressao.push(parseFloat(lista[i]))
            console.log(expressao);
        }if(lista[i].match(/x/)){
            lista[i].slice(0,1);
            var n3=lista[i].slice(1,lista[i].length);
            parseFloat(n3)
            expressao.push(n3*(-1));
            console.log(expressao);
        }else{
            expressao.push(parseFloat(lista[i]));
            console.log(expressao);
        }
        
    }
  
   lista=[]
   listaNumso=[]
   expressao=[]
   simbolos=[]
}


function limpaUm(){
    listaNumso.pop();  
    lista=[];
    num=""
    painel.innerHTML="";
    for(var p of listaNumso){
        painel.innerHTML+=p+" ";
        verifica(p);
    }
   


}

function inicia(){
    document.getElementById("c1").addEventListener("click",definepainel)
    document.getElementById("c2").addEventListener("click",limpaUm)
    document.getElementById("c3").addEventListener("click",function(){
        painel.innerHTML="";
        lista=[];
        listaNumso=[];
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
    document.getElementById("c20").addEventListener("click",igual)



}






window.addEventListener("load", inicia)
