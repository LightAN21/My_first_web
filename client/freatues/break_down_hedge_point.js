function feature_2() {
    var list = [];

    console.log('===========================================');
    if (data_is_read) {
        for (var i = 0; i < com.length; i++){
            var broke = break_down_hedge_point_list(com[i]);

            if (broke.length > 0 && broke[broke.length - 1].index < 5){
                var b = broke.pop();
                list.push({
                    company: com[i].name,
                    time: b.time,
                    hedge_break: b.hedge_break,
                });
            }
        }
        console.log(list);
    }
    else
        progress_bar_show_msg('Find: Data is not read');
}

function break_down_hedge_point_list(com, type = 'day', len = 5000) {
    var msg = com[type];
    var hedge = [];
    var list = [];

    if (len > msg.length - 2)
        len = msg.length - 2;
    for (var i = len; i >= 0; i--) {
        var curr_close = msg[i].close;
        var pre_close = msg[i + 1].close;
        var last = hedge.length - 1;

        if (last >= 0) {
            var last_low = hedge[last].low;

            if (curr_close < last_low && pre_close >= last_low) {
                var broke = [];

                while (hedge.length) {
                    var curr_low = hedge[hedge.length - 1].low;

                    if (curr_close < curr_low && pre_close >= curr_low) {
                        var tmp = hedge.pop()
                        broke.push({
                            index: tmp.id,
                            time: tmp.time,
                        });
                    }
                    else
                        break;
                }
                if (broke.length > 0) {
                    list.push({
                        index: i,
                        time: msg[i].time,
                        hedge_break: broke,
                    });
                }
            }
        }
        if (is_up_fractal(msg, i)) {
            hedge.push(msg[i]);
        }
    }
    return list;
}

function show_break_down_hedge_point_list() {
    console.log('===========================================');
    if (curr_company == 0)
        return;
    if (curr_company != 'all') {
        console.log('break_down_list of ' + curr_company.name + ':');
        console.log(break_down_hedge_point_list(curr_company));
    }
}