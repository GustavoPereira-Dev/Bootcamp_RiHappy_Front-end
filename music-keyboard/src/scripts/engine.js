const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const temaToggle = document.getElementById("temaToggle");

// 🎵 Sequência pré-definida de notas
const sequencia = ["a", "s", "d", "f", "g", "h", "j", "k"];
const tempoEntreNotas = 400;

const sequenciaBtn = document.createElement("button");
sequenciaBtn.textContent = "Tocar Sequência";
sequenciaBtn.id = "sequenciaBtn";
document.querySelector("header").appendChild(sequenciaBtn);

const mapedKeys = [];
const notas = {
  a: "C", w: "C#", s: "D", e: "D#", d: "E", f: "F",
  t: "F#", g: "G", y: "G#", h: "A", u: "A#", j: "B",
  k: "C2", o: "C#2", l: "D2", p: "D#2", ";": "E2"
};

const playTune = (key) => {
  const audio = new Audio(`src/tunes/${key}.wav`);
  audio.volume = volumeSlider.value;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  if (clickedKey) {
    clickedKey.classList.add("active");
    if (notas[key]) {
      clickedKey.setAttribute("title", notas[key]);
    }
    setTimeout(() => clickedKey.classList.remove("active"), 150);
  }

  historicoNotas.push({
    nota: notas[key] || key,
    tecla: key,
    tempo: Date.now()
  });
};

// Tocando a sequência automática
const tocarSequencia = () => {
  sequencia.forEach((key, index) => {
    setTimeout(() => {
      playTune(key);
    }, tempoEntreNotas * index);
  });
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

const pressedKeys = new Set();

document.addEventListener("keydown", (e) => {
  if (!pressedKeys.has(e.key) && mapedKeys.includes(e.key)) {
    pressedKeys.add(e.key);
    playTune(e.key);
  }
});

document.addEventListener("keyup", (e) => {
  pressedKeys.delete(e.key);
});

volumeSlider.addEventListener("input", (e) => {
});

keysCheck.addEventListener("click", () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
});

temaToggle.addEventListener("click", () => {
  document.body.classList.toggle("claro");
});

function gerarSequenciaAleatoria(tamanho) {
  const aleatoria = [];
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * mapedKeys.length);
    aleatoria.push(mapedKeys[indice]);
  }
  return aleatoria;
}
sequenciaBtn.addEventListener("click", () => {
  const sequenciaAleatoria = gerarSequenciaAleatoria(Math.random() * 5 + 5);
  sequenciaAleatoria.forEach((key, index) => {
    setTimeout(() => {
      playTune(key);
    }, tempoEntreNotas * index);
  });
}
);