//Variaveis Geral:
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Função - Codigo sem simplificar:
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto!';
//e
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10!';

//Função - Codigo semplificado, utilizado para qual nova modificação de texto:
function exibirTextoNaTela(tag, Texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = Texto;
    responsiveVoice.speak(Texto, 'Brazilian Portuguese Female', {rate: 1.0});
    document.getElementById('reiniciarChute').removeAttribute('disabled');
}

//Função contem mensagem inicial do jogo:
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10!');
}

//Função exibi mensagem inicial - Geral:
exibirMensagemInicial();

//Função verifica o valor do chute - certo ou errado:
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o númeor secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciarChute').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto e menor!');
        }else{
            exibirTextoNaTela('p', 'O número secreto e maior!');
        }
        tentativas++;
        limparCampo();
    }
}

//Função gerar número aleatorio e retorno o valor:
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//Função limpa o campo de chute para proxíma tentaiva:
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//Função retorno jogo ao status inicial - Nova partida:
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}