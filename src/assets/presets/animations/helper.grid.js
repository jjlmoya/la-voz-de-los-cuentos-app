export default grid => {
  switch (grid) {
    case 1:
      return {
        'transform-origin': 'top left'
      }
    case 2:
      return {
        'transform-origin': 'top center'
      }
    case 3:
      return {
        'transform-origin': 'top right'
      }
    case 4:
      return {
        'transform-origin': 'center left'
      }
    case 5:
      return {
        'transform-origin': 'center center'
      }
    case 6:
      return {
        'transform-origin': 'center right'
      }
    case 7:
      return {
        'transform-origin': 'bottom left'
      }
    case 8:
      return {
        'transform-origin': 'bottom center'
      }
    case 9:
      return {
        'transform-origin': 'bottom right'
      }
  }
}
