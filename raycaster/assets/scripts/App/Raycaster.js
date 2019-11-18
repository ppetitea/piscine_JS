import { Vector } from "../Utility/Maths/Vector.class.js";
import { Ray } from "../Components/Ray.class.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";
import { Vertex } from "../Utility/Maths/Vertex.class.js";

// export function    raycaster(map, player, sectors)
// {
//     let matrix = new Matrix();
//     let hit;
//     let ray;
//     let radShift = player.fov / player.rays;
//     let dirShift = matrix.rotation(radShift);
//     let dir = matrix.transformVertex(matrix.rotation(-player.fov / 2), player.dir);
//     let playerAngle = Math.atan2(player.dir.y, player.dir.x);
//     let tmpDest;
//     let columns = [];
//     // console.log(Math.cos(Math.atan2(dir.y, dir.x) - playerAngle));

//     for (let i = 0; i < player.rays; i++){
//         ray = new Ray(player.pos, dir);
//         tmpDest = matrix.transformVertex(matrix.scale(10), dir).add(player.pos);
//         if (hit = getHitPosition(ray, sectors, player.sector)){
//             ray.show(map, hit.pos, 'rgba(255, 0, 255, 0.5)');
//             let test = new Vertex(0, 0);
//             test.x = (hit.pos.x - player.pos.x);
//             test.y = (hit.pos.y - player.pos.y);
//             let dist = new Vector(test.x, test.y).magnitude();
//             //  * Math.cos(Math.atan2(dir.y, dir.x) - playerAngle);
//             // how to use camera matrix ????????????
//             columns.push({'index': i, 'dist': dist, 'color': 'grey'});
//         }
//         else
//             ray.show(map, tmpDest, 'rgba(255, 255, 255, 0.2)');
//         dir = matrix.transformVertex(dirShift, dir);
//     }
//     return columns;
// }

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