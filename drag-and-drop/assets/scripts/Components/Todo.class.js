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

  view(index, deep){
    let todoView = document.createElement('li');
    todoView.textContent = this.action;
    todoView.classList.add('todo', `deep${index}`);
    todoView.id = this.id;
    let todoItems = document.createElement('ul');
    todoItems.className = 'items';
    if (index < deep){
      for (let item of this.items){
        todoItems.insertAdjacentElement('beforeend', item.view(index + 1, deep));
      }
    }
    todoView.insertAdjacentElement('beforeend', todoItems);
    return (todoView);
  }

}
