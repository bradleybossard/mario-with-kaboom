kaboom({
  global: true,
  fullscreen: true,
  scale: 1, 
  debug: true,
  clearColor: [0, 0, 0, 1]
})

const MOVE_SPEED = 120;
const JUMP_FORCE = 220; 
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;


loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

scene("game", () => {
  // add three layers with obj as default
  layers(['bg', 'obj', 'ui'], 'obj')

	const map = [
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'     %   =*=%=                        ',
		'                                      ',
		'                            -+        ',
		'                    ^   ^   ()        ',
		'==============================   =====',
		];

  gravity(400)

	const levelCfg = {
		width: 20,
		height: 20,
		'=': [sprite('block'), solid()],
		'$': [sprite('coin')],
		'%': [sprite('surprise'), solid(), 'coin-surprise'],
		'*': [sprite('surprise'), solid(), 'mushroom-surprise'],
		'}': [sprite('unboxed'), solid()],
		'(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
		')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
		'-': [sprite('pipe-top-left'), solid(), scale(0.5)],
		'+': [sprite('pipe-top-right'), solid(), scale(0.5)],
		'^': [sprite('evil-shroom'), solid()],
		'#': [sprite('mushroom'), solid(), 'mushroom', body()],
		};

  const scoreLabel = add([
    text('test score'),
    pos(30, 6),
    layer('ui'),
    {
      value: 'test score' 
    }
  ]);

  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(2)
        timer = time
        isBig = true     
      }
    }
  }

  const gameLevel = addLevel(map, levelCfg);

  const player = add([
    sprite('mario'),
    solid(),
    pos(30, 30),
    body(),
    big(),
    origin('bot')
  ]);

  action('mushroom', (m) => {
    m.move(20, 0)
  });

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })


  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  keyDown('space', () => {
    if (player.grounded()) {
      player.jump(JUMP_FORCE);
    }
  })


});

start("game");
