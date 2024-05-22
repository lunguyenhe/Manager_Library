const Joi = require('joi');

const authorSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  birth_date: Joi.date().iso().required().messages({
    'date.base': 'birth_date should be a valid date',
    'date.format': 'birth_date should be in ISO format',
    'any.required': 'birth_date is required'
  }),
  death_date: Joi.date().iso()
    .greater(Joi.ref('birth_date'))
    .max('now')
    .optional()
    .allow(null)
    .messages({
      'date.base': 'death_date should be a valid date',
      'date.greater': 'death_date should be greater than birth_date',
      'date.format': 'death_date should be in ISO format',
      'date.max': 'death_date cannot be in the future'
    }),
  biography: Joi.string().optional()
});

module.exports = {
  authorSchema
};
