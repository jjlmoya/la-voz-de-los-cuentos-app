<template>
  <div class="phrase">
    <p v-html="highlightedPhrase"></p>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps({
    phrase: String,
    onPhraseComplete: Function,
    onNextWord: Function,
    onPreviousWord: Function
  })

  const isFinished = ref(false)

  const currentWordIndex = ref(0)

  const highlightedPhrase = computed(() => {
    const words = props.phrase.split(' ')
    return words
      .map((word, index) =>
        index === currentWordIndex.value
          ? `<span class="phrase__highlight">${word}</span>`
          : word
      )
      .join(' ')
  })

  const handleKeyDown = event => {
    const words = props.phrase.split(' ')
    console.log({
      w: words,
      length: words.length - 1,
      cw: currentWordIndex.value
    })
    if (event.key === 'ArrowLeft') {
      if (currentWordIndex.value > 0) {
        currentWordIndex.value--
        props.onPreviousWord?.(currentWordIndex.value)
        isFinished.value = false
      }
    }

    if (event.key === 'ArrowRight') {
      isFinished.value = currentWordIndex.value === words.length - 1
      if (isFinished.value) {
        props.onPhraseComplete?.()
      }
      if (currentWordIndex.value < words.length - 1) {
        currentWordIndex.value++
        props.onNextWord?.(currentWordIndex.value)
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
</script>

<style>
  .phrase {
    position: fixed;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 1em;
    width: 100vw;
    z-index: 100;
  }
  .phrase__highlight {
   -webkit-text-stroke: 0.8px var(--v-color-primary);

  }
</style>
