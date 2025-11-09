import { useState } from "react";
import { deleteChat } from "../../../api/messages";
import type { Props } from "../../../types";

import '../../../styles/main_page.scss'

export const MoreDropDownMenu = ({ receiverId }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteChat(receiverId);
    setLoading(false);
    setShowConfirm(false);
  }

  return (
    <div className="more dropDownMenu">
      <button onClick={() => setShowConfirm(true)}>🗑 Delete Chat</button>

      {showConfirm && (
        <div className="alertMessage flex center">
          <div className="alertMessageContent flex column g32">
            <p className="alertMessageText">
              Вы точно хотите удалить чат?
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
    </div>
  );
};
