<template>
  <div>
    <h1>Home</h1>
    <div>Router List:</div>
    <div v-for="page in pages">
      <div @click="router.push({ name: page })">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  //TODO: Temporal debug
  const pages = [
    'home',
    'story',
    'stories',
    'character',
    'characters',
    'setup',
    'splash'
  ]
</script>
