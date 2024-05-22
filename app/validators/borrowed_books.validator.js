const Joi = require('joi');

const borrowedBookSchema = Joi.object({
  book_id: Joi.number().integer().required().messages({
    'number.base': 'book_id should be a number',
    'number.integer': 'book_id should be an integer',
    'any.required': 'book_id is required'
  }),
  student_id: Joi.number().integer().required().messages({
    'number.base': 'student_id should be a number',
    'number.integer': 'student_id should be an integer',
    'any.required': 'student_id is required'
  }),
  employee_id: Joi.number().integer().required().messages({
    'number.base': 'employee_id should be a number',
    'number.integer': 'employee_id should be an integer',
    'any.required': 'employee_id is required'
  }),
  borrowed_date: Joi.date().iso().required().messages({
    'date.base': 'borrowed_date should be a valid date',
    'date.format': 'borrowed_date should be in ISO format',
    'any.required': 'borrowed_date is required'
  }),
  expected_return_date: Joi.date().iso().required().messages({
    'date.base': 'expected_return_date should be a valid date',
    'date.format': 'expected_return_date should be in ISO format',
    'any.required': 'expected_return_date is required'
  }),
  actual_return_date: Joi.date().iso().optional().allow(null).messages({
    'date.base': 'actual_return_date should be a valid date',
    'date.format': 'actual_return_date should be in ISO format'
  }),
  // is_returned: Joi.boolean().required().messages({
  //   'boolean.base': 'is_returned should be a boolean',
  //   'any.required': 'is_returned is required'
  // }),
  late_fee: Joi.number().precision(2).optional().allow(null).default(0).messages({
    'number.base': 'late_fee should be a number',
    'number.precision': 'late_fee should have at most 2 decimal places'
  })
});

module.exports = {
  borrowedBookSchema
};
