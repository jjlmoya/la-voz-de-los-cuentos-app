import getGrid from './helper.grid'
export default ({ grid = 5, time = 10 }) => ({
  style: {
    'animation-duration': `${time}s`,
    'animation-fill-mode': 'forwards',
    'transform': 'scale(1.7)',
    ...getGrid(grid)
  },
  class: 'zoom-out'
})
