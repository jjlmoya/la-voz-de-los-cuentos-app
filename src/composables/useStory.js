import { getSagas as _getSagas } from '../data'
import { ref, toValue } from 'vue'
const sagas = _getSagas()
export default function useStory(story) {
  const _storiesData = ref([])
  const _story = ref({})
  const firstParagraph = () =>
    story.story.split('\n').filter(p => p.trim() !== '')[0]

  const html = () =>
    story.story
      .split('\n')
      .filter(p => p.trim() !== '')
      .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
      .join('<br>')

  const getTime = () => {
    const time = Math.ceil(parseInt(story.time) / 60)
    return `${time} min`
  }

  const getSaga = () => {
    if (!story.saga) return
    return sagas.find(_saga => _saga.key === story.saga)?.name
  }

  const _getStoredData = () => {
    _storiesData.value = JSON.parse(localStorage.getItem('storiesData')) || []
    _story.value = toValue(_storiesData).find(entry => entry.key === story.key)
  }
  const getCurrentStatus = () => {
    try {
      _getStoredData()
      const state = toValue(_story)
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
    const storyCurrent = _story.value
    storyCurrent.like = like
    _story.value = storyCurrent
    _setStoriesData()
  }

  const _setStoriesData = () => {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const index = toValue(_storiesData).findIndex(
      entry => entry.key === story.key
    )
    if (index === -1) {
      storiesData.push({
        key: story.key,
        spentTime: 0,
        totalTime: story.time,
        finished: false,
        like: false
      })
    }
    storiesData[index] = toValue(_story)
    localStorage.setItem('storiesData', JSON.stringify(storiesData))
  }

  const _updateTimeSpent = () => {
    let currentStory = _story.value
    currentStory.spentTime += 10
    if (currentStory.spentTime >= parseInt(currentStory.totalTime)) {
      currentStory.finished = true
    }
    _story.value = currentStory
    _setStoriesData()
  }

  const reading = () => {
    _getStoredData()
    _setStoriesData()
    setInterval(_updateTimeSpent, 10000)
  }

  return {
    firstParagraph,
    getTime,
    html,
    getSaga,
    getCurrentStatus,
    setLikeStatus,
    isComplete,
    reading
  }
}

/*

  document.addEventListener('DOMContentLoaded', () => {
    const story =
      JSON.parse(
        document.getElementById('story-data').getAttribute('data-story')
      ) ?? {}
    const storyKey = story.key
    const storyTime = parseInt(story.time)

    function getStoriesData() {
      return JSON.parse(localStorage.getItem('storiesData')) || []
    }

    function updateStoryData() {
      let storiesData = getStoriesData()
      let storyIndex = storiesData.findIndex(s => s.key === storyKey)

      if (storyIndex === -1) {
        storiesData.push({
          key: storyKey,
          spentTime: 0,
          totalTime: storyTime,
          finished: false,
          like: false
        })
      }

      setStoriesData(storiesData)
    }
    updateStoryData()


  })
*/
