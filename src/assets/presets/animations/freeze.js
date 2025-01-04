export default (params = { time: 60 }) => ({
  style: {
    '--animation-duration': `${params.time}s`
  },
  class: 'freeze'
  //sfx: { delay: 0.8, time: 0.93, volume: 0.9, file: 'giant-step' }
})
