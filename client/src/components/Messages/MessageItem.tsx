import React from "react";

interface MessageItemProps {
  message: {
    id: number;
    senderId: number;
    content: string;
    createdAt: string;
  };
  isOwn: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isOwn }) => {
  return (
    <div
      className="flex"
      style={{
        justifyContent: isOwn ? "flex-end" : "flex-start",
        marginBottom: "6px",
      }}
    >
      <div
        style={{
          background: isOwn ? "#d2f2ff" : "#eee",
          padding: "8px 12px",
          borderRadius: "14px",
          maxWidth: "60%",
        }}
      >
        {message.content}
      </div>
    </div>
  );
};
