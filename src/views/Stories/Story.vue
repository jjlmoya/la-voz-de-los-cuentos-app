<template>
  <div class="story">
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else>
      <div class="click-area left" @click="previousPhrase"></div>
      <div class="click-area right" @click="nextPhrase"></div>
      <div class="story-heading">
        {{ formattedStory.title }} ({{ formattedStory.phrases.length }})
      </div>
      <div class="story-wrapper">
        <div class="story-progress">
          <div
            class="progress-bar"
            :style="{ width: progressWidth + '%' }"
          ></div>
        </div>
        <div
          class="story-content"
          v-for="(phrase, i) in formattedStory.phrases"
          :key="i"
          :class="{
            'active-phrase': currentPhrase === i,
            'next-phrase': currentPhrase + 1 === i,
            [precalculatedMetadata[i].transition || 'slide-in-left']:
              currentPhrase === i && transitioning
          }"
        >
          <div
            class="story-image"
            :class="`${currentPhrase === i || currentPhrase === i + 1 ? precalculatedMetadata[i]?.class : ''}
            grid-${currentPhrase === i || currentPhrase === i + 1 ? precalculatedMetadata[i]?.grid : ''}`"
            :style="precalculatedMetadata[i]?.style"
          >
            <img
              :src="getImageSrc(precalculatedMetadata[i]?.image)"
              v-if="precalculatedMetadata[i]?.image"
            />
          </div>
          <div class="story-text">
            <p :id="i">{{ phrase }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onBeforeUnmount, watch } from 'vue'
  import useStory from '../../composables/useStory'
  import { Howl } from 'howler'

  const { formattedStory, metadata } = useStory(
    'kronar-el-susurro-del-tiempo-roto'
  )
  const currentPhrase = ref(0)
  const sound = ref(null)
  const transitioning = ref(false)
  const precalculatedMetadata = ref([])
  const loading = ref(true)

  const precalculateMetadata = () => {
    if (!metadata.value) return []
    return formattedStory.value.phrases.map((_, index) => {
      const idx = index + 1 < 10 ? `0${index + 1}` : index + 1
      return {
        image: idx,
        ...metadata.value[idx]
      }
    })
  }

  const getImageSrc = image => {
    return image
      ? new URL(
          `../../assets/stories/kronar-el-susurro-del-tiempo-roto/${image}.webp`,
          import.meta.url
        ).href
      : ''
  }

  watch(metadata, newVal => {
    if (newVal) {
      precalculatedMetadata.value = precalculateMetadata()
      loading.value = false
    }
  })

  const playSFX = () => {
    const meta = precalculatedMetadata.value[currentPhrase.value]
    if (meta?.sfx) {
      const playSound = () => {
        sound.value = new Howl({
          src: [`/assets/audio/sfx/${meta.sfx.file}.wav`],
          volume: meta.sfx.volume || 1
        })

        sound.value.play()
        sound.value.on('end', () => {
          setTimeout(playSound, (meta.sfx.time || 10) * 1000)
        })
      }

      setTimeout(playSound, (meta.sfx.delay || 0) * 1000)
    }
  }

  const stopSFX = () => {
    if (sound.value) {
      sound.value.stop()
      sound.value.unload()
    }
  }

  const nextPhrase = () => {
    if (
      formattedStory.value &&
      currentPhrase.value < formattedStory.value.phrases.length - 1
    ) {
      transitioning.value = true
      setTimeout(() => {
        currentPhrase.value++
        transitioning.value = false
      }, 1000)
    }
  }

  const previousPhrase = () => {
    if (currentPhrase.value > 0) {
      currentPhrase.value--
    }
  }

  const progressWidth = computed(() => {
    if (!formattedStory.value) return 0
    return Math.ceil(
      ((currentPhrase.value + 1) / formattedStory.value.phrases.length) * 100
    )
  })

  watch(currentPhrase, () => {
    stopSFX()
    playSFX()
  })

  onBeforeUnmount(() => {
    stopSFX()
  })
</script>

<style scoped>
  body {
    max-height: 100vh;
    overflow: hidden;
    margin: 0;
  }

  .story {
    --transition-duration: .5s;
    color: white;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    font-size: 22px;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-size: 24px;
    color: white;
  }

  .click-area {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 100;
  }

  .click-area.left {
    left: 0;
  }

  .click-area.right {
    right: 0;
  }

  .story-image {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .story-image img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .story-wrapper {
    position: relative;
    width: 100vw;
    height: 100vw;
    display: grid;
    grid-gap: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .story-text {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: grid;
    grid-gap: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .story-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: grid;
    grid-gap: 0;
  }

  .story-progress {
    position: relative;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    background-color: var(--v-color-primary);
    transition: width 0.3s ease;
  }

  .story-text {
    padding: 1em;
  }
  .story-heading {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    display: grid;
    grid-gap: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1em;
  }

  .active-phrase {
    z-index: 2;
  }

  .next-phrase {
    z-index: 1;
  }
</style>
