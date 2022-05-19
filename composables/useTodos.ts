const useTodos = () => {
  const { data: todos, refresh } = useAsyncData('todosy', () =>
    $fetch('/api/todo')
  )

  const addTodo = async (item) => {
    if (!item) return
    await $fetch('/api/todo', {
      method: 'POST',
      body: { item },
    })
    refresh()
  }

  const updateTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, {
      method: 'PUT',
    })
    refresh()
  }

  const deleteTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    })
    refresh()
  }

  return { todos, updateTodo, addTodo, deleteTodo }
}

export default useTodos
