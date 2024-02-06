import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface GetPostsResponse extends Array<Post> {}
export interface GetPostByIdResponse extends Post {}

export const postsApi = createApi({
	reducerPath: 'postsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
	endpoints: (builder) => ({
		getPosts: builder.query<Post[], void>({
			query: () => '/posts',
		}),
		getPostById: builder.query<Post, number>({
			query: (postId: number) => `/posts/${postId}`,
		}),
	}),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
