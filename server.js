// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // папка с фронтендом

// временное хранилище данных (можно заменить на базу)
const docs = {};

// создать новый документ
app.post("/create", (req, res) => {
  const token = uuidv4();
  docs[token] = { cells: {} };
  res.json({ link: `/view/${token}` });
});

// получить данные документа
app.get("/data/:token", (req, res) => {
  const token = req.params.token;
  if (!docs[token]) return res.status(404).json({ error: "not found" });
  res.json(docs[token]);
});

// обновить данные
app.post("/data/:token", (req, res) => {
  const token = req.params.token;
  if (!docs[token]) return res.status(404).json({ error: "not found" });

  docs[token] = req.body;
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
