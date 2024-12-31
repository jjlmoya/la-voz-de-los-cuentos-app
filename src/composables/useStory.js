import { ref, computed } from 'vue'
import { getStories } from '../data'
import { getSagas as _getSagas } from '../data'

const sagas = _getSagas()
const stories = getStories()

export default function useStory(slug) {
  const _storiesData = ref([])
  const story = ref(stories.find(story => story.key === slug))
  const metadata = ref(null)

  const loadMetadata = async () => {
    try {
      const metadataModule = await import(
        `../assets/stories/${slug}/metadata.json`
      )
      metadata.value = metadataModule.default
    } catch (error) {
      console.error('Error loading metadata:', error)
    }
  }

  loadMetadata()

  const formattedStory = computed(() => {
    if (!story.value) return {}
    return {
      title: story.value.name,
      paragraphs: story.value.story.split('\n').filter(p => p.trim() !== ''),
      phrases: story.value.story.split('.').filter(p => p.trim() !== '')
    }
  })

  const getTime = () => {
    if (!story.value) return ''
    const time = Math.ceil(parseInt(story.value.time) / 60)
    return `${time} min`
  }

  const getSaga = () => {
    if (!story.value || !story.value.saga) return ''
    return sagas.find(_saga => _saga.key === story.value.saga)?.name
  }

  const _getStoredData = () => {
    _storiesData.value = JSON.parse(localStorage.getItem('storiesData')) || []
    const storedStory = _storiesData.value.find(
      entry => entry.key === story.value.key
    )
    if (storedStory) {
      story.value = storedStory
    }
  }

  const getCurrentStatus = () => {
    try {
      _getStoredData()
      const state = story.value
      const _currentPercent = Math.ceil(
        (state.spentTime / parseInt(state.totalTime)) * 100
      )
      const current = _currentPercent > 100 ? 100 : _currentPercent

      return {
        ...state,
        current
      }
    } catch (e) {
      return {}
    }
  }

  const isComplete = () => getCurrentStatus().current >= 100

  const setLikeStatus = like => {
    const storyCurrent = story.value
    storyCurrent.like = like
    story.value = storyCurrent
    _setStoriesData()
  }

  const _setStoriesData = () => {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const index = storiesData.findIndex(entry => entry.key === story.value.key)
    if (index === -1) {
      storiesData.push({
        key: story.value.key,
        spentTime: 0,
        totalTime: story.value.time,
        finished: false,
        like: false
      })
    } else {
      storiesData[index] = story.value
    }
    localStorage.setItem('storiesData', JSON.stringify(storiesData))
  }

  const _updateTimeSpent = () => {
    let currentStory = story.value
    currentStory.spentTime += 10
    if (currentStory.spentTime >= parseInt(currentStory.totalTime)) {
      currentStory.finished = true
    }
    story.value = currentStory
    _setStoriesData()
  }

  const reading = () => {
    _getStoredData()
    _setStoriesData()
    setInterval(_updateTimeSpent, 10000)
  }

  return {
    story,
    formattedStory,
    getTime,
    getSaga,
    getCurrentStatus,
    setLikeStatus,
    isComplete,
    reading,
    metadata
  }
}
