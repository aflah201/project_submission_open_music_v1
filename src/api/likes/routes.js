const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: (request, h) => handler.postLikesHandler(request, h),
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: (request) => handler.getLikesHandler(request),
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;