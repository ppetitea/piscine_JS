export class DragDrop {
    constructor(substitute, direction, grabClass, dropZoneClass, containerClass){
        this.substitute = substitute;
        this.direction = direction;
        this.grabClass = grabClass;
        this.dropZoneClass = dropZoneClass;
        this.containerClass = containerClass;
    }
    listener = (event) => {
        if (!event.target.classList.contains(this.dropZoneClass))
            return false;
        this.target = event.target;
        this.grab(event);
        document.body.addEventListener('mousemove', this.drag);
        document.body.addEventListener('mouseup', this.drop);
    }
    grab(event){
        this.offset = this.getMouseTargetOffset(event, this.target);
        this.target.classList.remove(this.dropZoneClass);
        this.dropZones = document.querySelectorAll(`.${this.dropZoneClass}`);
        this.containers = document.querySelectorAll(`.${this.containerClass}`);
        const pos = this.getDragPos(event, this.offset);
        this.target.insertAdjacentElement('beforebegin', this.substitute);
        this.target.style.position = 'absolute';
        this.moveAt(this.target, pos);
    }
    drag = (event) => {
        this.target.classList.add(this.grabClass);
        const pos = this.getDragPos(event, this.offset);
        this.moveAt(this.target, pos);
        if (this.isDragOverDropZone(event, this.substitute))
            return true;
        for (const dropZone of this.dropZones){
            if (this.isDragOverDropZone(event, dropZone)){
                this.moveSubstitute(dropZone, 'outside');
                return true;
            }
        }
        for (const container of this.containers){
            if (this.isDragOverDropZone(event, container)){
                this.moveSubstitute(container, 'inside');
                return true;
            }
        }
    }
    drop = () => {
        document.body.removeEventListener('mousemove', this.drag);
        this.substitute.insertAdjacentElement('beforebegin', this.target);
        this.substitute.remove();
        this.target.removeAttribute('style');
        this.target.classList.remove(this.grabClass);
        this.target.classList.add(this.dropZoneClass);
    }
    getDragPos(mouseEvent){
        return {
            x: mouseEvent.clientX - this.offset.x,
            y: mouseEvent.clientY - this.offset.y
        }
    }
    isDragOverDropZone(mouseEvent, dropZone){
        const x = mouseEvent.x;
        const y = mouseEvent.y;
        const top = dropZone.offsetTop;
        const right = dropZone.offsetLeft + dropZone.offsetWidth;
        const left = dropZone.offsetLeft;
        const bottom = dropZone.offsetTop + dropZone.offsetHeight;
        if (left <= x && x < right && top <= y && y < bottom)
            return true;
        else
            return false;
    }
    moveSubstitute(dropZone, side){
        if (side == 'inside')
            dropZone.insertAdjacentElement('beforeend', this.substitute);
        else {
            let pos = 'beforebegin';
            if (this.direction == 'row')
                if (this.substitute.offsetLeft < dropZone.offsetLeft)
                    pos = 'afterend';
            if (this.direction == 'column')
                if (this.substitute.offsetTop < dropZone.offsetTop)
                    pos = 'afterend';
            dropZone.insertAdjacentElement(pos, this.substitute);
        }
    }
    moveAt(target, pos) {
        target.style.left = pos.x + 'px';
        target.style.top = pos.y + 'px';
    }
    getMouseTargetOffset(mouseEvent, target){
        return {
            x: mouseEvent.clientX - target.offsetLeft,
            y: mouseEvent.clientY - target.offsetTop,
        }
    }
}

// export function grabListener(event){
//     let target = this;
//     const substitute = getCardSubstitute();
//     const offset = grab(target, substitute);
//     target.classList.remove('drop-zone');
//     const dropZones = document.querySelectorAll('.drop-zone');
    
//     document.body.addEventListener('mousemove', dragListener);
//     function dragListener(event){
//         drag(target, event, offset);
//         for (const dropZone of dropZones){
//             if (isDragOverDropZone(event, dropZone)){
//                 if (substitute.offsetLeft > dropZone.offsetLeft)
//                     dropZone.insertAdjacentElement('beforebegin', substitute);
//                 else
//                     dropZone.insertAdjacentElement('afterend', substitute);
//             }
//         }
//     }
//     document.body.addEventListener('mouseup', function(event){
//         drop(target, substitute, dragListener);
//         target.classList.add('drop-zone');
//     })
    
// }


// function    isDragOverDropZone(mouseEvent, dropZone){
//     const x = mouseEvent.x;
//     const y = mouseEvent.y;
//     const top = dropZone.offsetTop;
//     const right = dropZone.offsetLeft + dropZone.offsetWidth;
//     const left = dropZone.offsetLeft;
//     const bottom = dropZone.offsetTop + dropZone.offsetHeight;
//     if (left <= x && x < right && top <= y && y < bottom)
//         return true;
//     else
//         return false;
// }

// export function grab(target, substitute){
//     const offset = getMouseTargetOffset(event, target);
//     const pos = getDragPos(event, offset);
//     if (substitute != undefined)
//         target.insertAdjacentElement('beforebegin', substitute);
//     target.style.position = 'absolute';
//     moveAt(target, pos);
//     return offset;
// }

// export function drag(target, mouseEvent, offset){
//     target.classList.add('card-elevate');
//     const pos = getDragPos(mouseEvent, offset);
//     moveAt(target, pos);
// }

// export function drop(target, substitute, dragListener){
//     document.body.removeEventListener('mousemove', dragListener);
//     substitute.insertAdjacentElement('beforebegin', target);
//     target.removeAttribute('style');
//     target.classList.remove('card-elevate');
//     substitute.remove();
// }

// export function getCardSubstitute(){
//     let substitute = document.createElement('div');
//     substitute.classList.add('card', 'card-substitute');
//     return substitute;
// }

// export function moveAt(target, pos) {
//     target.style.left = pos.x + 'px';
//     target.style.top = pos.y + 'px';
// }

// export function getDragPos(mouseEvent, offset){
//     return {
//         x: mouseEvent.clientX - offset.x,
//         y: mouseEvent.clientY - offset.y
//     }
// }
// export function getMouseTargetOffset(mouseEvent, target){
//     return {
//         x: mouseEvent.clientX - target.offsetLeft,
//         y: mouseEvent.clientY - target.offsetTop,
//     }
// }
