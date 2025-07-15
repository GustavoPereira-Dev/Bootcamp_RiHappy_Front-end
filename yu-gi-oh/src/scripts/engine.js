const state = {
    score: {
      playerScore: 0,
      computerScore: 0,
      draw: 0,
      totalRounds: 0,
      scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
      avatar: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      type: document.getElementById("card-type"),
    },
    fieldCards: {
      player: document.getElementById("player-field-card"),
      computer: document.getElementById("computer-field-card"),
    },
    actions: {
      button: document.getElementById("next-duel"),
    },
    playerSides: {
      player1: "player-cards",
      player1BOX: document.querySelector("#player-cards"),
      computer: "computer-cards",
      computerBOX: document.querySelector("#computer-cards"),
    },
    settings: {
      handSize: 5,
    },
  };
  
  const pathImages = "./src/assets/icons/";
  
  const sounds = {
    win: new Audio("./src/assets/audios/win.wav"),
    lose: new Audio("./src/assets/audios/lose.wav"),
    draw: new Audio("./src/assets/audios/draw.wav"),
  };
  
  const cardData = [
    {
      id: 0,
      name: "Blue Eyes White Dragon",
      type: "Paper",
      img: `${pathImages}dragon.png`,
      WinOf: [1],
      LoseOf: [2],
    },
    {
      id: 1,
      name: "Dark Magician",
      type: "Rock",
      img: `${pathImages}magician.png`,
      WinOf: [2],
      LoseOf: [0],
    },
    {
      id: 2,
      name: "Exodia",
      type: "Scissors",
      img: `${pathImages}exodia.png`,
      WinOf: [0],
      LoseOf: [1],
    },
  ];
  
  function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
  }
  
  async function setCardsField(playerId) {
    const computerId = getRandomCardId();
  
    removeAllCardsImages();
    showCardFields(true);
    hideCardDetails();
    drawCardsInField(playerId, computerId);
  
    const result = await checkDuelResults(playerId, computerId);
    updateScore();
    drawButton(result);
  }
  
  async function checkDuelResults(playerCardId, computerCardId) {
    let result = "draw";
    const playerCard = cardData[playerCardId];
  
    state.score.totalRounds++;
  
    if (playerCard.WinOf.includes(computerCardId)) {
      result = "win";
      state.score.playerScore++;
    } else if (playerCard.LoseOf.includes(computerCardId)) {
      result = "lose";
      state.score.computerScore++;
    } else {
      state.score.draw++;
    }
  
    showDuelMessage(result);
    return result;
  }
  
  function drawCardsInField(playerId, computerId) {
    state.fieldCards.player.src = cardData[playerId].img;
    state.fieldCards.computer.src = cardData[computerId].img;
  }
  
  function createCardImage(cardId, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.src = `${pathImages}card-back.png`;
    cardImage.dataset.id = cardId;
    cardImage.height = 100;
    cardImage.classList.add("card");
  
    if (fieldSide === state.playerSides.player1) {
      cardImage.addEventListener("mouseover", () => drawSelectCard(cardId));
      cardImage.addEventListener("click", () => {
        const numericId = parseInt(cardImage.dataset.id);
        setCardsField(numericId);
      });
    }
  
    return cardImage;
  }
  
  function drawSelectCard(index) {
    const card = cardData[index];
    state.cardSprites.avatar.src = card.img;
    state.cardSprites.name.innerText = card.name;
    state.cardSprites.type.innerText = "Atributo: " + card.type;
  }
  
  function showCardFields(value) {
    state.fieldCards.player.style.display = value ? "block" : "none";
    state.fieldCards.computer.style.display = value ? "block" : "none";
  }
  
  function hideCardDetails() {
    state.cardSprites.avatar.src = `${pathImages}card-front.png`;
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
  }
  
  function drawButton(result) {
    const text =
      result === "draw" ? "EMPATE" :
      result === "win" ? "VOCÊ VENCEU" :
      "DERROTA";
  
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
  
    state.actions.button.classList.remove("victory");
    if (result === "win") {
      state.actions.button.classList.add("victory");
    }
  }
  
  function showDuelMessage(result) {
    const message = document.createElement("div");
    message.className = "duel-message";
    message.innerText =
      result === "draw" ? "EMPATE!" :
      result === "win" ? "VOCÊ VENCEU!" :
      "DERROTA!";
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
  }
  
  function playAudio(status) {
    const sound = sounds[status];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }
  
  function removeAllCardsImages() {
    state.playerSides.player1BOX.replaceChildren();
    state.playerSides.computerBOX.replaceChildren();
  }
  
  function drawCards(quantity, fieldSide) {
    for (let i = 0; i < quantity; i++) {
      const cardId = getRandomCardId();
      const cardImage = createCardImage(cardId, fieldSide);
      document.getElementById(fieldSide).appendChild(cardImage);
    }
  }
  
  function resetDuel() {
    hideCardDetails();
    showCardFields(false);
    state.actions.button.style.display = "none";
    init();
  }
  
  function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore} | Draw: ${state.score.draw}`;
  }
  
  function init() {
    showCardFields(false);
    drawCards(state.settings.handSize, state.playerSides.player1);
    drawCards(state.settings.handSize, state.playerSides.computer);
  
    const bgm = document.getElementById("bgm");
    bgm.play();
  }
  
  
  init();