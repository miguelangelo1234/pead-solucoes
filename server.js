const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do diretório pai (projeto raiz)
app.use(express.static(path.join(__dirname, '..')));

app.post('/send-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ ok: false, error: 'Campos obrigatórios ausentes' });
  }

  try {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.TO_EMAIL || user;

    if (!host || !user || !pass) {
      return res.status(500).json({ ok: false, error: 'Configuração SMTP ausente no servidor' });
    }

    const secure = port === 465; // true for 465, false for other ports

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      }
    });

    const mailOptions = {
      from: `${nome} <${email}>`,
      to,
      subject: `Contato pelo site: ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
      html: `<p><strong>Nome:</strong> ${nome}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${mensagem}</p>`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ ok: true });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    return res.status(500).json({ ok: false, error: 'Falha ao enviar e-mail' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
