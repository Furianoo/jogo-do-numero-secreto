let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

// Exibe texto na tela e utiliza o recurso de voz
function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Verifica se o navegador suporta a Web Speech API
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';  // Define o idioma como português brasileiro
        utterance.rate = 1.2;  // Define a taxa de fala
        window.speechSynthesis.speak(utterance);  // Inicia a fala
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
    exibirTextoNaTela('#tentativas', `Tentativas: ${tentativas}`);
}

// Verifica o chute do usuário
function verificarChute() {
    const chute = parseInt(document.querySelector('#chute').value);
    
    if (!chute || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', 'Por favor, insira um número válido entre 1 e 100.');
        return;
    }

    tentativas++;
    exibirTextoNaTela('#tentativas', `Tentativas: ${tentativas}`);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('p', chute > numeroSecreto 
            ? 'O número secreto é menor.' 
            : 'O número secreto é maior.');
        limparCampo();
    }
}

// Gera um número aleatório e evita repetições
function gerarNumeroAleatorio() {
    const numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;

    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Limpa o campo de entrada
function limparCampo() {
    document.querySelector('#chute').value = '';
}

// Reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Inicializa o jogo
exibirMensagemInicial();
