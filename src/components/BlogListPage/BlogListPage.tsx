import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../images/Image.png';
import { RootState } from '../../redux/store';
import { SearchBar } from '../SearchBar/SearchBar';
import { useGetPostsQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReaction } from '../../redux/reactionsSlice';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

import styles from './BlogListPage.module.scss';

export const BlogListPage: FC = () => {
	const dispatch = useDispatch();

	const { data: posts } = useGetPostsQuery();

	const reactions = useSelector((state: RootState) => state.reactions);

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => setSearchQuery(query);

	const handleLike = (postId: number) => {
		if (reactions[postId]?.likes === 1) {
			dispatch(toggleReaction({ postId, reaction: 'like' }));
		} else if (!reactions[postId]?.likes) {
			dispatch(toggleReaction({ postId, reaction: 'like' }));
		}
	};

	const handleDislike = (postId: number) => {
		if (reactions[postId]?.dislikes === 1) {
			dispatch(toggleReaction({ postId, reaction: 'dislike' }));
		} else if (!reactions[postId]?.dislikes) {
			dispatch(toggleReaction({ postId, reaction: 'dislike' }));
		}
	};

	const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
									<BiSolidLike className={styles.icon} style={reactions[post.id]?.recentlyLiked ? { color: 'green' } : {}} onClick={() => handleLike(post.id)} />
									{reactions[post.id]?.likes || 0}
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} style={reactions[post.id]?.recentlyDisliked ? { color: 'red' } : {}} onClick={() => handleDislike(post.id)} />
									{reactions[post.id]?.dislikes || 0}
								</p>
							</div>
						</div>
						{index === 0 && <p className={styles.text}>{post.body}</p>}
						<div className={styles.box}>
							<div className={styles.reactions} style={index === 0 ? { opacity: 0 } : {}}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} style={reactions[post.id]?.recentlyLiked ? { color: 'green' } : {}} onClick={() => handleLike(post.id)} />
									{reactions[post.id]?.likes || 0}
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} style={reactions[post.id]?.recentlyDisliked ? { color: 'red' } : {}} onClick={() => handleDislike(post.id)} />
									{reactions[post.id]?.dislikes || 0}
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
