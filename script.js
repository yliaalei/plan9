import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const tableBody = document.getElementById('table-body');
const totalEl = document.getElementById('total');
const labelEl = document.getElementById('label');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

// === Генерация 8 строк ===
for (let i = 1; i <= 8; i++) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${i}</td>
    <td><input type="date" class="date" /></td>
    <td><input type="checkbox" class="present" /></td>
  `;
  tableBody.appendChild(row);
}

// === Функция расчета метки ===
function calculateLabel(presentArray) {
  const count = presentArray.filter(Boolean).length;
  if ([6, 7, 8].includes(count)) return "мастер баланса";
  if (count === 4) return "йога путешественник";
  if ([2, 3].includes(count)) return "мастер гибкий график";
  return "—";
}

// === Обновление UI при изменении чекбоксов ===
function updateSummary() {
  const present = Array.from(document.querySelectorAll('.present')).map(cb => cb.checked);
  const count = present.filter(Boolean).length;
  const label = calculateLabel(present);

  totalEl.textContent = count;
  labelEl.textContent = label;
}

document.querySelectorAll('.present').forEach(cb => cb.addEventListener('change', updateSummary));

// === Сохранение данных ===
saveBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  if (!name) {
    alert('Введите ФИ участника!');
    return;
  }

  const dates = Array.from(document.querySelectorAll('.date')).map(input => input.value);
  const present = Array.from(document.querySelectorAll('.present')).map(cb => cb.checked);
  const total = present.filter(Boolean).length;
  const label = calculateLabel(present);

  try {
    await addDoc(collection(db, "attendances"), {
      name, dates, present, total, label, createdAt: serverTimestamp()
    });
    alert('Запись успешно сохранена!');
  } catch (e) {
    console.error("Ошибка при сохранении:", e);
    alert('Ошибка при сохранении данных!');
  }
});

// === Очистка формы ===
clearBtn.addEventListener('click', () => {
  document.getElementById('name').value = '';
  document.querySelectorAll('.date').forEach(input => input.value = '');
  document.querySelectorAll('.present').forEach(cb => cb.checked = false);
  totalEl.textContent = '0';
  labelEl.textContent = '—';
});


