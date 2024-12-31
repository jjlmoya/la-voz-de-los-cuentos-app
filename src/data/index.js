const lang = 'es'
import charactersEn from './en/characters.json'
import storiesEn from './en/stories.json'
import sagasEn from './en/sagas.json'

import storiesEs from './es/stories.json'
import sagasEs from './es/sagas.json'
import charactersEs from './es/characters.json'

const map = {
  es: {
    stories: storiesEs,
    sagas: sagasEs,
    characters: charactersEs
  },
  en: {
    stories: storiesEn,
    sagas: sagasEn,
    characters: charactersEn
  }
}

export const getSagas = () => map[lang].sagas
export const getStories = () => map[lang].stories
export const getCharacters = () => map[lang].characters
