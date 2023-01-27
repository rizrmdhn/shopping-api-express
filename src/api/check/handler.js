exports.checkApi = (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'API is working',
    });
}


