class Calculator {

    get_valid_operation(operation)
    {
        operation = operation.replace(/(\d+|\))( *)-/g, "$1 - ");
        operation = operation.replace(/(\+|\*|\/|\%)/g, " $1 ");
        operation = operation.trim().replace(/ +/g, ' ');
        return "("+operation+")";
    }
    calcul(n1, op, n2)
    {
        if (op == '+')
            return Math.round((n1 + n2) * 100) / 100;
        if (op == '-')
            return Math.round((n1 - n2) * 100) / 100;
        if (op == '*')
            return Math.round((n1 * n2) * 100) / 100;
        if (op == '/')
            return Math.round((n1 / n2) * 100) / 100;
        if (op == '%')
            return Math.round((n1 % n2) * 100) / 100;
        else
            return 0;
    }
    replace_char(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }
    str_replace_range(str, replace, start, end)
    {
        let str1 = start > 0 ? str.substr(0, start) : '';
        let str2 = end < str.length ? str.substr(end, str.length - end) : '';
        return (str1 + replace + str2);
    }
    get_last_brackets(str)
    {
        let end = -1;
        for (let i = str.length - 1; i >=0 ; i--)
        {
            if (str[i] == ')')
                end = i;
            if (str[i] == '(')
               return end > 0 ? {'start':i, 'end': end} : false;
        }
        return false;
    }
    get_last_sub_operation()
    {
        let brackets = this.get_last_brackets(this.steps[this.steps.length - 1]);
        let current_step = this.steps[this.steps.length - 1];
        let from = brackets.start + 1;
        let len = brackets.end - brackets.start - 1; 
        let sub_op_str = current_step.substr(from, len).split(/ +/g);
        return {'array': sub_op_str, 'from': from, 'len': len};
    }
    update_sub_operation_array(sub_op, operand_index)
    {
        let n1 = parseFloat(sub_op.array[operand_index - 1]);
        let operand = sub_op.array[operand_index];
        let n2 = parseFloat(sub_op.array[operand_index + 1]);
        sub_op.array[operand_index] = this.calcul(n1, operand, n2);
        sub_op.array[operand_index - 1] = ' ';
        sub_op.array[operand_index + 1] = ' ';
        sub_op.array = sub_op.array.join(' ').trim().replace(/ +/g, ' ').split(' ');
        return sub_op;
    }
    get_next_step(sub_op)
    {
        let current_step = this.steps[this.steps.length - 1];
        let sub_op_str = sub_op.array.join(' ');
        let start = sub_op.from;
        let end = sub_op.from + sub_op.len;
        return this.str_replace_range(current_step, sub_op_str, start , end);
    }
    update_last_brackets(operands)
    {
        let sub_op = this.get_last_sub_operation(); //sub operation in brackets
        for (let i = 0; i < sub_op.array.length; i++)
        {
            for (const operand of operands)
            {
                if (sub_op.array[i] == operand)
                {
                    sub_op = this.update_sub_operation_array(sub_op, i);
                    this.steps[this.steps.length] = this.get_next_step(sub_op);
                    sub_op = this.get_last_sub_operation();
                    i = 0;
                }
            }
        }
    }
    erase_last_brackets()
    {
        let brackets = this.get_last_brackets(this.steps[this.steps.length - 1]);
        let current_step = this.steps[this.steps.length - 1];

        current_step = this.replace_char(current_step, brackets.start, ' ');
        current_step = this.replace_char(current_step, brackets.end, ' ');
        current_step.trim().replace(/ +/g, ' ');
        this.steps[this.steps.length - 1] = current_step;
    }
    constructor(operation)
    {
        this.steps = [this.get_valid_operation(operation)];
        while (this.get_last_brackets(this.steps[this.steps.length - 1]) != false)
        {
            this.update_last_brackets(['*', '/', '%']);
            this.update_last_brackets(['+', '-']);
            this.erase_last_brackets();
        }
        if (isNaN(this.steps[this.steps.length - 1]))
            this.result ="Syntax Error " + this.steps[this.steps.length - 1];
        else
            this.result = this.steps[this.steps.length - 1];
    }
}
// module.exports =  Calculator;
export default Calculator