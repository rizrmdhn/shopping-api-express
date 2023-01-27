/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { UserPayloadSchema };