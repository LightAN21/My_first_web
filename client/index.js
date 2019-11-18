var all_com_list = [];
var file_list = [];
var com_name_set = {};
var com_list = [];
var com = [];
var data_is_read = 0;

console.log('testing...');

$(document).ready(function () {
    $.get('/get_company_name_list', function (data) {
        all_com_list = data;
        console.log("all_com_list:");
        console.log(all_com_list);
    });
    $.get('/get_file_name_list', function (data) {
        file_list = data;
        for (var i = 0; i < file_list.length; i++)
            com_list.push(file_list[i].split('.')[0]);
        com = new Array(file_list.length);
        for (var i = 0; i < com_list.length; i++)
            com_name_set[com_list[i]] = 1;
        console.log("file_list:");
        console.log(file_list);
        console.log("com_list:");
        console.log(com_list);
    });
    $('#read_data').click(function () {
        if (data_is_read) {
            console.log("Data already read.");
            return;
        }
        data_is_read = 1;
        read_data();
    })
    $('#check_data').click(function () {
        console.log(com);
    })
});

function read_data() {
    var com_lst_table = document.getElementById('com_list');

    console.log("Reading data...");
    info = [];
    com_lst_table.innerHTML = "";

    var count = 0;
    for (var i = 0; i < file_list.length; i++) {
        $.post('/get_file_info', { companyID: i, file_name: file_list[i] }, function (data) {
            com[data.id] = data;
            add_com_to_list(com_lst_table, data, count);
            count++;
            progress_bar(count, file_list.length);
            if (count >= file_list.length) {
                console.log('Finished.');
            }
        });
    }
}

function progress_bar(curr, total) {
    var p = document.getElementById('progress');
    var per = (100 * (curr / total)).toFixed(2);
    if (curr < total)
        p.innerHTML = "Progress: " + per + "% (" + curr + "/" + total + ")";
    else
        p.innerHTML = "Progress: 100% (Finished)";
}

function add_com_to_list(table, com, count) {
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = '[' + count + '] ' + com.name;

    cell.onclick = function () {
        console.log('\n===========================================');

        console.log(com.name);
        console.log(com);
        console.log('');
    }
}