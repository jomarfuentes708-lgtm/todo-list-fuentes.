import React, { useEffect, useState } from 'react';
import './TodoList.css';

const STORAGE_KEY = 'todo-list-v1';

const createTask = (text, id = crypto.randomUUID()) => ({
  id,
  text,
});

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { heading: '', tasks: [] };
    const parsed = JSON.parse(saved);
    return parsed;
  } catch {
    return { heading: '', tasks: [] };
  }
};

const TodoList = () => {
  const data = loadData();
  const [heading, setHeading] = useState(data.heading);
  const [headingInput, setHeadingInput] = useState('');
  const [itemInput, setItemInput] = useState('');
  const [tasks, setTasks] = useState(data.tasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ heading, tasks }));
  }, [heading, tasks]);

  const handleAddHeading = (event) => {
    event.preventDefault();
    const trimmed = headingInput.trim();
    if (!trimmed) return;

    setHeading(trimmed);
    setHeadingInput('');icePixelRatio
    setTasks([]);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    const trimmed = itemInput.trim();
    if (!trimmed) return;

    setTasks((prev) => [createTask(trimmed), ...prev]);
    setItemInput('');
  };

  const deleteHeading = () => {
    setHeading('');
    setTasks([]);
  };

  return (
    <div className="page-shell">
      <div className="main-container">
        <h1 className="app-title">My Todo List</h1>

        {!heading ? (
          <div className="heading-form-card">
            <form className="heading-form" onSubmit={handleAddHeading}>
              <input
                className="heading-input"
                type="text"
                value={headingInput}
                onChange={(e) => setHeadingInput(e.target.value)}
                placeholder="Enter heading"
                aria-label="Enter heading"
              />
              <button className="add-heading-btn" type="submit">
                Add Heading
              </button>
            </form>
          </div>
        ) : (
          <div className="todo-card">
            <div className="card-header">
              <h2>{heading}</h2>
              <button className="delete-heading-btn" type="button" onClick={deleteHeading}>
                Delete Heading
              </button>
            </div>

            <div className="task-list">
              {tasks.length === 0 ? (
                <p className="empty-text">No items yet.</p>
              ) : (
                <ul className="task-items">
                  {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                      {task.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form className="add-row" onSubmit={handleAddTask}>
              <input
                className="add-input"
                type="text"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                placeholder="Add List"
                aria-label="Add list item"
              />
              <button className="add-button" type="submit">
                Add List
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
