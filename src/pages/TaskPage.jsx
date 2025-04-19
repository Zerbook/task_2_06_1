import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	useRecuestGetTodos,
	useRecuestUpdataTodos,
	useRecuestDeleteTodos,
} from '../hooks';

const TaskPage = () => {
	const { id } = useParams(); // Получаем ID из URL
	const navigate = useNavigate();
	const [task, setTask] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const { isLoading, todos } = useRecuestGetTodos();
	const { isUpdating, requestUpdateTodos } = useRecuestUpdataTodos(() => navigate('/'));
	const { isDeleting, requestDeleteTodos } = useRecuestDeleteTodos(() => navigate('/'));

	useEffect(() => {
		if (!isLoading && todos.length > 0) {
			const foundTask = todos.find((todo) => todo.id === id);
			if (foundTask) {
				setTask(foundTask);
				setEditTitle(foundTask.title);
			} else {
				navigate('/404');
			}
		}
	}, [isLoading, todos, id, navigate]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		if (editTitle.trim()) {
			requestUpdateTodos(id, { ...task, title: editTitle });
			setIsEditing(false);
		}
	};

	const handleToggleComplete = () => {
		requestUpdateTodos(id, { ...task, completed: !task.completed });
	};

	const handleDelete = () => {
		requestDeleteTodos(id);
	};

	if (isLoading || !task) return <div className="loader">Загрузка...</div>;

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
					<p className="task-title">{task.title}</p>
					<label>
						<input
							type="checkbox"
							checked={task.completed}
							onChange={handleToggleComplete}
							disabled={isUpdating}
						/>
						{task.completed ? 'Выполнено' : 'Не выполнено'}
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
