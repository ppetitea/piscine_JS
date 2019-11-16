import { Draw } from "../Utility/Draw/draw.class.js";
import { Ray } from "./Ray.class.js";
import { Vector } from "../Utility/Maths/Vector.class.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";

export class Player {
    constructor (pos, dir, size, sector){
        this.pos = pos;
        this.sector = sector;
        this.dir = dir;
        this.size = size;
        this.fov = 60 / 180 * Math.PI;
        this.rays = 200;
    }

    show(map){
        let draw = new Draw(map);
        const pos = draw.transformCoor(this.pos.x, this.pos.y);
        map.ctx.beginPath();
        map.ctx.lineWidth = 10;
        // map.ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
        map.ctx.arc(pos.x, pos.y, this.size * 2, 0, 2 * Math.PI);
        map.ctx.fill();
        map.ctx.stroke();
        map.ctx.beginPath();
    }

    sectorSwap(sector){
        for (const segment of sector){
            if (segment.type == 'portal' && segment.sectorSide != segment.getSide(this.pos)){
                this.sector = segment.nextSector;
                console.log('sector '+this.sector);
                break;
            }
        }
    }
    collide(sector){
        let matrix = new Matrix();
        for (const segment of sector){
            if (segment.type != 'portal' && segment.sectorSide != segment.getSide(this.pos)){
                let translation = matrix.translation((this.dir.x + segment.dir.x) / 10, (this.dir.y + segment.dir.y) / 10);
                this.pos = matrix.transformVertex(translation, this.pos);
                break;
            }
        }
    }

}