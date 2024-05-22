const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  author_id: Joi.number().required().integer()
    .messages({
      'any.number': 'author_id should be a number',
      'any.required': 'author_id is required'
    }),
    publishingyear:Joi.number().max(new Date().getFullYear()).required(),
    price:Joi.number().required(),
    genres_id: Joi.number().required().integer()
    .messages({
      'any.number': 'genres_id should be a number',
      'any.required': 'genres_id is required'
    }),
});

module.exports = {
    bookSchema
};
