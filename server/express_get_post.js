const express = require('express');
const bodyParser = require('body-parser');

function express_get_post(app, dir, sep){
    app.get('/', function (req, res) {
        res.sendFile('./client/index.html', { root: dir });
    });
}

module.exports = express_get_post;