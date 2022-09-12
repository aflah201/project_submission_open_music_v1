/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('song', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    year: {
      type: 'NUMERIC',
      notNull: true,
    },
    genre: {
      type: 'CHAR(30)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    duration: {
      type: 'NUMERIC',
      notNull: true,
    },
    albumId: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
  });
};

exports.down = pgm => {};
