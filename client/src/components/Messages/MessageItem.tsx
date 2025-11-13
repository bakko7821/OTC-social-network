import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { CopyIcon, DoneIcon, EditIcon, SelectIcon, TrashIcon } from "../../assets/Icons";
import type { Message } from "../../types";

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  onDelete: (id: number) => void;
  onEdit: (message: Message, editContent: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isOwn, onDelete, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")

  async function handleDelete() {
    setLoading(true);
    await fetchDelete(message.id);
    setLoading(false);
    setShowConfirm(false);
  }

  const handleEdit = () => {
    if (message.senderId !== Number(localStorage.getItem("userId"))) return
    
    setLoading(true)
    setIsEditing(true)
    setEditContent(message.content)
    setLoading(false);
  }

  const copyToClipboard = () => {
    setNotification("Вы успешно скопировали сообщение.")
    setShowNotification(true)

    setTimeout(() => setShowNotification(false), 2000);
  }

  async function handleSaveEdit() {
    await fetchEdit(message, editContent)
    setIsEditing(false)
  }

  const time = dayjs(message.createdAt).format("HH:mm");

  const [menuType, setMenuType] = useState<"none" | "select" | "crud">("none");
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const fetchDelete = async (id: number) => {
    try {
      await onDelete(id); // вызываем родительский хендлер
    } catch (error: unknown) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const fetchEdit = async (message: Message, editContent: string) => {
    try {
      console.log(`Меняем сообщение с ID: ${message.id}`)
      await onEdit(message, editContent)
    } catch (error: unknown) {
      console.error("Ошибка при попытке редактирования:", error)
    }
  }

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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.width = `${Math.max(textarea.value.length, 1)}ch`;
    }
  }, [editContent]);

  return (
    <div
      className="messageItem flex"
      onContextMenu={handleRightClickOutsideContent}
      style={{
        justifyContent: isOwn ? "flex-end" : "flex-start",
      }}
    >
      <div
          onContextMenu={handleRightClickInsideContent}
          className="messageContent flex g8"
          style={{
            background: isOwn ? "#7799ff" : "var(--background-card-color)",
            borderRadius: isOwn ? "12px 0px 12px 12px" : "0px 12px 12px 12px",
          }}
        >
          {isEditing ? (
            <>
              <textarea
                ref={textareaRef}
                className="editingInput"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <button className="saveEditingChangesButton" onClick={() => handleSaveEdit()}><DoneIcon /></button>
            </>
          ) : (
            <>
              <p>{message.content}</p>
              <span className="messageTime">
                {time}
              </span>
            </>
          )}
        </div>

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
              <div className="menuItem flex g8" onClick={() => handleEdit()}>
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

