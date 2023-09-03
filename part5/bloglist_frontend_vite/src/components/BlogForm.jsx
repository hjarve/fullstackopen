import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id='title'
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
            placeholder='title of the blog'
          />
        </div>
        <div>
            author:
          <input
            id='author'
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
            placeholder='author of the blog'
          />
        </div>
        <div>
            url:
          <input
            id='url'
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button id='submit-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm;