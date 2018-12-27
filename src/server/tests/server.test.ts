import * as request from 'supertest'
import { server } from '../..'
import { Todo } from '../models/todo'
import { Mongoose } from '../db/mongoose'
const api = request(server)

const todos = [
  {
    _id: Mongoose.ObjectId(),
    text: 'First test todo',
  },
  {
    _id: Mongoose.ObjectId(),
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
  describe('GET /todos/:id', () => {
    it('should return a todo doc', done => {
      api
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(res => {
          expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })
    it('should return 404 if todo not found', done => {
      api
        .get(`/todos/${Mongoose.ObjectId().toHexString()}`)
        .expect(404)
        .end(done)
    })
    it('should return 404 for non-object ids', done => {
      api
        .get('/todos/12345')
        .expect(404)
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
