import SquareButtonComponent, { ISquareButton } from './squareButtonComponent'
import { isSquareButton } from '../../utils'

export default class ListSquareButtonComponent extends Phaser.GameObjects.Group {
  public static readonly SIZE: number = 256

  private readonly _scene: Phaser.Scene
  constructor(
    scene: Phaser.Scene,
    children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig,
    config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig
  ) {
    super(scene, children, config)
    this._scene = scene
  }

  override add(data: any, _scene?: any): any {
    const arr = []
    const arrSquareButton = arr.concat(data).filter(item => isSquareButton(item))
    const size = arrSquareButton.length
    if (size > 0) {
      arrSquareButton.forEach((child, index) => {
        const itemSquareButton = child as ISquareButton
        this.add(this._createSquareComponent(itemSquareButton))
      })
    }
  }

  private _createSquareComponent({
    x,
    y,
    squareButton,
    scaleSquareButton,
    icon
  }: ISquareButton): SquareButtonComponent {
    const container = new SquareButtonComponent(this._scene, x, y)
    container.setSquareWrapper(squareButton, scaleSquareButton)
    container.setIcon(icon)
    return container
  }
}
