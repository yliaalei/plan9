const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let docs = {}; // { token: { text: "", clients: Set() } }

wss.on("connection", (ws, req) => {
  const token = req.url.split("/").pop();

  if (!docs[token]) docs[token] = { text: "Начни писать...", clients: new Set() };
  const doc = docs[token];
  doc.clients.add(ws);

  // Отправляем текущий текст новому клиенту
  ws.send(JSON.stringify({ text: doc.text }));

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);
    if (data.text !== undefined) {
      doc.text = data.text;
      // Рассылаем всем остальным
      doc.clients.forEach(client => {
        if (client !== ws && client.readyState === 1) {
          client.send(JSON.stringify({ text: doc.text }));
        }
      });
    }
  });

  ws.on("close", () => {
    doc.clients.delete(ws);
  });
});

// HTTP endpoint для создания нового документа
app.post("/create", (req, res) => {
  const { v4: uuidv4 } = require("uuid");
  const token = uuidv4();
  docs[token] = { text: "Начни писать...", clients: new Set() };
  res.json({ link: `/view/${token}` });
});

server.listen(process.env.PORT || 3000, () => console.log("Server running"));
