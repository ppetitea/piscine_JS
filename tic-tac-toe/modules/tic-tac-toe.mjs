/**
 * TicTacToe game class
 */
class TicTacToe {

    constructor()
    {
        this.map = ['0','0','0',
                    '0','0','0',
                    '0','0','0'];
        this.winner = 0;
        this.loose = false;
    }

    check_win(player_id)
    {
        for (let i = 0; i < 3; i++)
        {
            if (this.map[i] == player_id && this.map[i + 3] == player_id && this.map[i + 6] == player_id)
                this.winner = player_id;
            if (this.map[i * 3] == player_id && this.map[i * 3 + 1] == player_id && this.map[i * 3 + 2] == player_id)
                this.winner = player_id;
        }
        if (this.map[0] == player_id && this.map[4] == player_id && this.map[8] == player_id)
            this.winner = player_id;
        if (this.map[6] == player_id && this.map[4] == player_id && this.map[2] == player_id)
            this.winner = player_id;
    }

    check_loose()
    {
        this.loose = true;
        for (let i = 0; i < 9; i++)
            if (this.map[i] == 0)
                this.loose = false;
    }

    update_map(player_id, map_position)
    {
        this.map[map_position] = player_id;
        this.check_win(player_id);   
        this.check_loose();
    }
}

// module.exports =  TicTacToe;
export default TicTacToe