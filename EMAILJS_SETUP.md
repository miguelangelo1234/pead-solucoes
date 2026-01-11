# Configuração do EmailJS para Envio de Mensagens

## Passos para configurar:

1. **Criar conta no EmailJS**
   - Acesse: https://www.emailjs.com/
   - Crie uma conta gratuita

2. **Obter as credenciais**
   - Acesse o painel do EmailJS
   - Vá em **Account > General** e copie sua **Public Key**

3. **Configurar um Service (Gmail, Outlook, etc)**
   - No painel, vá em **Email Services**
   - Clique em **Add Service**
   - Escolha o seu provedor de email (Gmail recomendado)
   - Siga o passo a passo para autenticar
   - Copie o **Service ID** (exemplo: `service_abc123`)

4. **Criar um Template de Email**
   - No painel, vá em **Email Templates**
   - Clique em **Create New Template**
   - Use este template:
   
   ```
   Name: PEAD Contact Template
   Service: (selecione o serviço criado)
   
   Subject: Nova mensagem de {{from_name}}
   
   Email para enviar: contato@pead.com.br
   
   Conteúdo do email:
   
   Olá,
   
   Você recebeu uma nova mensagem do formulário de contato:
   
   Nome: {{from_name}}
   Email: {{from_email}}
   Mensagem:
   {{message}}
   
   Atenciosamente,
   PEAD Soluções
   ```
   
   - Copie o **Template ID** (exemplo: `template_abc123`)

5. **Atualizar script.js**
   - Abra [script.js](script.js)
   - Procure pelas linhas:
     ```javascript
     emailjs.init("YOUR_PUBLIC_KEY");
     'service_pead', // Substitua pelo seu Service ID
     'template_pead', // Substitua pelo seu Template ID
     ```
   - Substitua pelos valores reais obtidos acima

## Exemplo de configuração final:

```javascript
emailjs.init("abc123xyz..."); // Sua Public Key
await emailjs.send(
  'service_abc123def456', // Service ID
  'template_abc123def456', // Template ID
  { /* dados */ }
);
```

## Pronto!
Agora o formulário de contato enviará emails reais para contato@pead.com.br
