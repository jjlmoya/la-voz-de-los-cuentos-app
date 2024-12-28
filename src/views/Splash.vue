<!-- filepath: /d:/code/la-voz-de-los-cuentos-app/src/views/Splash.vue -->
<template>
  <div class="splash-screen">
    <div class="logo-container">
      <img src="@/assets/imgs/logo.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Howl } from 'howler'

  const router = useRouter()

  onMounted(() => {
    const sound = new Howl({
      src: ['/assets/audio/bso/the-magic-braid.mp3'],
      volume: 0
    })

    sound.play()
    sound.fade(0, 0.1, 2000)

    setTimeout(() => {
      sound.fade(0.1, 0, 2000)
      router.push('/app/home')
    }, 5000)
  })
</script>

<style scoped>
  .splash-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--v-color-primary);
  }

  .logo-container {
    text-align: center;
  }

  .logo {
    width: 150px;
    height: 150px;
  }
</style>
