import React, { useState } from 'react';

interface TodoItem {
  data: {
    todoId: string
    name: string
    isDone: boolean
  }
  onToggleIsDone: () => void
  onRemove: () => void
  onEditName: (el: {
    todoId: string
    name: string
    isDone: boolean
  }) => void
}

export function TodoItem({ data, onToggleIsDone, onRemove, onEditName }: TodoItem) {
  const { name, isDone, todoId } = data;

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={`todo-${todoId}`}
          type="checkbox"
          defaultChecked={isDone}
          onChange={onToggleIsDone}
        />
        {
          isEditModeEnabled ?
          <div>
            <input
              type="text"
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              disabled={inputValue === ''}
              onClick={async () => {
                // console.log({isDone, todoId, name: inputValue})
                await onEditName({isDone, todoId, name: inputValue})
                setIsEditModeEnabled(false);
              }}
            >Submit</button>
          </div> :
          <label className="todo-label" htmlFor={`todo-${todoId}`}>
            { name }
          </label>
        }
        
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setInputValue(name);
            setIsEditModeEnabled(true)
          }}
        >
          Edit <span className="visually-hidden">{ name }</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={onRemove}>
          Delete <span className="visually-hidden">{ name }</span>
        </button>
      </div>
    </li>
  );
}