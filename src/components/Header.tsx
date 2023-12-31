import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoError } from '../types/TodoError';
import { USER_ID } from '../api/todos';

type Props = {
  length: number;
  tempTodo: Todo | null;
  countActiveTodos: number;
  handleAllToggle: () => Promise<void>;
  handleAddTodo: (todo: Todo) => Promise<void>;
  handleErrorMessage: (errorMessage: TodoError) => void;
};

export const Header: React.FC<Props> = ({
  length,
  tempTodo,
  countActiveTodos,
  handleAllToggle,
  handleAddTodo,
  handleErrorMessage,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tempTodo === null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [tempTodo]);

  const addTodo = () => {
    const normalizeTitle = todoTitle.trim();
    if (normalizeTitle === '') {
      handleErrorMessage(TodoError.emptyTitle);

      return;
    }

    const newTodo = {
      id: 0,
      completed: false,
      title: normalizeTitle,
      userId: USER_ID,
    };

    handleAddTodo(newTodo).then(() => {
      setTodoTitle('');
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo();
  };

  return (
    <header className='todoapp__header'>
      {/* eslint-disable-next-line */}
      <button
        type='button'
        className={classNames('todoapp__toggle-all', {
          active: countActiveTodos === 0 && length > 0,
        })}
        onClick={handleAllToggle}
      />

      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <input
            type='text'
            className='todoapp__new-todo'
            placeholder='What needs to be done?'
            ref={inputRef}
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
            disabled={tempTodo !== null}
          />
        </div>
      </form>
    </header>
  );
};
