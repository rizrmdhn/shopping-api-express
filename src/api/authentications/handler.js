/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../../utils/users');

// const validator = require('../../validator/authentications');

exports.postAuthentications = async (req, res) => {

    // validator.validatePostAuthenticationPayload(req.body, res);

    const { email, password } = req.body;


    const index = users.findIndex((user) => user.email === email);

    if (index === -1) {
        return res.status(400).json({
            status: 'failed',
            message: 'User with this email not found',
        });
    }

    const { password: hashedPassword } = users[index];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
        return res.status(400).json({
            status: 'failed',
            message: 'Wrong password',
        });
    }

    const accessToken = jwt.sign({
        id: users[index].id,
        email: users[index].email,
    }, "yourTokenHere", { expiresIn: '1h' });

    const refreshToken = jwt.sign({
        id: users[index].id,
        email: users[index].email,
    }, "yourRefreshTokenHere", {
        expiresIn: '1h'
    });

    users[index] = {
        ...users[index],
        accessToken,
        refreshToken,
    }

    return res.status(201).json({
        status: 'success',
        data: {
            accessToken,
            refreshToken,
        }
    });
}

exports.putAuthentications = async (req, res) => {

    const { refreshToken } = req.body;

    // validator.validatePutAuthenticationPayload(req.body, res);


    return jwt.verify(refreshToken, "yourRefreshTokenHere", (err, user) => {

        if (err) {
            return res.status(400).json({
                status: 'failed',
                message: 'You are not authorized',
            });
        }

        const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
        }, "yourTokenHere", { expiresIn: '1h' });

        return res.status(200).json({
            status: 'success',
            data: {
                accessToken,
            }
        });
    });
}

exports.deleteAuthentications = async (req, res) => {

    // validator.validateDeleteAuthenticationPayload(req.body, res);

    const { refreshToken } = req.body;

    this.putAuthentications(req, res);

    const index = users.findIndex((user) => user.refreshToken === refreshToken);

    if (index === -1) {
        return res.status(400).json({
            status: 'failed',
            message: 'Refresh token not found',
        });
    }

    users[index] = {
        ...users[index],
        accessToken: null,
        refreshToken: null,
    }

    return res.status(200).json({
        status: 'success',
        message: 'Token deleted',
    });
}