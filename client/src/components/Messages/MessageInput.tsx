import React, { useRef, useState } from "react";
import { socket } from "../../socket";
import { sendMessage } from "../../api/messages";
import { SendIcon } from "../../assets/Icons";

function MessageInputComponent({ receiverId }: { receiverId: number }) {
  console.log("MessageInput mounted");
  const [content, setContent] = useState("");
  const isSendingRef = useRef(false);

  const handleSend = async () => {
    if (isSendingRef.current || !content.trim()) return;
    isSendingRef.current = true;
    try {
      const message = await sendMessage(receiverId, content.trim());
      console.log("EMIT", message);
      if (message) socket.emit("private_message", message);
    } finally {
      setContent("");
      isSendingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="messageInput flex between g8">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
      />
      <button className="sendMessageButton flex center" onClick={handleSend}>
        <SendIcon />
      </button>
    </div>
  );
}

export default React.memo(MessageInputComponent);
