exports.response = function (values, res) {
    const data = {
        'status': 'success',
        'data': values
    };

    res.json(data);
    res.end();
}