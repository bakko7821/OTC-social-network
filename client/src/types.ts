export interface UserShort {
  id: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  avatarImage?: string;
  online?: boolean;
}

export interface MessageRecord {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  read?: boolean;
}

export interface SocketMessage extends MessageRecord {
  sender?: UserShort;
  receiver?: UserShort;
}

export interface Dialog {
  userId: number;
  username: string;
  firstname?: string;
  lastname?: string;
  avatarImage: string;
  online?: boolean;
  lastMessage: string;
  lastMessageTime: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  description: string;
  headImage: string;
  avatarImage: string;
  online: boolean;
}

export interface DropDownMenuProps {
  onClose: () => void;
}