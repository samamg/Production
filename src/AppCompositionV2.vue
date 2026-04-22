<script setup>
import { onMounted, ref } from 'vue';

const name = 'John Doe'
const status = ref('active')
const newTask = ref('')
const tasks = ref([])
const googleLink = 'https://www.google.com'
function toggleStatus() {
  switch (status.value) {
    case 'active':
      status.value = 'pending';
      break;
    case 'pending':
      status.value = 'inactive';
      break;
    default:
      status.value = 'active';
  }
}
function addTask() {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value);
    newTask.value = '';
  } else {
    alert('Please enter task name!');
  }
}

function deleteTask(index) {
  // tasks.value = tasks.value.filter((_v, idx) => idx !== index)
  tasks.value.splice(index, 1);
}
async function fetchTodo() {
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await resp.json();
    tasks.value = todos.map((todo) => todo.title);
  } catch (error) {
    console.log('Error fetching data', error);
  }
}
onMounted(async () => {
  await fetchTodo()
})
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