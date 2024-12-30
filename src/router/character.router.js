import Character from '../views/Characters/Character.vue'
import CharacterList from '../views/Characters/CharacterList.vue'

export default [
  {
    path: 'characters',
    name: 'characters',
    component: CharacterList
  },
  {
    path: 'character',
    name: 'character',
    component: Character
  }
]
