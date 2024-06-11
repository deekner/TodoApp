import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({ todo, deleteTask, toggleCompleted, editTodo, openDetailsModal }) => {
  return (
    <div className='Todo'>
      <div className='Todo-icon' onClick={(e) => { e.stopPropagation(); toggleCompleted(todo.id); }}>
        <FontAwesomeIcon
          icon={todo.completed ? faCircleCheck : faCircle}
          style={{ color: todo.completed ? "#63E6BE" : undefined }}
          size='lg'
        />
      </div>
      <div className='Todo-Details'>
      <FontAwesomeIcon icon={faArrowRight} onClick={(e) => { e.stopPropagation(); openDetailsModal(todo); }} />
      </div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>

      <div className='Todo-actions'>
        <FontAwesomeIcon icon={faPenToSquare} onClick={(e) => { e.stopPropagation(); editTodo(todo); }} />
        <FontAwesomeIcon icon={faTrash} onClick={(e) => { e.stopPropagation(); deleteTask(todo.id); }} />
      </div>
    </div>
  );
};