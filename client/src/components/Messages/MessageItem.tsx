import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { CopyIcon, EditIcon, SelectIcon, TrashIcon } from "../../assets/Icons";

interface MessageItemProps {
  message: {
    id: number;
    senderId: number;
    content: string;
    createdAt: string;
  };
  isOwn: boolean;
  onDelete: (id: number) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isOwn, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetchDelete(message.id);
    setLoading(false);
    setShowConfirm(false);
  }

  const time = dayjs(message.createdAt).format("HH:mm");

  const [menuType, setMenuType] = useState<"none" | "select" | "crud">("none");
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const fetchDelete = async (id: number) => {
    try {
      await onDelete(id); // вызываем родительский хендлер
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuType("none");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleRightClickOutsideContent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuType("select");
  };

  const handleRightClickInsideContent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuType("crud");
  };

  const handleAction = (action: string) => {
    if (action === "select") {
      console.log("select")
    } else {
      console.log("ELSE")
    }

    setMenuType("none");
  };

  const copyToClipboard = () => {
    setNotification("Вы успешно скопировали сообщение.")
    setShowNotification(true)

    setTimeout(() => setShowNotification(false), 2000);
  }

  return (
    <div
      className="messageItem flex"
      onContextMenu={handleRightClickOutsideContent}
      style={{
        justifyContent: isOwn ? "flex-end" : "flex-start",
      }}
    >
      <span
        onContextMenu={handleRightClickInsideContent}
        className="messageContent flex g8"
        style={{
          background: isOwn ? "#7799ff" : "var(--background-card-color)",
          borderRadius: isOwn ? "12px 0px 12px 12px" : "0px 12px 12px 12px",
        }}
      >
        {message.content}
        <span className="messageTime">
          {time}
        </span>
      </span>

      {menuType !== "none" && (
        <div
          className="messageDropDownMenu"
          ref={menuRef}
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
        >
          {menuType === "select" && (
            <div className="menuItem flex g8" onClick={() => handleAction("select")}>
              <SelectIcon />
              <span>Выбрать</span>  
            </div>
          )}

          {menuType === "crud" && (
            <>
              <div className="menuItem flex g8" onClick={() => handleAction("edit")}>
                <EditIcon />
                <span>Изменить</span>
              </div>
              <div className="menuItem flex g8" onClick={() => copyToClipboard()}>
                <CopyIcon />
                <span>Копировать</span>
              </div>
              <div className="menuItem flex g8" onClick={() => setShowConfirm(true)}>
                <TrashIcon />
                <span>Удалить</span>
              </div>
              <div className="menuItem flex g8" onClick={() => handleAction("select")}>
                <SelectIcon />
                <span>Выбрать</span>
              </div>
            </>
          )}
        </div>
      )}

      {showConfirm && (
        <div className="alertMessage flex center">
          <div className="alertMessageContent flex column g32">
            <p className="alertMessageText">
              Вы точно хотите удалить данное сообщение?
            </p>
            <div className="buttonsBox flex g16">
                <button
                    className="confirmButton"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "Удаляем..." : "Да"}
                </button>
                <button
                    className="cancelButton"
                    onClick={() => setShowConfirm(false)}
                >
                    Отменить
                </button>
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="notificationMessage flex center">
          <span className="notificationContent">{notification}</span>
        </div>
      )}
    </div>
    
  );
};

