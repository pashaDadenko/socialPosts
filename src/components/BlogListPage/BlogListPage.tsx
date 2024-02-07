import { Link } from 'react-router-dom';
import image from '../../images/Image.png';
import { RootState } from '../../redux/store';
import { FC, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { useGetPostsQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { addReaction } from '../../redux/reactionsSlice';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

import styles from './BlogListPage.module.scss';

export const BlogListPage: FC = () => {
	const dispatch = useDispatch();
	const { reactions } = useSelector((state: RootState) => state.reactions);

	const [currentReactions, setCurrentReactions] = useState<{ [postId: number]: 'like' | 'dislike' | null }>({});
	const [randomLikeCounts, setRandomLikeCounts] = useState<{ [postId: number]: number }>({});
	const [randomDislikeCounts, setRandomDislikeCounts] = useState<{ [postId: number]: number }>({});

	const { data: posts, isLoading } = useGetPostsQuery();

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => setSearchQuery(query);

	const generateRandomNumber = () => Math.floor(Math.random() * 51);

	useEffect(() => {
		if (posts) {
			const initialLikeCounts: { [postId: number]: number } = {};
			const initialDislikeCounts: { [postId: number]: number } = {};

			posts.forEach((post) => {
				initialLikeCounts[post.id] = generateRandomNumber();
				initialDislikeCounts[post.id] = generateRandomNumber();
			});

			setRandomLikeCounts(initialLikeCounts);
			setRandomDislikeCounts(initialDislikeCounts);
		}
	}, [posts]);

	useEffect(() => {
		if (reactions) {
			const updatedReactions: { [postId: number]: 'like' | 'dislike' | null } = {};
			reactions.forEach((reaction) => {
				updatedReactions[reaction.postId] = reaction.reactionType;
			});
			setCurrentReactions(updatedReactions);
		}
	}, [reactions]);

	const handleReactionClick = (postId: number, reactionType: 'like' | 'dislike') => {
		const currentReaction = currentReactions[postId];
		const updatedReactions = { ...currentReactions };

		if (currentReaction === reactionType) {
			updatedReactions[postId] = null;
		} else {
			updatedReactions[postId] = reactionType;
			dispatch(addReaction({ postId, reactionType }));
		}

		setCurrentReactions(updatedReactions);
	};

	if (isLoading) return <div>Loading...</div>;

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
									<BiSolidLike className={styles.icon} style={currentReactions[post.id] === 'like' ? { color: 'green' } : {}} onClick={() => handleReactionClick(post.id, 'like')} />
									{currentReactions[post.id] === 'like' ? randomLikeCounts[post.id] + 1 : randomLikeCounts[post.id]}
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} style={currentReactions[post.id] === 'dislike' ? { color: 'red' } : {}} onClick={() => handleReactionClick(post.id, 'dislike')} />
									{currentReactions[post.id] === 'dislike' ? randomDislikeCounts[post.id] + 1 : randomDislikeCounts[post.id]}
								</p>
							</div>
						</div>

						{index === 0 && <p className={styles.text}>{post.body}</p>}
						<div className={styles.box}>
							<div className={styles.reactions} style={index === 0 ? { opacity: 0 } : {}}>
								<p className={styles.likeCount}>
									<BiSolidLike className={styles.icon} style={currentReactions[post.id] === 'like' ? { color: 'green' } : {}} onClick={() => handleReactionClick(post.id, 'like')} />
									{currentReactions[post.id] === 'like' ? randomLikeCounts[post.id] + 1 : randomLikeCounts[post.id]}
								</p>
								<p className={styles.likeCount}>
									<BiSolidDislike className={styles.icon} style={currentReactions[post.id] === 'dislike' ? { color: 'red' } : {}} onClick={() => handleReactionClick(post.id, 'dislike')} />
									{currentReactions[post.id] === 'dislike' ? randomDislikeCounts[post.id] + 1 : randomDislikeCounts[post.id]}
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
