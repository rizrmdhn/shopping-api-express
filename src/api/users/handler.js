/* eslint-disable func-names */
const { nanoid } = require('nanoid');

const users = require('../../utils/users');


exports.addUsers = (req, res) => {

    const id = nanoid(16);

    const { name, email, password } = req.body;

    const checkUser = users.find((user) => user.email === email);

    if (checkUser) {
        return res.status(400).json({
            status: 'failed',
            message: 'Email already exists',
        });
    };

    users.push({ id, name, email, password });

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(400).res.json({
            status: 'failed',
            message: 'User not added',
        })
    }

    const userId = id;

    return res.status(201).json({
        status: 'success',
        data: {
            userId,
        }
    });
}

