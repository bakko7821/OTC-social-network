import React, { useRef, useState, useCallback } from "react";
import { socket } from "../../socket";
import { SendIcon } from "../../assets/Icons";

interface Props {
  receiverId: number;
}

function MessageInputComponent({ receiverId }: Props) {
  console.log("MessageInput mounted");

  const [content, setContent] = useState("");
  const isSendingRef = useRef(false);

  const handleSend = useCallback(() => {
    if (isSendingRef.current || !content.trim()) return;
    isSendingRef.current = true;

    const msg = { receiverId, content: content.trim() };
    socket.emit("private_message", msg);

    setContent("");
    isSendingRef.current = false;
  }, [receiverId, content]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

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
