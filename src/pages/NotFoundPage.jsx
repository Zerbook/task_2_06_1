import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="not-found-page">
			<h1>404 - Страница не найдена</h1>
			<p>Извините, запрошенная страница не существует.</p>
			<button onClick={() => navigate('/')} className="home-button">
				Вернуться на главную
			</button>
		</div>
	);
};

export default NotFoundPage;
