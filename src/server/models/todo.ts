import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Todo must have a text field'],
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
})

export const Todo = mongoose.model('Todo', todoSchema)
