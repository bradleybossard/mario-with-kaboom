// console.log('point1')

kaboom({
  global: true,
  fullscreen: true,
  scale: 1, 
  debug: true,
  clearColor: [0, 0, 0, 1]
})

loadRoot('https://imgur.com/wbKxhcd')
loadSprint('coin', 'wbKxhcd.png')

scene("game", () => {
  // add three layers with obj as default
  layers(['bg', 'obj', 'ui'], 'obj')
})

start("game")