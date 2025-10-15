import User from "./User";
import Playlist from "./Playlist";
import Music from "./Music";
import Friend from "./Friend";
import Gift from "./Gift";
import Group from "./Group";
import Storie from "./Storie";

User.hasMany(Playlist, { 
  foreignKey: "userId", 
  as: "playlists" });

Playlist.belongsTo(User, { 
  foreignKey: "userId", 
  as: "user" });

Playlist.belongsToMany(Music, {
  through: "playlist_music",
  as: "musics",
  foreignKey: "playlistId",
});
Music.belongsToMany(Playlist, {
  through: "playlist_music",
  as: "playlists",
  foreignKey: "musicId",
});

User.belongsToMany(Music, {
  through: "user_music",
  as: "music",
  foreignKey: "userId",
});
Music.belongsToMany(User, {
  through: "user_music",
  as: "users",
  foreignKey: "musicId",
});

User.belongsToMany(User, {
  through: Friend,
  as: "friends",
  foreignKey: "userId",
  otherKey: "friendId",
});

User.hasMany(Gift, { 
  foreignKey: "userId", 
  as: "sentGifts" });

User.hasMany(Gift, { 
  foreignKey: "friendId", 
  as: "receivedGifts" });

Gift.belongsTo(User, { 
  foreignKey: "userId", 
  as: "sender" });

Gift.belongsTo(User, { 
  foreignKey: "friendId", 
  as: "receiver" });

User.hasMany(Group, {
  foreignKey: "userId",
  as: "groups",
});

Group.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Storie, { foreignKey: "userId", as: "stories" });
Storie.belongsTo(User, { foreignKey: "userId", as: "user" });


export { User, Playlist, Music, Friend, Gift, Group, Storie };
