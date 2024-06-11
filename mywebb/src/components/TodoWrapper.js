import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoForm } from './TodoForm'
import { Todo } from './Todo';
import TaskModal from './TodoModal';
import EditTodoForm from './EditTodoForm';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    
    useEffect(() => {
      axios.get('http://localhost:4000/api/todos')
          .then(res => {
              console.log("API Data:", res.data);
              setTodos(res.data); // Update the state with the list of todos
          })
          .catch(e => console.log(e));
    }, []);

    const handleTaskAdded = (newTask) => {
      console.log('New Task:', newTask);
      setTodos(prevTodos => [...prevTodos, newTask]); // Update the state with the new task added to the list of previous todos
    };

    
    const deleteTask = (id) => {
      axios.delete(`http://localhost:4000/api/todos/${id}`)
          .then(() => {
              setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)); // Update the state by filtering out the deleted task
          })
          .catch(e => console.error('Error deleting task:', e));
    };

    const handleTaskUpdated = updatedTask => {

      console.log('Updated Task Payload:', updatedTask);

      // Prepare the payload for the PUT request
      const payload = {
          title: updatedTask.title,
          description: updatedTask.description,
          completed: updatedTask.completed
      };
  
      axios.put(`http://localhost:4000/api/todos/${updatedTask.id}`, payload, {
          headers: {
              'Content-Type': 'application/json' // Set the request headers
          }
      })
          .then(response => {
            console.log('Server Response:', response.data); // Log the server response
              setTodos(prevTodos => // Update the state with the updated task
                  prevTodos.map(todo => 
                      todo.id === updatedTask.id ? updatedTask : todo
                  )
              );
              setIsEditModalOpen(false); 
          })
          .catch(error => {
              console.error("There was an error updating the task!", error);
          });
  };
    
      const toggleCompleted = id => {
        const todo = todos.find(todo => todo.id === id);

        // Optimistically update the state
        setTodos(prevTodos =>
          prevTodos.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
      );

      // Send the patch request to the server
      axios.patch(`http://localhost:4000/api/todos/${id}`, { completed: !todo.completed })
          .then(res => {
              console.log('Server Response:', res.data);
          })
          .catch(e => {
              console.error('Error updating task:', e);
              setTodos(prevTodos =>
                  prevTodos.map(todo =>
                      todo.id === id ? { ...todo, completed: !todo.completed } : todo
                  )
              );
          });
      };


    // Function to open the modal and set the selected task
    const openModal = (task) => {
      setSelectedTask(task); // Set the selected task
      setModalIsOpen(true);
    };
    
    // Function to close the modal and clear the selected task
    const closeModal = () => {
      setModalIsOpen(false); // Close the modal
      setSelectedTask(null); // Clear the selected task
    };

    const OpenEditModal = (task) => {
      setSelectedTask(task);
      setIsEditModalOpen(true);
  };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTask(null);
    };

    return (
        
      <div className="TodoWrapper">
        <h1 className='Task-title'>Tasks</h1>
        <div className='Todo-Cards' />
        <TodoForm onTaskCreated={handleTaskAdded} />
        {todos.map((todo) => (
            <Todo key={todo.id} todo={todo}
            openModal={openModal}
            deleteTask={deleteTask}
            editTodo={OpenEditModal}
            handleTaskUpdated={handleTaskUpdated}
            toggleCompleted={toggleCompleted}
            openDetailsModal={openModal}
            />
      ))}
        {selectedTask && (
                <TaskModal 
                    modalIsOpen={modalIsOpen} 
                    closeModal={closeModal} 
                    task={selectedTask} 
                />
            )}
        {isEditModalOpen && (
                <EditTodoForm 
                    task={selectedTask}
                    onSave={handleTaskUpdated}
                    onCancel={closeEditModal}
                />
            )}
          
      </div>
  )
}
