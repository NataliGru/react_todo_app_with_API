import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

export function getFilteredTodos(todos: Todo[], filterStatus: FilterStatus) {
  let preparedTodos: Todo[];

  switch (filterStatus) {
    case FilterStatus.ACTIVE:
      preparedTodos = todos.filter((todo) => !todo.completed);
      break;

    case FilterStatus.COMPLETED:
      preparedTodos = todos.filter((todo) => todo.completed);
      break;

    case FilterStatus.ALL:
    default:
      preparedTodos = todos;
  }

  return preparedTodos;
}
