//const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const read_info = require('./read_info');
const read_info_2 = require('./read_info_2');
const read_info_new = require('./read_info_new');
const file_manager = require('./file_manager/file_manager_back_end');
const get_1000 = require('./get_1000');


var app = express();

//app.set('views', path.join(__dirname, 'client'));
//app.set('view engine', 'ejs');

// var lst = read_info('informations');

// var lst = read_info_2(folder);
// var lst_len = lst.length;

var folder = 'informations';
var folder_path = __dirname + '/informations/';

var sets = {
    informations: read_info_new.get_file_name_list('informations'),
    pt1: read_info_new.get_file_name_list('pt1'),
    pt2: read_info_new.get_file_name_list('pt2'),
    pt3: read_info_new.get_file_name_list('pt3'),
};

// get_1000();

app.use(express.static('jtsai_client'));
app.use(express.static('file_manager'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('./jtsai_client/index.html', { root: __dirname });
});

// app.get('/get_info_len', function (req, res) {
//     res.send(lst_len.toString());
//     res.end();
// });

app.get('/get_all_company_list', function (req, res) {
    res.send(sets);
    res.end();
});

app.post('/get_company_message', function (req, res) {
    var id = req.body.companyID;
    res.send(lst[id]);
    res.end();
});

app.post('/get_file_info', function (req, res) {
    var id = req.body.companyID;
    var set_name = req.body.set_name;
    var file_name = sets[set_name][id];
    var new_info = read_info_new.read_file_to_obj(__dirname + '/' + set_name + '/', file_name);
    res.send(new_info);
    res.end();
});

///////////////////////////////////////////////////////////////////

// File manager

app.get('/file', function (req, res) {
    res.sendFile('./file_manager/file_manager.html', {root: __dirname});
});

app.get('/main_folder_name', function (req, res) {
    res.send(__dirname);
    res.end();
});

app.post('/get_name_lists', function (req, res) {
    var path = req.body.main_folder;
    res.send(file_manager.get_name_lists(path));
    res.end();
});

///////////////////////////////////////////////////////////////////

app.listen(7000, () => {
    console.log('Server is running(port 7000)...');
});