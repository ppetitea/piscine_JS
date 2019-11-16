import { Vector } from "./Vector.class.js";

export class Matrix {
    constructor(){
    }
    scale(k){
        let matrix = {  'x': [k,0,0],
                        'y': [0,k,0],
                        'z': [0,0,1]};
        return matrix;
    }
    translation(x, y){
        let matrix = {  'x': [1,0,x],
                        'y': [0,1,y],
                        'z': [0,0,1]};
        return matrix;
    }
    rotation(angle){
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        let matrix = {  'x': [ c,-s, 0],
                        'y': [ s, c, 0],
                        'z': [ 0, 0, 1]};
        return matrix;
    }
    transformVertex(m, vtx){
        let ret = new Vector(0, 0);
        ret.x = m.x[0] * vtx.x + m.x[1] * vtx.y + m.x[2] * vtx.z;
        ret.y = m.y[0] * vtx.x + m.y[1] * vtx.y + m.y[2] * vtx.z;
        ret.z = m.z[0] * vtx.x + m.z[1] * vtx.y + m.z[2] * vtx.z;
        return ret;
    }
    mult(m1, m2){
        let ret = { 'x': [1,0,0],
                    'y': [0,1,0],
                    'z': [0,0,1]};
        for (let i = 0; i < 3; i++)
        {
            ret.x[i] = m1.x[0] * m2.x[i] + m1.x[1] * m2.y[i] + m1.x[2] * m2.z[i];
            ret.y[i] = m1.y[0] * m2.x[i] + m1.y[1] * m2.y[i] + m1.y[2] * m2.z[i];
            ret.z[i] = m1.z[0] * m2.x[i] + m1.z[1] * m2.y[i] + m1.z[2] * m2.z[i];
        }
        return ret;
    }
}
