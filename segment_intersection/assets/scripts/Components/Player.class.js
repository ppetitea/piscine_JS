import { Draw } from "../Utility/Draw/draw.class.js";

export class Player {
    constructor (pos, dir, size){
        this.pos = pos;
        this.dir = dir;
        this.size = size;
        this.fov = 60 / 180 * Math.PI;
        this.rays = 100;
    }

    show(map){
        let draw = new Draw(map);
        const pos = draw.transformCoor(this.pos.x, this.pos.y);
        map.ctx.beginPath();
        map.ctx.lineWidth = 20;
        map.ctx.strokeStyle = 'green';
        map.ctx.rect(pos.x, pos.y, this.size, this.size);
        map.ctx.stroke();
        map.ctx.beginPath();
    }

}