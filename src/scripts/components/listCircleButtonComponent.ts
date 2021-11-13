import { ICircleButton } from '../../types/shared-typed'
import CircleButtonComponent from './circleButtonComponent'
import { getSize, isICircleButton } from '../../utils'

export default class ListCircleButtonComponent extends Phaser.GameObjects.Group {
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
    arr.concat(data).forEach(child => {
      if (isICircleButton(child)) {
        this.add(this._createCircleComponent(child))
      }
    })
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
