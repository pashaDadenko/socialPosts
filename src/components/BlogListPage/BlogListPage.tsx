import { Link } from 'react-router-dom';
import image from '../../images/Image.png';
import { RootState } from '../../redux/store';
import { FC, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { useGetPostsQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { setReactions, toggleReaction } from '../../redux/reactionsSlice';

import styles from './BlogListPage.module.scss';

export const BlogListPage: FC = () => {
	const dispatch = useDispatch();

	const { data: posts } = useGetPostsQuery();

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => setSearchQuery(query);

	const reactions = useSelector((state: RootState) => state.reactions);

	const handleLike = (postId: number) => dispatch(toggleReaction({ postId, reaction: 'like' }));

	const handleDislike = (postId: number) => dispatch(toggleReaction({ postId, reaction: 'dislike' }));

	const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

	useEffect(() => {
		if (posts) {
			posts.forEach((post) => {
				if (!reactions[post.id]) {
					const likes = Math.floor(Math.random() * 51);
					const dislikes = Math.floor(Math.random() * 51);
					dispatch(setReactions({ postId: post.id, likes, dislikes }));
				}
			});
		}
	}, [posts, reactions, dispatch]);

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
									{reactions[post.id]?.likes}
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} style={reactions[post.id]?.recentlyDisliked ? { color: 'red' } : {}} onClick={() => handleDislike(post.id)} />
									{reactions[post.id]?.dislikes}
								</p>
							</div>
						</div>
						{index === 0 && <p className={styles.text}>{post.body}</p>}
						<div className={styles.box}>
							<div className={styles.reactions} style={index === 0 ? { opacity: 0 } : {}}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} style={reactions[post.id]?.recentlyLiked ? { color: 'green' } : {}} onClick={() => handleLike(post.id)} />
									{reactions[post.id]?.likes}
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} style={reactions[post.id]?.recentlyDisliked ? { color: 'red' } : {}} onClick={() => handleDislike(post.id)} />
									{reactions[post.id]?.dislikes}
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
