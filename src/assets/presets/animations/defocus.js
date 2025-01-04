import getGrid from './helper.grid'
export default (params = { grid: 5, time: 10 }) => ({
  style: {
    '--animation-duration': `${params.time}s`,
    'animation-fill-mode': 'forwards',
    transform: 'scale(1.7)',
    ...getGrid(params.grid)
  },
  class: 'zoom-out'
})
