import { BurgerMenuIcon } from "../../assets/Icons";
import { SearchInput } from "./SearchInput";
import "../../styles/index.scss";
import "../../styles/main_page.scss";
import { useState } from "react";
import { DropDownMenu } from "./DropDownMenu";
import type { User } from "../../utils/types";

interface ChatsHeaderProps {
  onSelectUser: (user: User) => void;
}

export const ChatsHeader = ({ onSelectUser }: ChatsHeaderProps) => {
  const [dropDownStatus, setDropDownStatus] = useState(false);

  const handleCloseMenu = () => {
    setDropDownStatus(false);
  };

  return (
    <div className="chatsHeader flex g8">
      <button
        className="dropDownMenuButton flex center"
        onClick={() => {
          setDropDownStatus((prev) => !prev);
        }}
      >
        <BurgerMenuIcon />
      </button>


      <SearchInput onSelectUser={onSelectUser} />

      {dropDownStatus && <DropDownMenu onClose={handleCloseMenu} />}
    </div>
  );
};
