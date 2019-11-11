/**
 *  return a copy of 2d array whith new reference - usefull to modify the source array without modify the copy
 * 
 * @function deep_copy_2d
 * @param {Array} src - the 2 dimensional array to copy
 * @callback {Array} - new 2d array with differents references in memory
 */
function deep_copy_2d(src)
{
    let ret = new Array();

    for (let y = 0; y < src.length; y++)
        ret[y] = Array.from(src[y]);
    return ret;
}

/**
 * limit a number in range [min - max[ - the overflow works like a loop - example: number=6 min=0 max=4 --> return 2
 * 
 * @function limit
 * @param {number} number - the number to limit 
 * @param {number} min - the minimum limit 
 * @param {number} max - the maximum limit
 * @callback {number} - the result of number in loop overflow
 */
function limit(number, min, max)
{
    if (number >= max)
        return min + number % (max - min);
    if (number < min)
        return max + number % (max - min);
    return number;
}

function is_array_contain_same_values(array1, array2)
{
    if (array1.length != array2.length)
        return false;
    
    let array1_sort = array1.sort();
    let array2_sort = array2.sort();

    for (let i = 0; i < array1.length; i++)
        if (array1_sort[i] != array2_sort[i])
            return false;
    return true;
}
