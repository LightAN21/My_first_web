const express = require('express');
const get_seperator = require('./server/get_seperator');
const express_use = require('./server/express_use');
const express_get_post = require('./server/express_get_post');

var app = express();
var sep = get_seperator();

express_use(app);
express_get_post(app, __dirname, sep);

app.listen(7000, () => {
    console.log('Server is running(port 7000)...');
});

