import React, { useState, useCallback, useEffect } from "react";
import { socket } from "../../socket";
import { CrossIcon, SendIcon } from "../../assets/Icons";

interface MessageInputProps {
  receiverId: number;
  onSend: (content: string) => void;
  editingMessage: { id: number; content: string } | null;
  onSaveEdit: (id: number, newContent: string) => void;
  onCancelEdit: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  receiverId,
  onSend,
  editingMessage,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  useEffect(() => {
    if (editingMessage) {
      setContent(editingMessage.content);
      setOriginalContent(editingMessage.content);
    } else {
      setContent("");
      setOriginalContent("");
    }
  }, [editingMessage]);

  const handleSubmit = useCallback(() => {
    if (!content.trim()) return;

    if (editingMessage) {
      onSaveEdit(editingMessage.id, content.trim());
    } else {
      onSend(content.trim());
      socket.emit("private_message", { receiverId, content: content.trim() });
    }

    setContent("");
  }, [content, editingMessage, onSaveEdit, onSend, receiverId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="messageInputWrapper">
      {editingMessage && (
        <div className="editingBanner flex between">
          <div className="contentBox flex column g4">
            <span className="headerText">Редактируем сообщение:</span>
            <span className="content">{originalContent}</span>
          </div>
          <button className="cancelButton" onClick={() => {
            onCancelEdit();
            setContent("");
          }}><CrossIcon /></button>
        </div>
      )}
      <div className="messageInput flex between g8">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите сообщение..."
        />
        <button className="sendMessageButton flex center" onClick={handleSubmit}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
