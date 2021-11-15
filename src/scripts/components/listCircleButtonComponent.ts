import CircleButtonComponent, { ICircleButton } from './circleButtonComponent'
import { getSize, isICircleButton } from '../../utils'

export default class ListCircleButtonComponent extends Phaser.GameObjects.Group {
  public static readonly RADIUS_ORIGINAL_CIRCLE = 256
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
    const arrCircleButton = arr.concat(data).filter(item => isICircleButton(item))
    const size = arrCircleButton.length
    if (size > 0) {
      arrCircleButton.forEach((child, index) => {
        const itemCircleButton = child as ICircleButton
        this.add(this._createCircleComponent(itemCircleButton))
      })
    }
  }

  private _createCircleComponent({
    game,
    x,
    y,
    circleButton,
    scaleCircleButton,
    circleBadge,
    icon,
    badge
  }: ICircleButton): CircleButtonComponent {
    const container = new CircleButtonComponent(this._scene, x, y)
    container.setCircleWrapper(circleButton, scaleCircleButton)
    container.setIcon(icon)
    if (circleBadge && badge) {
      container.setBorderCircle(circleBadge)
      container.setBadge(badge)
      const { w, h } = getSize(container.componentBorderCircle, game)
      container.componentBorderCircle.setSize(w, h)
      container.runAnimationComponentBorderCircle()
    }
    return container
  }
}
