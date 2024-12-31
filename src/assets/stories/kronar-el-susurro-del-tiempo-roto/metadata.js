import focus from '../../presets/animations/focus'
import giantSteps from '../../presets/animations/giantSteps'

export default {
  '01': { ...giantSteps },
  '02': {
    ...focus({ grid: 3, time: 20 })
  }
}
