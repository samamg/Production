<script setup>
import { ref } from 'vue';

const name = 'John Doe'
const status = ref('active')
const newTask = ref('')
const tasks = ref([
  'Task 1',
  'Task 2',
  'Task 3'
])
const googleLink = 'https://www.google.com'
const toggleStatus = () => {
  switch (status.value) {
    case 'active':
      status.value = 'pending'
      break
    case 'pending':
      status.value = 'inactive'
      break
    default:
      status.value = 'active'
  }
}
const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value)
    newTask.value = ''
  } else {
    alert('Please enter task name!')
  }
}

const deleteTask = (index) => {
  // tasks.value = tasks.value.filter((_v, idx) => idx !== index)
  tasks.value.splice(index, 1)
}
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>
  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>
  <h2>Tasks:</h2>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>
        {{ task }}
      </span>
      <button @click="deleteTask(index)">x</button>
    </li>
  </ul>
  <!-- v-bind -->
  <!-- Full bind -->
  <!-- <a v-bind:href="googleLink" target="_blank">Go to Google</a> -->
  <!-- Shorthand -->
  <a :href="googleLink" target="_blank">Go to Google</a>
  <br>
  <br>
  <!-- Click event: -->
  <!-- Full bind: -->
  <!-- <button v-on:click="toggleStatus">Toggle Status</button> -->
  <!-- Shorthand: -->
  <button @click="toggleStatus">Toggle Status</button>
</template>
