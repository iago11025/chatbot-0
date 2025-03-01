// leitor de qr code
const qrcode = require('qrcode-terminal');
const express = require('express'); // Adicionando express
const { Client, Buttons, List, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
const app = express(); // Definindo o app

// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|Marcar|Consulta|Agendamento)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(
            msg.from,
            `Olá! ${name.split(" ")[0]}, sou o assistente virtual do Dr. Iago Mateó. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n` +
            `1 - Agende sua consulta.\n` +
            `2 - Fale diretamente com o atendente humano.\n` +
            `3 - Localização do consultório.\n` +
            `4 - Como funciona a 1ª consulta?\n` +
            `5 - Outras perguntas.\n` +
            `"Menu" - Voltar ao menu principal.`
        );
    }

    if (msg.body === '0' && msg.from.endsWith('@c.us')) {
        await client.sendMessage(msg.from, 'Você retornou ao menu principal. Digite "menu" para iniciar novamente.');
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📞 Atendemos de segunda a sexta das 09:00 às 18:00 e aos sábados das 09:00 às 14:00.\n\nResponderemos o mais rápido possível sobre as datas e horários disponíveis na semana.\n\nAgradecemos o contato 🦷✨');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Acompanhe o Instagram: https://www.instagram.com/dr.iagomateo/');
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Para agilizar o atendimento, qual seria o motivo do contato?\n\n(Escreva em poucas palavras).');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Responderemos o mais rápido possível 😉');
    }

    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(
            msg.from,
            'O Dr. Iago Mateó atende nos seguintes locais:\n\n' +
            '6 - Atelier Bucal (Rua Frederico Edelweis, 23 - Rio Vermelho, Salvador - BA, 41940-270)\n\n' +
            '7 - Odonto Vale (Avenida Vale das Pedrinhas, 609 - Rio Vermelho, Salvador - BA, 41905-615)'
        );
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Escreva o número correspondente à unidade desejada.');
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(
            msg.from,
            '🦷✨ **Uma consulta que faz a diferença para a sua autoestima!** ✨🦷\n\n' +
            '🔹 **Mais do que apenas olhar os dentes:** Nosso atendimento vai além, proporcionando uma experiência completa e personalizada.'
        );
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Olá, Qual é a sua dúvida? 💭\n\n Deixe a sua pergunta aqui no chat e entraremos em contato o mais rápido possível 😉.');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Bot rodando na porta ${port}`);
});






