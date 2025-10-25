import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const tbody = document.getElementById("tableBody");
const totalSpan = document.getElementById("total");
const labelSpan = document.getElementById("label");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

// Создаем 8 строк для дат и чекбоксов
for (let i = 1; i <= 8; i++) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${i}</td>
    <td><input type="date" class="dateInput" /></td>
    <td><input type="checkbox" class="present" /></td>
  `;
  tbody.appendChild(row);
}

// Пересчет итогов
function recalc() {
  const checkboxes = Array.from(document.querySelectorAll(".present"));
  const count = checkboxes.filter(cb => cb.checked).length;
  totalSpan.textContent = count;
  labelSpan.textContent = calculateLabel(count);
}

function calculateLabel(count) {
  if ([6, 7, 8].includes(count)) return "мастер баланса";
  if (count === 4) return "йога путешественник";
  if ([2, 3].includes(count)) return "мастер гибкий график";
  return "";
}

// Следим за изменениями чекбоксов
document.querySelectorAll(".present").forEach(cb =>
  cb.addEventListener("change", recalc)
);

// Очистка формы
clearBtn.addEventListener("click", () => {
  document.getElementById("name").value = "";
  document.querySelectorAll("input[type=date]").forEach(el => (el.value = ""));
  document.querySelectorAll(".present").forEach(el => (el.checked = false));
  totalSpan.textContent = "0";
  labelSpan.textContent = "";
});

// Сохранение в Firebase
saveBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  if (!name) return alert("Введите ФИ участника!");

  const dates = Array.from(document.querySelectorAll(".dateInput")).map(d => d.value);
  const present = Array.from(document.querySelectorAll(".present")).map(cb => cb.checked);
  const total = present.filter(Boolean).length;
  const label = calculateLabel(total);

  try {
    await addDoc(collection(db, "attendances"), {
      name,
      dates,
      present,
      total,
      label,
      createdAt: new Date().toISOString()
    });
    alert("Запись сохранена!");
    clearBtn.click();
  } catch (e) {
    alert("Ошибка при сохранении: " + e.message);
  }
});
