
function is_half_overlap(msg, index, range = 20, ratio = 0.5) {
    var arr = [];
    var max = 0, curr = 0;

    for (var i = index; i < index + range && i < msg.length; i++) {
        arr.push({
            price: msg[i].high,
            mark: 1,
        });
        arr.push({
            price: msg[i].low,
            mark: 0,
        });
    }
    arr.sort(function (a, b) {
        if (a.price > b.price)
            return 1;
        return -1;
    });
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].mark == 0) {
            curr++;
            if (curr > max);
            max = curr;
        }
        else {
            curr--;
        }
    }
    // console.log('-------------------------------------------');
    // console.log(arr);
    // console.log(max);
    if (max / range > ratio)
        return 1;
    return 0;
}

function half_overlap_list(com, type = 'day') {
    var msg = com[type];
    var list = [];

    for (var i = msg.length - 20; i >= 0; i--) {
        if (is_half_overlap(msg, i, box_len)) {
            list.push({ index: i, time: msg[i].time });
        }
    }
    return list;
}

function show_half_overlap_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('half_overlap_list of '+ curr_company.name + ':');
        console.log(half_overlap_list(curr_company));
    }
}