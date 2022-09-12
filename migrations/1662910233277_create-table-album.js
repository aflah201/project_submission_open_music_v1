/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('album', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'CHAR(30)',
      notNull: true,
    },
    year: {
      type: 'NUMERIC',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('album');
};
