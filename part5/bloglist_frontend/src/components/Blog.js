import { useState } from "react";

const Blog = ({blog}) => {
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
              <button>like</button>
              </p>
            <p>{blog.user.name}</p>

          
            
        </div> 
    </div>
        
    )
}

export default Blog;