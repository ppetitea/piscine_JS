import { Draw } from "../Utility/Draw/draw.class.js";

export class Wall {
    constructor (vertex1, vertex2, color){
        this.a = vertex1;
        this.b = vertex2;
        this.color = color;
    }
    show(map){
        const draw = new Draw(map);
        const pos = draw.transformCoor(this.a.x, this.a.y);
        const dest = draw.transformCoor(this.b.x, this.b.y);
        map.ctx.beginPath();
        map.ctx.lineWidth = 5;
        map.ctx.strokeStyle = this.color;
        map.ctx.moveTo(pos.x, pos.y);
        map.ctx.lineTo(dest.x,dest.y);
        map.ctx.stroke();
        map.ctx.closePath();
    }
}