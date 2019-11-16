import { Vector } from "../Utility/Maths/Vector.class.js";
import { Ray } from "../Components/Ray.class.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";

export function    raycaster(map, player, sectors)
{
    let matrix = new Matrix();
    let hit;
    let ray;
    let dirShift = matrix.rotation(player.fov / player.rays);
    let dir = matrix.transformVertex(matrix.rotation(-player.fov / 2), player.dir);
    let tmpDest;

    for (let i = 0; i < player.rays; i++){
        ray = new Ray(player.pos, dir);
        tmpDest = matrix.transformVertex(matrix.scale(10), dir).add(player.pos);
        if (hit = getHitPosition(ray, sectors, player.sector))
            ray.show(map, hit.pos, 'rgba(255, 0, 255, 0.5)');
        else
            ray.show(map, tmpDest, 'rgba(255, 255, 255, 0.2)');
        dir = matrix.transformVertex(dirShift, dir);
    }
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