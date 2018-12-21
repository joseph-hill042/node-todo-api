import mongoose from 'mongoose'

export const Mongoose = {
  connect: () => {
    return mongoose.connect(
      'mongodb://localhost:27017/todoApp',
      { useNewUrlParser: true }
    )
  },
}
