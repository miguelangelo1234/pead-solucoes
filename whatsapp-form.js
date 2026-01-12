// ==== CONFIGURAÇÃO DO WHATSAPP ====
// PEAD Soluções em Soldas
const WHATSAPP_NUMBER = "5519998398666"; // Formato: 55 + DDD + número sem formatação
// ====================================

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
        const empresa = document.getElementById("empresa")?.value.trim() || "";
        const assunto = document.getElementById("assunto")?.value.trim() || "";
        const mensagem = document.getElementById("mensagem")?.value.trim() || "";
        
        // Validação dos campos obrigatórios
        if (!nome || !assunto || !mensagem) {
            mostrarStatus("⚠️ Por favor, preencha todos os campos obrigatórios.", "erro");
            return;
        }
        
        // Monta a mensagem para WhatsApp com formatação
        let mensagemWhatsApp = `*Contato via PEAD Soluções*\n\n`;
        mensagemWhatsApp += `👤 *Nome:* ${nome}\n`;
        
        if (empresa) {
            mensagemWhatsApp += `🏢 *Empresa:* ${empresa}\n`;
        }
        
        mensagemWhatsApp += `📋 *Assunto:* ${assunto}\n`;
        mensagemWhatsApp += `💬 *Mensagem:*\n${mensagem}`;
        
        // Codifica a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
        
        // Monta a URL do WhatsApp
        const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;
        
        // Mostra status
        mostrarStatus("📱 Abrindo WhatsApp...", "enviando");
        
        // Abre o WhatsApp em uma nova aba
        setTimeout(() => {
            window.open(urlWhatsApp, "_blank");
            mostrarStatus("✅ WhatsApp aberto! Envie sua mensagem.", "sucesso");
            form.reset();
        }, 500);
    });
    
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
        
        // Auto-esconder mensagens de sucesso após 6 segundos
        if (tipo === "sucesso") {
            setTimeout(() => {
                if (statusEl.textContent.includes("WhatsApp aberto")) {
                    statusEl.textContent = "";
                    statusEl.className = "status";
                }
            }, 6000);
        }
    }
});
