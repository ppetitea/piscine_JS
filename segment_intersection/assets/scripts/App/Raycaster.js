import { Vector } from "../Utility/Maths/Vector.class.js";
import { Ray } from "../Components/Ray.class.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";

export function    raycaster(map, player, walls)
{
    let matrix = new Matrix();
    let hits = [];
    let hit;
    let ray;
    let dirShift = matrix.rotation(player.fov / player.rays);
    let dir = matrix.transformVertex(matrix.rotation(-player.fov / 2), player.dir);
    let tmpDest;

    for (let i = 0; i < player.rays; i++){
        hits = [];
        for (const wall of walls)
        {
            ray = new Ray(player.pos, dir);
            hits.push(ray.cast(wall));
        }
        tmpDest = matrix.transformVertex(matrix.scale(10), dir).add(player.pos);
        if (hit = getHitPosition(player.pos, hits))
            ray.show(map, hit, 'blue');
        else
            ray.show(map, tmpDest, 'yellow');
        dir = matrix.transformVertex(dirShift, dir);
    }
}

function getHitPosition(origin, hits){
    let ret = null;
    let lastDist = null;
    for (const hit of hits)
    {
        if (hit)
        {   
            let newDist = getDist(origin, hit);
            if (lastDist == null || newDist < lastDist){
                ret = hit;
                lastDist = newDist;
            }
        }
    }
    return ret;
}

function getDist(origin, dest){
    return (dest.x - origin.x) * (dest.x - origin.x) + (dest.y - origin.y) * (dest.y - origin.y);
}