const qrcode = require('qrcode-terminal');
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth()
});
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot do Dr. Iago Mateó está ONLINE 🦷✨');
});

// Leitura do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code gerado, escaneie com seu WhatsApp');
});

// Conexão realizada
client.on('ready', () => {
    console.log('✅ Tudo certo! WhatsApp conectado.');
});

client.initialize();

// Função de Delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Atendimento Automático
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|oi|Oi|Olá|olá)/i) && msg.from.endsWith('@c.us')) {
        const contact = await msg.getContact();
        const name = contact.pushname.split(" ")[0];

        await msg.reply(`Olá, ${name}! Sou o assistente virtual do **Instituto Iago Mateó** 🦷✨.\n\nEscolha uma opção abaixo:\n\n` +
            `1️⃣ - Agendar Consulta\n` +
            `2️⃣ - Falar com Atendente Humano\n` +
            `3️⃣ - Localização do Consultório\n` +
            `4️⃣ - Como funciona a 1ª consulta?\n` +
            `5️⃣ - Dúvidas Gerais\n` +
            `"Menu" - Voltar ao Menu Principal`);
    }

    if (msg.body === '1') {
        await msg.reply('📅 Para agendar sua consulta, envie o nome completo e a disponibilidade de horários.\n\nResponderemos o mais rápido possível.');
    }

    if (msg.body === '2') {
        await msg.reply('Nos diga o motivo do contato que um atendente humano irá te responder em breve!');
    }

    if (msg.body === '3') {
        await msg.reply('📍 Nosso consultório fica localizado na Pituba, Salvador-BA.\n\nGoogle Maps: https://maps.app.goo.gl/JSpWxErANzAQW3gR7');
    }

    if (msg.body === '4') {
        await msg.reply('🦷✨ **A 1ª consulta é o primeiro passo para o seu sorriso perfeito!**\n\nNa avaliação inicial fazemos:\n\n- Exame clínico completo\n- Escaneamento digital (se necessário)\n- Planejamento do tratamento');
    }

    if (msg.body === '5') {
        await msg.reply('Deixe sua dúvida que entraremos em contato o mais rápido possível 😉');
    }
});

app.listen(port, () => {
    console.log(`🔥 Bot rodando na porta ${port}`);
});







