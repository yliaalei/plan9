import React from "react";

export default function ParticipantRow({ participant, index, onChange, onRemove, title }) {
  const setName = (v) => onChange({ name: v });
  const toggleCheck = (i) => {
    const next = [...participant.checks];
    next[i] = !next[i];
    onChange({ checks: next });
  };

  return (
    <tr className="border-t">
      <td className="p-2 align-top">
        <input
          className="w-full p-2 text-sm border rounded"
          placeholder={`Фамилия Имя ${index + 1}`}
          value={participant.name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>

      {participant.checks.map((c, i) => (
        <td key={i} className="p-2 text-center align-top">
          <label className="inline-flex items-center justify-center w-9 h-9">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={c}
              onChange={() => toggleCheck(i)}
            />
          </label>
        </td>
      ))}

      <td className="p-2 align-top">
        <div className="text-sm font-medium">{title}</div>
      </td>

      <td className="p-2 align-top">
        <button
          onClick={onRemove}
          className="px-2 py-1 border rounded text-sm text-red-600"
          title="Удалить участника"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}
