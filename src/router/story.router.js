import Story from '../views/Stories/Story.vue'
import StoryList from '../views/Stories/StoryList.vue'

export default [
  {
    path: 'stories',
    name: 'stories',
    component: StoryList
  },
  {
    path: 'story',
    name: 'story',
    component: Story
  }
]
