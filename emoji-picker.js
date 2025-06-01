// Simple emoji picker
document.addEventListener("DOMContentLoaded", () => {
  const emojis = ["😀", "😂", "😍", "😎", "👍", "❤️", "🎉"];
  const picker = document.getElementById("emoji-picker");
  const input = document.getElementById("message");

  emojis.forEach(emoji => {
    const btn = document.createElement("button");
    btn.textContent = emoji;
    btn.onclick = () => input.value += emoji;
    picker.appendChild(btn);
  });
});