import { Vertex } from "../Utility/Maths/Vertex.class.js";
import { Player } from '../Components/Player.class.js';
import { Ray } from "../Components/Ray.class.js";
import { Vector } from "../Utility/Maths/Vector.class.js";
import { raycaster, getHitPosition } from "./Raycaster.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";
import { Draw } from "../Utility/Draw/draw.class.js";
import {keys} from './events.js';
import {map, drawCoordinateSystem} from '../Utility/Draw/map.js';
import {game, showGameView} from '../Utility/Draw/game.js';
import {sectors} from './Sectors.js';

let draw = new Draw();
let player = new Player(new Vertex(3, 2), new Vector(0, 1), 5, 0);


export {player};

setInterval(loop, 30);

function    loop(){
    resetCanvas(map, game);
    const rays = raycaster(map, player, sectors);
    show(game, rays, player, sectors);
    updatePlayer(keys, player, sectors)
}

function    resetCanvas(map, game){
    draw.reset_canvas(map.ctx, map.canvas);
    draw.reset_canvas(game.ctx, game.canvas);
    drawCoordinateSystem(map);
}

function    updatePlayer(keys, player, sectors){
    updateCamera(keys);
    player.sectorSwap(sectors[player.sector]);
}

function    show(game, rays, player, sectors){

    player.show(map);
    for (const segments of sectors)
        for (const segment of segments)
            segment.show(map);
    showGameView(game, rays, player.camera.planWidth);
}

const matrix = new Matrix();

function    updateCamera(keys){
    let translation;
    let pos = player.camera.pos;
    let dir = player.camera.dir;
    let movementDir = dir;

    if (keys['ArrowLeft'])
        dir = matrix.transformVertex(matrix.rotation(-5 / 180 * Math.PI), dir);
    if (keys['ArrowRight'])
        dir = matrix.transformVertex(matrix.rotation(5 / 180 * Math.PI), dir);
    if (keys['w']){
        movementDir = dir;
        translation = matrix.translation(dir.x / 10, dir.y / 10);
        pos = matrix.transformVertex(translation, player.camera.pos);
        pos = tweakPosition(sectors, player, movementDir, pos);
    }
    if (keys['a']){
        movementDir = new Vector(dir.y, -dir.x);
        translation = matrix.translation(dir.y / 10, -dir.x / 10);
        pos = matrix.transformVertex(translation, player.camera.pos);
        pos = tweakPosition(sectors, player, movementDir, pos);
    }
    if (keys['s']){
        movementDir = new Vector(-dir.x, -dir.y);
        translation = matrix.translation(-dir.x / 10, -dir.y / 10);
        pos = matrix.transformVertex(translation, player.camera.pos);
        pos = tweakPosition(sectors, player, movementDir, pos);
    }
    if (keys['d']){
        movementDir = new Vector(-dir.y, dir.x);
        translation = matrix.translation(-dir.y / 10, dir.x / 10);
        pos = matrix.transformVertex(translation, player.camera.pos);
        pos = tweakPosition(sectors, player, movementDir, pos);
    }
    player.camera.update(pos, dir);
}

function    tweakPosition(sectors, player, move, pos){
    let ray = new Ray(player.camera.pos, move);
    let hit;
    hit = getHitPosition(ray, sectors, player.sector);
    if (hit != null){
        let dist = getDist(pos, hit.pos);
        if (dist < 0.01){
            let newDir = rebound(move, hit.segment.dir);
            ray = new Ray(player.camera.pos, newDir);
            hit = getHitPosition(ray, sectors, player.sector);
            if (hit != null && (dist = getDist(pos, hit.pos)) < 0.02)
                newDir = new Vector(0, 0);
            let newPos = new Vector(player.camera.pos.x + newDir.x / 10, player.camera.pos.y + newDir.y / 10);;
            return newPos;
        }
    }
    return pos;
}

function    rebound(move, segmentDir){
    let dir = move.add(segmentDir);
;    let newDir = new Vector(segmentDir.y, segmentDir.x);
    if (dir.x < 0 && newDir.x > 0 || dir.x > 0 && newDir.x < 0)
        newDir.x *= -1;
    if (dir.y < 0 && newDir.y > 0 || dir.y > 0 && newDir.y < 0)
        newDir.y *= -1;
    return (newDir);
}

function    getDist(a, b){
    return (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
}

