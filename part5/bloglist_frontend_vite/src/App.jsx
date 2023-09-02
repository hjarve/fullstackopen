import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [successful, setSuccessful] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs));
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const showNotification = (message, successful) => {
    setNotificationMessage(message);
    setSuccessful(successful);
    setTimeout(() => {
      setNotificationMessage(null)
      setSuccessful(null);
    }, 4000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({ username, password, });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception){
      console.log('Wrong credential');
      showNotification('Wrong username or password', 0);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  }

  const loginForm = () => {
    return(
      <div>
        <h2>log in to the application</h2>
        <Notification message={notificationMessage} successful={successful}/>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  const addNewBlog = async blogObject => {
    try{
      console.log(blogs);
      let addedBlog = await blogService.create(blogObject);
      const loggedUser = {
        username: user.username,
        name: user.name,
      }
      addedBlog = { ...addedBlog, ...{ user: loggedUser } };
      setBlogs(blogs.concat(addedBlog));
      showNotification(`A new blog ${addedBlog.title} by ${addedBlog.author} added`, 1);
      blogFormRef.current.toggleVisibility();
    }catch (exception){
      showNotification(exception.response.data.error, 0);
    }
  }

  const updateBlog = async blogObject => {
    try{
      let updatedBlog = await blogService.update(blogObject.id, blogObject);
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : blogObject));
    }catch(exception){
      showNotification(exception.response.data.error, 0);
    }
  }

  const deleteBlog = async blogObject => {
    try{
      await blogService.remove(blogObject.id);
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      showNotification('Blog removed', 1);
    }catch(exception){
      showNotification(exception.response.data.error, 0);
    }
  }

  const compareLikes = (first, second) => {
    return second.likes - first.likes;
  }


  if (user === null){
    return(
      <div>
        {loginForm()}
      </div>
    )
  }

  return(
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} successful={successful}/>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog}/>
      </Togglable>
      {blogs.sort(compareLikes).map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={updateBlog} handleDeleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App;
