<template>
  <div class="story">
    <div class="click-area left" @click="previousPhrase"></div>
    <div class="click-area right" @click="nextPhrase"></div>
    <div class="story-image"
        :class="`${getMetadataValue()?.class} grid-${getMetadataValue()?.grid}`"
        :style="getMetadataValue()?.style">
      <img

        src="@/assets/stories/kronar-el-susurro-del-tiempo-roto/01.png"
        :alt="JSON.stringify(getMetadataValue()?.style)"
      />
    </div>
    <div class="story-heading">
      <div>{{ formattedStory.title }}</div>
    </div>
    <div class="story-wrapper">
      <div class="story-progress">
        <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
      </div>
      <div
        class="story-phrases"
        v-for="(phrase, i) in formattedStory.phrases"
        :key="i"
      >
        <p :id="i" v-if="currentPhrase === i">
          {{ phrase }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import useStory from '../../composables/useStory'

  const { formattedStory, metadata } = useStory(
    'kronar-el-susurro-del-tiempo-roto'
  )
  const currentPhrase = ref(0)

  const getMetadataValue = () => {
    try {
      const index = currentPhrase.value + 1 < 10 ? `0${currentPhrase.value + 1}` : currentPhrase.value
      console.log(index)
      if (!metadata.value) return ''
      return metadata.value[index]
    } catch (error) {
      return {}
    }
  }

  const nextPhrase = () => {
    if (
      formattedStory.value &&
      currentPhrase.value < formattedStory.value.phrases.length - 1
    ) {
      currentPhrase.value++
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
</script>

<style scoped>
  body {
    max-height: 100vh;
    overflow: hidden;
    margin: 0;
  }

  .story {
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

  .story-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: grid;
    grid-gap: 0;
    background-color: rgba(0, 0, 0, 0.8);
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
  }

  .story-phrases p {
    padding: 1em;
  }
</style>
