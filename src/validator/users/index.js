const { UserPayloadSchema } = require('./schema');

const UsersValidator = {
    validateUserPayload: (payload, res) => {
        const validationResult = UserPayloadSchema.validate(payload);
        if (validationResult.error) {
            res.status(400).json({
                status: 'failed',
                message: validationResult.error.message,
            });
        }
    }
}

module.exports = UsersValidator;