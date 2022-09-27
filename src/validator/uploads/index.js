const InvariantError = require('../../exceptions/InvariantError');
const { ImageAlbumSchema } = require('./schema');

const UploadsValidator = {
  validateImageAlbum: (headers) => {
    const validationResult = ImageAlbumSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;