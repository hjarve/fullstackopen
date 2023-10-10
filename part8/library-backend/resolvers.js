const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const  { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.genre) {
        return Book.find({genres: args.genre}).populate('author', {name: 1, born: 1})
      }
      return Book.find({}).populate('author', {name: 1, born: 1})
    },
    allAuthors: async (root, args) => {
       const authors = await Author.find({})
       const books = await Book.find({})
       const authorsWithBookCount = authors.map(a => {
        const bookCount = books.filter(b => b.author.toString() === a._id.toString()).length
        return {
          name: a.name,
          born: a.born,
          id: a._id,
          bookCount: bookCount
        }
       })
       return authorsWithBookCount
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if ( !currentUser ) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.author})
      let newBook
      if(!author) {
        const newAuthor = new Author({name: args.author})
        let savedAuthor
        try{
          savedAuthor = await newAuthor.save()
        }catch(error) {
          throw new GraphQLError('Saving new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
        
        newBook = new Book({...args, author: savedAuthor._id})
      } else newBook = new Book({...args, author: author._id})
      try{
        await newBook.save()
      }catch(error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      const savedBook = await Book.findOne({title: args.title}).populate('author', {name: 1, born:1})

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      return savedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if ( !currentUser ) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      
      const author = await Author.findOne({ name: args.name})
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if( !user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers