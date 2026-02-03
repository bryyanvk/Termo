const palavras = [
  "CASAS", "LIVRO", "PLANO", "CARRO",
  "NOITE", "FELIZ", "VERDE", "AMIGO"
];

let respostas = [];
let linhaAtual = 0;

function iniciarJogo(qtd) {
  respostas = [];
  linhaAtual = 0;
  document.getElementById("jogos").innerHTML = "";

  for (let i = 0; i < qtd; i++) {
    respostas.push(palavras[Math.floor(Math.random() * palavras.length)]);
    
    const jogo = document.createElement("div");
    jogo.className = "jogo";
    jogo.id = `jogo-${i}`;
    document.getElementById("jogos").appendChild(jogo);
  }
}

function enviar() {
  const input = document.getElementById("palpite");
  const palavra = input.value.toUpperCase();

  if (palavra.length !== 5) return alert("Use 5 letras");

  respostas.forEach((resposta, index) => {
    const jogo = document.getElementById(`jogo-${index}`);

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

      jogo.appendChild(div);
    }
  });

  input.value = "";
  linhaAtual++;
}
