import { CircleButton, HomeSceneImage, IconWhite } from '../../types/shared-typed'
import CircleButtonComponent from '../components/circleButtonComponent'
import Phaser from 'phaser'
import { getSize } from '../../utils'
import ListCircleButtonComponent from '../components/listCircleButtonComponent'

export default class MainScene extends Phaser.Scene {
  private _backgroundGameImage: Phaser.GameObjects.Image
  private _listCircleButtonComponent: ListCircleButtonComponent

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._createBackgroundImage()
    this._createCircleComponent(400, 400, CircleButton.PINK, IconWhite.USER, CircleButton.PURPLE_BORDER, 9)
    this._listCircleButtonComponent = new ListCircleButtonComponent(this)
  }

  private _createBackgroundImage() {
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

  private _createCircleComponent(
    x: number,
    y: number,
    circleButton: CircleButton,
    icon: IconWhite,
    circleBadge?: CircleButton,
    badge?: number
  ) {
    const container = new CircleButtonComponent(this, x, y)
    container.setCircleWrapper(circleButton)
    container.setIcon(icon)
    if (circleBadge && badge) {
      container.setBorderCircle(circleBadge)
      container.setBadge(badge)
      const { w, h } = getSize(container.componentBorderCircle, this.game)
      container.componentBorderCircle.setSize(w, h)
      container.runAnimationComponentBorderCircle()
    }
  }

  update(time: number, delta: number) {}
}
