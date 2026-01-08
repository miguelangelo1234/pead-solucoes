// Front-end: envio do formulário para /send-email
document.addEventListener('DOMContentLoaded', () => {
  // Navegação suave ao clicar nos links do menu
  document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const section = document.getElementById(targetId);
      if (!section) return;

      const top = section.offsetTop - 70; // compensa o header fixo
      window.scrollTo({ top, behavior: 'smooth' });

      const navList = document.querySelector('.nav-list');
      navList.classList.remove('open');
    });
  });

  // Menu mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => navList.classList.toggle('open'));
  }

  // Atualiza ano do rodapé
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Formulário de contato: envia para /send-email
  const form = document.querySelector('.form-contato');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';

      try {
        const res = await fetch('/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, mensagem })
        });

        const data = await res.json();
        if (res.ok && data.ok) {
          alert('Mensagem enviada com sucesso!');
          form.reset();
        } else {
          alert('Erro ao enviar mensagem: ' + (data.error || 'unknown'));
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao enviar mensagem. Verifique a conexão e tente novamente.');
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
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

    carousel.addEventListener('mouseleave', () => { isDown = false; carousel.classList.remove('dragging'); });
    carousel.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('dragging'); });

    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
});
