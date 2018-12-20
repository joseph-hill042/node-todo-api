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
      // db.collection('todos')
      //   .findOneAndUpdate(
      //     {
      //       _id: new ObjectID('5c1bfbcb78358327f909853c'),
      //     },
      //     {
      //       $set: {
      //         completed: true,
      //       },
      //     },
      //     {
      //       returnOriginal: false,
      //     }
      //   )
      //   .then(res => {
      //     console.info(res)
      //   })
      // db.collection('users')
      //   .findOneAndUpdate(
      //     { name: 'Jen' },
      //     {
      //       $set: {
      //         name: 'Joseph',
      //       },
      //       $inc: {
      //         age: 1,
      //       },
      //     },
      //     { returnOriginal: false }
      //   )
      //   .then(res => {
      //     console.info(res)
      //   })

      // db.close()
    }
  )
