import { useRef, useState, useEffect, useCallback } from "react";
import "../styles/index.scss";
import "../styles/main_page.scss";
import Chats from "../components/Chats/Chats";
import { Messages } from "../components/Messages/Messages";
import type { User } from "../types";
import { UserProfile } from "../components/UserProfile";

export const MainPage = () => {
  console.log("Messages function called");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpenProfile, setIsOpenProfile] = useState(false)

  const [chatWidth, setChatWidth] = useState(() => {
    const saved = localStorage.getItem("chatWidth");
    return saved ? parseInt(saved, 10) : 320;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizer = resizerRef.current;
    const leftPanel = leftPanelRef.current;
    if (!resizer || !leftPanel) return;

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    const MIN_WIDTH = 300;
    const COLLAPSE_WIDTH = 230;
    const MINIMIZED_WIDTH = 68;
    const MAX_WIDTH = 700;

    const onMouseDown = (e: MouseEvent) => {
      isResizing = true;
      startX = e.clientX;
      startWidth = leftPanel.offsetWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const delta = e.clientX - startX;
      let newWidth = startWidth + delta;

      if (newWidth < MIN_WIDTH && newWidth <= COLLAPSE_WIDTH) {
        newWidth = MINIMIZED_WIDTH;
      } else {
        newWidth = Math.min(Math.max(MIN_WIDTH, newWidth), MAX_WIDTH);
      }

      leftPanel.style.width = `${newWidth}px`;
    };

    const onMouseUp = () => {
      if (!isResizing) return;
      isResizing = false;
      document.body.style.cursor = "auto";
      document.body.style.userSelect = "auto";

      let finalWidth = leftPanel.offsetWidth;

      if (finalWidth <= COLLAPSE_WIDTH) {
        finalWidth = MINIMIZED_WIDTH;
        leftPanel.style.width = `${MINIMIZED_WIDTH}px`;
      }

      setChatWidth(finalWidth);
      localStorage.setItem("chatWidth", String(finalWidth));
    };

    resizer.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      resizer.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  console.log("MainPage render, selectedUserId:", selectedUser);

  useEffect(() => {
    console.log("MainPage effect ran");
  }, [chatWidth, selectedUser?.id]);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const handleCloseProfileMenu = () => {
    setIsOpenProfile(false)
  }

  return (
    <div ref={containerRef} className="page flex">
      <div
        ref={leftPanelRef}
        className={`chats flex column ${chatWidth === 68 ? "collapsed" : ""}`}
        style={{ width: chatWidth }}
      >
        <Chats onSelect={handleSelectUser} />
      </div>

      <div ref={resizerRef} className="resizer"></div>

      <div className="messages flex center column">
        {selectedUser ? (
          <Messages receiverId={selectedUser.id} onOpenProfile={() => setIsOpenProfile(true)}/>
        ) : (
          <span className="peakChatMessage">Выберите чат, чтобы начать общение</span>
        )}
      </div>
      {isOpenProfile && (
        <UserProfile user={selectedUser || null} onClose={handleCloseProfileMenu} />
      )}
    </div>
  );
};

