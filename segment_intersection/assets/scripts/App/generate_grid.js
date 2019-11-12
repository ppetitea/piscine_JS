
let canvas = document.getElementById("grid");

fix_dpi(canvas);

function    initialize_grid(canvas, size)
{
    return {'ctx': canvas.getContext("2d"),
            'start': 0,
            'size': size,
            'rules_weight': vmin(6),
            'width': canvas.getAttribute('width') - vmin(12),
            'height': canvas.getAttribute('height') - vmin(12),
            'normalize': (canvas.getAttribute('width') - vmin(12)) / size};
}

let grid = initialize_grid(canvas, 10);

drawCoordinateSystem(grid);

function drawCoordinateSystem(grid){
    let shift = grid.rules_weight;
    let w = grid.width;
    let h = grid.height;
    let n = grid.normalize;

    grid.ctx.fillStyle = "whitesmoke";
    grid.ctx.font = "3vmin Arial";
    grid.ctx.textAlign = "center";
    grid.ctx.strokeStyle = "lightgray";
    
    for (let y = 0; n * y <= h; y++) {
        grid.ctx.fillText(grid.start + y, vmin(2), shift + n * y + vmin(1));
        grid.ctx.moveTo(shift, shift + n * y);
        grid.ctx.lineTo(shift + w, shift + n * y);
    }
    for (let x = 0; x * n <= h; x++) {
        grid.ctx.fillText(grid.start + x, shift + n * x, vmin(3.5));
        grid.ctx.moveTo(shift + n * x, shift);
        grid.ctx.lineTo(shift + n * x, shift + h);
    }
    grid.ctx.closePath();
    grid.ctx.stroke();
}


function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}
function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}
function vmin(v) {
    return Math.min(vh(v), vw(v));
}
function vmax(v) {
    return Math.max(vh(v), vw(v));
}
function fix_dpi(canvas) {
    let dpi = window.devicePixelRatio;
    let style = {
        height() {
        return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
        return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        }
    }
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}