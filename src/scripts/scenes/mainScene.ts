import { CircleButton, HomeSceneImage, IconWhite } from '../../types/shared-typed'
import CircleButtonComponent from '../components/circleButtonComponent'
import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  private _backgroundGameImage: Phaser.GameObjects.Image
  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    // load background
    this.load.image(HomeSceneImage.BACKGROUND, 'assets/images/backgrounds/home-scene-background.png')
    // load button circle
    this.load.svg(CircleButton.PINK, 'assets/images/buttons/circles/pink.svg')
    // load icon
    this.load.image(IconWhite.USER, 'assets/images/icon-white/user/user.png')
    // load circle border
    this.load.svg(CircleButton.PURPLE_BORDER, 'assets/images/buttons/circles/purple-border.svg')
  }

  create() {
    this.createBackgroundImage()
    const container = new CircleButtonComponent(this, 400, 400)
    container.setCircleWrapper(CircleButton.PINK)
    container.setIcon(IconWhite.USER)
    container.setBorderCircle(CircleButton.PURPLE_BORDER)
    container.setBadge(3)
    container.runAnimationComponentBorderCircle()
  }

  createBackgroundImage() {
    this._backgroundGameImage = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      HomeSceneImage.BACKGROUND
    )
    const scaleX = this.cameras.main.width / this._backgroundGameImage.width
    const scaleY = this.cameras.main.height / this._backgroundGameImage.height
    const scale = Math.max(scaleX, scaleY)
    this._backgroundGameImage.setScale(scale).setScrollFactor(0)
  }

  update(time: number, delta: number) {}
}
