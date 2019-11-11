/**
 * jsdoc command to generate javascript documentation:
 * $> jsdoc -d=doc modules/calculator.mjs
 */

class Calculator {

    /**
     * Transform a valid operation but not easy to split/parse on normalized operation
     * example: "1+2--3*(4%-5)/6" ---> "1 + 2 - -3 * (4 % -5) / 6"
     * 
     * @function normalize_operation
     * @param {string} operation - a simple mathematical operation
     * @callback {string} - normalized operation
     */
    normalize_operation(operation)
    {
        operation = operation.replace(/(\d+|\))( *)-/g, "$1 - ");
        operation = operation.replace(/(\+|\*|\/|\%)/g, " $1 ");
        operation = operation.trim().replace(/ +/g, ' ');
        return "("+operation+")";
    }

    /**
     * Calcul the result of given operation
     * 
     * @function calcul
     * @param {number} number1 - first of two operator of operation
     * @param {string} operand - operand of operation + - * / %
     * @param {number} number2 - second of two operator of operation
     * @callback {number} - the result of operation
     */
    calcul(number1, operand, number2)
    {
        if (operand == '+')
            return Math.round((number1 + number2) * 100) / 100;
        if (operand == '-')
            return Math.round((number1 - number2) * 100) / 100;
        if (operand == '*')
            return Math.round((number1 * number2) * 100) / 100;
        if (operand == '/')
            return Math.round((number1 / number2) * 100) / 100;
        if (operand == '%')
            return Math.round((number1 % number2) * 100) / 100;
        else
            return 0;
    }

    /**
     * Replace a character of string by another character / string
     * 
     * @function replace_char
     * @param {string} string - the string with the character to replace 
     * @param {number} index - the index of the character in the string
     * @param {string} replace - the replacement character / string
     * @callback {string} - substring1 + replacement + substring2
     */
    replace_char(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }

    /**
     * Replace a slice of string by another string
     * 
     * @function replace_slice
     * @param {string} src - the source string with the character to replace  
     * @param {string} replace - the replacement string
     * @param {number} start - the start index of slice in the source string
     * @param {number} end - the end index of slice in the source string
     * @callback {string} - substring1 + replacement + substring2
     */
    replace_slice(src, replace, start, end)
    {
        let substr1 = start > 0 ? src.substr(0, start) : '';
        let substr2 = end < src.length ? src.substr(end, src.length - end) : '';
        return (substr1 + replace + substr2);
    }

    /**
     * search the position of brackets peer in a string - the search start by the end of the string
     * 
     * @function get_last_brackets
     * @param {string} string - the string which contain brackets
     * @callback {Object | boolean} - The position of brackets if they exist or false on the other hand
     */
    get_last_brackets(string)
    {
        let end = -1;
        for (let i = string.length - 1; i >=0 ; i--)
        {
            if (string[i] == ')')
                end = i;
            if (string[i] == '(')
               return end > 0 ? {'start':i, 'end': end} : false;
        }
        return false;
    }

    /**
     * get the content and position of brackets peer in the current operation - the search start by the end of the operation
     * 
     * @function get_last_sub_operation
     * @callback {Object} {array} brackets_content, {number} bracket start position in operation, {number} bracket len
     */
    get_last_sub_operation()
    {
        let brackets = this.get_last_brackets(this.steps[this.steps.length - 1]);
        let current_step = this.steps[this.steps.length - 1];
        let from = brackets.start + 1;
        let len = brackets.end - brackets.start - 1; 
        let sub_op_str = current_step.substr(from, len).split(/ +/g);
        return {'array': sub_op_str, 'from': from, 'len': len};
    }

    /**
     * use operand_index to get the operators, then calcul the result of operation, and overwrite the operation by this result
     * 
     * @function update_sub_operation_array
     * @param {array} sub_op - the brackets content of current operation
     * @param {number} operand_index - the index of the operand in the operation
     * @callback {Object} {array} brackets_updated_content, {number} bracket start position in operation, {number} bracket len
     */
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

    /**
     * overwrite the current operation by the updated sub_operation to create the next operation
     * 
     * @function get_next_step
     * @param {Object} sub_op the updated content of current operation
     * @callback {string} - an updated operation result of the last operation and updated sub_operation
     */
    get_next_step(sub_op)
    {
        let current_step = this.steps[this.steps.length - 1];
        let sub_op_str = sub_op.array.join(' ');
        let start = sub_op.from;
        let end = sub_op.from + sub_op.len;
        return this.replace_slice(current_step, sub_op_str, start , end);
    }

    /**
     * use a loop to update each part of sub operation who contain operands
     * 
     * @function update_last_brackets
     * @param {array} operands - the priority operands
     * 
     */
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

    /**
     * erase the last brackets peer of the current operation
     * it's usefull to insert the final result of sub operation in parent operation
     * 
     * @function erase_last_brackets
     */
    erase_last_brackets()
    {
        let brackets = this.get_last_brackets(this.steps[this.steps.length - 1]);
        let current_step = this.steps[this.steps.length - 1];

        current_step = this.replace_char(current_step, brackets.start, ' ');
        current_step = this.replace_char(current_step, brackets.end, ' ');
        current_step.trim().replace(/ +/g, ' ');
        this.steps[this.steps.length - 1] = current_step;
    }

    /**
     * the Calculator constructor who calcul the result of given operation and store each step of calcul in this.steps
     * 
     * @function __construct
     * @param {string} operation - a simple mathematical operation
     */
    constructor(operation)
    {
        this.steps = [this.normalize_operation(operation)];
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