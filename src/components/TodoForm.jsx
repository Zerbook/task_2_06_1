import { useState } from 'react';

function TodoForm({ onRequestAddTodos, isCreating }) {
	const [title, setTitle] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		onRequestAddTodos(title);
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit} className="todo-form">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Введите новую задачу"
				className="todo-input"
				disabled={isCreating}
			/>
			<button type="submit" className="todo-button" disabled={isCreating}>
				Добавить
			</button>
		</form>
	);
}

export default TodoForm;
