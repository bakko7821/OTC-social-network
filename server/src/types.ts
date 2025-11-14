export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  email: string;
  description: string;
  headImage: string;
  avatarImage: string;
  online: boolean;
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
  sender?: User;
  receiver?: User;
}

export interface Dialog {
  user: User
  lastMessage: string;
  lastMessageTime: string;
}
