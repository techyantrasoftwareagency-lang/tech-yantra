'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';

export default function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to parse todos:', error);
      }
    }
    setMounted(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Stats */}
        <TodoStats active={activeCount} completed={completedCount} total={todos.length} />

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Input Section */}
          <TodoInput onAdd={addTodo} />

          {/* Filter Section */}
          {todos.length > 0 && (
            <TodoFilter filter={filter} onFilterChange={setFilter} />
          )}

          {/* Todo List */}
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center"
            >
              <div className="text-6xl mb-4">✨</div>
              <p className="text-gray-500 text-lg">No tasks yet. Add one to get started!</p>
            </motion.div>
          ) : filteredTodos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-500 text-lg">
                {filter === 'completed'
                  ? 'No completed tasks'
                  : 'All tasks completed!'}
              </p>
            </motion.div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          )}

          {/* Footer Actions */}
          {todos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center"
            >
              <span className="text-sm text-gray-600">
                {filteredTodos.length} of {todos.length} tasks
              </span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Clear completed
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Footer Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 text-sm mt-6"
        >
          💾 Your tasks are automatically saved to your browser
        </motion.p>
      </motion.div>
    </div>
  );
}
