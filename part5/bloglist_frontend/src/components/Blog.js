import { useState } from "react";

const Blog = ({blog, handleUpdateBlog, handleDeleteBlog, user}) => {
    const [showDetails, setShowDetails] = useState(false);

    const hideWhenVisible = { display: showDetails ? 'none' : '' };
    const showWhenVisible = { display: showDetails ? '' : 'none'};

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

    const toggleVisibility = () => {
      setShowDetails(!showDetails);
    }

    const updateBlog = ( ) => {
      const blogToUpdate = {...blog, likes: blog.likes+1};
      handleUpdateBlog(blogToUpdate);
    }

    const deleteBlog = () => {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        handleDeleteBlog(blog);
      }
    }

    const deleteButton = () => {
      return(
        <button style={{background: 'pink'}} onClick={deleteBlog}>remove</button>
      )
    }

    return(
      <div>
        <div style={{...blogStyle, ...hideWhenVisible}}>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(true)}>view</button>
        </div>
        <div style={{...blogStyle, ...showWhenVisible}}>
            <p>
              {blog.title} {blog.author}
              <button onClick={toggleVisibility}>hide</button>
              </p>
            <p>{blog.url}</p>
            <p>likes {blog.likes}
              <button onClick={updateBlog}>like</button>
              </p>
            <p>{blog.user.name}</p> 
            {blog.user.username === user.username && deleteButton()}
        </div> 
    </div>  
    )
}

export default Blog;