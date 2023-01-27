exports.InvartiantError = (message, res) => {
    res.status(400).json({
        status: 'failed',
        message,
    });

    res.end();
}
