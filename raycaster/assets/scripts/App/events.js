let keys = {'left': false,
            'right': false,
            'w': false,
            'a': false,
            's': false,
            'd': false};

export {keys};

document.addEventListener('keydown', updateKeys, false);
document.addEventListener('keyup', updateKeys, false);

function    updateKeys(event){
    if (event.type == 'keydown')
        keys[event.key] = true;
    if (event.type == 'keyup')
        keys[event.key] = false;
}