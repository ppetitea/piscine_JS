
let triangle = [{'x':5, 'y':2}, {'x':2, 'y':7}, {'x':8, 'y':7}];
let rectangle = [{'x':1, 'y':1}, {'x':8, 'y':2}, {'x':8, 'y':7}, {'x':1, 'y':9}]

let shape = triangle;
drawShape(grid, shape);

function drawShape(grid, points)
{
    let shift = grid.rules_weight;
    let n  = grid.normalize;

    grid.ctx.beginPath();
    for (let i = 0; i + 1 <= points.length; i++)
    {
        grid.ctx.moveTo(shift + n * points[i].x, shift + n * points[i].y);
        grid.ctx.lineTo(shift + n * points[(i + 1) % points.length].x,
                        shift + n * points[(i + 1) % points.length].y);
    }
    grid.ctx.strokeStyle = "red";
    grid.ctx.lineWidth = 4;
    grid.ctx.stroke();
    grid.ctx.closePath();
}
