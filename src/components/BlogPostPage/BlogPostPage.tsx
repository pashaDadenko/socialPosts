import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../redux/api';

import styles from './BlogPostPage.module.scss';

export const BlogPostPage: FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));

	if (isLoading) return <div>Loading...</div>;
	return (
		<div className={styles.wrapper}>
			<h2>{post?.title}</h2>
			<p>{post?.body}</p>
		</div>
	);
};
