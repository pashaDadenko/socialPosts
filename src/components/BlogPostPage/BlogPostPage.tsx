import { FC } from 'react';
import image from '../../images/Image.png';
import { GoArrowLeft } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../redux/api';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

import styles from './BlogPostPage.module.scss';

export const BlogPostPage: FC = () => {
	const { postId } = useParams<{ postId: string }>();

	const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrap}>
				<Link className={styles.link} to='/'>
					<GoArrowLeft className={styles.arrow} />
					Вернуться к статьям
				</Link>
				<div className={styles.reactions}>
					<p className={styles.likeCount}>
						<BiSolidLike className={styles.icon} />
					</p>
					<p className={styles.likeCount}>
						<BiSolidDislike className={styles.icon} />
					</p>
				</div>
			</div>
			<h2 className={styles.title}>{post?.title}</h2>
			<img className={styles.image} src={image} alt='image' />
			<p className={styles.text}>{post?.body}</p>
		</div>
	);
};
