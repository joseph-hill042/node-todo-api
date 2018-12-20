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
      // db.collection('todos').insertOne(
      //   {
      //     text: 'Something to do',
      //     completed: false,
      //   },
      //   (err, res) => {
      //     if (err) {
      //       return console.info('Unable to insert todoObj', err)
      //     }
      //     console.info(JSON.stringify(res.ops, undefined, 2))
      //   }
      // )

      // db.collection('users').insertOne(
      //   {
      //     name: 'Mike',
      //     age: 39,
      //     location: 'Richmond',
      //   },
      //   (err, res) => {
      //     if (err) {
      //       return console.info('Unable to insert todoObj', err)
      //     }
      //     console.info(
      //       JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2)
      //     )
      //   }
      // )

      client.close()
    }
  )
