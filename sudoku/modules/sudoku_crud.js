let cookie = new Cookie;
let generator = new SudokuGenerator('medium');

/**
 * Sudoku game class to create save and update sudoku
 */
class Sudoku {

    /**
     * if exist get cookie named sudoku and use cookie data to fill instance variables
     * 
     * @function getSudoku
     * @callback {boolean} - if cookie exist (true) else (false);
     */
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

    /**
     * use instance variables to create/update a cookie name "sudoku"
     * 
     * @function saveSudoku
     */
    saveSudoku()
    {
        cookie.set("sudoku", JSON.stringify({   'valid_map': this.valid_map,
                                                'epur_map': this.epur_map,
                                                'map': this.map,
                                                'result': this.result}), 1);
    }

    /**
     * use SudokuGenerator class to generate new sudoku and fill instance variables
     * 
     * @function newSudoku
     */
    newSudoku()
    {
        generator = new SudokuGenerator('medium');
        this.valid_map = generator.valid_map;
        this.epur_map = generator.epur_map;
        this.map = generator.map;
        this.saveSudoku();
    }

    /**
     * the constructor of Sudoku class - if exist (get last sudoku) else (generate new sudoku)
     * 
     * @function constructor
     */
    constructor()
    {
        this.result = {'win': false};
        if (!this.getSudoku())
            this.newSudoku();
    }

}
