import { FC } from 'react';
import image from '../../images/Image.png';
import { GoArrowLeft } from 'react-icons/go';
import { RootState } from '../../redux/store';
import { Link, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { toggleReaction } from '../../redux/reactionsSlice';

import styles from './BlogPostPage.module.scss';

export const BlogPostPage: FC = () => {
	const dispatch = useDispatch();

	const { postId } = useParams<{ postId: string }>();

	const { data: post } = useGetPostByIdQuery(Number(postId));

	const reactions = useSelector((state: RootState) => state.reactions);

	const handleLike = () => {
		if (reactions[Number(postId)]?.likes === 1) {
			dispatch(toggleReaction({ postId: Number(postId), reaction: 'like' }));
		} else if (!reactions[Number(postId)]?.likes) {
			dispatch(toggleReaction({ postId: Number(postId), reaction: 'like' }));
		}
	};

	const handleDislike = () => {
		if (reactions[Number(postId)]?.dislikes === 1) {
			dispatch(toggleReaction({ postId: Number(postId), reaction: 'dislike' }));
		} else if (!reactions[Number(postId)]?.dislikes) {
			dispatch(toggleReaction({ postId: Number(postId), reaction: 'dislike' }));
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrap}>
				<Link className={styles.link} to='/'>
					<GoArrowLeft className={styles.arrow} />
					Вернуться к статьям
				</Link>
				<div className={styles.reactions}>
					<p className={styles.likeCount}>
						<BiSolidLike className={styles.icon} style={reactions[Number(postId)]?.recentlyLiked ? { color: 'green' } : {}} onClick={handleLike} />
						{reactions[Number(postId)]?.likes || 0}
					</p>
					<p className={styles.likeCount}>
						<BiSolidDislike className={styles.icon} style={reactions[Number(postId)]?.recentlyDisliked ? { color: 'red' } : {}} onClick={handleDislike} />
						{reactions[Number(postId)]?.dislikes || 0}
					</p>
				</div>
			</div>
			<h2 className={styles.title}>{post?.title}</h2>
			<img className={styles.image} src={image} alt='image' />
			<p className={styles.text}>{post?.body}</p>
		</div>
	);
};
