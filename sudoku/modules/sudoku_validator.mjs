/**
 * check if value position is valid horizontaly, verticaly and in the box of sudoku grid named map
 * 
 * @function is_authorized_position
 * @param {array} map - the sudoku grid
 * @param {Object} pos - the position of value in sudoku grid
 * @param {number} number - the value to check
 * @callback {boolean} - if value safe (true) else (false)
 */
export function is_authorized_position(map, pos, number)
{
    let box = {'x': parseInt(pos.x / 3) * 3, 'y': parseInt(pos.y / 3) * 3}

    for (let y = 0; y < 3; y++)
    {
        for (let x = 0; x < 3; x++)
            if (map[box.y + y][box.x + x] == number && (box.x + x != pos.x || box.y + y != pos.y))
                return false;
    }
    for (let i = 0; i < 9; i++)
        if ((map[pos.y][i] == number && i != pos.x) || (map[i][pos.x] == number && i != pos.y))
            return false;
    return true;
}

/**
 * check for each value of sudoku grid if position is valid horizontaly, verticaly and in the box
 * 
 * @function is_authorized_map
 * @param {array} map - the sudoku grid
 * @callback {boolean} - if grid safe (true) else (false)
 */
export function is_authorized_map(map)
{
    for (let y = 0; y < 9; y++)
    {
        for (let x = 0; x < 9; x++)
            if (!is_authorized_position(map, {'x': x, 'y': y}, map[y][x]))
                return false;
    }
    return true;
}
