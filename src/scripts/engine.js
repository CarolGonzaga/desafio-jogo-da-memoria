// Array de emojis que será usado para criar cartas. Cada emoji está duplicado para formar pares.
const emojis = ["🎃", "👻", "🦇", "💀", "🧟", "🕸️", "🕷️", "🧛", 
    "🎃", "👻", "🦇", "💀", "🧟", "🕸️", "🕷️", "🧛"];

// Array vazio onde serão armazenadas as cartas abertas pelo jogador
let openCards = [];

// Embaralha os emojis no array, aleatorizando a ordem deles usando `sort`
// A função compara dois elementos e troca suas posições aleatoriamente
// com base no resultado de `Math.random()`.
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1))

// Laço que percorre cada emoji no array `shuffleEmojis` (os emojis embaralhados)
for (let i = 0; i < emojis.length; i++) {
// Cria um novo elemento <div> para cada carta
let box = document.createElement("div");

// Define a classe CSS do elemento como "item"
box.className = "item";

// Define o conteúdo HTML do elemento (a carta) como o emoji na posição `i` do array embaralhado
// Isso faz com que o emoji seja exibido na carta criada
box.innerHTML = shuffleEmojis[i];

box.onclick = handleClick;

document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500)
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Você Venceu!");
        window.location.reload();
    }
}