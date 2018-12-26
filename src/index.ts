import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Mongoose } from './server/db/mongoose'
import { User } from './server/models/user'
import { Todo } from './server/models/todo'

const app = express()
Mongoose.connect()
const validator = Mongoose.ValidateObjectId()
console.info(Mongoose.ObjectId())

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.send('<h1>Welcome to the NodeJS Todo API</h1>')
})
app.post('/todos', (req, res) => {
  const todo = new Todo({ text: req.body.text })
  todo.save().then(
    doc => {
      res.send(doc)
    },
    err => {
      res.status(400).send(err.message)
    }
  )
})
app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos })
    },
    err => {
      res.status(400).send(err)
    }
  )
})
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!validator(id)) {
    return res.status(404).send()
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({})
      }
      res.send({ todo })
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
})

export const server = app.listen(3000, () => {
  console.info('Server listening at http://localhost:3000')
})
