import { Todo } from "../Components/Todo.class.js";
import { view } from './vendor.js';

let action = new Todo('project');
action.add(new Todo('step0'));
action.add(new Todo('step1'));
action.add(new Todo('step2'));

view.insertAdjacentElement('afterbegin', action.view());
