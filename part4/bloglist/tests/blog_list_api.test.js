const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');


beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
}, 100000)

describe('when there are initially some blogs saved', () => {
    test('2 blogs are returned as json', async () => {
        const response = await api.get('/api/blogs')
        expect(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('Unique identifier is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined();
    }, 100000)
})

describe('adding a new blog', () => {
    test('succeeds with a valid new blog', async () => {
        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtTheEnd = await helper.blogsInDb();
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtTheEnd.map(blog => blog.title)
        expect(titles).toContain('Canonical string reduction')
    }, 100000)

    test('without likes property succeeds with a default value zero', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtTheEnd = await helper.blogsInDb();
        const title = blogsAtTheEnd.filter(blog => blog.title === 'First class tests')
        
        expect(title[0].likes).toBe(0)
    }, 100000)

    test('fails with a status code 400 Bad Request if title is missing', async () => {
        const newBlog = {
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('fails with a status code 400 Bad Request if url is missing', async () => {
        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deleting a blog', () => {
    test('succeeds with a status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDb();
        const blogToDelete = blogAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtTheEnd = await helper.blogsInDb();

        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAtTheEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title);
    })
})

describe('updating a blog', () => {
    test('succeeds with a new number for likes and a valid id', async () => {
        const blogAtStart = await helper.blogsInDb();
        const firstBlog = blogAtStart[0];
        const blogToUpdate = {
            title: firstBlog.title,
            author: firstBlog.author,
            url: firstBlog.url,
            likes: 10
        }

        await api
            .put(`/api/blogs/${firstBlog.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtTheEnd = await helper.blogsInDb();
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);

        const updatedBlog = blogsAtTheEnd.find(blog => blog.id === firstBlog.id)
        expect(updatedBlog.likes).toBe(10);
    })
}, 100000)

afterAll(async () => {
    await mongoose.connection.close();
}, 100000)