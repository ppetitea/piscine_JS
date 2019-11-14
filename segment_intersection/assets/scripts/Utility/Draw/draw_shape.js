
let triangle = [{'x':5, 'y':2}, {'x':2, 'y':7}, {'x':8, 'y':7}];
let rectangle = [{'x':1, 'y':1}, {'x':8, 'y':2}, {'x':8, 'y':7}, {'x':1, 'y':9}]

let shape = triangle;

function drawShape(grid, points, color)
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
    grid.ctx.strokeStyle = color;
    grid.ctx.lineWidth = 4;
    grid.ctx.stroke();
    grid.ctx.closePath();
}

// let wall = {'a':{'x':0, 'y': 0}, 'b':{'x':8, 'y': 2}};
// let wall_view = wall_to_vertex_list(wall);
// drawShape(grid, wall_view, 'red');

// let ray = {'pos':{'x':2, 'y': 1}, 'dir':{'x':1, 'y': 0}};
// let ray_view = ray_to_vertex_list(ray);
// drawShape(grid, ray_view, 'blue');

// // console.log(cast(ray, wall));

