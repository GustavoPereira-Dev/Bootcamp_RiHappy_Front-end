const niveis = [
    { min: 10001, nome: "Radiante" },
    { min: 9001, nome: "Imortal" },
    { min: 8001, nome: "Ascendente" },
    { min: 7001, nome: "Platina" },
    { min: 5001, nome: "Ouro" },
    { min: 2001, nome: "Prata" },
    { min: 1001, nome: "Bronze" },
    { min: 0, nome: "Ferro" }
  ];
  
  let continuar = true;
  
  while (continuar) {
    let nomeHeroi = prompt("Digite o nome do herói:");
    let xpHeroi = parseInt(prompt("Digite a quantidade de XP do herói:"));
  
    let nivel = "Desconhecido";
    for (let faixa of niveis) {
      if (xpHeroi >= faixa.min) {
        nivel = faixa.nome;
        break;
      }
    }
  
    alert(`O Herói de nome ${nomeHeroi} está no nível de ${nivel}`);
  
    let resposta = prompt("Deseja testar outro herói? (s/n)").toLowerCase();
    if (resposta !== "s") {
      continuar = false;
      alert("Encerrando o programa. Até a próxima!");
    }
  }