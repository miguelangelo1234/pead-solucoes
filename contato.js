// ==== COLOQUE SUAS CHAVES AQUI ====
// Public Key (Account → API keys → Public Key, começa com "public_")
const PUBLIC_KEY  = "F4lffGxGE6CJgJI0W";

// Service ID (Menu esquerdo → Serviços de e-mail → ID do serviço, ex.: service_cj1cmrw)
const SERVICE_ID  = "service_cj1cmrw";

// Template ID (Menu esquerdo → Modelos de e-mail → ID do modelo, ex.: template_abc123)
const TEMPLATE_ID = "template_iimfkvr";
// ==================================

// Inicializa o EmailJS com a sua Public Key
(function () {
  emailjs.init(PUBLIC_KEY);
})();

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contato-form");
  const statusEl = document.getElementById("status");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // impede o envio padrão do formulário

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
      statusEl.textContent = "Por favor, preencha todos os campos.";
      statusEl.className = "status status-erro";
      return;
    }

    statusEl.textContent = "Enviando mensagem...";
    statusEl.className = "status status-enviando";

    // Os nomes das chaves aqui (from_name, from_email, message)
    // DEVEM ser os mesmos usados no template do EmailJS
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name: nome,
        from_email: email,
        message: mensagem,
      })
      .then(function () {
        statusEl.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
        statusEl.className = "status status-sucesso";
        form.reset();
      })
      .catch(function (error) {
        console.error("Erro ao enviar:", error);
        statusEl.textContent = "Erro ao enviar mensagem. Tente novamente mais tarde.";
        statusEl.className = "status status-erro";
      });
  });
});