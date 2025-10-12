import User from "./User";
import Playlist from "./Playlist";
import Music from "./Music";
import Friend from "./Friend";

User.hasMany(Playlist, { foreignKey: "userId", as: "playlists" });
Playlist.belongsTo(User, { foreignKey: "userId", as: "user" });

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

// новая связь для избранного
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

export { User, Playlist, Music, Friend };
