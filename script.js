// SELEÇÃO DE ELEMENTOS DO HTML 
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


//  VARIÁVEIS DE ESTADO DO BiNGO-
let numerosSorteados = [];
let contagemLetras = { 'B': 0, 'I': 0, 'N': 0, 'G': 0, 'O': 0 };


// --- 3. FUNÇÕES AUXILIARES ---

// Descobre a qual letra (B, I, N, G, O) um número pertence.
function getLetraDoNumero(numero) {
    if (numero <= 15) return 'B';
    if (numero <= 30) return 'I';
    if (numero <= 45) return 'N';
    if (numero <= 60) return 'G';
    return 'O';
}

// Cria e adiciona um novo número ao display de histórico na tela.
function atualizarHistorico(numero, letra) {
    const novoNumeroEl = document.createElement('div');
    novoNumeroEl.classList.add('numero-historico');
    novoNumeroEl.textContent = `${letra}-${numero}`;
    historicoDiv.appendChild(novoNumeroEl);
}

// Pinta de roxo o número sorteado na tabela principal.
function marcarNumeroNaTabela(numero) {
    const todasAsCelulas = document.querySelectorAll(".tabela-bingo tbody td");
    todasAsCelulas.forEach(celula => {
        if (celula.textContent == numero) {
            celula.classList.add("sorteado");
        }
    });
}

// Verifica se todos os 15 números de uma letra já foram sorteados.
function checarBingo(letra) {
    if (contagemLetras[letra] === 15) {
        bingoLetraEl.textContent = `BINGO NA LETRA ${letra}!`;
        bingoPopupContainer.classList.add("mostrar");
    }
}

// Limpa todas as variáveis e elementos visuais para recomeçar o jogo.
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


// --- 4. LÓGICA PRINCIPAL DO JOGO ---
// Este é o coração do jogo. Ele "escuta" o clique no botão SORTEAR e, quando
// acontece, executa toda a lógica: gera um número novo, atualiza a tela,
// o histórico, a tabela, mostra o pop-up e verifica se houve bingo.
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


// --- 5. OUVINTES DE EVENTOS (EVENT LISTENERS) ---
// Este bloco final torna os outros botões funcionais. Ele espera por cliques
// para fechar o pop-up do número ou para chamar a função de resetar o jogo.
btnFecharPopup.addEventListener("click", () => {
    popupContainer.classList.remove("mostrar");
});

btnResetarJogo.addEventListener("click", resetarJogo);
resetarbtn.addEventListener("click", resetarJogo);