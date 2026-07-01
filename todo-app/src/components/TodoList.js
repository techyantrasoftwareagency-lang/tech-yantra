'use client';

import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  return (
    <div className="divide-y divide-gray-200">
      <AnimatePresence>
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
