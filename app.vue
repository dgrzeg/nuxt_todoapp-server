<template>
  <div class="container">
    <NCard class="cards">
      <h1>My Todos</h1>
      <div class="add-todo">
        <input placeholder="Add a new todo..." v-model="input" />
        <NButton @click="() => addTodo(input)">Add</NButton>
      </div>
      <NCard class="card" v-for="todo in todos" :key="todo.is">
        <h4
          :class="{ complete: todo.completed }"
          @click="() => updateTodo(todo.id)"
        >
          {{ todo.item }}
        </h4>
        <p @click="() => deleteTodo(todo.id)">x</p>
      </NCard>
    </NCard>
  </div>
</template>

<script setup lang="ts">
const input = ref('')
const { todos, updateTodo, addTodo, deleteTodo } = useTodos()
</script>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}
.cards {
  padding: 2rem;
}
input {
  outline: none;
}
.add-todo {
  display: flex;
  justify-content: space-between;
}
.card {
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.complete {
  text-decoration: line-through;
}
</style>
