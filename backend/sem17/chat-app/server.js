const { WebSocketServer } = require('ws');

// Cria o servidor WebSocket na porta 8081
const wss = new WebSocketServer({ port: 8081 });

console.log('Servidor WebSocket rodando na porta 8081...');

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado!');

    // Evento disparado quando o servidor recebe uma mensagem de algum cliente
    ws.on('message', (data) => {
        // Converte o buffer recebido para string texto
        const messageString = data.toString(); 
        
        // Percorre todos os clientes conectados e retransmite a mensagem
        wss.clients.forEach((client) => {
            if (client.readyState === 1) { // 1 significa conexão OPEN
                client.send(messageString);
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});
