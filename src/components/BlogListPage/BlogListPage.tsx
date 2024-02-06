import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../images/Image.png';
import { useGetPostsQuery } from '../../redux/api';
import { SearchBar } from '../SearchBar/SearchBar';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

import styles from './BlogListPage.module.scss';

export const BlogListPage: FC = () => {
	const { data: posts, isLoading } = useGetPostsQuery();

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	if (isLoading) return <div>Loading...</div>;

	const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<div className={styles.wrapper}>
			<SearchBar onSearch={handleSearch} />
			{filteredPosts?.map((post, index) => (
				<div className={`${styles.wrap} ${index === 0 ? styles.fullWidth : styles.halfWidth}`} key={post.id}>
					<img src={image} alt='image' className={`${styles.image} ${index !== 0 && styles.small}`} />
					<div className={styles.conditional}>
						<p className={styles.title}>{post.title}</p>
						{index === 0 && (
							<div className={styles.flex}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} />
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} />
								</p>
							</div>
						)}
					</div>
					{index === 0 && <p className={styles.subTitle}>{post.body}</p>}
					<div className={index !== 0 ? styles.box : styles.boxRight}>
						{index !== 0 && (
							<div className={styles.flex}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} />
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} />
								</p>
							</div>
						)}
						<Link to={`/post/${post.id}`} className={styles.link}>
							Читать далее
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};
