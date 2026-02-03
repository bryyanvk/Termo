const palavras = [
  "CASAS", "LIVRO", "PLANO", "CARRO",
  "NOITE", "FELIZ", "VERDE", "AMIGO",
  "PEDRA", "PRAIA", "NORTE", "SORTE",
  "FUGIR", "DORES", "RISCO", "CANTO",
  "FORTE", "MUNDO"
];

let respostas = [];
let tentativas = 0;
let limite = 0;
let modo = 1;

function iniciarJogo(qtd) {
  modo = qtd;
  tentativas = 0;
  respostas = [];
  document.getElementById("jogos").innerHTML = "";

  limite = qtd === 1 ? 6 : qtd === 2 ? 8 : 10;

  for (let i = 0; i < qtd; i++) {
    respostas.push(palavras[Math.floor(Math.random() * palavras.length)]);
    
    const jogo = document.createElement("div");
    jogo.className = "jogo";
    jogo.id = `jogo-${i}`;

    document.getElementById("jogos").appendChild(jogo);
  }
}

function enviar() {
  if (tentativas >= limite) return alert("Fim de jogo!");

  const input = document.getElementById("palpite");
  const palavra = input.value.toUpperCase();
  if (palavra.length !== 5) return;

  respostas.forEach((resposta, index) => {
    const jogo = document.getElementById(`jogo-${index}`);
    const linha = document.createElement("div");
    linha.className = "linha";

    for (let i = 0; i < 5; i++) {
      const div = document.createElement("div");
      div.className = "letra";
      div.innerText = palavra[i];

      if (palavra[i] === resposta[i]) {
        div.classList.add("certa");
      } else if (resposta.includes(palavra[i])) {
        div.classList.add("existe");
      } else {
        div.classList.add("errada");
      }

      linha.appendChild(div);
    }

    jogo.appendChild(linha);
  });

  tentativas++;
  input.value = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") enviar();
});
