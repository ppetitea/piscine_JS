

function drawRay(grid, shape, ray)
{
    let shift = grid.rules_weight;
    let n  = grid.normalize;

    grid.ctx.beginPath();
    for (let i = 0; i + 1 <= points.length; i++)
    {
        grid.ctx.moveTo(shift + n * points[i].x, shift + n * points[i].y);
        grid.ctx.lineTo(shift + n * points[(i + 1) % points.length].x,
                        shift + n * points[(i + 1) % points.length].y);
    }
    grid.ctx.strokeStyle = "red";
    grid.ctx.lineWidth = 4;
    grid.ctx.stroke();
    grid.ctx.closePath();
}


function    getSegmentsIntersection(segment1, segment2)
{

}


//https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };