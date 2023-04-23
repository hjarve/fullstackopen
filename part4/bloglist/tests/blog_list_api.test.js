const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { before } = require('lodash');
const { error } = require('../utils/logger');

const loginUser = async () => {
    const userToLogIn = {
        username: helper.userArray[0].username,
        password: helper.userArray[0].password
    }

    const loggedInUser = await api.post('/api/login')
        .send(userToLogIn)

    return loggedInUser.body;
}

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(helper.userArray[0].password, 10);
    const user = new User({ username: helper.userArray[0].username, name: helper.userArray[0].name, passwordHash })
    const savedUser = await user.save();

    let blogObject = new Blog({...helper.initialBlogs[0], user: savedUser._id});
    await blogObject.save();
    blogObject = new Blog({...helper.initialBlogs[1], user: savedUser._id});
    await blogObject.save();
}, 100000)


describe('when there are initially some blogs saved', () => {
    test('2 blogs are returned as json', async () => {
        const loggedInUser = await loginUser();
        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${loggedInUser.token}`);
        expect(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('Unique identifier is named id', async () => {
        const loggedInUser = await loginUser();

        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${loggedInUser.token}`);
        expect(response.body[0].id).toBeDefined();
    }, 100000)
})

describe('adding a new blog', () => {
    test('succeeds with a valid new blog', async () => {
        const loggedInUser = await loginUser();

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtTheEnd = await helper.blogsInDb();
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtTheEnd.map(blog => blog.title)
        expect(titles).toContain('Canonical string reduction')
    }, 100000)

    test('without likes property succeeds with a default value zero', async () => {
        const loggedInUser = await loginUser();

        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtTheEnd = await helper.blogsInDb();
        const title = blogsAtTheEnd.filter(blog => blog.title === 'First class tests')
        
        expect(title[0].likes).toBe(0)
    }, 100000)

    test('fails with a status code 400 Bad Request if title is missing', async () => {
        const loggedInUser = await loginUser();

        const newBlog = {
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(newBlog)
            .expect(400)
    }, 100000)

    test('fails with a status code 400 Bad Request if url is missing', async () => {
        const loggedInUser = await loginUser();

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(newBlog)
            .expect(400)
    }, 100000)
})

describe('deleting a blog', () => {
    test('succeeds with a status code 204 if id is valid', async () => {
        const loggedInUser = await loginUser();

        const blogAtStart = await helper.blogsInDb();
        const blogToDelete = blogAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .expect(204)

        const blogsAtTheEnd = await helper.blogsInDb();

        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAtTheEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title);
    })
}, 100000)

describe('updating a blog', () => {
    test('succeeds with a new number for likes and a valid id', async () => {
        const loggedInUser = await loginUser();

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
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtTheEnd = await helper.blogsInDb();
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);

        const updatedBlog = blogsAtTheEnd.find(blog => blog.id === firstBlog.id)
        expect(updatedBlog.likes).toBe(10);
    })
}, 100000)

describe('when there is initially one user in the DB', () => {
    test('creation succeeds with a new username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: helper.userArray[1].username,
            name: helper.userArray[1].name,
            password: helper.userArray[1].password
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    }, 100000)

    test('creating a new user fails without a username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            name: 'Uusi Käyttäjä',
            password: 'sanasana'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.text).toMatch(/`username` is required/)

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    }, 100000)

    test('creating a new user fails with too short username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "aa",
            name: 'Uusi Käyttäjä',
            password: 'sanasana'
        }

        const respons = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(respons.text).toMatch(/is shorter than the minimum allowed length/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    }, 100000)

    test('creating a new user fails with already-existing username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "käyttäjä1",
            name: 'Uusi Käyttäjä',
            password: 'sanasana'
        }

        const respons = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(respons.text).toMatch(/`username` to be unique/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    }, 100000)

    test('creating a new user fails without a password', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'asdasd',
            name: 'Uusi Käyttäjä',
        }

        const respons = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(respons.text).toMatch(/password missing/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    }, 100000)

    test('creating a new user fails without too a short password', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'asdasd',
            name: 'Uusi Käyttäjä',
            password: 'ty'
        }

        const respons = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(respons.text).toMatch(/password must be at least 3 characters/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    }, 100000)

})

afterAll(async () => {
    await mongoose.connection.close();
}, 100000)