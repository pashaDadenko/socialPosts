import { FC } from 'react';

import styles from './Header.module.scss';

export const Header: FC = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Блог</h1>
			<p>Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи</p>
		</div>
	);
};
