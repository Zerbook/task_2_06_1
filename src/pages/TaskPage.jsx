import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	useRequestGetTodoById,
	useRecuestUpdataTodos,
	useRecuestDeleteTodos,
} from '../hooks';

const TaskPage = () => {
	const { id } = useParams(); // Получаем ID из URL
	const navigate = useNavigate();
	// const [task, setTask] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const { isLoading, todo, error } = useRequestGetTodoById(id);
	const { isUpdating, requestUpdateTodos } = useRecuestUpdataTodos(() => navigate('/'));
	const { isDeleting, requestDeleteTodos } = useRecuestDeleteTodos(() => navigate('/'));

	useEffect(() => {
		if (!isLoading && todo) {
			setEditTitle(todo.title);
		}
		// } else {
		if (error) {
			navigate('/404');
		}
		// }
	}, [error, isLoading, todo, navigate]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		if (editTitle.trim()) {
			requestUpdateTodos(id, { ...todo, title: editTitle });
			setIsEditing(false);
		}
	};

	const handleToggleComplete = () => {
		requestUpdateTodos(id, { ...todo, completed: !todo.completed });
	};

	const handleDelete = () => {
		requestDeleteTodos(id);
	};

	if (isLoading || !todo) return <div className="loader">Загрузка...</div>;

	return (
		<div className="task-page">
			<button onClick={() => navigate(-1)} className="back-button">
				← Назад
			</button>
			<h1>Подробности задачи</h1>
			{isEditing ? (
				<div>
					<input
						type="text"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						className="edit-input"
					/>
					<button
						onClick={handleSave}
						className="save-button"
						disabled={isUpdating}
					>
						Сохранить
					</button>
				</div>
			) : (
				<div>
					<p className="task-title">{todo.title}</p>
					<label>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={handleToggleComplete}
							disabled={isUpdating}
						/>
						{todo.completed ? 'Выполнено' : 'Не выполнено'}
					</label>
					<div>
						<button
							onClick={handleEdit}
							className="edit-button"
							disabled={isUpdating}
						>
							Редактировать
						</button>
						<button
							onClick={handleDelete}
							className="delete-button"
							disabled={isDeleting}
						>
							Удалить
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TaskPage;
