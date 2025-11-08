import React from "react";
import dayjs from "dayjs";

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
  const time = dayjs(`${message.createdAt}`).format("HH:mm");
  
  return (
    <div
      className="messageItem flex g16"
      style={{
        justifyContent: isOwn ? "flex-end" : "flex-start",
        marginBottom: "6px",
      }}
    >
      <span
        className="flex center g8"
        style={{
          background: isOwn ? "#7799ff" : "var(--background-card-color)",
          color: "var(--text-color)",
          padding: "8px 12px",
          borderRadius: isOwn ? "12px 0px 12px 12px" : "0px 12px 12px 12px",
          maxWidth: "60%",
        }}
      >
        {message.content}
        <span className="messageTime">{time}</span>
        <span className="messageStatus"></span>
      </span>
    </div>
  );
};
