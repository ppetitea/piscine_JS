import { Vertex } from "../Utility/Maths/Vertex.class.js";
import { Player } from '../Components/Player.class.js';
import { Wall } from "../Components/Wall.class.js";
import { Ray } from "../Components/Ray.class.js";
import { Vector } from "../Utility/Maths/Vector.class.js";
import { raycaster } from "./Raycaster.js";
import { Matrix } from "../Utility/Maths/Matrix.class.js";
import { Draw } from "../Utility/Draw/draw.class.js";
import {keys} from './events.js';

let draw = new Draw();
let pos = new Vertex(3, 2);
let dir = new Vector(0, 1);
let player = new Player(pos, dir, 5);
let walls = generateWalls(grid.size);
let matrix = new Matrix();
let translation = matrix.translation(0, 0);
let newPos = matrix.transformVertex(translation, player.pos);
player.pos = newPos;

export {player};
setInterval(function(){
    draw.reset_canvas(grid.ctx);
    drawCoordinateSystem(grid);
    raycaster(grid, player, walls);
    showEntity(player, walls);
    updatePlayer(keys);
}, 10);


function    showEntity(player, walls){
    player.show(grid);
    for (const wall of walls)
        wall.show(grid);
}
function    generateWalls(gridSize){
    let walls = [];
    walls.push(new Wall(new Vertex(0, 0), new Vertex(gridSize, 0), 'red'));
    walls.push(new Wall(new Vertex(gridSize, 0), new Vertex(gridSize, gridSize), 'red'));
    walls.push(new Wall(new Vertex(gridSize, gridSize), new Vertex(0, gridSize), 'red'));
    walls.push(new Wall(new Vertex(0, gridSize), new Vertex(0, 0), 'red'));
    walls.push(new Wall(new Vertex(4.5, 2.5), new Vertex(6.5, 2.5), 'red'));
    walls.push(new Wall(new Vertex(6.5, 2.5), new Vertex(8.5, 4.5), 'red'));
    walls.push(new Wall(new Vertex(8.5, 4.5), new Vertex(8.5, 6.5), 'red'));
    walls.push(new Wall(new Vertex(8.5, 6.5), new Vertex(6.5, 8.5), 'red'));
    walls.push(new Wall(new Vertex(6.5, 8.5), new Vertex(4.5, 8.5), 'red'));
    walls.push(new Wall(new Vertex(4.5, 8.5), new Vertex(2.5, 6.5), 'red'));
    walls.push(new Wall(new Vertex(2.5, 6.5), new Vertex(2.5, 4.5), 'red'));
    walls.push(new Wall(new Vertex(2.5, 4.5), new Vertex(4.5, 2.5), 'red'));
    return walls;
}

function    updatePlayer(keys){
    let translation;

    if (keys['ArrowLeft']){
        player.dir = matrix.transformVertex(matrix.rotation(-5 / 180 * Math.PI), player.dir);
    }
    if (keys['ArrowRight'])
        player.dir = matrix.transformVertex(matrix.rotation(5 / 180 * Math.PI), player.dir);
    if (keys['w']){
        translation = matrix.translation(player.dir.x / 10, player.dir.y / 10);
        player.pos = matrix.transformVertex(translation, player.pos);
    }
    if (keys['a']){
        translation = matrix.translation(player.dir.y / 10, -player.dir.x / 10);
        player.pos = matrix.transformVertex(translation, player.pos);
    }
    if (keys['s']){
        translation = matrix.translation(-player.dir.x / 10, -player.dir.y / 10);
        player.pos = matrix.transformVertex(translation, player.pos);
    }
    if (keys['d']){
        translation = matrix.translation(-player.dir.y / 10, player.dir.x / 10);
        player.pos = matrix.transformVertex(translation, player.pos);
    }
}
