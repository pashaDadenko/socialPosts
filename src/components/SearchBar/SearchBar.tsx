import { FC, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = event.target.value;
		setQuery(newQuery);
		onSearch(newQuery);
	};

	return (
		<div className={styles.wrapper}>
			<CiSearch className={styles.icon} />
			<input className={styles.input} type='text' value={query} onChange={handleInputChange} placeholder='Поиск по названию статьи' />
		</div>
	);
};
