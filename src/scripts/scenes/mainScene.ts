import { CircleButton, HomeSceneImage, IconWhite } from '../../types/shared-typed'
import Phaser from 'phaser'
import ListCircleButtonComponent from '../components/listCircleButtonComponent'

export default class MainScene extends Phaser.Scene {
  private _backgroundGameImage: Phaser.GameObjects.Image
  private _listCircleButtonComponent: ListCircleButtonComponent

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._createBackgroundImage()
    this._createListCircleButton()
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

  private _createListCircleButton() {
    const OFFSET_ORIGINAL: number = this.cameras.main.width * 0.33
    const OFFSET_TOP_VERTICAL: number = this.cameras.main.height * 0.78
    const OFFSET_BOTTOM_VERTICAL: number = this.cameras.main.height * 0.88
    this._listCircleButtonComponent = new ListCircleButtonComponent(this)
    this._listCircleButtonComponent.add([
      {
        game: this.game,
        x: OFFSET_ORIGINAL,
        y: OFFSET_TOP_VERTICAL,
        circleButton: CircleButton.PINK,
        scaleCircleButton: 0.35,
        icon: IconWhite.USER
      },
      {
        game: this.game,
        x: OFFSET_ORIGINAL + 150,
        y: OFFSET_BOTTOM_VERTICAL,
        circleButton: CircleButton.YELLOW,
        scaleCircleButton: 0.35,
        icon: IconWhite.HEART,
        circleBadge: CircleButton.BLUE_BORDER,
        badge: 4
      },
      {
        game: this.game,
        x: OFFSET_ORIGINAL + 150 * 2,
        y: OFFSET_BOTTOM_VERTICAL,
        circleButton: CircleButton.ORANGE,
        scaleCircleButton: 0.35,
        icon: IconWhite.CHAT,
        circleBadge: CircleButton.PURPLE_BORDER,
        badge: 5
      },
      {
        game: this.game,
        x: OFFSET_ORIGINAL + 150 * 3,
        y: OFFSET_TOP_VERTICAL,
        circleButton: CircleButton.PURPLE,
        scaleCircleButton: 0.35,
        icon: IconWhite.SETTINGS
      }
    ])
  }

  update(time: number, delta: number) {}
}
