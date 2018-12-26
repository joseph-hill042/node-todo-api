import * as request from 'supertest'
import { server } from '../..'
import { Todo } from '../models/todo'
const api = request(server)

const todos = [
  {
    text: 'First test todo',
  },
  {
    text: 'Second test todo',
  },
]

describe('Server', () => {
  beforeEach(done => {
    Todo.remove({})
      .then(() => {
        return Todo.insertMany(todos)
      })
      .then(() => done())
  })
  describe('GET /', () => {
    it('should return the greeting text', done => {
      const response = '<h1>Welcome to the NodeJS Todo API</h1>'

      api
        .get('/')
        .send(response)
        .expect(200)
        .expect(res => {
          expect(res.text).toMatch(response)
        })
        .end(done)
    })
  })
  describe('GET /todos', () => {
    it('should get all todos', done => {
      api
        .get('/todos')
        .expect(200)
        .expect(res => {
          expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
  })
  describe('POST /todos', () => {
    it('should create a new todo', done => {
      const text = 'Test todo text'

      api
        .post('/todos')
        .send({ text })
        .expect(200)
        .expect(res => {
          expect(res.body.text).toBe(text)
        })
        .end((err, doc) => {
          if (err) {
            done(err)
          }

          Todo.find({ text })
            .then(todos => {
              expect(todos.length).toBe(1)
              // @ts-ignore
              expect(todos[0].text).toBe(text)
              done()
            })
            .catch(err => {
              done(err)
            })
        })
    })
    it('should not create todo with invalid body data', done => {
      api
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err)
          }

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(2)
              done()
            })
            .catch(err => {
              done(err)
            })
        })
    })
  })

  afterAll(() => {
    server.close()
  })
})
