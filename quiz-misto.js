// Quiz Misto - 2 perguntas de programação + 3 de conhecimentos gerais
const quizData = [
    {
        question: "Qual linguagem de programação é conhecida como a 'linguagem da web'?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correct: 1,
        category: "programação"
    },
    {
        question: "O que significa HTML?",
        options: ["High Tech Modern Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: 1,
        category: "programação"
    },
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2,
        category: "geografia"
    },
    {
        question: "Quem pintou a obra 'Mona Lisa'?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
        correct: 2,
        category: "arte"
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Saturno", "Netuno", "Júpiter"],
        correct: 3,
        category: "ciências"
    },
    {
        question: "Em que linguagem é escrito o código que roda no navegador?",
        options: ["Python", "Java", "JavaScript", "C#"],
        correct: 2,
        category: "programação"
    },
    {
        question: "Qual é a fórmula da água?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correct: 0,
        category: "química"
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"],
        correct: 1,
        category: "literatura"
    },
    {
        question: "Qual tag HTML é usada para criar um link?",
        options: ["<link>", "<a>", "<url>", "<href>"],
        correct: 1,
        category: "programação"
    },
    {
        question: "Em que ano o Brasil foi descoberto?",
        options: ["1498", "1500", "1502", "1504"],
        correct: 1,
        category: "história"
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
    
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
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
        message = '🏆 Excelente! Você domina bem os assuntos!';
    } else if (percentage >= 60) {
        message = '👍 Muito bom! Continue estudando!';
    } else if (percentage >= 40) {
        message = '📚 Bom trabalho! Há espaço para melhorar!';
    } else {
        message = '💪 Continue praticando! Você vai conseguir!';
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