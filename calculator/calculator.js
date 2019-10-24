function    get_sub_operation(op)
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

function    get_valid_operation_syntax(operation)
{
    regex = /(\d+|\))( *)-/g;
    operation = operation.replace(regex, "$1 - ");
    regex = /(\+|\*|\/|\%)/g;
    operation = operation.replace(regex, " $1 ");
    return '(' + operation + ')';
}

function    calcul(n1, op, n2)
{
    if (op == '+')
        return n1 + n2;
    if (op == '-')
        return n1 - n2;
    if (op == '*')
        return n1 * n2;
    if (op == '/')
        return n1 / n2;
    if (op == '%')
        return n1 % n2;
    else
        return 0;
}

function    operation_join(array, operand)
{
    for (let i = 1; i < array.length; i++)
    {
        if (array[i] == operand)
        {
            let n1 = parseFloat(array[i - 1]);
            let n2 = parseFloat(array[i + 1]);
            array[i] = calcul(n1, operand, n2);
            array[i - 1] = '';
            array[i + 1] = '';
            array = array.join(' ');
            array = array.trim().split(/ +/g);
            i--;
        }
    }
    return array;
}

function    is_array_contain_value(array, value)
{
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] == value)
            return true;
    }
    return false;
}

function    resolve_operation(operation)
{
    ret = operation.replace(/[()]/g, ' ');
    let array = ret.trim().split(/ +/g);
    if (is_array_contain_value(array, '*') == true)
        array = operation_join(array, '*');
    if (is_array_contain_value(array, '/') == true)
        array = operation_join(array, '/');
    if (is_array_contain_value(array, '%') == true)
        array = operation_join(array, '%');
    if (is_array_contain_value(array, '+') == true)
        array = operation_join(array, '+');
    if (is_array_contain_value(array, '-') == true)
        array = operation_join(array, '-');
    return array.join(' ');
}

function calculator(operation)
{
    let sub_op;

    operation = get_valid_operation_syntax(operation);
    while (operation.indexOf(')') >= 0 && operation.indexOf('(') >= 0)
    {
        // console.log(operation);
        sub_op = get_sub_operation(operation);
        resolved_sub_op = resolve_operation(sub_op);
        operation = operation.replace(sub_op, resolved_sub_op);
    }
    if (isNaN(operation))
        return "Syntax Error " + operation;
    else
        return operation;
}

const test_module = require('./modules/test');

let test = test_module.valid_inputs();
let tmp;
test.forEach(element => {
    tmp = calculator(element.test);    
    if (tmp == element.result)
        console.log(element.index+" -> \t= OK ");    
    else
        console.log(element.index+" -> ("+element.test+") = "+element.result+" != "+tmp+" = KO ");    
});
