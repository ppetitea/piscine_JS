import { Vector } from "../Utility/Maths/Vector.class.js";
import { Ray } from "../Components/Ray.class.js";

export  function    raycaster(map, player, sectors){
    const playerAngle = Math.atan2(player.camera.dir.y, player.camera.dir.x);
    const planHalf  = player.camera.planWidth / 2;
    const pos       = player.camera.pos;
    let columns = [];

    for (let i = -planHalf; i < planHalf; i++){
        const plan = player.camera.plan.scalarProduct(i);
        const dir = player.camera.toPlan.add(plan);
        const ray = new Ray(pos, dir);
        const hit = getHitPosition(ray, sectors, player.sector);
        if (hit){
            ray.show(map, hit.pos, 'rgba(255, 0, 255, 0.5)');
            const dist = new Vector(hit.pos.x - pos.x, hit.pos.y - pos.y).magnitude();
            const correctDist = dist * Math.cos(Math.atan2(dir.y, dir.x) - playerAngle);
            columns.push({'index': i + planHalf, 'dist': correctDist, 'color': 'grey'})
        }
        else
            ray.show(map, dir.add(pos), 'rgba(255, 255, 255, 0.2)');
    }
    return columns;
}

export function    getHitPosition(ray, sectors, currentSector, lastSector){
    let hit = null;
    for (const segment of sectors[currentSector]){
        if (lastSector == undefined || segment.nextSector != lastSector){
            hit = {'pos':ray.cast(segment)};
            if (hit.pos != null){
                if (segment.type == 'portal'){
                    return getHitPosition(ray, sectors, segment.nextSector, currentSector);
                }
                hit.segment = segment;
                return hit;
            }
        }
    }
    return null;
}