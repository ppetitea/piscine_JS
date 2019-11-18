import { Vertex } from "../Utility/Maths/Vertex.class.js";
import { Segment } from "../Components/Segment.class.js";

let sectors = [
    sector0(map.size),
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

export {sectors};

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