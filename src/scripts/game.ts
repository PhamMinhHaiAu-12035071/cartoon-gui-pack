import 'phaser'
import MainScene from './scenes/mainScene'
import PreScene from './scenes/preScene'

const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight

const config = {
  type: Phaser.CANVAS,
  backgroundColor: '#ffffff',
  pixelArt: false,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      debugShowBody: true,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugVelocityColor: 0xffff00,
      debugBodyColor: 0x0000ff,
      debugStaticBodyColor: 0xffffff
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
