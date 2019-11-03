import {is_authorized_map ,is_authorized_position} from './sudoku_validator.mjs';
import {deep_copy_2d} from './utils.mjs';


class SudokuGenerator {

    shuffle(array)
    {
        let tmp;
        let random_index;

        for (let current_index = array.length - 1; current_index >= 0; current_index--)
        {
            random_index = Math.floor(Math.random() * current_index);
            tmp = array[current_index];
            array[current_index] = array[random_index];
            array[random_index] = tmp;
        }
        return array;
    }

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

    generate(map, x, y)
    {
        if (y >= 9)
            return true;
        let next_x;
        let next_y;
        let values = this.shuffle([1,2,3,4,5,6,7,8,9]);

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

export default SudokuGenerator; 