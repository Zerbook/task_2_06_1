import { useState } from 'react';
import { useRecuestGetTodos, useRecuestAddTodos } from '../hooks';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const HomePage = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const { isLoading, todos } = useRecuestGetTodos(refreshTodosFlag);
	const { isCreating, requestAddTodos } = useRecuestAddTodos(refreshTodos);

	let filteredAndSortedTodos = [...todos];

	if (searchTerm) {
		filteredAndSortedTodos = filteredAndSortedTodos.filter((todo) =>
			todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}

	if (isSorted) {
		filteredAndSortedTodos = [...filteredAndSortedTodos].sort((a, b) =>
			a.title.localeCompare(b.title),
		);
	}

	return (
		<div className="home-page">
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<div>
					<h1>Список дел</h1>
					<div className="controls">
						<input
							type="text"
							placeholder="Поиск задач..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
						/>
						<button
							onClick={() => setIsSorted(!isSorted)}
							className="sort-button"
						>
							{isSorted
								? 'Отключить сортировку'
								: 'Сортировать по алфавиту'}
						</button>
					</div>
					<TodoForm
						onRequestAddTodos={requestAddTodos}
						isCreating={isCreating}
					/>
					<TodoList todos={filteredAndSortedTodos} />
				</div>
			)}
		</div>
	);
};

export default HomePage;
