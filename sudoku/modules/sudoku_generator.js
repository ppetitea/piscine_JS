
/**
 * @class SudokuGenerator - generate 3 two dimensional array - 1.(valid_map=full grid) / 2.(epur_map=grid with empty box) / 3.(map=the grid to fill)
 */
class SudokuGenerator {

    /**
     * use backtracking to count the number of solutions of epur_soduku_grid
     * 
     * @function count_solutions
     * @param {array} epur  - the grid whith random empty box 
     * @param {array} map   - the current grid
     * @param {number} x    - the curent x position in grid 
     * @param {number} y    - the curent y position in grid
     */
    count_solutions(epur, map, x, y)
    {
        if (y >= 9)
        {
            this.solutions_count++;
            return false;
        }
        let next_x = (x + 1) % 9;
        let next_y = y + parseInt((x + 1) / 9);
        let values = [1,2,3,4,5,6,7,8,9];

        if (epur[y][x] != ' ')
            return this.count_solutions(epur, map, next_x, next_y);
        else
        {
            for (let i = 0; i < 9; i++)
            {
                if (is_authorized_position(map, {'x': x,'y': y}, values[i]))
                {
                    map[y][x] = values[i];
                    if (this.count_solutions(epur, map, next_x, next_y))
                        return true;
                    map[y][x] = ' ';
                }
            }
        }
        return false;
    }

    /**
     * randomly remove an amount of numbers in grid - use count_solution to valid remove operation
     * 
     * @function epur
     * @param {array} valid_map - the full sudoku grid 
     * @param {array} map - the current sudoku grid
     * @param {number} number - the amount of wanted empty box
     */
    epur(valid_map, map, number)
    {
        for (let i = 0; i < number; i++)
        {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);

            if (map[y][x] != ' ')
            {
                map[y][x] = ' ';
                this.count_solutions(deep_copy_2d(map), deep_copy_2d(map), 0, 0);
                if (this.solutions_count != 1)
                {
                    map[y][x] = valid_map[y][x];
                    i--;
                }
                this.solutions_count = 0;
            }
            else
                i--;
        }
    }

    /**
     * use backtracking and shuffle to generate random sudoku grid
     * 
     * @function generate
     * @param {array} map   - the current grid
     * @param {number} x    - the curent x position in grid 
     * @param {number} y    - the curent y position in grid
     */
    generate(map, x, y)
    {
        if (y >= 9)
            return true;
        let next_x;
        let next_y;
        let values = shuffle([1,2,3,4,5,6,7,8,9]);

        for (let i = 0; i < 9; i++)
        {
            if (is_authorized_position(map, {'x': x,'y': y}, values[i]))
            {
                map[y][x] = values[i];
                next_x = (x + 1) % 9;
                next_y = y + parseInt((x + 1) / 9);
                if (this.generate(map, next_x, next_y))
                    return true;
                map[y][x] = ' ';
            }
        }
        return false;
    }

    /**
     * use keyword (easy, medium, hard) to define the number of empty box in sudoku
     * max supported is 50 beyond that the algorithm can not be sure to find a valid grid
     * 
     * @function get_empty_box_amount
     * @param difficulty_level 
     * @callback {number} - the number of empty box in the sudoku
     */
    get_empty_box_amount(difficulty_level)
    {
        if (difficulty_level == 'hard')
            return 50;
        else if (difficulty_level == 'medium')
            return 40;
        else if (difficulty_level == 'easy')
            return 30;
        else
            return 35;
    }

    /**
     * generate new valid random sudoku 
     * 
     * @function constructor
     * @param {number} difficulty_level - the asked difficulty of generated sudoku
     */
    constructor(difficulty_level)
    {
        this.solutions_count = 0;
        let empty_box_amount = this.get_empty_box_amount(difficulty_level);
        let map =[  [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' ']];

        this.generate(map, 0, 0);
        this.valid_map = deep_copy_2d(map);
        this.epur(this.valid_map, map, empty_box_amount);
        this.epur_map = deep_copy_2d(map);
        this.map = map;
        this.count_solutions(deep_copy_2d(map), map, 0, 0);
    }

}