import { Draw } from "../Utility/Draw/draw.class.js";
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

}