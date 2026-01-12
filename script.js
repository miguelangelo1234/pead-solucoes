// Navegação suave ao clicar nos links do menu
document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    if (!section) return;

    const top = section.offsetTop - 70; // compensa o header fixo
    window.scrollTo({
      top,
      behavior: 'smooth'
    });

    // fecha o menu mobile ao clicar
    const navList = document.querySelector('.nav-list');
    navList.classList.remove('open');
  });
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// ===== ANIMAÇÕES AO ROLAR A PÁGINA =====
// Intersection Observer para animar elementos quando entram na viewport
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px' // começa a animar antes de chegar ao topo
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Encontra a classe de animação que o elemento possui
        const animClasses = Array.from(entry.target.classList).filter(c => c.startsWith('animate-'));
        
        if (animClasses.length > 0) {
          entry.target.classList.remove(...animClasses);
          // Força reflow para reiniciar animação
          void entry.target.offsetWidth;
          entry.target.classList.add(...animClasses);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observa todos os elementos com classe de animação
  document.querySelectorAll('[class*="animate-"]').forEach(el => {
    observer.observe(el);
  });
});

// Atualiza ano do rodapé
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Placeholder para envio do formulário (integração com EmailJS)
const form = document.querySelector('.form-contato');
if (form) {
  // Inicializar EmailJS (necessário antes de usar)
  emailjs.init("YOUR_PUBLIC_KEY"); // Substitua pela sua public key do EmailJS

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação simples
    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Mostrar feedback ao usuário
    const btn = form.querySelector('button[type="submit"]');
    const btnOriginalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      // Enviar email via EmailJS
      await emailjs.send(
        'service_pead', // Substitua pelo seu Service ID
        'template_pead', // Substitua pelo seu Template ID
        {
          from_name: nome,
          from_email: email,
          message: mensagem,
          to_email: 'contato@pead.com.br' // Email destino
        }
      );

      // Sucesso
      alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      form.reset();
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      btn.textContent = btnOriginalText;
      btn.disabled = false;
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
    // Dados do portfólio compacto - Imagens dos trabalhos
    const portfolioCompact = [
        {
            id: 1,
            title: "Solda de Tubulações PEAD",
            description: "Processo de solda em tubulações de alta densidade",
            url: "imagens/trabalho-1.svg"
        },
        {
            id: 2,
            title: "Equipamentos de Termofusão",
            description: "Máquinas especializadas para fusão de tubos",
            url: "imagens/trabalho-2.svg"
        },
        {
            id: 3,
            title: "Instalação em Engenharia Civil",
            description: "Aplicação em projetos de infraestrutura",
            url: "imagens/trabalho-3.svg"
        },
        {
            id: 4,
            title: "Conexões de Eletrofusão",
            description: "Conexões certificadas para máxima segurança",
            url: "imagens/trabalho-4.svg"
        },
        {
            id: 5,
            title: "Treinamentos Técnicos",
            description: "Capacitação de equipes em solda PEAD",
            url: "imagens/trabalho-5.svg"
        },
        {
            id: 6,
            title: "Projetos de Saneamento",
            description: "Soluções para redes de água e esgoto",
            url: "imagens/trabalho-6.svg"
        },
        {
            id: 7,
            title: "Indústria Farmacêutica",
            description: "Aplicações em ambientes controlados",
            url: "imagens/trabalho-7.svg"
        },
        {
            id: 8,
            title: "Distribuição de Gás",
            description: "Sistemas seguros para gás natural",
            url: "imagens/trabalho-8.svg"
        },
        {
            id: 9,
            title: "Indústria Química",
            description: "Resistência química em processos industriais",
            url: "imagens/trabalho-9.svg"
        },
        {
            id: 10,
            title: "Suporte Técnico Especializado",
            description: "Acompanhamento completo de projetos",
            url: "imagens/trabalho-10.svg"
        }
    ];

    // Elementos do DOM
    const currentPhoto = document.getElementById('compact-photo');
    const photoTitle = document.getElementById('compact-title');
    const photoDescription = document.getElementById('compact-description');
    const currentNumber = document.getElementById('compact-current');
    const totalPhotos = document.getElementById('compact-total');
    const prevBtn = document.getElementById('compact-prev');
    const nextBtn = document.getElementById('compact-next');
    const thumbnailsContainer = document.getElementById('compact-thumbnails');

    // Estado
    let currentIndex = 0;
    const total = portfolioCompact.length;
    let isTransitioning = false;

    // Inicialização
    function initCompactPortfolio() {
        totalPhotos.textContent = total;
        loadThumbnails();
        loadPhoto(currentIndex);
        setupEventListeners();
    }

    // Carregar miniaturas
    function loadThumbnails() {
        thumbnailsContainer.innerHTML = '';
        
        portfolioCompact.forEach((photo, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-compact';
            if (index === currentIndex) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = `Thumb: ${photo.title}`;
            img.loading = 'lazy';
            
            thumbnail.appendChild(img);
            thumbnailsContainer.appendChild(thumbnail);
            
            thumbnail.addEventListener('click', () => {
                if (isTransitioning || index === currentIndex) return;
                currentIndex = index;
                loadPhoto(currentIndex);
                updateActiveThumbnail();
            });
        });
    }

    // Carregar foto com transição
    function loadPhoto(index) {
        if (isTransitioning) return;
        
        const photo = portfolioCompact[index];
        
        // Iniciar transição
        isTransitioning = true;
        currentPhoto.classList.add('fade-out');
        
        setTimeout(() => {
            currentPhoto.src = photo.url;
            currentPhoto.alt = photo.title;
            photoTitle.textContent = photo.title;
            photoDescription.textContent = photo.description;
            currentNumber.textContent = index + 1;
            
            currentPhoto.classList.remove('fade-out');
            currentPhoto.classList.add('fade-in');
            
            setTimeout(() => {
                currentPhoto.classList.remove('fade-in');
                isTransitioning = false;
            }, 400);
            
            updateActiveThumbnail();
            
            // Rolagem suave para a miniatura ativa (em telas pequenas)
            if (window.innerWidth < 768) {
                const activeThumb = document.querySelector('.thumbnail-compact.active');
                if (activeThumb) {
                    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }, 300);
    }

    // Atualizar miniatura ativa
    function updateActiveThumbnail() {
        document.querySelectorAll('.thumbnail-compact').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    // Navegação
    function nextPhoto() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % total;
        loadPhoto(currentIndex);
    }

    function prevPhoto() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + total) % total;
        loadPhoto(currentIndex);
    }

    // Event Listeners
    function setupEventListeners() {
        prevBtn.addEventListener('click', prevPhoto);
        nextBtn.addEventListener('click', nextPhoto);
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            // Só funciona se o portfólio estiver visível na tela
            const portfolioRect = document.querySelector('.portfolio-compacto').getBoundingClientRect();
            const isVisible = portfolioRect.top < window.innerHeight && portfolioRect.bottom >= 0;
            
            if (!isVisible || isTransitioning) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevPhoto();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextPhoto();
            } else if (e.key === 'Home') {
                e.preventDefault();
                currentIndex = 0;
                loadPhoto(currentIndex);
            } else if (e.key === 'End') {
                e.preventDefault();
                currentIndex = total - 1;
                loadPhoto(currentIndex);
            }
        });
        
        // Toque para mobile
        let touchStartX = 0;
        const photoWrapper = document.querySelector('.photo-wrapper');
        
        photoWrapper.addEventListener('touchstart', (e) => {
            if (isTransitioning) return;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        photoWrapper.addEventListener('touchend', (e) => {
            if (isTransitioning) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextPhoto();
                } else {
                    prevPhoto();
                }
            }
        }, { passive: true });
        
        // Auto-play opcional (descomente se quiser)
        /*
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextPhoto, 5000);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Iniciar auto-play
        startAutoPlay();
        
        // Pausar auto-play quando o mouse estiver sobre o portfólio
        const portfolioSection = document.querySelector('.portfolio-compacto');
        portfolioSection.addEventListener('mouseenter', stopAutoPlay);
        portfolioSection.addEventListener('mouseleave', startAutoPlay);
        
        // Pausar auto-play quando tocar em dispositivos móveis
        portfolioSection.addEventListener('touchstart', stopAutoPlay);
        */
    }

    // Inicializar
    initCompactPortfolio();
});
