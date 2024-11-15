// Array contendo emojis que serão usados para criar as cartas do jogo.
// Cada emoji está duplicado para formar pares correspondentes.
const emojis = [
  "🎃",
  "👻",
  "🦇",
  "💀",
  "🧟",
  "🕸️",
  "🕷️",
  "🧛",
  "🎃",
  "👻",
  "🦇",
  "💀",
  "🧟",
  "🕸️",
  "🕷️",
  "🧛",
];

// Array para armazenar as cartas abertas pelo jogador durante o jogo.
// Ele será usado para verificar se as duas cartas abertas formam um par.
let openCards = [];

// Embaralha o array de emojis aleatoriamente usando o método `sort`.
// O resultado de `Math.random()` decide aleatoriamente a ordem dos elementos.
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));

// Laço que cria dinamicamente as cartas do jogo com base no array `shuffleEmojis`.
for (let i = 0; i < emojis.length; i++) {
  
    // Cria um elemento <div> para representar cada carta do jogo.
    let box = document.createElement("div");

    // Adiciona uma classe CSS "item" ao elemento para estilização.
    box.className = "item";

    // Define o conteúdo da carta (emoji) a partir do array embaralhado.
    box.innerHTML = shuffleEmojis[i];

    // Adiciona um evento de clique à carta que chama a função `handleClick`.
    box.onclick = handleClick;

    // Insere a carta criada no contêiner do jogo, que deve ter a classe "game".
    document.querySelector(".game").appendChild(box);
}

// Função para tocar sons no jogo.
// `audioName` é o nome do arquivo de áudio que será tocado.
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.5; // Ajusta o volume do som.
    audio.play(); // Reproduz o som.
}

// Função chamada ao clicar em uma carta.
function handleClick() {
  
    // Permite abrir uma carta apenas se menos de duas cartas estiverem abertas.
    if (openCards.length < 2) {
    
        // Adiciona a classe CSS "boxOpen" para indicar que a carta está aberta.
        this.classList.add("boxOpen");

        // Adiciona a carta clicada ao array `openCards` para verificações posteriores.
        openCards.push(this);
  }

    // Se duas cartas estiverem abertas, aguarda 500ms e chama a função `checkMatch`.
    if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
    }
}

// Função para verificar se as duas cartas abertas formam um par.
function checkMatch() {
    
    // Compara os emojis das duas cartas abertas.
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        
        // Se forem iguais, adiciona a classe CSS "boxMatch" para marcar as cartas como combinadas.
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        
        // Verifica se todas as cartas no jogo foram combinadas.
        if (document.querySelectorAll(".boxMatch").length === emojis.length) {
            
            // Se todas as cartas foram combinadas, toca o som de vitória e exibe a mensagem.
            playSound("win");
            alert("Você Venceu!");
        
        } else {
            // Se ainda houver cartas a combinar, toca o som de acerto.
            playSound("success");
        }
    
    } else {
        
        // Se forem diferentes, remove a classe "boxOpen" para fechá-las novamente.
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    // Reseta o array `openCards` para que o jogador possa abrir novas cartas.
    openCards = [];
}
