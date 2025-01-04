export default (
  params = {
    time: 2,
    sfx: { delay: 0.8, time: 0.93, volume: 0.9, file: 'giant-step' }
  }
) => ({
  style: {
    'animation-duration': `${params.time}s`
  },
  class: 'bounce',
  sfx: params.sfx
})
