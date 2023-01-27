/* eslint-disable func-names */
const { nanoid } = require('nanoid');

const users = require('../../utils/users');


exports.addUsers = (req, res) => {

    const id = nanoid(16);

    const { name, email, password } = req.body;

    users.push({ id, name, email, password });

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        res.status(400).res.json({
            status: 'failed',
            message: 'User not added',
        })
    }

    const userId = id;

    res.status(201).json({
        status: 'success',
        data: {
            userId,
        }
    });
}

