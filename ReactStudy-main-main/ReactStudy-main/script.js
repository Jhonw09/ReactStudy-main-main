document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle'); // Usando ID
    const navList = document.getElementById('nav-list');
    const darkModeToggle = document.getElementById('darkModeToggle'); // Usando ID
    const sunIcon = darkModeToggle ? darkModeToggle.querySelector('.sun-icon') : null;
    const moonIcon = darkModeToggle ? darkModeToggle.querySelector('.moon-icon') : null;
    const body = document.body;

    const carouselImagesContainer = document.getElementById('carouselImages'); // Usando ID
    // Removidas as referências aos botões de navegação
    // const prevButton = document.getElementById('anterior');
    // const nextButton = document.getElementById('proximo');
    const navLinks = document.querySelectorAll('.nav-list a');

    let currentIndex = 0;
    let autoSlideInterval;
    let images = []; // Array para armazenar as imagens do carrossel

    // --- Função para Salvar Preferências do Tema ---
    const saveThemePreference = (isDarkMode) => {
        localStorage.setItem('darkMode', isDarkMode);
    };

    // --- Função para Carregar Preferências do Tema ---
    const loadThemePreference = () => {
        const isDarkMode = localStorage.getItem('darkMode');
        if (isDarkMode === 'true') {
            body.classList.add('dark-mode');
            if (sunIcon && moonIcon) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        } else {
            body.classList.remove('dark-mode');
            if (sunIcon && moonIcon) {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }
    };

    // --- Inicializa o Tema ao Carregar a Página ---
    loadThemePreference();

    // --- Alternar Menu Mobile ---
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Alternar Modo Escuro/Claro ---
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            saveThemePreference(isDarkMode);

            if (sunIcon && moonIcon) {
                if (isDarkMode) {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                } else {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                }
            }
        });
        // Adiciona acessibilidade de teclado para o toggle
        darkModeToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                darkModeToggle.click(); // Simula um clique para ativar o toggle
            }
        });
    }

    // --- Carrossel de Imagens (Apenas Automático) ---
    if (carouselImagesContainer) { // Verificação simplificada
        images = Array.from(carouselImagesContainer.children); // Converte HTMLCollection para Array
        const totalImages = images.length;

        const updateCarousel = () => {
            if (totalImages === 0) return;
            // Garante que a imagem exista antes de tentar acessar clientWidth
            const imageWidth = images[0] ? images[0].clientWidth : 0;
            carouselImagesContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
        };

        const showNextSlide = () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        };

        // Remove a função showPrevSlide, pois não haverá botões para ela
        // const showPrevSlide = () => {
        //     currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        //     updateCarousel();
        // };

        // Removidos os Event Listeners para botões do carrossel
        // nextButton.addEventListener('click', () => {
        //     clearInterval(autoSlideInterval);
        //     showNextSlide();
        //     startAutoSlide();
        // });

        // prevButton.addEventListener('click', () => {
        //     clearInterval(autoSlideInterval);
        //     showPrevSlide();
        //     startAutoSlide();
        // });

        // Auto-slide do carrossel
        const startAutoSlide = () => {
            // Limpa qualquer intervalo anterior para evitar duplicação
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(showNextSlide, 4000); // Mudar a cada 4 segundos
        };

        // Inicia o auto-slide quando a página carrega
        if (totalImages > 0) { // Inicia apenas se houver imagens
            startAutoSlide();
        }


        // Atualiza o carrossel se a janela for redimensionada
        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    // --- Animação de Rolagem Suave para Links de Âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adiciona a classe para scroll-behavior: smooth no CSS
                document.documentElement.classList.add('smooth-scroll');

                // Calcula a posição de rolagem ajustando para o cabeçalho fixo
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px para um pequeno padding extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Remove a classe após a rolagem para evitar conflitos com outras rolagens
                // Usa setTimeout para garantir que a classe seja removida após a rolagem completa
                setTimeout(() => {
                    document.documentElement.classList.remove('smooth-scroll');
                }, 800); // Tempo ligeiramente maior que a transição do scroll
            }
        });
    });

    // --- Funcionalidade de Envio de Formulário (Placeholder) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Aqui você adicionaria a lógica para enviar os dados do formulário
            // para um backend, por exemplo, usando Fetch API ou XMLHttpRequest.
            console.log('Dados do formulário enviados (simulado):');
            const formData = new FormData(this);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Exemplo de feedback para o usuário
            alert('Mensagem enviada com sucesso! (Esta é uma função simulada.)');
            this.reset(); // Limpa o formulário após o "envio"
        });
    }
});