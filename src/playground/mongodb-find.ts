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
      db.collection('users')
        .find({ name: 'Joseph' })
        .toArray()
        .then(
          docs => {
            console.info('Users matched:::')
            console.info(JSON.stringify(docs, undefined, 2))
          },
          err => {
            console.info('Unable to fetch data', err)
          }
        )
      // db.collection('todos')
      //   .find({
      //     _id: new ObjectID('5c1bec7578358327f9098034'),
      //   })
      //   .toArray()
      //   .then(
      //     docs => {
      //       console.info('Todos:::')
      //       console.info(JSON.stringify(docs, undefined, 2))
      //     },
      //     err => {
      //       console.info('Unable to fetch todos', err)
      //     }
      //   )
      // db.collection('todos')
      //   .find()
      //   .count()
      //   .then(
      //     count => {
      //       console.info('Todos count:::', count)
      //     },
      //     err => {
      //       console.info('Unable to fetch todos', err)
      //     }
      //   )

      //client.close()
    }
  )
