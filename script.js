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

document.addEventListener('DOMContentLoaded', function() {
    // Dados do portfólio compacto - Imagens dos trabalhos
    const portfolioCompact = [
        {
            id: 1,
            title: "Solda de Tubulação PEAD",
            description: "Instalação de sistema de distribuição de água",
            url: "imagens/portfolio/foto1.jpeg"
        },
        {
            id: 2,
            title: "Projeto de Saneamento",
            description: "Rede de esgoto em PEAD para obra pública",
            url: "imagens/portfolio/foto2.jpeg"
        },
        {
            id: 3,
            title: "Treinamento Técnico",
            description: "Capacitação em termofusão para equipe",
            url: "imagens/portfolio/foto3.jpeg"
        },
        {
            id: 4,
            title: "Sistema Industrial",
            description: "Tubulação PEAD para indústria química",
            url: "imagens/portfolio/foto4.jpeg"
        },
        {
            id: 5,
            title: "Infraestrutura Rural",
            description: "Projeto de irrigação com PEAD",
            url: "imagens/portfolio/foto5.jpeg"
        },
        {
            id: 6,
            title: "Manutenção Preventiva",
            description: "Inspeção e manutenção de rede existente",
            url: "imagens/portfolio/foto6.jpeg"
        },
        {
            id: 7,
            title: "Instalação de Conexões",
            description: "Eletrofusão em diâmetro DN 200",
            url: "imagens/portfolio/foto7.jpeg"
        },
        {
            id: 8,
            title: "Obra de Gás Natural",
            description: "Rede de distribuição de gás com PEAD",
            url: "imagens/portfolio/foto8.jpeg"
        },
        {
            id: 9,
            title: "Sistema de Drenagem",
            description: "Projeto sustentável para controle de águas pluviais",
            url: "imagens/portfolio/foto9.jpeg"
        },
        {
            id: 10,
            title: "Certificação de Qualidade",
            description: "Testes e certificações em obra finalizada",
            url: "imagens/portfolio/foto10.jpeg"
        },
        {
            id: 11,
            title: "Projeto Especializado",
            description: "Soluções customizadas para necessidades específicas",
            url: "imagens/portfolio/foto11.jpeg"
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


