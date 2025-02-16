# Criador:

**Nome:** Nooby-Oficial

<img src="https://github.com/user-attachments/assets/a0501c3d-7a52-4c05-b8f2-a62b76c1e46d" alt="Foto do Criador" width="95" style="border: 2px solid #000; border-radius: 5px;">

# Jogo do Número Secreto

Este é um jogo simples onde o objetivo é adivinhar o número secreto gerado aleatoriamente entre 1 e 10.

## Como Jogar

1. O jogo exibe uma mensagem inicial informando para escolher um número entre 1 e 10.
2. O jogador insere seu palpite no campo de entrada.
3. O jogo verifica o palpite:
   - Se o palpite estiver correto, o jogo informa que você acertou e quantas tentativas foram necessárias.
   - Se o palpite estiver incorreto, o jogo informa se o número secreto é maior ou menor e o jogador pode tentar novamente.
4. O jogo continua até que o jogador adivinhe o número secreto ou reinicie a partida.

## Tecnologias Utilizadas

- HTML
- JavaScript
- responsiveVoice.js (para leitura de texto em voz alta)

## Código Principal

```javascript
// Variáveis Gerais
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.0});
    document.getElementById('reiniciarChute').removeAttribute('disabled');
}

// Função para exibir mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10!');
}

// Exibir mensagem inicial
exibirMensagemInicial();

// Função para verificar o valor do chute
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciarChute').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

// Função para gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

