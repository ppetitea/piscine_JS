import {Vertex} from '../Maths/Vertex.class.js';

export class Draw{
    constructor(map){
        this.map = map;
    }
    transformCoor(x, y){
    let shift = this.map.rules_weight;
    let n = this.map.normalize;
    return new Vertex(shift + n * x, shift + n * y); 
    }
    reset_canvas(context, canvas)
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}