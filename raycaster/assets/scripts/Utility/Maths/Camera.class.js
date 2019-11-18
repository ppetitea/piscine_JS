import { Vector } from "./Vector.class.js";

export class Camera {
    constructor(pos, dir, fov, planWidth){
        this.pos = pos;
        this.dir = dir;
        this.fov = fov;
        this.planWidth = planWidth;
        this.cameraToPlanDist = (planWidth / 2) / Math.tan(fov / 2);
        this.toPlan = this.dir.scalarProduct(this.cameraToPlanDist);
        this.plan = new Vector(dir.y, -dir.x);
    }

    update(pos, dir){
        this.pos = pos;
        this.dir = dir;
        this.toPlan = this.dir.scalarProduct(this.cameraToPlanDist);
        this.plan = new Vector(-dir.y, dir.x);
    }

}