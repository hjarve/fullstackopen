const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const ObjectId = require('mongoose').Types.ObjectId;

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    try{
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch(e){
      next(e);
    }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!ObjectId.isValid(request.params.id)){
    return response.status(400).json({ error: "Invalid id"});
  }

  const blogToRemove = await Blog.findById(request.params.id);

  if(request.user && blogToRemove){
    if(request.user._id.toString() === blogToRemove.user.toString()){
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
    } else {
      return response.status(403).json({ error: "Wrong user"});
    }
  } else {
    return response.status(404).json({ error: "Blog not found"});
  }
})


module.exports = blogsRouter;