class TodoComponent {
  constructor(action) {
    this.id = "new_id()";
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
}
