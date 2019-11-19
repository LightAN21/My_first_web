
function pressure_to_support_list(com, type = 'day')
{
    var msg = com[type];
    var list;
    
    get_fractal_list(com, type);
    list = com.fractal[type];
    console.log("pressure_to_support_list:");
    console.log(list);
}

function show_pressure_to_support_list()
{
    console.log('===========================================');
    pressure_to_support_list(curr_company);
}
