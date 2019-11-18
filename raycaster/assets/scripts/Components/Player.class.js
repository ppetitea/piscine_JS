import { Draw } from "../Utility/Draw/draw.class.js";
import { Ray } from "./Ray.class.js";
import { Vector } from "../Utility/Maths/Vector.class.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";
import { Camera } from "../Utility/Maths/Camera.class.js";

export class Player {
    constructor (pos, dir, size, sector){
        this.camera = new Camera(pos, dir, 90 / 180 * Math.PI, 500);
        this.size = size;
        this.sector = sector;
    }

    show(map){
        let draw = new Draw(map);
        const pos = draw.transformCoor(this.camera.pos.x, this.camera.pos.y);
        map.ctx.beginPath();
        map.ctx.lineWidth = 10;
        map.ctx.arc(pos.x, pos.y, this.size * 2, 0, 2 * Math.PI);
        map.ctx.fill();
        map.ctx.stroke();
        map.ctx.beginPath();
    }

    sectorSwap(sector){
        for (const segment of sector){
            if (segment.type == 'portal' && segment.sectorSide != segment.getSide(this.camera.pos)){
                this.sector = segment.nextSector;
                console.log('sector '+this.sector);
                break;
            }
        }
    }
    collide(sector){
        let matrix = new Matrix();
        for (const segment of sector){
            if (segment.type != 'portal' && segment.sectorSide != segment.getSide(this.camera.pos)){
                let translation = matrix.translation((this.camera.dir.x + segment.dir.x) / 10, (this.camera.dir.y + segment.dir.y) / 10);
                this.camera.pos = matrix.transformVertex(translation, this.camera.pos);
                break;
            }
        }
    }

}