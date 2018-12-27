import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

export const Mongoose = {
  connect: () => {
    return mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp',
      { useNewUrlParser: true }
    )
  },
  ObjectId: () => {
    return Types.ObjectId()
  },
  ValidateObjectId: () => {
    return Types.ObjectId.isValid
  },
}
