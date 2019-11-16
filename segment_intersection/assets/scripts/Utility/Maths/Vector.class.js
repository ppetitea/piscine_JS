import {Vertex} from './Vertex.class.js';

export class Vector {
    constructor (x, y){
        this.x = x;
        this.y = y;
        this.z = 1;
    }
    magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize(){
        let magnitude = this.magnitude();
        let x = this.x / magnitude;
        let y = this.y / magnitude;
        return new Vector(x, y);
    }
    add(vector){
        let x = this.x + vector.x;
        let y = this.y + vector.y;
        return new Vector(x, y);
    }
    sub(vector){
        let x = this.x - vector.x;
        let y = this.y - vector.y;
        return new Vector(x, y);
    }
    opposite(){
        let x = -this.x;
        let y = -this.y;
        return new Vector(x, y);
    }
    scalarProduct(k){
        let x = this.x * k;
        let y = this.y * k;
        return new Vector(x, y);
    }
    dotProduct(vector){
        return this.x * vector.x + this.y * vector.y;
    }
}