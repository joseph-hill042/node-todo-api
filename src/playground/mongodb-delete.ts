import { MongoClient, ObjectID } from 'mongodb'

export const dbConnection = () =>
  MongoClient.connect(
    'mongodb://localhost:27017',
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return console.info('Unable to connect to MongoDB server')
      }
      console.info('Connected to MongoDB server')
      const db = client.db('toDoApp')

      // deleteMany
      // db.collection('todos')
      //   .deleteMany({ text: 'Eat lunch' })
      //   .then(res => {
      //     console.info(res)
      //   })
      // db.collection('users')
      //   .deleteMany({ name: 'Joseph' })
      //   .then(res => {
      //     console.info(res.result.ok)
      //   })

      // deleteOne
      // db.collection('todos')
      //   .deleteOne({ text: 'Eat lunch' })
      //   .then(res => {
      //     console.info(res)
      //   })

      // findOneAndDelete
      // db.collection('todos')
      //   .findOneAndDelete({ completed: false })
      //   .then(res => {
      //     console.info(res)
      //   })
      // db.collection('users')
      //   .findOneAndDelete({ _id: new ObjectID('5c1bf27495621949991d2741') })
      //   .then(res => {
      //     console.info(res)
      //   })

      //client.close()
    }
  )
