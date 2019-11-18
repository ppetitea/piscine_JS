import { Vertex } from "../Utility/Maths/Vertex.class.js";
import { Player } from '../Components/Player.class.js';
import { Segment } from "../Components/Segment.class.js";
import { Ray } from "../Components/Ray.class.js";
import { Vector } from "../Utility/Maths/Vector.class.js";
import { raycaster, getHitPosition } from "./Raycaster.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";
import { Draw } from "../Utility/Draw/draw.class.js";
import {keys} from './events.js';
import {drawRect} from '../Utility/Draw/draw_shape.js';
import {map, drawCoordinateSystem} from '../Utility/Draw/map.js';
import {game, showGameView} from '../Utility/Draw/game.js';

let draw = new Draw();
let pos = new Vertex(3, 2);
let dir = new Vector(0, 1);
let player = new Player(pos, dir, 5, 0);
let sectors = [ sector0(map.size),
                sector1(map.size),
                sector2(map.size),
                sector3(map.size),
                sector4(map.size),
                sector5(map.size),
                sector6(map.size),
                sector7(map.size),
                sector8(map.size),
                sector9(map.size),
                sector10(map.size),
                sector11(map.size),
                sector12(map.size),
                sector13(map.size),
                sector14(map.size),
                sector15(map.size),
                sector16(map.size),
            ];
let matrix = new Matrix();

export {player};

setInterval(function() {
    draw.reset_canvas(map.ctx, map.canvas);
    draw.reset_canvas(game.ctx, game.canvas);
    drawCoordinateSystem(map);
    const rays = raycaster(map, player, sectors);
    updatePlayer(keys);
    showGameView(game, rays, player.camera.planWidth);
    showEntity(player, sectors);
    player.sectorSwap(sectors[player.sector]);
}, 30);

function    showEntity(player, sectors){
    player.show(map);
    for (const segments of sectors)
        for (const segment of segments)
            segment.show(map);
}
function    generateSegment(type, vtx, color, center, sector){
    let aX = vtx[0];
    let aY = vtx[1];
    let bX = vtx[2];
    let bY = vtx[3];
    return new Segment(type, new Vertex(aX, aY), new Vertex(bX, bY), color, center, sector);
}

