// ELEMENTOS DO HTML 
const btnSortear = document.querySelector("#btnSortear");
const numeroSorteadoDisplay = document.querySelector("#numeroSorteadoDisplay");
const popupContainer = document.querySelector("#popup-container");
const numeroPopup = document.querySelector("#numeroPopup");
const btnFecharPopup = document.querySelector("#btnFecharPopup");
const historicoDiv = document.querySelector("#historico-numeros");
const bingoPopupContainer = document.querySelector("#bingo-popup-container");
const bingoLetraEl = document.querySelector("#bingo-letra");
const btnResetarJogo = document.querySelector("#btnResetarJogo");
const resetarbtn = document.querySelector("#resetarbtn");


//variaveis
let numerosSorteados = [];
let contagemLetras = { 'B': 0, 'I': 0, 'N': 0, 'G': 0, 'O': 0 };



//descobre qual letra o número pertence
function getLetraDoNumero(numero) {
    if (numero <= 15) return 'B';
    if (numero <= 30) return 'I';
    if (numero <= 45) return 'N';
    if (numero <= 60) return 'G';
    return 'O';
}

// cria e adiciona um novo número no histórico da tela
function atualizarHistorico(numero, letra) {
    const novoNumeroEl = document.createElement('div');
    novoNumeroEl.classList.add('numero-historico');
    novoNumeroEl.textContent = `${letra}-${numero}`;
    historicoDiv.appendChild(novoNumeroEl);
}

//pinta de roxo o número sorteado na tabela
function marcarNumeroNaTabela(numero) {
    const todasAsCelulas = document.querySelectorAll(".tabela-bingo tbody td");
    todasAsCelulas.forEach(celula => {
        if (celula.textContent == numero) {
            celula.classList.add("sorteado");
        }
    });
}

//verifica se todos os 15 números de uma letra já foram sorteados
function checarBingo(letra) {
    if (contagemLetras[letra] === 15) {
        bingoLetraEl.textContent = `BINGO NA LETRA ${letra}!`;
        bingoPopupContainer.classList.add("mostrar");
    }
}

// limpa tudo e recomeça
function resetarJogo() {
    numerosSorteados = [];
    contagemLetras = { 'B': 0, 'I': 0, 'N': 0, 'G': 0, 'O': 0 };

    numeroSorteadoDisplay.textContent = '?';
    historicoDiv.innerHTML = '';

    const todasAsCelulas = document.querySelectorAll(".tabela-bingo tbody td");
    todasAsCelulas.forEach(celula => {
        celula.classList.remove("sorteado");
    });

    bingoPopupContainer.classList.remove("mostrar");
}


// executa a logica do jogo
btnSortear.addEventListener("click", () => {
    if (numerosSorteados.length >= 75) {
        alert("Todos os números já foram sorteados!");
        return;
    }

    let numeroSorteado;
    while (true) {
        numeroSorteado = Math.floor(Math.random() * 75) + 1;
        if (!numerosSorteados.includes(numeroSorteado)) {
            break;
        }
    }

    numerosSorteados.push(numeroSorteado);
    const letraSorteada = getLetraDoNumero(numeroSorteado);
    contagemLetras[letraSorteada]++;
    numeroSorteadoDisplay.textContent = numeroSorteado;
    marcarNumeroNaTabela(numeroSorteado);
    atualizarHistorico(numeroSorteado, letraSorteada);
    numeroPopup.textContent = numeroSorteado;
    popupContainer.classList.add("mostrar");
    checarBingo(letraSorteada);
});


// fecha pop up e reseta o jogo
btnFecharPopup.addEventListener("click", () => {
    popupContainer.classList.remove("mostrar");
});

btnResetarJogo.addEventListener("click", resetarJogo);
resetarbtn.addEventListener("click", resetarJogo);
