import { Routes, Route, NavLink, Outlet, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

const App = () => {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};

export default App;
