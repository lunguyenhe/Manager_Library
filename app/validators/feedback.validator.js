const Joi = require('joi');

const feedbackSchema = Joi.object({
    id:Joi.number().required(),
    content: Joi.string().min(3).max(50).required(),
    stars: Joi.number().min(1).max(5).required(),
});

module.exports = {
    feedbackSchema
};
