import { Link } from "react-router-dom";
import { SwitchTheme } from "./SwitchTheme";
import { CrossIcon } from "../../assets/Icons";

interface DropDownMenuProps {
  onClose: () => void;
}

export const DropDownMenu = ({ onClose }: DropDownMenuProps) => {
  return (
    <div className="dropDownMenu flex column">
      <div className="profileBox flex between g8">
        <div className="user"></div>
        <button className="closeButton" onClick={onClose}>
          <CrossIcon />
        </button>
      </div>

      <nav className="flex column">
        <Link to={""}>My Profile</Link>
        <Link to={""}>New Group</Link>
        <Link to={""}>New Channel</Link>
        <Link to={""}>Contacts</Link>
        <Link to={""}>Calls</Link>
        <Link to={""}>Saved Message</Link>
        <Link to={""}>Settings</Link>
        <SwitchTheme />
      </nav>
    </div>
  );
};
