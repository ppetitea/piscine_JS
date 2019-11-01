import Cookie from './cookies.mjs';

let cookie = new Cookie;

/**
 * TicTacToe game class
 */
class TicTacToe {

    /**
     * get cookie datas "tic-tac-toe" of last instance of game 
     * 
     * @function get_last_game_infos
     */
    get_last_game_infos()
    {
        let infos = cookie.getValue("tic-tac-toe");

        if (infos != false)
        {
            let game = JSON.parse(infos);
            this.turn = game.turn;
            this.result = game.result;
            this.map = game.map;
            this.players = game.players;
            return true;
        }
        else
            return false;
    }

    /**
     * save a cookie which contain the turn, the map, the players and the result of the current game instance
     * 
     * @function save_game
     */
    save_game()
    {
        cookie.set("tic-tac-toe", JSON.stringify({  'turn': this.turn,
                                                    'map': this.map,
                                                    'players': this.players,
                                                    'result': this.result}), 1);
    }

    /**
     * @function constructor - the constructor of the class TicTacToe who intialize empty map, and result variables
     */
    constructor()
    {
        this.turn = 'green';
        this.result = {'winner': '', 'loose': false};
        this.map = ['empty','empty','empty',
                    'empty','empty','empty',
                    'empty','empty','empty'];
        this.players = {'green': {'score': 0, 'shape': 'cross'}, 'red': {'score': 0, 'shape': 'circle'}}
        if (!this.get_last_game_infos())
            this.save_game();
    }

    /**
     * update the map at play_position on value player_id, then check if the move trigger win or loose
     * 
     * @function update_map
     * @param {number} player_color     - the color of the player who play this turn
     * @param {number} play_position    - the index of the box on which the player clicked
     */
    update_map(player_color, play_position)
    {
        if (this.result.winner != '' || this.result.loose == true)
            this.reset_game();
        if (this.map[play_position] == 'empty')
        {
            this.map[play_position] = player_color;
            if (this.check_win(player_color))
                this.players[player_color].score++;
            else
                this.check_loose();
            this.turn = this.turn == 'green' ? 'red' : 'green';
        }
        this.save_game();
    }

    /**
     * detect if 3 box with the same color are aligning if true set winner to player color 
     * 
     * @function check_win
     * @param {number} color - the player color ['green' | 'red']
     */
    check_win(color)
    {
        if (this.map[0] == color && this.map[4] == color && this.map[8] == color)
            this.result.winner = color;
        if (this.map[6] == color && this.map[4] == color && this.map[2] == color)
            this.result.winner = color;

        for (let i = 0; i < 3; i++)
        {
            if (this.map[i] == color && this.map[i + 3] == color && this.map[i + 6] == color)
                this.result.winner = color;
            if (this.map[i * 3] == color && this.map[i * 3 + 1] == color && this.map[i * 3 + 2] == color)
                this.result.winner = color;
        }

        if (this.result.winner == color)
            return true;
        return false;
    }

    /**
     * detect if each box is full and if true set loose to true 
     * this function don't check if 3 box are aligning so it have to be called after check_win function
     * 
     * @function check_loose
     */
    check_loose()
    {
        this.result.loose = true;
        for (let i = 0; i < 9; i++)
            if (this.map[i] == 'empty')
                this.result.loose = false;
        return this.result.loose;3
        
    }

    /**
     * reset map result variable - this function have to be used when a player loose or win the game
     * 
     * @function reset_game
     */
    reset_game()
    {
        this.result = {'winner': '', 'loose': false};
        this.map = ['empty','empty','empty',
                    'empty','empty','empty',
                    'empty','empty','empty'];
    }
}

export default TicTacToe