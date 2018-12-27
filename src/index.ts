import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Mongoose } from './server/db/mongoose'
import { User } from './server/models/user'
import { Todo } from './server/models/todo'

const app = express()
const port = process.env.PORT
Mongoose.connect()
const validator = Mongoose.ValidateObjectId()

app.set('port', port)
app.use(bodyParser.json())

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

export const server = app.listen(app.get('port'), () => {
  // @ts-ignore
  console.info(JSON.stringify(process.env, undefined, 2))
})
