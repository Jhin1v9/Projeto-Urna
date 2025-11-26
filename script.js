let seuVotoPara =  document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span')
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d1-3')

let etapaAtual = 0;
let numero= '';
let votoBranco = true
let votos = [];

function comecarEtapa (){
    let etapa = etapas[etapaAtual]
    
    let numeroHtml = ''
    numero = '';
    votoBranco = false;

for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
        numeroHtml += '<div class="numero pisca"></div>';
    } else {
        numeroHtml += '<div class="numero"></div>';
    }
}

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = ''
    aviso.style.display = 'none';
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item)=>{
            if(item.numero === numero ){
                return true
            } else{
                return false
            }
    })
   if (candidato.length > 0){
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `nome: ${candidato.nome}<br/> Parido: ${candidato.partido}`
    let fotosHtml = '';
    for(let i in candidato.fotos){
        if(candidato.fotos[i].small){
            `<div class="d1-image small">
                        <img src="images/${candidato.fotos[i].url}" alt="">
                        ${candidato.fotos[i].legenda}
                    </div>`
        }
        fotosHtml += `<div class="d1-image">
                        <img src="images/${candidato.fotos[i].url}" alt="">
                        ${candidato.fotos[i].legenda}
                    </div>`
    }
    lateral.innerHTML = fotosHtml;
   } else {
    
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    
   }
}

function clicou (n ){
let elNumero = document.querySelector('.numero.pisca')
if(elNumero !== null){
    elNumero.innerHTML = n;;
    numero = `${numero}${n}`;

    elNumero.classList.remove('pisca');
    if (elNumero.nextElementSibling !== null){
         elNumero.nextElementSibling.classList.add('pisca');

    }else{
        atualizaInterface();
    }
   











}
}
function branco(){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
        votoBranco =true;
        seuVotoPara.display = 'block'
    aviso.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
   lateral.innerHTML = '';
      
    
}

function corrige(){
comecarEtapa()

}

function confirma (){
    let etapa = etapas[etapaAtual]

   
       
      

    
    let votoConfirmado = true;
 if(votoBranco === true){
    votoConfirmado
     descricao.innerHTML = `<div class="aviso--grande pisca">CONFIRMANDO VOTO EM BRANCO</div>`
 } else if(numero.length === etapa.numeros){
    votoConfirmado = true
    votos.push({
        etapa:etapas[etapaAtual].titulo,
        voto:numero
    })
         descricao.innerHTML = `<div class="aviso--grande pisca">CONFIRMANDO VOTO PARA ${numero}...</div>`
    descricao.innerHTML = `<div class="aviso--grande pisca">CONFIRMANDO VOTO PARA VOTO NULO</div>`

 }
    
 if (votoConfirmado){
    etapaAtual++;
    if (etapas[etapaAtual]!== undefined){
        comecarEtapa();
    } else{
        
        
       
       document.querySelector('.tela').innerHTML = `<div class="aviso--grande pisca fim"> FIM</div>`;
        console.log(votos)
    }
 }
}

comecarEtapa();