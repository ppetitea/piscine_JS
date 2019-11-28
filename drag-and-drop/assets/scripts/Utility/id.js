export function getId(){
    let id = localStorage.getItem('id');
    console.log(localStorage.getItem('id'));
    if (id == undefined)
        id = 0;
    localStorage.setItem('id', parseInt(id) + 1);
    return id;
}