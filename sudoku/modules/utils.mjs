export function deep_copy_2d(src)
{
    let ret = new Array();

    for (let y = 0; y < src.length; y++)
        ret[y] = Array.from(src[y]);
    return ret;
}
export function limit(number, min, max)
{
    if (number >= max)
        return min + number % (max - min);
    if (number < min)
        return max + number % (max - min);
    return number;
}