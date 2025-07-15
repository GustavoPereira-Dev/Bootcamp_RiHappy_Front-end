const emojis = [
  "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶",
  "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮",
];

let openCards = [];
let movimentos = 0;
let acertosTotais = 0;
let acertosSeguidos = 0;
let errosTotais = 0;
let tempo = 0;
let limiteErros = Infinity;
let tempoMaximo = Infinity;
let dificuldadeSelecionada = "";
let intervalo;

// Seleção do modo via botão
document.querySelectorAll(".modo").forEach(botao => {
  botao.addEventListener("click", () => {
    dificuldadeSelecionada = botao.dataset.dificuldade;

    switch (dificuldadeSelecionada) {
      case "fácil":
        limiteErros = Infinity;
        tempoMaximo = Infinity;
        break;
      case "médio":
        limiteErros = 15;
        tempoMaximo = 90;
        break;
      case "difícil":
        limiteErros = 8;
        tempoMaximo = 60;
        break;
    }

    document.querySelector(".dificuldades").style.display = "none";

    const modoEl = document.getElementById("modoAtual");
    if (modoEl) {
      const errosTexto = limiteErros === Infinity ? "Ilimitado" : limiteErros;
      const tempoTexto = tempoMaximo === Infinity ? "Ilimitado" : `${tempoMaximo}s`;
      modoEl.innerText = `Modo: ${dificuldadeSelecionada.charAt(0).toUpperCase() + dificuldadeSelecionada.slice(1)} (Erros Máx: ${errosTexto} / Tempo Máx: ${tempoTexto})`;
    }

    iniciarJogo();
  });
});

function iniciarJogo() {
  let shuffleEmojis = emojis.sort(() => Math.random() > 0.5 ? 1 : -1);

  for (let i = 0; i < shuffleEmojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
  }

  intervalo = setInterval(() => {
    tempo++;
    document.getElementById("cronometro").innerText = `Tempo: ${tempo}s`;

    if (tempo >= tempoMaximo && tempoMaximo !== Infinity) {
      clearInterval(intervalo);
      alert(`⏰ Você perdeu! Tempo limite de ${tempoMaximo}s excedido.`);
      window.location.reload();
    }
  }, 1000);
}

function handleClick() {
  if (!this.classList.contains("boxOpen") && openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
    movimentos++;
    document.getElementById("movimentos").innerText = `Movimentos: ${movimentos}`;
  }

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
    acertosTotais++;
    acertosSeguidos++;
    document.getElementById("acertos").innerText = `Acertos: ${acertosTotais}`;
    document.getElementById("acertosSeguidos").innerText = `Acertos Seguidos: ${acertosSeguidos}`;
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
    errosTotais++;
    acertosSeguidos = 0;
    document.getElementById("erros").innerText = `Erros: ${errosTotais}`;
    document.getElementById("acertosSeguidos").innerText = `Acertos Seguidos: ${acertosSeguidos}`;

    if (errosTotais >= limiteErros && limiteErros !== Infinity) {
      clearInterval(intervalo);
      setTimeout(() => {
        alert(`Você perdeu! Número máximo de erros (${limiteErros}) atingido.`);
        window.location.reload();
      }, 300);
      return;
    }
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(intervalo);
    alert("Você venceu!");
  }
}