class Calculator {

    get_valid_operation_syntax(operation)
    {
        let re = /(\d+|\))( *)-/g;
        operation = operation.replace(re, "$1 - ");
        re = /(\+|\*|\/|\%)/g;
        operation = operation.replace(re, " $1 ");
        return "("+operation+")";
    }
    get_sub_operation(op)
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
    calcul(n1, op, n2)
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
    operation_join(array, operand)
    {
        for (let i = 1; i < array.length; i++)
        {
            if (array[i] == operand)
            {
                let n1 = parseFloat(array[i - 1]);
                let n2 = parseFloat(array[i + 1]);
                array[i] = this.calcul(n1, operand, n2);
                array[i - 1] = '';
                array[i + 1] = '';
                array = array.join(' ');
                array = array.trim().split(/ +/g);
                i--;
            }
        }
        return array;
    }
    is_array_contain_value(array, value)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i] == value)
                return true;
        }
        return false;
    }
    resolve_operation(operation)
    {
        let ret = operation.replace(/[()]/g, ' ');
        let array = ret.trim().split(/ +/g);
        if (this.is_array_contain_value(array, '*') == true)
            array = this.operation_join(array, '*');
        if (this.is_array_contain_value(array, '/') == true)
            array = this.operation_join(array, '/');
        if (this.is_array_contain_value(array, '%') == true)
            array = this.operation_join(array, '%');
        if (this.is_array_contain_value(array, '+') == true)
            array = this.operation_join(array, '+');
        if (this.is_array_contain_value(array, '-') == true)
            array = this.operation_join(array, '-');
        return array.join(' ');
    }
    constructor(operation)
    {
        let sub_op;
        let resolved_sub_op;
        operation = this.get_valid_operation_syntax(operation);
        while (operation.indexOf(')') >= 0)
        {
            sub_op = this.get_sub_operation(operation);
            resolved_sub_op = this.resolve_operation(sub_op);
            operation = operation.replace(sub_op, resolved_sub_op);
        }
        if (isNaN(operation))
            this.result ="Syntax Error " + operation;
        else
            this.result = operation;
    }
}

module.exports = Calculator
