// StudyBot Completo - IA Local
const StudyBot = {
    responses: {
        'funciona': 'A StudyConnect+ é uma plataforma 100% gratuita! Oferecemos cursos profissionais, quizzes educativos e professores especialistas. Clique em "Entrar" para se cadastrar e começar a estudar! 📚',
        'gratuito': 'Sim! Todos os nossos cursos são completamente gratuitos. Nossa missão é democratizar o acesso à educação de qualidade. Você não paga nada para aprender conosco! 🎉',
        'inscrever': 'Para se inscrever: 1) Clique em "Entrar" no menu superior, 2) Selecione "Criar conta", 3) Preencha seus dados, 4) Confirme seu email. Pronto! Você terá acesso completo à plataforma! ✨',
        'cursos': 'Oferecemos 4 cursos principais: Front-End Moderno (HTML, CSS, JS, React), Back-End Avançado (Node.js, MongoDB), Design UI/UX (Figma, Adobe XD) e Desenvolvimento Mobile (React Native, Flutter). Todos com certificado! 💻',
        'certificado': 'Sim! Ao concluir qualquer curso, você recebe um certificado digital gratuito reconhecido no mercado. Pode usar no LinkedIn e currículo! 🏆',
        'professores': 'Nossos professores são profissionais experientes de empresas como Google, Spotify, ex-funcionários de grandes techs. Maria Silva (Front-End), Carlos Souza (Back-End), Ana Lima (Design) e João Pereira (Mobile)! 👨‍🏫',
        'quiz': 'Temos 2 quizzes: Quiz Misto (10 perguntas de programação + cultura geral, nível fácil) e Quiz de Português (10 perguntas de gramática e literatura do 9º ano). Ambos são educativos e divertidos! 🧠',
        'contato': 'Para entrar em contato: Email contato@studyconnect.com (resposta em 24h), Telefone (11) 9999-9999 (Seg-Sex 9h-18h), ou use o formulário na seção "Contato"! 📧',
        'mobile': 'Sim! Nosso site é totalmente responsivo e funciona perfeitamente no celular e tablet. Você pode estudar onde e quando quiser! 📱',
        'tempo': 'Você estuda no seu ritmo! Os cursos ficam disponíveis 24/7, pode pausar e retomar quando quiser. Front-End (40h), Back-End (60h), Design (35h), Mobile (50h). Sem pressa! ⏰',
        'suporte': 'Oferecemos suporte completo: FAQ com IA (eu!), formulário de contato, email direto e telefone. Nossa equipe responde rapidamente para ajudar você! 🆘',
        'tecnologias': 'Ensinamos as tecnologias mais demandadas: HTML5, CSS3, JavaScript ES6+, React, Vue.js, Node.js, MongoDB, Express, Docker, Figma, Adobe XD, React Native, Flutter, Firebase e muito mais! 🚀'
    },

    init() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
        if (sendBtn) {
            sendBtn.onclick = (e) => {
                e.preventDefault();
                this.send();
            };
        }
        
        if (userInput) {
            userInput.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.send();
                }
            };
            userInput.onfocus = () => userInput.style.outline = 'none';
        }
        
        document.onclick = (e) => {
            if (e.target.classList.contains('quick-btn')) {
                this.addMessage(e.target.dataset.question, 'user');
                this.respond(e.target.dataset.question);
                document.getElementById('userInput').focus();
            }
        };
    },

    send() {
        const input = document.getElementById('userInput');
        const msg = input.value.trim();
        if (!msg) return;
        
        this.addMessage(msg, 'user');
        input.value = '';
        input.focus();
        this.respond(msg);
    },

    addMessage(text, type) {
        const messages = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.className = `message ${type}-message`;
        div.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    },

    respond(msg) {
        setTimeout(() => {
            const response = this.findResponse(msg.toLowerCase());
            this.addMessage(response, 'bot');
        }, 800);
    },

    findResponse(msg) {
        for (const [key, response] of Object.entries(this.responses)) {
            if (msg.includes(key)) return response;
        }
        
        // Respostas contextuais mais inteligentes
        if (msg.includes('preço') || msg.includes('pagar') || msg.includes('custo')) {
            return this.responses.gratuito;
        }
        if (msg.includes('cadastr') || msg.includes('registr') || msg.includes('criar conta')) {
            return this.responses.inscrever;
        }
        if (msg.includes('diploma') || msg.includes('certificação')) {
            return this.responses.certificado;
        }
        if (msg.includes('celular') || msg.includes('smartphone') || msg.includes('tablet')) {
            return this.responses.mobile;
        }
        if (msg.includes('quanto tempo') || msg.includes('duração') || msg.includes('horas')) {
            return this.responses.tempo;
        }
        if (msg.includes('ajuda') || msg.includes('problema') || msg.includes('dúvida')) {
            return this.responses.suporte;
        }
        if (msg.includes('linguagem') || msg.includes('framework') || msg.includes('tecnologia')) {
            return this.responses.tecnologias;
        }
        
        const defaultResponses = [
            'Posso ajudar com: cursos gratuitos, como se inscrever, certificados, professores, quizzes, suporte técnico ou tecnologias que ensinamos. O que você gostaria de saber? 🤔',
            'Estou aqui para esclarecer suas dúvidas sobre nossa plataforma! Pergunte sobre cursos, inscrições, certificados ou qualquer coisa relacionada ao StudyConnect+! 💭',
            'Não entendi sua pergunta, mas posso ajudar com informações sobre: cursos disponíveis, processo de inscrição, certificados, nossos professores ou como funciona a plataforma! 😊'
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
};

document.addEventListener('DOMContentLoaded', () => StudyBot.init());