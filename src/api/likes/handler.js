class LikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;
  }

  async postLikesHandler(request, h) {
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._albumsService.checkAlbum(albumId);
    const liked = await this._service.checkLike(credentialId, albumId);
    if (!liked) {
      const likeId = await this._service.addLike(credentialId, albumId);
      const response = h.response({
        status: 'success',
        message: `Berhasil melakukan like pada album dengan id: ${likeId}`,
      });
      response.code(201);
      return response;
    }

    await this._service.deleteLike(credentialId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil melakukan unlike',
    });
    response.code(201);
    return response;
  }

  async getLikesHandler(request, h) {
    const { albumId } = request.params;

    const data = await this._service.getLike(albumId);
    const likes = data.count;

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.header('X-Data-Source', data.source);
    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;