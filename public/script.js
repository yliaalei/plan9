const token = window.location.pathname.split("/").pop();
const editor = document.getElementById("editor");

const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${wsProtocol}://${location.host}/${token}`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  editor.innerText = data.text;
};

editor.addEventListener("input", () => {
  ws.send(JSON.stringify({ text: editor.innerText }));
});
