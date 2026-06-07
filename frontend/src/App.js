import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      await axios.post(`${API_URL}/api/tasks`, { 
        title: title.trim(), 
        description: description.trim() 
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task');
    }
  };

  // Update task (FIXED)
  const updateTask = async (id) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${id}`, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
    }
  };

  // Toggle complete status
  const toggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${id}`, {
        completed: !currentStatus,
      });
      fetchTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
      setError('Failed to update task');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;

  const styles = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
    header: { textAlign: 'center', color: '#333', marginBottom: '30px' },
    form: { display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' },
    input: { flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' },
    button: { padding: '12px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    taskCard: { border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '12px', backgroundColor: '#f9f9f9' },
    taskTitle: { margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' },
    taskDesc: { margin: '0 0 12px 0', color: '#666', fontSize: '14px' },
    buttonGroup: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    editButton: { padding: '6px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteButton: { padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    toggleButton: { padding: '6px 12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    completed: { textDecoration: 'line-through', opacity: 0.7 },
    error: { backgroundColor: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '6px', marginBottom: '20px' },
    loading: { textAlign: 'center', color: '#666', padding: '40px' },
    stats: { textAlign: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' },
    editForm: { marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' },
    editInput: { flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}> To-Do List</h1>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <form onSubmit={createTask} style={styles.form}>
        <input type="text" placeholder="Task title..." value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} required />
        <input type="text" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.button}>+ Add Task</button>
      </form>

      {tasks.length > 0 && (
        <div style={styles.stats}>
           Total: <strong>{tasks.length}</strong> |  Completed: <strong>{completedCount}</strong> |  Pending: <strong>{tasks.length - completedCount}</strong>
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>Loading tasks...</div>
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div style={styles.loading}> No tasks yet. Add one above!</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} style={styles.taskCard}>
                {editingId === task.id ? (
                  <div>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ ...styles.editInput, width: '100%', marginBottom: '8px' }} />
                    <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={{ ...styles.editInput, width: '100%', marginBottom: '8px' }} />
                    <div style={styles.buttonGroup}>
                      <button onClick={() => updateTask(task.id)} style={styles.button}>Save</button>
                      <button onClick={() => setEditingId(null)} style={styles.deleteButton}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 style={{ ...styles.taskTitle, ...(task.completed ? styles.completed : {}) }}>{task.title}</h3>
                    {task.description && <p style={{ ...styles.taskDesc, ...(task.completed ? styles.completed : {}) }}>{task.description}</p>}
                    <div style={styles.buttonGroup}>
                      <button onClick={() => toggleComplete(task.id, task.completed)} style={styles.toggleButton}>
                        {task.completed ? '↺ Undo' : ' Complete'}
                      </button>
                      <button onClick={() => { setEditingId(task.id); setEditTitle(task.title); setEditDescription(task.description || ''); }} style={styles.editButton}>
                         Edit
                      </button>
                      <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}> Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;