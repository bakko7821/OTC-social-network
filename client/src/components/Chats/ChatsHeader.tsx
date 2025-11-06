import { BurgerMenuIcon } from "../../assets/Icons";
import { SearchInput } from "./SearchInput";
import "../../styles/index.scss";
import "../../styles/main_page.scss";
import { useState } from "react";
import { DropDownMenu } from "./DropDownMenu";

export const ChatsHeader = () => {
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
          console.log("dropDownStatus:", !dropDownStatus);
        }}
      >
        <BurgerMenuIcon />
      </button>


      <SearchInput />

      {dropDownStatus && <DropDownMenu onClose={handleCloseMenu} />}
    </div>
  );
};
