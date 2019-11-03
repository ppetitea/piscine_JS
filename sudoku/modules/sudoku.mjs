import Cookie from './cookies.mjs';
import SudokuGenerator from './sudoku_generator.mjs';

let cookie = new Cookie;
let generator = new SudokuGenerator('medium');

/**
 * Sudoku game class
 */
class Sudoku {

    getSudoku()
    {
        let data = cookie.getValue("sudoku");

        if (data != false)
        {
            let game = JSON.parse(data);
            this.valid_map = game.valid_map;
            this.epur_map = game.epur_map;
            this.map = game.map;
            this.result = game.result;
            return true;
        }
        else
            return false;
    }

    saveSudoku()
    {
        cookie.set("sudoku", JSON.stringify({   'valid_map': this.valid_map,
                                                'epur_map': this.epur_map,
                                                'map': this.map,
                                                'result': this.result}), 1);
    }

    showSudoku()
    {
        let show;
        for (let i = 0; i < 9; i++)
        {
            for (let j = 0; j < 9; j++)
                show[i][j] = map[j / 3 + (i / 3) * 3][j % 3 + (i % 3) * 3];
        }
        console.log(show);
    }

    newSudoku()
    {
        generator = new SudokuGenerator('medium');
        this.valid_map = generator.valid_map;
        this.epur_map = generator.epur_map;
        this.map = generator.map;
        this.saveSudoku();
    }

    constructor()
    {
        this.result = {'win': false};
        if (!this.getSudoku())
            this.newSudoku();
    }

}

export default Sudoku;