import { Book } from '@/app/types/Book';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-central1-summaristt.cloudfunctions.net' }),
  endpoints: (builder) => ({
    getBookByStatus: builder.query<Book[], string>({
      query: (status) => `/getBooks?status=${status}`,
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/getBook?id=${id}`,
    }),
    getBookByAuthorOrTitle: builder.query<Book[], string>({
      query: (search) => `/getBooksByAuthorOrTitle?search=${search}`,
    }),
  }),
});

export const { useGetBookByStatusQuery, useGetBookByIdQuery, useGetBookByAuthorOrTitleQuery } = booksApi;
