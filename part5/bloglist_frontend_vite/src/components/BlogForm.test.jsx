import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('the form shoul call the event handler with input details', async () => {
    const createBlog = jest.fn();

    const testUser = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText('title of the blog')
    const authorInput = screen.getByPlaceholderText('author of the blog');
    const urlInput = screen.getByPlaceholderText('url');

    const createButton = screen.getByText('create');

    await testUser.type(titleInput, 'blog title');
    await testUser.type(authorInput, 'blog author');
    await testUser.type(urlInput, 'www.testurl.com');
    await testUser.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('blog title');
    expect(createBlog.mock.calls[0][0].author).toBe('blog author');
    expect(createBlog.mock.calls[0][0].url).toBe('www.testurl.com');
  })
})