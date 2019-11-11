/**  INCLUDES  **/

let game = new Sudoku();

/**  UTILS  **/

function    convert_coor(x, y) // bidirectional coordonate converter - (view coordonate) <--> (Sudoku instance coordonate)
{
    return {'x': (x % 3) + (y % 3) * 3, 'y': parseInt(x / 3) + parseInt(y / 3) * 3};
}
function    check_each_sudoku_number() // use Sudoku instance named game to valid or invalid each box of the sudoku in view
{
    game.result.win = true;
    for (let y = 0; y < 9; y++)
    {
        for (let x = 0; x < 9; x++)
        {
            let coor = convert_coor(x, y);
            if (game.epur_map[y][x] == ' ' && game.valid_map[y][x] == game.map[y][x])
                $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").addClass("valid");
            else if (game.epur_map[y][x] == ' ' )
                $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").addClass("invalid");
            if (game.valid_map[y][x] != game.map[y][x])
                game.result.win = false;
        }
    }
    return game.result.win;
}
function    update_map_view() // use Sudoku instance named game to update each box of the sudoku view
{
    for (let y = 0; y < 9; y++)
    {
        for (let x = 0; x < 9; x++)
        {
            let coor = convert_coor(x, y);
            $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").removeClass("editable");
            $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").html(game.map[y][x]);
            if (game.epur_map[y][x] == ' ')
            {
                $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").attr('contenteditable','true');
                $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").addClass("editable");
            }
            else
                $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").attr('contenteditable','false');
        }
    }
}

/**  INIT  **/

update_map_view();


/**  EVENTS  **/

/**  --> NUMBER INPUT - FOCUS DISPLAY **/
$(".number").on('focus', function() {
    $(this).removeClass("valid invalid");
    $(this).parent(".box").addClass('focus');                      
})
$(".number").on('focusout', function() {
    $(this).parent(".box").removeClass('focus');
})
/**  --> NUMBER INPUT - VALIDATION, STORAGE **/
$(".number").on('input', function() { // - if input is valid (replace last value by input) - else (replace last value by space) 
    let coor = convert_coor($(this).parent(".box").index(), $(this).parent(".box").parent(".subgrid").index());
    let number = parseInt($(this).html().replace(game.map[coor.y][coor.x], ''));

    if (Number.isInteger(number) && number > 0 && number <= 9)
        game.map[coor.y][coor.x] = number;
    else
        game.map[coor.y][coor.x] = ' ';
    game.saveSudoku();
    update_map_view();
})
/**  --> BUTTONS EVENTS - RESET, CHECK, NEW **/
$("#reset").on('click', function(){ // reset the sudoku grid
    $(".result").remove();
    game.map = deep_copy_2d(game.epur_map);
    game.saveSudoku();
    update_map_view();
})
$("#check").on('click', function(){ // check each sudoku inputs and show result message
    $(".result").remove();
    if (check_each_sudoku_number())
        $("body").append("<p class=\"text result\" >Congratulation You Win !</p>");
    else
        $("body").append("<p class=\"text result\" >You're almost there..</p>");
})
$("#new").on('click', function(){ // generate new sudoku
    $(".result").remove();
    $(".number").removeClass("valid invalid");
    game.newSudoku();
    update_map_view();
})
/**  --> KEYBOARD INPUTS - FOCUS MOVEMENTS WITH ARROWS **/
document.addEventListener('keydown', (event) => {
    let x = limit($(document.activeElement).parent(".box").index(), 0, 9);
    let y = limit($(document.activeElement).parent(".box").parent(".subgrid").index(), 0, 9);
    let coor = convert_coor(x, y);
    let vec = {'x': 0, 'y': 0};

    if (event.key == 'ArrowUp')
        vec.y = -1;
    if (event.key == 'ArrowRight')
        vec.x = 1;
    if (event.key == 'ArrowDown')
        vec.y = 1;
    if (event.key == 'ArrowLeft')
        vec.x = -1;

    let i = 1;
    while (i < 10) // use input direction to move focus on "the next editable box" in this direction
    {
        x = limit(coor.x + vec.x * i, 0, 9);
        y = limit(coor.y + vec.y * i, 0, 9);
        if (game.epur_map[y][x] == ' ')
            break; 
        i++;
    }
    coor = convert_coor(x, y);
    $(".subgrid:eq("+coor.y+") .box:eq("+coor.x+") p").focus();
})