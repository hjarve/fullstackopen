const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const getSum = (total, blog) => {
        return total + blog.likes;
    }

    return blogs.lenth === 0 
    ? 0 : blogs.reduce(getSum, 0);
}

const favoriteBlog = (blogs) => {
    if  ( blogs.length === 0 ) {
        return 0;
    }
    let favorite = blogs[0];
    for(let blog of blogs){
        if(blog.likes > favorite.likes){
            favorite = blog; 
        }  
    }
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }
    let authors = _.countBy(blogs, function(blog) { return blog.author});
    authors = _.toPairs(authors);
    let mostBlogsAuthor = authors[0];
    for(let author of authors){
        if ( author[1] > mostBlogsAuthor[1] ) {
            mostBlogsAuthor = author;
        }
    }
    return {
        author: mostBlogsAuthor[0],
        blogs: mostBlogsAuthor[1]
    };
}

const mostLikes = (blogs) => {
    if( blogs.length === 0 ){
        return 0;
    }
    //let authorsWithLikes = blogs.map(blog => ({author: blog.author, likes: blog.likes}))
    let groupedAuhors = _.groupBy(blogs, function(blog){return blog.author});
    //create an array of objects that contain author and total likes of the author
    let authorsWithLikes = [];
    for (const author in groupedAuhors){
        let totalLikes = groupedAuhors[author].reduce(getSum, 0)

        function getSum(total, blog){
            return total + blog.likes;
        }

        authorsWithLikes.push({author: author, likes: totalLikes});
    }

    let authorWithMostLikes = authorsWithLikes[0];
    for (let obj of authorsWithLikes){
        if (obj.likes > authorWithMostLikes.likes){
            authorWithMostLikes = obj;
        }
    }
    
    return authorWithMostLikes;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}