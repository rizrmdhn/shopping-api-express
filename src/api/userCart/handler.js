const userCart = require('../../utils/userCart');
const users = require('../../utils/users');

exports.getUserCart = async (req, res) => {

    const BearerToken = req.headers.authorization.split(' ');

    if (BearerToken[0] !== 'Bearer') {
        return res.status(401).json({
            status: 'failed',
            message: 'Authorization failed - Bearer token not found',
        });
    }

    const findUser = users.find((user) => user.accessToken === BearerToken[1]);

    if (!findUser) {
        return res.status(401).json({
            status: 'failed',
            message: 'Authorization failed - User not found',
        });
    }

    const userCartIndex = userCart.findIndex((user) => user.userCartId === findUser.id);


    if (userCartIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: 'User cart not found',
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            userCart: [userCart[userCartIndex]],
        },
    });
};