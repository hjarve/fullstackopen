import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const user = {
    name: 'name of the user',
    username: 'username of the user'
  }
  const blog = {
    title: 'title of the blog',
    author: 'author of the blog',
    url: 'www.testurl.com',
    likes: 0,
    user: user
  }

  let container;

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user}/>).container;
  })

  test('should by default render title and author of the blog', () => {

    const div = container.querySelector('.blog');

    screen.debug();

    expect(div).toHaveTextContent('title of the blog author of the blog');
  })
})


