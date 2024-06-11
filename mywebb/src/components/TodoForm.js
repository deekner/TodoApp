import React, { useState } from 'react'
import axios from 'axios';

export const TodoForm = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!taskTitle.trim()) return;

      console.log({ title: taskTitle, description: taskDescription });

      try {
          const { data } = await axios.post('http://localhost:4000/api/todos', {
              title: taskTitle,
              description: taskDescription,
          });
          console.log('Task Created:', data);
          onTaskCreated(data.todo);  // Call the passed function to update the state in the parent component
          setTaskTitle('');  // Reset input field after successful submission
          setTaskDescription('');
      } catch (error) {
          console.error('Error adding task:', error);
      }
  };
  
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input 
          type='text' 
          className='todo-input' 
          placeholder='What is the task today?'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)} 
        />
        <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  )
}
