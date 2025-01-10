const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    // Escucha mensajes del cliente
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        // Puedes enviar mensajes a todos los clientes
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Eco: ${message}`);
            }
        });
    });

    // Maneja la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Sirve archivos estáticos
app.use(express.static('public'));

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
