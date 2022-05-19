import { db } from '@/server/db'

export default defineEventHandler((event) => {
  const method = event.req.method
  const { id } = event.context.param

  const findTodoById = (id) => {
    let index

    const todo = db.todos.find((t, i) => {
      if (t.id === id) {
        index = i
        return true
      }
      return false
    })
    if (!todo) throw new Error()

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