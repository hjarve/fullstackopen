import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

import blogService from './services/blogs';
import loginService from './services/login';



const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState("notification");
  const [successful, setSuccessful] = useState(null);

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
      console.log(user);
      console.log(user.token);

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
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
    ) 
  }

  const addNewBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    try{
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      showNotification(`A new blog ${addedBlog.title} by ${addedBlog.author} added`, 1);
    }catch (exception){
      showNotification(exception.response.data.error, 0);
    }
  }

  const newBlogForm = () => {
    return(
      <div>
        <h2>create new</h2>
        <form onSubmit={addNewBlog}>
          <div>
            title:
            <input
            type="text"
            value={blogTitle}
            name="title"
            onChange={({target}) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({target}) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({target}) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
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
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App;
