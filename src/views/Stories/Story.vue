<template>
  <div class="story">
    <div class="click-area left" @click="previousPhrase"></div>
    <div class="click-area right" @click="nextPhrase"></div>
    <div class="story-heading">
      <div>{{ formattedStory.title }}</div>
    </div>
    <div class="story-wrapper">
      <div
        class="story-content"
        v-for="(phrase, i) in formattedStory.phrases"
        :class="{
          'active-phrase': currentPhrase === i,
          'next-phrase': currentPhrase + 1 === i,
          'slide-in-left': currentPhrase === i && transitioning
        }"
        :key="i"
      >
        <div
          class="story-image"
          :class="`${getMetadataValue()?.class} grid-${getMetadataValue()?.grid}`"
          :style="getMetadataValue()?.style"
        >
          <img
            src="@/assets/stories/kronar-el-susurro-del-tiempo-roto/01.png"
          />
        </div>
        <div class="story-text">
          <div class="story-progress">
            <div
              class="progress-bar"
              :style="{ width: progressWidth + '%' }"
            ></div>
          </div>
          <div class="story-phrases">
            <p :id="i">
              {{ phrase }}
            </p>
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

  const getMetadataValue = () => {
    try {
      const index =
        currentPhrase.value + 1 < 10
          ? `0${currentPhrase.value + 1}`
          : currentPhrase.value
      console.log(index)
      if (!metadata.value) return ''
      return metadata.value[index]
    } catch (error) {
      return {}
    }
  }

  const playSFX = () => {
    const meta = getMetadataValue()
    console.log({ meta })
    if (meta && meta.sfx) {
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
      }, 300)
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
    --transition-time: 0.3s;
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

  w .story-wrapper {
    position: relative;
    width: 100vw;
    height: 100vw;
    display: grid;
    grid-gap: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .story-text {
    position: fixed;
    min-height: 200px;
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
    background-color: #4caf50;
    transition: width 0.3s ease;
  }

  .story-heading {
    font-size: 18px;
    padding: 1em;
    text-align: center;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    display: grid;
    grid-gap: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 20;
  }

  .story-phrases {
    position: relative;
  }

  .story-phrases > div {
    position: absolute;
    width: 100%;
    transition: opacity 0.5s ease-in-out;
  }

  .story-phrases p {
    padding: 1em;
  }

  .active-phrase {
    z-index: 2;
    opacity: 1;
  }

  .next-phrase {
    z-index: 1;
  }
</style>
