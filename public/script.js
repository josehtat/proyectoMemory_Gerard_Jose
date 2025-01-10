document.getElementById('connectBtn').addEventListener('click', () => {
    const server = document.getElementById('server').value;
    const port = document.getElementById('port').value;
    const playerName = document.getElementById('playerName').value;
    const status = document.getElementById('status');

    if (!server || !port || !playerName) {
        status.textContent = "Todos los campos son obligatorios.";
        status.style.color = "red";
        return;
    }

    const url = `ws://${server}:${port}`;
    const socket = new WebSocket(url);

    status.textContent = "Conectando...";
    status.style.color = "blue";

    // Cuando la conexión se establece
    socket.onopen = () => {
        status.textContent = "Conectado al servidor!";
        status.style.color = "green";

        // Enviar el nombre del jugador al servidor
        socket.send(JSON.stringify({ type: "join_game", playerName }));
    };

    // Cuando se recibe un mensaje del servidor
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Mensaje del servidor:", message);

        // Actualiza la interfaz o maneja mensajes específicos
        if (message.type === "error") {
            status.textContent = `Error: ${message.message}`;
            status.style.color = "red";
        }
    };

    // Cuando se cierra la conexión
    socket.onclose = () => {
        status.textContent = "Conexión cerrada.";
        status.style.color = "gray";
    };

    // Manejo de errores
    socket.onerror = (error) => {
        status.textContent = "Error en la conexión.";
        status.style.color = "red";
        console.error("WebSocket Error:", error);
    };
});
