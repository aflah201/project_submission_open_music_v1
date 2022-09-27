const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class LikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addLike(userId, albumId) {
    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal melakukan like');
    }
    await this._cacheService.delete(`likes:${albumId}`);
    return result.rows[0].id;
  }

  async getLike(albumId) {
    try {
      const result = await this._cacheService.delete(`likes:${albumId}`);
      return {
        count: JSON.parse(result),
        source: 'cache',
      };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM likes WHERE album_id = $1',
        values: [albumId],
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw new InvariantError('Album tidak memiliki like');
      }
      await this._cacheService.set(
        `likes:${albumId}`,
        JSON.stringify(result.rows.length),
      );
      return {
        count: result.rows.length,
        source: 'db',
      };
    }
  }

  async deleteLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM likes WHERE user_id = $1 AND album_id = $2 returning id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal melakukan unlike');
    }
    
    await this._cacheService.delete(`likes:${albumId}`);
  }

  async checkLike(userId, albumId) {
    const query = {
      text: 'SELECT * FROM likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rows.length;
  }
}

module.exports = LikesService;