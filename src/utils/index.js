const mapDBToModel = ({
  id, name, title, year, performer, genre, duration, album_id,
}) => ({
  id,
  name,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const albumDBToModel = ({
  id, name, year,
}) => ({
  albumId: id, name, year,
});

module.exports = { mapDBToModel, albumDBToModel };