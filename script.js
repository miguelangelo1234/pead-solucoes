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

// Atualiza ano do rodapé
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Placeholder para envio do formulário (apenas front-end)
const form = document.querySelector('.form-contato');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensagem enviada! Em breve entraremos em contato.');
    form.reset();
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