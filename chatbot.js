// StudyBot - Assistente Virtual Simples
class StudyBot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        
        this.responses = {
            'funciona': 'A StudyConnect+ é gratuita! Acesse cursos, faça quizzes e aprenda com professores experientes. Clique em "Entrar" para começar! 📚',
            'gratuito': 'Sim! Todos os cursos são 100% gratuitos. Nossa missão é democratizar a educação! 🎉',
            'inscrever': 'Clique em "Entrar" no menu, depois "Criar conta". Preencha seus dados e pronto! ✨',
            'cursos': 'Temos Front-End, Back-End, Design UI/UX e Mobile. Todos com certificado gratuito! 💻',
            'certificado': 'Sim! Certificado digital gratuito ao concluir qualquer curso! 🏆',
            'professores': 'Profissionais de Google, Spotify e outras grandes empresas! 👨‍🏫',
            'quiz': 'Quiz Misto (programação + cultura geral) e Quiz de Português (9º ano)! 🧠',
            'contato': 'Use a seção "Contato" ou email: contato@studyconnect.com. Resposta em 24h! 📧',
            'mobile': 'Site totalmente responsivo! Estude no celular quando quiser! 📱'
        };
        
        this.init();
    }
    
    init() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                this.addUserMessage(question);
                this.processMessage(question);
            }
        });
    }
    
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.userInput.value = '';
        this.processMessage(message);
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        
        setTimeout(() => {
            typingDiv.remove();
        }, 1500);
    }
    
    processMessage(message) {
        this.showTyping();
        
        setTimeout(() => {
            const response = this.findResponse(message.toLowerCase());
            this.addBotMessage(response);
        }, 1500);
    }
    
    findResponse(message) {
        for (const [key, response] of Object.entries(this.responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        // Respostas padrão
        const defaultResponses = [
            'Posso ajudar com: cursos, inscrição, certificados, professores ou quizzes. O que você gostaria de saber? 🤔',
            'Não entendi. Pergunte sobre: cursos gratuitos, como se inscrever, certificados ou professores! 💭',
            'Tente perguntar sobre nossos cursos, quizzes ou como funciona a plataforma! 😊'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Inicializar chatbot quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new StudyBot();
});