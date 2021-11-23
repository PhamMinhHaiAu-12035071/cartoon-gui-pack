import { CircleButtonSvg, HomeSceneImage, IconWhiteSvg, SquareButtonSvg } from '../../types/shared-typed'
import Phaser from 'phaser'
import ListCircleButtonComponent from '../components/listCircleButtonComponent'
import ListSquareButtonComponent from '../components/listSquareButtonComponent'

export default class MainScene extends Phaser.Scene {
  private _backgroundGameImage: Phaser.GameObjects.Image
  private _listCircleButtonComponent: ListCircleButtonComponent
  private _listSquareButtonComponent: ListSquareButtonComponent

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._createBackgroundImage()
    this._createListCircleButton()
    this._createListSquareButton()
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
    const OFFSET_TOP_VERTICAL: number = this.cameras.main.height * 0.78
    const OFFSET_BOTTOM_VERTICAL: number = this.cameras.main.height * 0.88
    const SCALE: number = 0.4
    const sizeCircleButton: number = ListCircleButtonComponent.RADIUS_ORIGINAL_CIRCLE * SCALE
    this._listCircleButtonComponent = new ListCircleButtonComponent(this)
    this._listCircleButtonComponent.add([
      {
        game: this.game,
        x: this.cameras.main.width * 0.5 - sizeCircleButton * 2.75,
        y: OFFSET_TOP_VERTICAL,
        circleButton: CircleButtonSvg.PINK,
        scaleCircleButton: SCALE,
        icon: IconWhiteSvg.USER
      },
      {
        game: this.game,
        x: this.cameras.main.width * 0.5 - sizeCircleButton,
        y: OFFSET_BOTTOM_VERTICAL,
        circleButton: CircleButtonSvg.YELLOW,
        scaleCircleButton: SCALE,
        icon: IconWhiteSvg.HEART,
        circleBadge: CircleButtonSvg.BLUE_BORDER,
        badge: 4
      },
      {
        game: this.game,
        x: this.cameras.main.width * 0.5 + sizeCircleButton,
        y: OFFSET_BOTTOM_VERTICAL,
        circleButton: CircleButtonSvg.ORANGE,
        scaleCircleButton: SCALE,
        icon: IconWhiteSvg.CHAT,
        circleBadge: CircleButtonSvg.PURPLE_BORDER,
        badge: 5
      },
      {
        game: this.game,
        x: this.cameras.main.width * 0.5 + sizeCircleButton * 2.75,
        y: OFFSET_TOP_VERTICAL,
        circleButton: CircleButtonSvg.PURPLE,
        scaleCircleButton: SCALE,
        icon: IconWhiteSvg.SETTINGS
      }
    ])
  }

  private _createListSquareButton() {
    const OFFSET: number = 100
    const OFFSET_BOTTOM_VERTICAL: number = 100
    const SCALE: number = 0.25
    const sizeSquareButton: number = ListSquareButtonComponent.SIZE * SCALE
    this._listSquareButtonComponent = new ListSquareButtonComponent(this)
    this._listSquareButtonComponent.add([
      {
        x: 200,
        y: 200,
        squareButton: SquareButtonSvg.VIOLET,
        scaleSquareButton: SCALE,
        icon: IconWhiteSvg.USER_PLUS
      }
    ])
  }

  update(time: number, delta: number) {}
}
