<script>
export default {
  data() {
    return {
      name: 'Nang',
      status: 'active',
      tasks: [
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: false },
        { id: 3, title: 'Task 3', completed: true }
      ],
      googleLink: 'https://www.google.com'
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === 'active') {
        this.status = 'pending'
      } else if (this.status === 'pending') {
        this.status = 'inactive'
      } else {
        this.status = 'active'
      }
    }
  }
}
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>

  <h2>Tasks:</h2>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }}
    </li>
  </ul>
  <!-- v-bind -->
  <!-- Full bind -->
  <!-- <a v-bind:href="googleLink" target="_blank">Go to Google</a> -->
  <!-- Shorthand -->
  <a :href="googleLink" target="_blank">Go to Google</a>
  <br>
  <!-- Click event: -->
  <!-- Full bind: -->
  <!-- <button v-on:click="toggleStatus">Toggle Status</button> -->
  <!-- Shorthand: -->
  <button @click="toggleStatus">Toggle Status</button>
</template>
