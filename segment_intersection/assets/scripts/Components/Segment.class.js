import { Draw } from "../Utility/Draw/draw.class.js";
import { Vector } from "../Utility/Maths/Vector.class.js";

export class Segment {
    constructor (type, vertex1, vertex2, color, sectorCenter, sector){
        this.a = vertex1;
        this.b = vertex2;
        this.color = color;
        this.type = type;
        this.dir = this.getDirection(sectorCenter);

        this.sectorSide = this.getSide(sectorCenter);
        if (type == 'portal')
            this.nextSector = sector;
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
    getDirection(vtx){
        let vector = new Vector(this.b.x - this.a.x, this.b.y - this.a.y);
        vector = vector.normalize();
        if (0 < this.getSide(vtx))
            return new Vector(-vector.y, vector.x);
        else
            return new Vector(vector.y, -vector.x);
    }
    getSide(vtx){
        const a = this.a;
        const b = this.b;
        return (0 < (b.x - a.x) * (vtx.y - a.y) - (b.y - a.y) * (vtx.x - a.x));
    }
}