export default ({ grid = 5, time = 10 }) => ({
  style: {
    'animation-duration': `${time}s`,
    'animation-fill-mode': 'forwards'
  },
  class: 'zoom-in',
  grid
})
