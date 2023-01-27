const {
    PostAuthenticationPayloadSchema,
    PutAuthenticationPayloadSchema,
    DeleteAuthenticationPayloadSchema,
} = require('./schema');

const AuthenticationsValidator = {
    validatePostAuthenticationPayload: (payload, res) => {
        const validationResult = PostAuthenticationPayloadSchema.validate(payload);
        if (validationResult.error !== undefined) {
            res.status(400).json({
                status: 'failed',
                message: validationResult.error.message,
            });
        }
    },
    validatePutAuthenticationPayload: (payload, res) => {
        const validationResult = PutAuthenticationPayloadSchema.validate(payload);
        if (validationResult.error) {
            res.status(400).json({
                status: 'failed',
                message: validationResult.error.message,
            });
        }
    },
    validateDeleteAuthenticationPayload: (payload, res) => {
        const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);
        if (validationResult.error) {
            res.status(400).json({
                status: 'failed',
                message: validationResult.error.message,
            });
        }
    },
};

module.exports = AuthenticationsValidator;