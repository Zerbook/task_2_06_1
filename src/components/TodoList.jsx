import { Link } from 'react-router-dom';

const TodoList = ({ todos }) => {
	const truncateText = (text, maxLength = 30) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength - 3) + '...';
	};

	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<li key={todo.id} className={todo.completed ? 'completed' : ''}>
					<Link to={`/task/${todo.id}`} className="todo-link">
						{truncateText(todo.title)}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
