/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');

const Item = require('../../utils/items')

exports.getItems = async (req, res) => {
    await axios.get('https://fakestoreapi.com/products').then((response) => {
        const products = response.data;
        Item.push(...products);
        res.status(200).json({
            status: 'success',
            data: {
                products,
            },
        });
    }).catch((error) => {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        });
    });

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
            product,
        },
    });
}