import { getId } from '../Utility/id.js';
import { DragDrop } from '../Utility/dragDrop.js';

export class Card {
  constructor(title) {
    this.id = getId();
    this.title = title;
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  update(itemToUpdate) {
    for (const [id, item] of Object.entries(this.items)) {
      if (item.id == itemToUpdate.id) {
        this.items[id] = itemToUpdate;
        break;
      }
    }
  }

  delete(itemToDeleteId) {
    for (const [id, item] of Object.entries(this.items)) {
      if (item.id == itemToDeleteId) {
        this.items.split(id, 1);
        break;
      }
    }
  }

  view(){
    let substitute = document.createElement('div');
    substitute.classList.add('card', 'card-substitute');
    const dragCard = new DragDrop(substitute, 'row', 'card-elevate', 'drop-zone');
    let titleSubstitute = document.createElement('div');
    titleSubstitute.classList.add('card', 'title-substitute');
    const dragTitle = new DragDrop(titleSubstitute, 'column', 'card-elevate', 'title-drop-zone', 'drop-zone');

    let cardView = document.createElement('div');
    cardView.classList.add('card', 'drop-zone');
    cardView.addEventListener('mousedown', dragCard.listener);
    cardView.id = this.id;
    let cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title', 'noselect', 'title-drop-zone');
    cardTitle.addEventListener('mousedown', dragTitle.listener);
    cardTitle.textContent = this.title;
    cardView.insertAdjacentElement('beforeend', cardTitle);
    let cardItems = document.createElement('div');
    cardItems.className = 'card-items';
    for (let item of this.items){
        cardItems.insertAdjacentElement('beforeend', item.view());
    }
    cardView.insertAdjacentElement('beforeend', cardItems);
    return (cardView);
  }

}
