// Alternar Telas entre jogos
const btnMemoria = document.getElementById("btnMemoria");
const btnForca = document.getElementById("btnForca");
const jogoMemoria = document.getElementById("jogoMemoria");
const jogoForca = document.getElementById("jogoForca");


btnMemoria.addEventListener("click", () => {
  jogoMemoria.style.display = "block";
  jogoForca.style.display = "none";
});

btnForca.addEventListener("click", () => {
  jogoMemoria.style.display = "none";
  jogoForca.style.display = "block";
});

// Jogo da Forca
const palavras = ["banana", "carro", "avião", "computador", "javascript"];
let palavra = palavras[Math.floor(Math.random() * palavras.length)];

let letrasCorretas = [];
let letrasErradas = [];

const wordDisplay = document.getElementById("LetraDisplay");
const wrongLetters = document.getElementById("erroLetra");
const letterInput = document.getElementById("LetraEntrada");
const message = document.getElementById("message");

function atualizarPalavra() {
  wordDisplay.innerHTML = palavra
    .split("")
    .map(letra => (letrasCorretas.includes(letra) ? letra : "_"))
    .join(" ");
}

function guessLetter() {
  const letra = letterInput.value.toLowerCase();

  if (!letra.match(/[a-zçáéíóúãõâêîôû]/i)) {
    message.textContent = "Digite uma letra válida.";
    return;
  }

  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    message.textContent = "Você já tentou essa letra.";
    return;
  }

  if (palavra.includes(letra)) {
    letrasCorretas.push(letra);
    message.textContent = "Letra correta!";
  } else {
    letrasErradas.push(letra);
    wrongLetters.textContent = letrasErradas.join(", ");
    message.textContent = "Letra errada!";
  }

  atualizarPalavra();
  verificarFimDeJogo();
  letterInput.value = "";
  letterInput.focus();
}

function verificarFimDeJogo() {
  const palavraAtual = palavra.split("").every(letra => letrasCorretas.includes(letra));
  if (palavraAtual) {
    message.textContent = "Parabéns! Você venceu! 🎉";
    letterInput.disabled = true;
  } else if (letrasErradas.length >= 6) {
    message.textContent = `Você perdeu! A palavra era "${palavra}". 😢`;
    letterInput.disabled = true;
  }
}

atualizarPalavra();

// Jogo da Memória
const emojis =  ["😀", "😎", "😂", "😡", "😍", "😱", "🤔", "😴"];
let cards = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameContainer = document.querySelector(".jogo-da-memoria");
const memoryMessage = document.getElementById("memoria-mensagem");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createMemoryGame() {
  gameContainer.innerHTML = "";
  memoryMessage.textContent = "";
  cards = shuffle(cards);
  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (lockBoard || card.classList.contains("revealed") || card.classList.contains("matched")) return;

  card.textContent = card.dataset.emoji;
  card.classList.add("revealed");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("revealed");
      secondCard.classList.remove("revealed");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const matchedCards = document.querySelectorAll(".memory-card.matched");
  if (matchedCards.length === cards.length) {
    memoryMessage.textContent = "Parabéns! Você completou o jogo da memória! 🎉";
  }
}

createMemoryGame();
// Função para reiniciar o Jogo da Forca
function reiniciarForca() {
  // Recarrega palavra e reseta variáveis
  palavra = palavras[Math.floor(Math.random() * palavras.length)];
  letrasCorretas = [];
  letrasErradas = [];
  letterInput.disabled = false;
  wrongLetters.textContent = "";
  message.textContent = "";
  atualizarPalavra();
  letterInput.value = "";
  letterInput.focus();
}

// Função para reiniciar o Jogo da Memória
function reiniciarMemoria() {
  // Reseta variáveis do jogo da memória
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  cards = shuffle([...emojis, ...emojis]);
  createMemoryGame();
  memoryMessage.textContent = "";
}

// Eventos para os botões
document.getElementById("btnReiniciarMemoria").addEventListener("click", reiniciarMemoria);
document.getElementById("btnReiniciarForca").addEventListener("click", reiniciarForca);
