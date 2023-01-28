/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */

const Item = require('../../utils/items');
const users = require('../../utils/users');
const userCart = require('../../utils/userCart');

exports.getItems = async (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            products: Item,
        },
    })

}

exports.getItemById = async (req, res) => {

    const { id } = req.params;

    const product = Item.find((item) => item.id === parseInt(id));


    if (!product) {
        return res.status(404).json({
            status: 'failed',
            message: 'Product not found',
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            product: [product],
        },
    });
}

exports.addItemToCart = async (req, res) => {

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

    const { id } = req.params;

    const product = Item.find((item) => item.id === parseInt(id));

    if (!product) {
        return res.status(404).json({
            status: 'failed',
            message: 'Product not found',
        });
    }

    const userCartIndex = userCart.findIndex((user) => user.userCartId === findUser.id);

    if (userCartIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: 'User cart not found',
        });
    }

    const productIndex = userCart[userCartIndex].cart.findIndex((item) => item.id === parseInt(id));

    if (productIndex === -1) {
        userCart[userCartIndex].cart.push(product);
        userCart[userCartIndex].cart[userCart[userCartIndex].cart.length - 1].quantity = 1;
        userCart[userCartIndex].cart[userCart[userCartIndex].cart.length - 1].totalPrice = product.price;
    } else {
        userCart[userCartIndex].cart[productIndex].quantity += 1;
        userCart[userCartIndex].cart[productIndex].totalPrice += product.price;
    }

    return res.status(201).json({
        status: 'success',
        data: {
            userCart: [userCart[userCartIndex]],
        },
    });
}

exports.removeItemFromCart = async (req, res) => {

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

    const { id } = req.params;

    const product = Item.find((item) => item.id === parseInt(id));

    if (!product) {
        return res.status(404).json({
            status: 'failed',
            message: 'Product not found',
        });
    }

    const userCartIndex = userCart.findIndex((user) => user.userCartId === findUser.id);

    if (userCartIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: 'User cart not found',
        });
    }

    const productIndex = userCart[userCartIndex].cart.findIndex((item) => item.id === parseInt(id));

    if (productIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: 'Product not found in cart',
        });
    }

    userCart[userCartIndex].cart[productIndex].quantity -= 1;
    userCart[userCartIndex].cart[productIndex].totalPrice -= product.price;

    if (userCart[userCartIndex].cart[productIndex].quantity === 0) {
        userCart[userCartIndex].cart.splice(productIndex, 1);
    }

    return res.status(200).json({
        status: 'success',
        data: {
            userCart: [userCart[userCartIndex]],
        },
    });
}