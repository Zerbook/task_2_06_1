// use-request-get-todo-by-id.js

import { useEffect, useState } from 'react';

export const useRequestGetTodoById = (id) => {
	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		setIsLoading(true);
		setError(null);

		fetch(`http://localhost:3000/todos/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Задача не найдена');
				}
				return response.json();
			})
			.then((loadedTodo) => {
				setTodo(loadedTodo);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return {
		isLoading,
		todo,
		error,
	};
};
