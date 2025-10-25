// defaults for dates and participants
export function defaultDates() {
  // 8 empty date slots
  return Array(8).fill("");
}

export function defaultParticipants() {
  // 14 participants so that header (1) + 14 = 15 rows as requested
  const arr = [];
  for (let i = 0; i < 14; i++) {
    arr.push({ id: Date.now() + i, name: "", checks: Array(8).fill(false) });
  }
  return arr;
}
