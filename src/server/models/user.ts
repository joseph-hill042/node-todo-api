import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'User must have an email field'],
    minlength: 1,
    trim: true,
  },
})

export const User = mongoose.model('User', userSchema)
