import { useRef, useState, useEffect } from "react";
import { Chats } from "../components/Chats";
import { Messages } from "../components/Messages";
import "../styles/index.scss";
import "../styles/main_page.scss";

export const MainPage = () => {
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
      const newWidth = Math.min(Math.max(220, startWidth + delta), 700);
      leftPanel.style.width = `${newWidth}px`;
    };

    const onMouseUp = () => {
      if (!isResizing) return;
      isResizing = false;
      document.body.style.cursor = "auto";
      document.body.style.userSelect = "auto";

      const finalWidth = leftPanel.offsetWidth;
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

  return (
    <div ref={containerRef} className="page flex">
      <div
        ref={leftPanelRef}
        className="chats"
        style={{ width: chatWidth }}
      >
        <Chats />
      </div>

      <div ref={resizerRef} className="resizer"></div>

      <div className="messages">
        <Messages />
      </div>
    </div>
  );
};
