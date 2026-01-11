// ==== SUAS CHAVES EMAILJS ====
// Public Key (Account → API keys → Public Key)
const PUBLIC_KEY  = "F4lffGxGE6CJgJI0W";
// Service ID (Menu esquerdo → Serviços de e-mail)
const SERVICE_ID  = "service_cj1cmrw";
// Template ID (Menu esquerdo → Modelos de e-mail)
const TEMPLATE_ID = "template_iimfkvr";
// ==============================

// Inicializa EmailJS
(function() {
    emailjs.init(PUBLIC_KEY);
})();

// Configura o formulário quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contato-form");
    const statusEl = document.getElementById("status");
    
    if (!form) {
        console.error("❌ Formulário com ID 'contato-form' não encontrado!");
        return;
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Coleta dados do formulário
        const nome = document.getElementById("nome")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const mensagem = document.getElementById("mensagem")?.value.trim() || "";
        
        // Validação dos campos
        if (!nome || !email || !mensagem) {
            mostrarStatus("⚠️ Por favor, preencha todos os campos.", "erro");
            return;
        }
        
        // Validação de email simples
        if (!validarEmail(email)) {
            mostrarStatus("⚠️ Por favor, insira um e-mail válido.", "erro");
            return;
        }
        
        // Mostra status de envio
        mostrarStatus("📤 Enviando sua mensagem...", "enviando");
        
        // Dados que serão enviados para o template
        const templateParams = {
            from_name: nome,
            from_email: email,
            message: mensagem,
            to_email: "githubpll@gmail.com",
            empresa: "PEAD Soluções em Soldas",
            data: new Date().toLocaleDateString('pt-BR'),
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        
        // Envia via EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log("✅ Email enviado com sucesso!", response);
            mostrarStatus("✅ Mensagem enviada com sucesso! Em breve entraremos em contato.", "sucesso");
            form.reset(); // Limpa o formulário
        })
        .catch(function(error) {
            console.error("❌ Erro ao enviar email:", error);
            
            // Mensagens de erro mais amigáveis
            let mensagemErro = "Erro ao enviar mensagem. Tente novamente.";
            
            if (error.status === 400) {
                mensagemErro = "Erro na configuração do serviço. Verifique as chaves.";
            } else if (error.status === 401) {
                mensagemErro = "Chave de API inválida ou expirada.";
            } else if (error.status === 429) {
                mensagemErro = "Muitas tentativas. Aguarde alguns minutos.";
            } else if (error.text) {
                // Tenta extrair mensagem de erro do EmailJS
                try {
                    const erroObj = JSON.parse(error.text);
                    if (erroObj.message) mensagemErro = erroObj.message;
                } catch {
                    mensagemErro = error.text;
                }
            }
            
            mostrarStatus("❌ " + mensagemErro, "erro");
        });
    });
    
    // Função para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Função para mostrar status
    function mostrarStatus(mensagem, tipo) {
        if (!statusEl) return;
        
        statusEl.textContent = mensagem;
        statusEl.className = "status";
        
        switch(tipo) {
            case "enviando":
                statusEl.classList.add("status-enviando");
                break;
            case "sucesso":
                statusEl.classList.add("status-sucesso");
                break;
            case "erro":
                statusEl.classList.add("status-erro");
                break;
        }
        
        // Auto-esconder mensagens de sucesso após 5 segundos
        if (tipo === "sucesso") {
            setTimeout(() => {
                if (statusEl.textContent.includes("sucesso")) {
                    statusEl.textContent = "";
                    statusEl.className = "status";
                }
            }, 5000);
        }
    }
});
