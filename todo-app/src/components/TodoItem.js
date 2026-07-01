'use client';

import { useState } from 'react';
import { Trash2, Edit2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </motion.button>

        {/* Text Content */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              className="w-full px-3 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          ) : (
            <p
              className={`transition ${
                todo.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-800'
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                title="Save"
              >
                <Check size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setEditText(todo.text);
                  setIsEditing(false);
                }}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded transition"
                title="Cancel"
              >
                ✕
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded transition"
                title="Edit"
              >
                <Edit2 size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(todo.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                title="Delete"
              >
                <Trash2 size={18} />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
