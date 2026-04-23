<script setup>
import { onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import axios from 'axios';
onMounted(async () => {
  const resp = await axios.get('https://json-server-phi-kohl.vercel.app/jobs')
  console.log('resp', resp.data)
});
</script>
<template>
  <Navbar />
  <RouterView />
</template>