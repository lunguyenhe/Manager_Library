const Joi = require('joi');
const moment = require('moment');

const studentSchema = Joi.object({
    full_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    birth_date: Joi.date().iso()
        .max(moment().subtract(18, 'years').toISOString())
        .required()
        .messages({
            'date.base': 'birth_date should be a valid date',
            'date.format': 'birth_date should be in ISO format',
            'date.max': 'birth_date should be at least 18 years ago',
            'any.required': 'birth_date is required'
        }),
    phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        'string.base': 'phone should be a string',
        'string.length': 'phone should be exactly 10 digits',
        'string.pattern.base': 'phone should contain only digits',
        'any.required': 'phone is required'
    })
});

module.exports = {
    studentSchema
};
