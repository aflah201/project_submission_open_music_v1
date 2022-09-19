exports.up = (pgm) => {
  pgm.createTable('songs_in_playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'TEXT',
      notNull: true,
    },
    song_id: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('songs_in_playlists', 'fk_songs_in_playlists.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  pgm.addConstraint('songs_in_playlists', 'fk_songs_in_playlists.song_id_song.id', 'FOREIGN KEY(song_id) REFERENCES song(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('songs_in_playlists');
};
