import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    expect(div).toHaveTextContent('title of the blog author of the blog');
  })

  test('should not display url and likes of the blog by defualt', () => {
    const div = container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  })

  test('should display url and likes when \'view\' button is clicked', async () => {
    const testUser = userEvent.setup();
    const button = screen.getByText('view');
    await testUser.click(button);

    const div = container.querySelector('.togglableContent');

    expect(div).not.toHaveStyle('display: none');
  })
})


