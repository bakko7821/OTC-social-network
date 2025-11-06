import { useState } from "react";
import { sendMessage } from "../../api/messages";
import { socket } from "../../socket";

export default function MessageInput({ receiverId }: { receiverId: number }) {
  const [content, setContent] = useState("");

  const handleSend = async () => {
    if (!content.trim()) return;

    const message = await sendMessage(receiverId, content.trim());
    if (message) {
      socket.emit("private_message", message);
    }

    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd" }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
        style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "8px 12px",
          outline: "none",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: "8px",
          padding: "8px 14px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ➤
      </button>
    </div>
  );
}
