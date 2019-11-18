export function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}
export function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}
export function vmin(v) {
    return Math.min(vh(v), vw(v));
}
export function vmax(v) {
    return Math.max(vh(v), vw(v));
}
export function fix_dpi(canvas) {
    let dpi = window.devicePixelRatio;
    let style = {
        height() {
        return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
        return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        }
    }
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}