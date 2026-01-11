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
// Carrossel arrastável com o mouse
const carousel = document.getElementById('portfolio-carousel');
if (carousel) {
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', e => {
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2; // velocidade
    carousel.scrollLeft = scrollLeft - walk;
  });
  }

  // Carousel do portfólio com auto-scroll pausado + arraste do usuário
  const portfolioCarousel = document.querySelector('.portfolio-carousel');
  if (portfolioCarousel) {
    // Clonar itens para efeito infinito
    const items = Array.from(portfolioCarousel.querySelectorAll('.portfolio-item'));
    const itemCount = items.length;
    
    // Duplicar itens 3x para garantir loop suave
    const clonedItems = [];
    for (let i = 0; i < 3; i++) {
      items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('cloned');
        portfolioCarousel.appendChild(clone);
        clonedItems.push(clone);
      });
    }

    let isDownPortfolio = false;
    let startXPortfolio;
    let scrollLeftPortfolio;
    let isAutoScrolling = true;
    let autoScrollTimeoutId;
    const autoScrollInterval = 3000; // Pausa de 3 segundos entre slides
    const pauseDuration = 5000; // Pausa de 5 segundos quando usuário interage

    // Calcula a largura de um item + gap para saber quanto scrollar
    function getScrollDistance() {
      const firstItem = portfolioCarousel.querySelector('.portfolio-item');
      if (!firstItem) return 0;
      const itemWidth = firstItem.offsetWidth;
      const gap = parseFloat(getComputedStyle(portfolioCarousel).gap) || 16;
      return itemWidth + gap;
    }

    // Função para resetar posição quando chega ao fim (loop infinito)
    function handleInfiniteScroll() {
      const maxScroll = portfolioCarousel.scrollWidth - portfolioCarousel.clientWidth;
      const threshold = maxScroll * 0.5; // Reseta quando chega na metade

      if (portfolioCarousel.scrollLeft >= threshold) {
        // Volta para o início sem transição (instantâneo)
        portfolioCarousel.style.scrollBehavior = 'auto';
        portfolioCarousel.scrollLeft = 0;
        // Reativa smooth após resetar
        setTimeout(() => {
          portfolioCarousel.style.scrollBehavior = 'smooth';
        }, 50);
      }
    }

    // Auto-scroll para próximo item
    function scrollToNextItem() {
      if (isAutoScrolling && !isDownPortfolio) {
        const scrollDistance = getScrollDistance();
        portfolioCarousel.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        
        // Verifica reset após a animação
        setTimeout(() => {
          handleInfiniteScroll();
        }, 600);
      }

      // Agenda próximo slide
      if (isAutoScrolling) {
        autoScrollTimeoutId = setTimeout(scrollToNextItem, autoScrollInterval);
      }
    }

    // Iniciar auto-scroll após 2 segundos (delay inicial)
    autoScrollTimeoutId = setTimeout(scrollToNextItem, 2000);

    function pauseAutoScroll() {
      isAutoScrolling = false;
      if (autoScrollTimeoutId) clearTimeout(autoScrollTimeoutId);
    }

    function resumeAutoScrollWithDelay() {
      isAutoScrolling = true;
      // Pausa mais longa após interação do usuário
      autoScrollTimeoutId = setTimeout(scrollToNextItem, pauseDuration);
    }

    // Handlers de interação — permite arrastar e pausa auto-scroll
    portfolioCarousel.addEventListener('pointerdown', e => {
      isDownPortfolio = true;
      pauseAutoScroll();
      portfolioCarousel.classList.add('dragging');
      portfolioCarousel.style.scrollBehavior = 'auto';
      portfolioCarousel.setPointerCapture(e.pointerId);
      startXPortfolio = e.clientX;
      scrollLeftPortfolio = portfolioCarousel.scrollLeft;
    });

    portfolioCarousel.addEventListener('pointermove', e => {
      if (!isDownPortfolio) return;
      e.preventDefault();
      const dx = e.clientX - startXPortfolio;
      portfolioCarousel.scrollLeft = scrollLeftPortfolio - dx;
    });

    portfolioCarousel.addEventListener('pointerup', e => {
      isDownPortfolio = false;
      portfolioCarousel.classList.remove('dragging');
      portfolioCarousel.style.scrollBehavior = 'smooth';
      try { portfolioCarousel.releasePointerCapture(e.pointerId); } catch (err) {}
      handleInfiniteScroll();
      resumeAutoScrollWithDelay(); // Retoma com pausa maior
    });

    portfolioCarousel.addEventListener('pointercancel', () => {
      isDownPortfolio = false;
      portfolioCarousel.classList.remove('dragging');
      portfolioCarousel.style.scrollBehavior = 'smooth';
      resumeAutoScrollWithDelay();
    });

    // Pausa auto-scroll quando usuário usa scroll manual (mouse wheel ou touch)
    let scrollTimeout;
    portfolioCarousel.addEventListener('scroll', () => {
      if (!isDownPortfolio && isAutoScrolling) {
        pauseAutoScroll();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          resumeAutoScrollWithDelay();
        }, 1000);
      }
    }, { passive: true });
  }

  // Setores agora são estáticos (grid fixo) - código de animação removido
    // Suporte a roda do mouse para navegar horizontalmente
    setoresGrid.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        setoresGrid.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  }
