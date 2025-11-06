export interface UserShort {
  id: number;
  username?: string;
  avatarImage?: string;
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
  avatarImage: string;
  lastMessage: string;
  lastMessageTime: string;
}
