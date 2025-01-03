import defocus from '../../presets/animations/defocus'
import focus from '../../presets/animations/focus'
import giantSteps from '../../presets/animations/giantSteps'

export default {
  '01': {
    ...giantSteps,
    transition: 'flip'
  },
  '02': {
    ...focus({ grid: 3, time: 3 }),
    transition: 'fade-in'
  },
  '03': { image: '01', ...defocus({ grid: 3, time: 3 }) },
  '04': { image: '01' },
  '05': { image: '01' },
  '06': { image: '01' },
  '07': { image: '01' },
  '08': { image: '01' },
  '09': { image: '01' },
  10: { image: '01' },
  11: { image: '01' },
  12: { image: '01' },
  13: { image: '01' },
  14: { image: '01' },
  15: { image: '01' },
  16: { image: '01' },
  17: { image: '01' },
  18: { image: '01' },
  19: { image: '01' },
  20: { image: '01' },
  21: { image: '01' },
  22: { image: '01' },
  23: { image: '01' },
  24: { image: '01' },
  25: { image: '01' },
  26: { image: '01' },
  27: { image: '01' },
  28: { image: '01' },
  29: { image: '01' },
  30: { image: '01' },
  32: { image: '01' },
  33: { image: '01' },
  34: { image: '01' },
  35: { image: '01' },
  36: { image: '01' },
  37: { image: '01' },
  38: { image: '01' },
  39: { image: '01' },
  40: { image: '01' },
  42: { image: '01' },
  43: { image: '01' },
  44: { image: '01' },
  45: { image: '01' },
  46: { image: '01' },
  47: { image: '01' },
  48: { image: '01' },
  49: { image: '01' },
  50: { image: '01' },
  52: { image: '01' },
  53: { image: '01' },
  54: { image: '01' },
  55: { image: '01' },
  56: { image: '01' },
  57: { image: '01' },
  58: { image: '01' },
  59: { image: '01' },
  60: { image: '01' },
  62: { image: '01' },
  63: { image: '01' },
  64: { image: '01' },
  65: { image: '01' },
  66: { image: '01' },
  67: { image: '01' },
  68: { image: '01' },
  69: { image: '01' },
  70: { image: '01' },
  72: { image: '01' }
}
