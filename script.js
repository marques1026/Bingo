let nome = prompt("Digite seu nome:");

if (nome) {
    document.getElementById("usuario").textContent = "Seja Bem-Vindo, " + nome;
} else {
    document.getElementById("usuario").textContent = "Nome não fornecido";
}

let btn = document.querySelector("button");

let numerosSorteados = []

let colunaB = []
let colunaI = []
let colunaN = []
let colunaG = []
let colunaO = []
 
function sorteador(){
    let numeroMaximo = 75
    let numeroSorteado = Math.floor(Math.random() * numeroMaximo) + 1;

    if(numerosSorteados.includes(numeroSorteado)){
        sorteador();
    }else{
        numerosSorteados.push(numeroSorteado)
        document.getElementById("numeroSorteado").textContent = "Número sorteado: " + numeroSorteado;

        if(numeroSorteado <= 15){
            colunaB.push(numeroSorteado)
        }else if(numeroSorteado <= 30){
            colunaI.push(numeroSorteado)
        }else if(numeroSorteado <= 45){
            colunaN.push(numeroSorteado)
        }else if(numeroSorteado <= 60){
            colunaG.push(numeroSorteado)
        }else{
            colunaO.push(numeroSorteado)
        }
    }
}

function gerarTabela() {
    const tabelaBody = document.querySelector("#tabelaNumerosSorteados tbody");
    tabelaBody.innerHTML = ""; 

    const maxLinhas = Math.max(colunaB.length, colunaI.length, colunaN.length, colunaG.length, colunaO.length);

    for (let i = 0; i < maxLinhas; i++) {
        const linha = document.createElement("tr");
        
        linha.innerHTML = `
            <td>${colunaB[i] || ""}</td>
            <td>${colunaI[i] || ""}</td>
            <td>${colunaN[i] || ""}</td>
            <td>${colunaG[i] || ""}</td>
            <td>${colunaO[i] || ""}</td>
        `;
        
        tabelaBody.appendChild(linha);
    }
}

btn.addEventListener("click", () => {
    sorteador();
    gerarTabela();
});