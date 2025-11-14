import { useState } from "react";
import { deleteChat } from "../../../api/messages";
import type { Props } from "../../../types";

import '../../../styles/main_page.scss'
import { ProfileIcon, TrashIcon } from "../../../assets/Icons";
import { UserProfileAlert } from "./UserProfileAlert";

export const MoreDropDownMenu = ({ receiverId }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropDownProfile, setDropDownProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteChat(receiverId);
    setLoading(false);
    setShowConfirm(false);
  }

  const handleCloseMenu = () => {
      setDropDownProfile(false);
  };

  return (
    <div className="more dropDownMenu">
      <button className="dropDownMenuButton profile flex g4" onClick={() => setDropDownProfile(true)}><ProfileIcon /> Показать профиль</button>
      <button className="dropDownMenuButton delete flex g4" onClick={() => setShowConfirm(true)}><TrashIcon /> Очистить чат</button>

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

      {dropDownProfile && <UserProfileAlert receiverId={receiverId} onClose={handleCloseMenu} />}
    </div>
  );
};
