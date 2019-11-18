import {fix_dpi, vmin} from './ratio.js';
let canvas = document.getElementById("map");

fix_dpi(canvas);

function    initialize_map(canvas, size)
{
    return {'canvas': canvas,
            'ctx': canvas.getContext("2d"),
            'start': 0,
            'size': size,
            'rules_weight': vmin(6),
            'width': canvas.getAttribute('width') - vmin(12),
            'height': canvas.getAttribute('height') - vmin(12),
            'normalize': (canvas.getAttribute('width') - vmin(12)) / size};
}
let size = 20;
let map = initialize_map(canvas, size);
export {map};
drawCoordinateSystem(map);

export function drawCoordinateSystem(map){
    let shift = map.rules_weight;
    let w = map.width;
    let h = map.height;
    let n = map.normalize;

    map.ctx.beginPath();
    map.ctx.fillStyle = "whitesmoke";
    map.ctx.font = 40/size + "vmin Arial";
    map.ctx.textAlign = "center";
    map.ctx.strokeStyle = "lightgray";
    map.ctx.lineWidth = 1;
    
    for (let y = 0; n * y <= h; y++) {
        map.ctx.fillText(map.start + y, vmin(2), shift + n * y + vmin(1));
        map.ctx.moveTo(shift, shift + n * y);
        map.ctx.lineTo(shift + w, shift + n * y);
    }
    for (let x = 0; x * n <= h; x++) {
        map.ctx.fillText(map.start + x, shift + n * x, vmin(3.5));
        map.ctx.moveTo(shift + n * x, shift);
        map.ctx.lineTo(shift + n * x, shift + h);
    }
    map.ctx.closePath();
    map.ctx.stroke();
}

