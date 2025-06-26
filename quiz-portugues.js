// Quiz de Português - 9º Ano
const quizData = [
    {
        question: "Qual é a função sintática do termo destacado na frase: 'O menino *estudioso* passou no vestibular'?",
        options: ["Sujeito", "Predicado", "Adjunto adnominal", "Complemento nominal"],
        correct: 2,
        explanation: "O termo 'estudioso' caracteriza o substantivo 'menino', exercendo função de adjunto adnominal."
    },
    {
        question: "Em qual período literário se enquadra a obra 'O Cortiço' de Aluísio Azevedo?",
        options: ["Romantismo", "Realismo", "Naturalismo", "Parnasianismo"],
        correct: 2,
        explanation: "'O Cortiço' é uma obra naturalista, retratando a sociedade de forma científica e determinista."
    },
    {
        question: "Qual figura de linguagem está presente na frase: 'Suas palavras foram punhais em meu coração'?",
        options: ["Metáfora", "Metonímia", "Hipérbole", "Personificação"],
        correct: 0,
        explanation: "A metáfora compara as palavras a punhais, estabelecendo uma relação de semelhança implícita."
    },
    {
        question: "Qual é o plural correto da palavra 'cidadão'?",
        options: ["Cidadões", "Cidadãos", "Cidadans", "Cidadões"],
        correct: 1,
        explanation: "O plural de 'cidadão' é 'cidadãos', seguindo a regra dos substantivos terminados em -ão."
    },
    {
        question: "Na oração 'Espero que você venha amanhã', a oração subordinada é:",
        options: ["Substantiva objetiva direta", "Adjetiva restritiva", "Adverbial temporal", "Substantiva subjetiva"],
        correct: 0,
        explanation: "A oração 'que você venha amanhã' funciona como objeto direto do verbo 'espero'."
    },
    {
        question: "Qual é a figura de linguagem em 'O vento sussurrava segredos'?",
        options: ["Metáfora", "Personificação", "Hipérbole", "Comparação"],
        correct: 1,
        explanation: "A personificação atribui características humanas (sussurrar) a seres inanimados (vento)."
    },
    {
        question: "Em 'O Cortiço', Aluísio Azevedo retrata principalmente:",
        options: ["A vida da aristocracia", "O cotidiano urbano popular", "As paisagens rurais", "Os costumes indígenas"],
        correct: 1,
        explanation: "'O Cortiço' é uma obra naturalista que retrata a vida das classes populares urbanas."
    },
    {
        question: "Qual é o sujeito da oração 'Chegaram as encomendas'?",
        options: ["Chegaram", "As encomendas", "Encomendas", "Sujeito oculto"],
        correct: 1,
        explanation: "'As encomendas' é o sujeito simples da oração, pois é quem pratica a ação de chegar."
    },
    {
        question: "O Romantismo no Brasil teve como característica principal:",
        options: ["O cientificismo", "O nacionalismo", "O realismo social", "O experimentalismo"],
        correct: 1,
        explanation: "O Romantismo brasileiro se caracterizou pelo nacionalismo, exaltando a natureza e os heróis nacionais."
    },
    {
        question: "Qual é a classe gramatical da palavra 'muito' em 'Ele é muito inteligente'?",
        options: ["Adjetivo", "Substantivo", "Advérbio", "Pronome"],
        correct: 2,
        explanation: "'Muito' é um advérbio de intensidade, modificando o adjetivo 'inteligente'."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Elementos DOM
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const progressBar = document.getElementById('progressBar');
const results = document.getElementById('results');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById('scoreMessage');
const scorePercentage = document.getElementById('scorePercentage');
const restartBtn = document.getElementById('restartBtn');
const questionCard = document.getElementById('questionCard');

// Inicializar quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    totalQuestionsSpan.textContent = quizData.length;
    results.style.display = 'none';
    questionCard.style.display = 'block';
    showQuestion();
}

// Mostrar pergunta atual
function showQuestion() {
    const question = quizData[currentQuestionIndex];
    
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Limpar opções anteriores
    optionsContainer.innerHTML = '';
    
    // Criar opções
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        optionsContainer.appendChild(optionElement);
    });
    
    // Resetar botão
    nextBtn.disabled = true;
    selectedAnswer = null;
    
    // Animação
    questionCard.classList.add('fade-in');
    setTimeout(() => questionCard.classList.remove('fade-in'), 500);
}

// Selecionar opção
function selectOption(index, element) {
    // Remover seleção anterior
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Selecionar nova opção
    element.classList.add('selected');
    selectedAnswer = index;
    nextBtn.disabled = false;
}

// Próxima pergunta
function nextQuestion() {
    const question = quizData[currentQuestionIndex];
    
    // Verificar resposta
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Contar pontos
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Desabilitar cliques
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Mostrar explicação se disponível
    if (question.explanation) {
        setTimeout(() => {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'explanation';
            explanationDiv.style.cssText = `
                background: #f0f9ff;
                border: 1px solid #0ea5e9;
                border-radius: 8px;
                padding: 15px;
                margin-top: 15px;
                font-size: 0.9rem;
                color: #0c4a6e;
            `;
            explanationDiv.innerHTML = `<strong>💡 Explicação:</strong> ${question.explanation}`;
            optionsContainer.appendChild(explanationDiv);
        }, 500);
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 6000);
}

// Mostrar resultados
function showResults() {
    questionCard.style.display = 'none';
    results.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    finalScore.textContent = `${score}/${quizData.length}`;
    scorePercentage.textContent = `${percentage}% de acertos`;
    
    let message = '';
    if (percentage >= 80) {
        message = '🏆 Excelente! Você domina bem a língua portuguesa!';
    } else if (percentage >= 60) {
        message = '👍 Muito bom! Continue estudando gramática!';
    } else if (percentage >= 40) {
        message = '📚 Bom trabalho! Revise os conteúdos de português!';
    } else {
        message = '💪 Continue praticando! A gramática requer dedicação!';
    }
    
    scoreMessage.textContent = message;
    results.classList.add('bounce');
    setTimeout(() => results.classList.remove('bounce'), 600);
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', initQuiz);

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initQuiz);