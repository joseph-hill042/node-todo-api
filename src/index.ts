import express from 'express'
import bodyParser from 'body-parser'
import { Mongoose } from './server/db/mongoose'
import { User } from './server/models/user'
import { Todo } from './server/models/todo'

const app = express()
Mongoose.connect()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.send('<h1>Welcome to the NodeJS Todo API</h1>')
})
app.post('/todos', (req, res, next) => {
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

app.listen(3000, () => {
  console.info('Server listening at http://localhost:3000')
})
