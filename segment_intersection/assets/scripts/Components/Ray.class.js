import {Vertex} from "../Utility/Maths/Vertex.class.js";
import {Vector} from "../Utility/Maths/Vector.class.js";
import {Draw} from '../Utility/Draw/draw.class.js';

export class Ray{
    constructor(vertex, vector){
        this.pos = vertex;
        this.dir = vector;
    }
    cast(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return null;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            const ptX = x1 + t * (x2 - x1);
            const ptY = y1 + t * (y2 - y1);
            this.dest = new Vertex(ptX, ptY);
            return this.dest;
        } else {
            return null;
        }
    }

    show(map, dest, color){
        const draw = new Draw(map);
        const pos = draw.transformCoor(this.pos.x, this.pos.y);
        dest = draw.transformCoor(dest.x, dest.y);
        map.ctx.beginPath();
        map.ctx.lineWidth = 2;
        map.ctx.strokeStyle = color;
        map.ctx.moveTo(pos.x, pos.y);
        map.ctx.lineTo(dest.x,dest.y);
        map.ctx.stroke();
        map.ctx.closePath();
    }
}
