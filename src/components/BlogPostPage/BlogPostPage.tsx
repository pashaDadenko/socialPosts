import { FC } from 'react';
import image from '../../images/Image.png';
import { GoArrowLeft } from 'react-icons/go';
import { RootState } from '../../redux/store';
import { Link, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReaction } from '../../redux/reactionsSlice';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

import styles from './BlogPostPage.module.scss';

export const BlogPostPage: FC = () => {
	const dispatch = useDispatch();

	const { postId } = useParams<{ postId: string }>();

	const { data: post } = useGetPostByIdQuery(Number(postId));

	const reactions = useSelector((state: RootState) => state.reactions[Number(postId)]);

	const handleLike = (postId: number) => dispatch(toggleReaction({ postId, reaction: 'like' }));

	const handleDislike = (postId: number) => dispatch(toggleReaction({ postId, reaction: 'dislike' }));

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrap}>
				<Link className={styles.link} to='/'>
					<GoArrowLeft className={styles.arrow} />
					Вернуться к статьям
				</Link>
				<div className={styles.reactions}>
					<p className={styles.likeCount}>
						<BiSolidLike className={styles.icon} style={reactions.recentlyLiked ? { color: 'green' } : {}} onClick={() => handleLike(Number(postId))} />
						{reactions?.likes}
					</p>
					<p className={styles.likeCount}>
						<BiSolidDislike className={styles.icon} style={reactions.recentlyDisliked ? { color: 'red' } : {}} onClick={() => handleDislike(Number(postId))} />
						{reactions?.dislikes}
					</p>
				</div>
			</div>
			<h2 className={styles.title}>{post?.title}</h2>
			<img className={styles.image} src={image} alt='image' />
			<p className={styles.text}>{post?.body}</p>
		</div>
	);
};
