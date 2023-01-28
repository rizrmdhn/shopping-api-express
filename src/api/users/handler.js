/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const users = require('../../utils/users');
const userCart = require('../../utils/userCart');

// const validator = require('../../validator/users');


exports.addUsers = async (req, res) => {

    // validator.validateUserPayload(req.body, res)

    const id = `users-${nanoid(16)}`;

    const { name, email, password } = req.body;

    const checkPassword = password.length >= 8;

    if (!checkPassword) {
        return res.status(400).json({
            status: 'failed',
            message: 'Password must be at least 8 characters',
        });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = users.find((user) => user.email === email);

    if (checkUser) {
        return res.status(400).json({
            status: 'failed',
            message: 'Email already exists',
        });
    };

    users.push({ id, name, email, password: hashedPassword });

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(400).res.json({
            status: 'failed',
            message: 'User not added',
        })
    }

    const userId = users[index].id;
    const userCartId = users[index].id

    userCart.push({ userCartId, cart: [] });

    return res.status(201).json({
        status: 'success',
        data: {
            userId,
            userCartId,
        }
    });
}
