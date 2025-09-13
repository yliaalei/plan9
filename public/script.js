const token = window.location.pathname.split("/").pop();
const editor = document.getElementById("editor");

const ws = new WebSocket(`ws://${location.host}/${token}`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  editor.innerText = data.text;
};

editor.addEventListener("input", () => {
  ws.send(JSON.stringify({ text: editor.innerText }));
});
