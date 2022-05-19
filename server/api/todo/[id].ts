import { db } from '@/server/db'
import { createError, sendError } from 'h3'

export default defineEventHandler((event) => {
  const method = event.req.method
  const { id } = event.context.params

  const findTodoById = (todoId) => {
    let index

    const todo = db.todos.find((t, i) => {
      if (t.id === todoId) {
        index = i
        return true
      }
      return false
    })
    if (!todo) {
      const TodoNotFoundError = createError({
        statusCode: 404,
        statusMessage: 'Todo not found',
        data: {},
      })
      sendError(event, TodoNotFoundError)
    }
    return { todo, index }
  }

  const { todo, index } = findTodoById(id)

  if (method === 'PUT') {
    const updateTodo = {
      ...todo,
      completed: !todo.completed,
    }

    db.todos[index] = updateTodo

    return updateTodo
  }

  if (method === 'DELETE') {
    db.todos.splice(index, 1)
    return 'item deleted'
  }
})
