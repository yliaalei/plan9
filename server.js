const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // отдаём index.html и стили

const DB_FILE = path.join(__dirname, "events.json");

// Загружаем события
function loadEvents() {
    if (!fs.existsSync(DB_FILE)) return {};
    return JSON.parse(fs.readFileSync(DB_FILE));
}

// Сохраняем события
function saveEvents(events) {
    fs.writeFileSync(DB_FILE, JSON.stringify(events, null, 2));
}

// Получить все события
app.get("/api/events", (req, res) => {
    res.json(loadEvents());
});

// Добавить/обновить событие
app.post("/api/events", (req, res) => {
    const { date, data } = req.body;
    if (!date || !data) return res.status(400).json({ error: "Нужны date и data" });

    let events = loadEvents();
    events[date] = data;
    saveEvents(events);

    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));

