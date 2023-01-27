/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const users = require('../../utils/users');

exports.postAuthentications = async (req, res) => {

    const { email, password } = req.body;

    const index = users.findIndex((user) => user.email === email);

    if (index === -1) {
        return res.status(400).json({
            status: 'failed',
            message: 'Email not found',
        });
    }

    if (users[index].password !== password) {
        return res.status(400).json({
            status: 'failed',
            message: 'Password not match',
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

    const index = users.findIndex((user) => user.refreshToken === refreshToken);

    if (index === -1) {
        return res.status(400).json({
            status: 'failed',
            message: 'Refresh token not found',
        });
    }

    return jwt.verify(refreshToken, "yourRefreshTokenHere", (err, user) => {

        if (err) {
            return res.status(403).json({
                status: 'failed',
                message: 'Token not valid',
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

    const { refreshToken } = req.body;

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