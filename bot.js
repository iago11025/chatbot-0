// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
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
        await delay(3000); // Delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); // Delay de 3000 milissegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); // Pegando o contato
        const name = contact.pushname; // Pegando o nome do contato
        await client.sendMessage(
            msg.from,
            `Olá! ${name.split(" ")[0]}, sou o assistente virtual do Dr. Iago Mateó. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n` +
            `1 - Agende sua consulta.\n` +
            `2 - Fale diretamente com o atendente humano.\n` +
            `3 - Localização do consultório.\n` +
            `4 - Como funciona a 1ª consulta?\n` +
            `5 - Outras perguntas.\n` +
            `"Menu" - Voltar ao menu principal.`
        ); // Primeira mensagem de texto
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

        await delay(20000);
        await chat.sendStateTyping();
        await delay(20000);
        await client.sendMessage(msg.from, 'Obrigado! Entraremos em contato com mais informações sobre o agendamento e sua unidade selecionada 😉. \n\nCaso tenha mais dúvidas, digite "2" para falar diretamente com o assistente humanizado.');
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(
            msg.from,
            '🦷✨ **Uma consulta que faz a diferença para a sua autoestima!** ✨🦷\n\n' +
            '🔹 **Mais do que apenas olhar os dentes:** Nosso atendimento vai além, proporcionando uma experiência completa e personalizada.\n\n' +
            '🔹 **Entender a sua queixa:** Antes de qualquer exame, dedicamos tempo para entender sua queixa principal e alinhar expectativas.\n\n' +
            '🔹 **Exame clínico minucioso:** Avaliamos não apenas dentes e gengivas, mas também toda a estrutura da boca e face, função mastigatória e estética do sorriso.\n\n' +
            '🔹 **Uso da câmera intraoral:** Uma das tecnologias que usamos no atendimento que permite visualizar detalhes da sua saúde bucal em tempo real, garantindo um diagnóstico ainda mais preciso.\n\n' +
            '🔹 **Exames complementares (se necessário):** Para uma avaliação detalhada e personalizada.\n\n' +
            '🔹 **Plano de tratamento personalizado:** Desenvolvido de acordo com as suas necessidades e expectativas do resultado final.\n\n' +
            '🔹 **Atendimento humanizado e transparente:** Ambiente acolhedor, com um compromisso genuíno com sua saúde, bem-estar e satisfação.'
        );
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(
            msg.from,
            '✨ Nosso compromisso não é apenas com a sua saúde bucal, mas com o seu bem-estar e satisfação.\n\n' +
            'Se você valoriza um atendimento que vai além do básico, que entrega qualidade, segurança e um olhar atento para os mínimos detalhes, agende sua consulta e descubra um novo padrão de cuidado odontológico. \n\n 📞- Para agendar a sua consulta, digite "1".'
        );
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Olá, Qual é a sua dúvida? 💭  \n\n Deixe a sua pergunta aqui no chat e entraremos em contato o mais rápido possível 😉.');
    }

    
});






git init
git add .
git commit -m "Primeiro commit"
git remote add origin https://github.com/SEU-USUARIO/whatsapp-bot.git
git branch -M main
git push -u origin main
