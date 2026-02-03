const palavras = [
  "CASAS","LIVRO","PLANO","CARRO","NOITE","FELIZ",
  "VERDE","AMIGO","PEDRA","PRAIA","NORTE","SORTE",
  "FUGIR","DORES","RISCO","CANTO","FORTE","MUNDO"
];

let respostas = [];
let linhaAtual = 0;
let colunaAtual = 0;
let tentativasMax = 6;
let ativo = false;

const tecladoLayout = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"]
];

function iniciarJogo(qtd) {
  respostas = [];
  linhaAtual = 0;
  colunaAtual = 0;
  ativo = true;

  tentativasMax = qtd === 1 ? 6 : qtd === 2 ? 8 : 10;

  document.getElementById("jogos").innerHTML = "";
  document.getElementById("mensagem").innerText = "";

  for (let i = 0; i < qtd; i++) {
    respostas.push(palavras[Math.floor(Math.random() * palavras.length)]);
    const jogo = document.createElement("div");
    jogo.className = "jogo";
    jogo.id = `jogo-${i}`;

    for (let l = 0; l < tentativasMax; l++) {
      const linha = document.createElement("div");
      linha.className = "linha";
      for (let c = 0; c < 5; c++) {
        const letra = document.createElement("div");
        letra.className = "letra";
        linha.appendChild(letra);
      }
      jogo.appendChild(linha);
    }
    document.getElementById("jogos").appendChild(jogo);
  }

  criarTeclado();
}

function criarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";

  tecladoLayout.forEach(linha => {
    const divLinha = document.createElement("div");
    divLinha.className = "linha-teclado";

    linha.forEach(tecla => {
      const btn = document.createElement("div");
      btn.className = "tecla";
      if (tecla === "ENTER" || tecla === "⌫") btn.classList.add("grande");
      btn.innerText = tecla;
      btn.onclick = () => teclaPressionada(tecla);
      divLinha.appendChild(btn);
    });

    teclado.appendChild(divLinha);
  });
}

function teclaPressionada(tecla) {
  if (!ativo) return;

  if (tecla === "ENTER") return enviar();
  if (tecla === "⌫") return apagar();

  if (colunaAtual < 5) {
    document.querySelectorAll(".linha")[linhaAtual]
      .children[colunaAtual].innerText = tecla;
    colunaAtual++;
  }
}

function apagar() {
  if (colunaAtual > 0) {
    colunaAtual--;
    document.querySelectorAll(".linha")[linhaAtual]
      .children[colunaAtual].innerText = "";
  }
}

function enviar() {
  if (colunaAtual < 5) return;

  respostas.forEach((resposta, idx) => {
    const linha = document.getElementById(`jogo-${idx}`)
      .children[linhaAtual];

    [...linha.children].forEach((div, i) => {
      div.classList.add("flip");
      if (div.innerText === resposta[i]) div.classList.add("certa");
      else if (resposta.includes(div.innerText)) div.classList.add("existe");
      else div.classList.add("errada");
    });
  });

  linhaAtual++;
  colunaAtual = 0;

  if (linhaAtual === tentativasMax) {
    ativo = false;
    document.getElementById("mensagem").innerText = "Fim de jogo 😭";
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") enviar();
  else if (e.key === "Backspace") apagar();
  else if (/^[a-zA-Z]$/.test(e.key))
    teclaPressionada(e.key.toUpperCase());
});
