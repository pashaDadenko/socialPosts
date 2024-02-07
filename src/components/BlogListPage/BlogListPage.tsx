import { Link } from 'react-router-dom';
import image from '../../images/Image.png';
import { FC, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { useGetPostsQuery } from '../../redux/api';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

import styles from './BlogListPage.module.scss';

export const BlogListPage: FC = () => {
	const { data: posts, isLoading } = useGetPostsQuery();

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => setSearchQuery(query);

	const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className={styles.wrapper}>
			<SearchBar onSearch={handleSearch} />
			<ul className={styles.wrap}>
				{filteredPosts?.map((post, index) => (
					<li key={post.id} className={styles.content}>
						<img src={image} alt='image' className={styles.image} />
						<div className={styles.flex}>
							<p className={styles.title}>{post.title}</p>
							<div className={styles.reactions} style={index !== 0 ? { display: 'none' } : {}}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} />
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} />
								</p>
							</div>
						</div>
						{index === 0 && <p className={styles.text}>{post.body}</p>}
						<div className={styles.box}>
							<div className={styles.reactions} style={index === 0 ? { opacity: 0 } : {}}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} />
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} />
								</p>
							</div>
							<Link to={`/post/${post.id}`} className={styles.link}>
								Читать далее
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
