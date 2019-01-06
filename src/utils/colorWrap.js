const YELLOW = '\033[1;33m'
const RED = '\033[0;31m'
const NC = '\033[0m'
const CYAN = '\033[0;36m'
const GREEN = '\033[1;32m'
const PURPLE = '\033[1;35m'

const colorNames = {
  yellow: YELLOW,
  red: RED,
  none: NC,
  cyan: CYAN,
  green: GREEN,
  purple: PURPLE
}

module.exports = function colorWrap(text,color){
  return colorNames[color] + text + NC
}