import {fix_dpi} from './ratio.js';

let canvas = document.getElementById("game");
fix_dpi(canvas);

const game = initialize_game(canvas);

export {game};

function    initialize_game(canvas)
{
    return {'canvas': canvas,
            'ctx': canvas.getContext("2d"),
            'width': canvas.getAttribute('width'),
            'height': canvas.getAttribute('height')};
}

export function    showGameView(game, columns, columnAmount){
    for (const column of columns)
        showColumn(game, column, columnAmount);
}

function    showColumn(game, column, columnAmount){
    let posX = (column.index / columnAmount) * game.width;
    let columnWidth = game.width / columnAmount;
    let columnHeight = game.height / (column.dist / 2);
    let posY = (game.height - columnHeight) / 2;
    let alpha = 1 / column.dist;
    game.ctx.beginPath();
    game.ctx.lineWidth = columnWidth;
    game.ctx.strokeStyle = `rgb(255, 0, 255, ${alpha})`;
    game.ctx.moveTo(posX, posY);
    game.ctx.lineTo(posX, posY + columnHeight);
    game.ctx.stroke();
    game.ctx.closePath();
}