function    sector0(mapSize){
    let sector = [];
    let vertexs = [[0, 0, 7, 0], [7, 0, 7, 3], [7, 3, 3, 7], [3, 7, 0, 7], [0, 7, 0, 0]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 1));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 3));
    sector.push(generateSegment('wall', vertexs[4], 'whitesmoke', center));
    return sector;
}
function    sector1(mapSize){
    let sector = [];
    let vertexs = [[7, 0, 13, 0], [13, 0, 13, 3], [13, 3, 7, 3], [7, 3, 7, 0]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 2));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 0));
    return sector;
}
function    sector2(mapSize){
    let sector = [];
    let vertexs = [[13, 0, 20, 0], [20, 0, 20, 7], [20, 7, 17, 7], [17, 7, 13, 3], [13, 3, 13, 0]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[1], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 7));
    sector.push(generateSegment('wall', vertexs[3], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[4], 'rgba(0, 255, 255, 0.4)', center, 1));
    return sector;
}
function    sector3(mapSize){
    let sector = [];
    let vertexs = [[0, 7, 0, 13], [0, 13, 3, 13], [3, 13, 3, 7], [3, 7, 0, 7]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 4));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 0));
    return sector;
}
function    sector4(mapSize){
    let sector = [];
    let vertexs = [[0, 13, 0, 20], [0, 20, 7, 20], [7, 20, 7, 17], [7, 17, 3, 13], [3, 13, 0, 13]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[1], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 5));
    sector.push(generateSegment('wall', vertexs[3], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[4], 'rgba(0, 255, 255, 0.4)', center, 3));
    return sector;
}
function    sector5(mapSize){
    let sector = [];
    let vertexs = [[7, 20, 7, 17], [7, 17, 13, 17], [13, 17, 13, 20], [13, 20, 7, 20]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('portal', vertexs[0], 'rgba(0, 255, 255, 0.4)', center, 4));
    sector.push(generateSegment('wall', vertexs[1], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 6));
    sector.push(generateSegment('wall', vertexs[3], 'whitesmoke', center));
    return sector;
}
function    sector6(mapSize){
    let sector = [];
    let vertexs = [[20, 20, 13, 20], [13, 20, 13, 17], [13, 17, 17, 13], [17, 13, 20, 13], [20, 13, 20, 20]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 5));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 13));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 7));
    sector.push(generateSegment('wall', vertexs[4], 'whitesmoke', center));
    return sector;
}
function    sector7(mapSize){
    let sector = [];
    let vertexs = [[20, 7, 20, 13], [20, 13, 17, 13], [17, 13, 17, 7], [17, 7, 20, 7]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 6));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 2));
    return sector;
}
function    sector8(mapSize){
    let sector = [];
    let vertexs = [[9, 7, 11, 7], [11, 7, 13, 9], [13, 9, 13, 11], [13, 11, 11, 13], [11, 13, 9, 13], [9, 13, 7, 11], [7, 11, 7, 9], [7, 9, 9, 7]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[1], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[3], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[4], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[5], 'whitesmoke', center));
    sector.push(generateSegment('wall', vertexs[6], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[7], 'rgba(0, 255, 255, 0.4)', center, 9));
    return sector;
}
function    sector9(mapSize){
    let sector = [];
    let vertexs = [[3, 7, 7, 3], [7, 3, 9, 7], [9, 7, 7, 9], [7, 9, 3, 7]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 16));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 8));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 10));
    return sector;
}
function    sector10(mapSize){
    let sector = [];
    let vertexs = [[3, 7, 7, 9], [7, 9, 7, 11], [7, 11, 3, 13], [3, 13, 3, 7]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('portal', vertexs[0], 'rgba(0, 255, 255, 0.4)', center, 9));
    sector.push(generateSegment('wall', vertexs[1], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 11));
    sector.push(generateSegment('wall', vertexs[3], 'whitesmoke', center));
    return sector;
}
function    sector11(mapSize){
    let sector = [];
    let vertexs = [[3, 13, 7, 17], [7, 17, 9, 13], [9, 13, 7, 11], [7, 11, 3, 13]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 12));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 10));
    return sector;
}
function    sector12(mapSize){
    let sector = [];
    let vertexs = [[7, 17, 9, 13], [9, 13, 11, 13], [11, 13, 13, 17], [13, 17, 7, 17]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('portal', vertexs[0], 'rgba(0, 255, 255, 0.4)', center, 11));
    sector.push(generateSegment('wall', vertexs[1], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 13));
    sector.push(generateSegment('wall', vertexs[3], 'whitesmoke', center));
    return sector;
}
function    sector13(mapSize){
    let sector = [];
    let vertexs = [[11, 13, 13, 11], [13, 11, 17, 13], [17, 13, 13, 17], [13, 17, 11, 13]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 14));
    sector.push(generateSegment('portal', vertexs[2], 'rgba(0, 255, 255, 0.4)', center, 6));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 12));
    return sector;
}
function    sector14(mapSize){
    let sector = [];
    let vertexs = [[13, 11, 13, 9], [13, 9, 17, 7], [17, 7, 17, 13], [17, 13, 13, 11]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 15));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 13));
    return sector;
}
function    sector15(mapSize){
    let sector = [];
    let vertexs = [[13, 9, 11, 7], [11, 7, 13, 3], [13, 3, 17, 7], [17, 7, 13, 9]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 16));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 14));
    return sector;
}
function    sector16(mapSize){
    let sector = [];
    let vertexs = [[11, 7, 9, 7], [9, 7, 7, 3], [7, 3, 13, 3], [13, 3, 11, 7]];
    let center = getSectorCenter(vertexs);
    sector.push(generateSegment('wall', vertexs[0], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[1], 'rgba(0, 255, 255, 0.4)', center, 9));
    sector.push(generateSegment('wall', vertexs[2], 'whitesmoke', center));
    sector.push(generateSegment('portal', vertexs[3], 'rgba(0, 255, 255, 0.4)', center, 15));
    return sector;
}


function    updatePlayer(keys){
    let translation;
    let sector = sectors[player.sector];
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
            let newDir = getNewDir(move, hit.segment.dir);
            ray = new Ray(player.camera.pos, newDir);
            hit = getHitPosition(ray, sectors, player.sector);
            if (hit != null && (dist = getDist(pos, hit.pos)) < 0.02){
                newDir = new Vector(0, 0);
            }
            let newPos = new Vector(player.camera.pos.x + newDir.x / 10, player.camera.pos.y + newDir.y / 10);;
            return newPos;
        }
    }
    return pos;
}

function    getNewDir(move, segmentDir){
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

function    isPlayerOutside(segment, pos){
    let playerSize = new Vertex(pos.x - segment.dir.x / 2, pos.y - segment.dir.y / 2);
    if (segment.sectorSide != segment.getSide(playerSize))
        return true;
    return false;
}

function    getSectorCenter(vertexs){
    let center = new Vertex(0, 0);
    for (const vertex of vertexs){
        center.x += vertex[0] + vertex[2];
        center.y += vertex[1] + vertex[3];
    }
    center.x /= vertexs.length * 2;
    center.y /= vertexs.length * 2;
    return center;
}
