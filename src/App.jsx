import React, { useEffect, useState } from "react";
import ParticipantRow from "./components/ParticipantRow";
import { defaultDates, defaultParticipants } from "./defaults";

const STORAGE_KEY = "yoga_attendance_v1";

function computeTitle(count) {
  if (count >= 6) return "Мастер баланса";
  if (count === 4) return "Йога путешественник";
  if (count === 2 || count === 3) return "Мастер гибкий график";
  return "";
}

export default function App() {
  // load from localStorage or use defaults
  const [dates, setDates] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved?.dates ?? defaultDates();
  });

  const [participants, setParticipants] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved?.participants ?? defaultParticipants();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dates, participants }));
  }, [dates, participants]);

  // update a participant by index
  const updateParticipant = (index, newData) => {
    setParticipants((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...newData };
      return next;
    });
  };

  const addParticipant = () => {
    setParticipants((prev) => [
      ...prev,
      { id: Date.now(), name: "", checks: Array(8).fill(false) },
    ]);
    // small scroll to bottom on mobile
    setTimeout(() => window.scrollTo({ top: 99999, behavior: "smooth" }), 100);
  };

  const removeParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const setDateAt = (i, v) => {
    setDates((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const clearAll = () => {
    if (!confirm("Очистить все данные? Это удалит участников и даты. (Отмена сохранит)")) return;
    setDates(defaultDates());
    setParticipants(defaultParticipants());
  };

  const exportJSON = () => {
    const data = JSON.stringify({ dates, participants }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yoga-attendance.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = async (file) => {
    try {
      const text = await file.text();
      const obj = JSON.parse(text);
      if (Array.isArray(obj.dates) && Array.isArray(obj.participants)) {
        setDates(obj.dates);
        setParticipants(obj.participants);
      } else {
        alert("Формат файла неверный");
      }
    } catch (e) {
      alert("Не удалось импортировать файл");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Журнал посещений — Yoga Log</h1>
        <p className="text-sm text-gray-600 mt-1">
          Вводи даты, добавляй участников, отмечай посещения — итоги считаются автоматически.
        </p>
      </header>

      <section className="bg-white shadow-sm rounded-lg p-3 mb-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={addParticipant}
            className="px-3 py-2 rounded-lg bg-yoga-200 text-yoga-500 font-medium"
          >
            ➕ Добавить участника
          </button>

          <label className="flex items-center gap-2 px-3 py-2 rounded-lg border">
            <input
              type="file"
              accept="application/json"
              onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])}
            />
            <span className="text-sm">Импорт (JSON)</span>
          </label>

          <button
            onClick={exportJSON}
            className="px-3 py-2 rounded-lg border"
          >
            ⤓ Экспорт (JSON)
          </button>

          <button
            onClick={clearAll}
            className="px-3 py-2 rounded-lg border text-red-600"
          >
            Очистить всё
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Подсказка: данные сохраняются в браузере (localStorage). Для переноса используй экспорт/импорт.
        </div>
      </section>

      <section className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-auto">
          <table className="min-w-[900px] w-full table-auto border-collapse">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-2 text-left">ФИО</th>
                {dates.map((d, i) => (
                  <th key={i} className="p-2">
                    <input
                      className="w-full text-sm p-1 border rounded"
                      placeholder={`Дата ${i + 1}`}
                      value={d}
                      onChange={(e) => setDateAt(i, e.target.value)}
                    />
                  </th>
                ))}
                <th className="p-2 text-left">Итог</th>
                <th className="p-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, idx) => {
                const count = p.checks.filter(Boolean).length;
                const title = computeTitle(count);
                return (
                  <ParticipantRow
                    key={p.id ?? idx}
                    index={idx}
                    participant={p}
                    onChange={(upd) => updateParticipant(idx, upd)}
                    onRemove={() => removeParticipant(idx)}
                    title={title}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-4 text-sm text-gray-600">
        <div>Первичная структура: 1 строка заголовка + 14 участников (итого 15 строк). Можно добавлять/удалять.</div>
        <div className="mt-2">Правила итогов: 6–8 — «Мастер баланса», ровно 4 — «Йога путешественник», 2–3 — «Мастер гибкий график».</div>
      </footer>
    </div>
  );
}
