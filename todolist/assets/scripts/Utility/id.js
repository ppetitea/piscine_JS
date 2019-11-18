export function getId(){
    const id = parseInt(localStorage.getItem('id')) + 1;
    localStorage.setItem('id', id);
    return id;
}