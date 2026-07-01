import './globals.css';

export const metadata = {
  title: 'Todo App - Manage Your Tasks',
  description: 'A beautiful and simple todo list application with local storage support.',
  keywords: 'todo, task manager, productivity',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
