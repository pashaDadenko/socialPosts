import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import { BlogPostPage } from './components/BlogPostPage/BlogPostPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/post/:postId',
		element: <BlogPostPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
