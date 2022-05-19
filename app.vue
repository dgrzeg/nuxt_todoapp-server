<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api/todo')
</script>
