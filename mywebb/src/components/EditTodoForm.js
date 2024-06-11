import React, { useState, useEffect } from 'react';

const EditTodoForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [completed, setCompleted] = useState(task.completed || false);

  useEffect(() => {
      if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setCompleted(task.completed);
      }
  }, [task]);

  const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ ...task, title, description, completed});
  };

  return (
      <div className="modal">
        <div className='Edit-modal-overlay'>
        <h2>Edit Task</h2>
          <form onSubmit={handleSubmit}>
              <div className="modal-title">
                <label >Title</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="modal-description-content">
                <label>Edit description</label>
                <textarea className='modal-description-content-input'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='Edit-Checkbox'>
                <label>
                  Completed
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                </label>
              </div>
                <button className="modal-save-btn" type="submit">Save</button>
                <button className="modal-close-btn" type="button" onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
  );
};

export default EditTodoForm;

