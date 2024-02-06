import { FC } from 'react';
import { Header } from '../Header/Header';
import { BlogListPage } from '../BlogListPage/BlogListPage';

import styles from './App.module.scss';

export const App: FC = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<BlogListPage />
		</div>
	);
};
