import { getId } from '../Utility/id.js';

export class Todo {
  constructor(action) {
    this.id = getId();
    this.action = action;
    this.items = [];
  }

  add(todo) {
    this.items.push(todo);
  }

  update(todo) {
    for (const [id, item] of Object.entries(this.items)) {
      if (item.id == todo.id) {
        this.items[id] = todo;
        break;
      }
    }
  }

  delete(todoId) {
    for (const [id, item] of Object.entries(this.items)) {
      if (item.id == todoId) {
        this.items.split(id, 1);
        break;
      }
    }
  }

  view(){
    let todoView = document.createElement('li');
    todoView.textContent = this.action;
    todoView.className = 'todo';
    todoView.id = this.id;
    let todoItems = document.createElement('ul');
    todoItems.className = 'items';
    if (deep > 0){
      for (let item of this.items){
        todoItems.insertAdjacentElement('beforeend', item.view());
        this.viewList(item, deep - 1);
      }
    }
    todoView.insertAdjacentElement('beforeend', todoItems);
    return (todoView);
  }

  viewList(deep){
    let view = this.view();
    if (deep > 0){
      for (let item of this.items){
        view.items.insertAdjacentElement('beforeend', item.view());
        this.viewList(item, deep - 1);
      }
    }
  }
  return 
}
