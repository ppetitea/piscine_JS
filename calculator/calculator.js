const test_module = require('./tests/test');

let test = test_module.valid_inputs();

function    get_last_sub_operation(op)
{
    let end;
    for (let i = op.length - 1; i > 0; i--)
    {
        if (op[i] == ')')
            end = i;
        if (op[i] == '(')
            return(op.substr(i, (end - i) + 1));
    }
    return op;
}

function    epur_operation(ret)
{
    re = /(\d+)( *)-/g;
    ret = ret.replace(re, "$1 - ");
    re = /(\+|\*|\/|\%)/g;
    ret = ret.replace(re, " $1 ");
    return ret;
}

function    resolve_operation(operation)
{
    ret = operation.replace(/[()]/g, ' ');
    let ret_r = ret.trim().split(/ +/g);

    return ret;
}

function calculator(operation)
{
    // detect priority
    // split operation

    operation = "((10 * (2 %-10)) -5- -6 + -5*2 )";
    let sub_op;
    operation = epur_operation(operation);
    while (operation.indexOf(')') >= 0)
    {
        sub_op = get_last_sub_operation(operation);
        resolved_sub_op = resolve_operation(sub_op);
        operation = operation.replace(sub_op, resolved_sub_op);
        console.log(operation);
    }

    // console.log(example.substr(sub_op.start, sub_op.len));
    return operation;


}

console.log(calculator());
