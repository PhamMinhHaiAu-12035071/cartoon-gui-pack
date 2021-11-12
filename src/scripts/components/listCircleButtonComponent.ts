import { ICircleButton } from '../../types/shared-typed'
import CircleButtonComponent from './circleButtonComponent'
import { getSize, isICircleButton } from '../../utils'

export default class ListCircleButtonComponent extends Phaser.GameObjects.Group {
  private _scene: Phaser.Scene
  constructor(
    scene: Phaser.Scene,
    children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig,
    config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig
  ) {
    super(scene, children, config)
    this._scene = scene
  }

  override add(data: any, _scene: any): any {
    if (isICircleButton(data)) {
      // handle
    }
  }

  private _createCircleComponent({
    game,
    x,
    y,
    circleButton,
    circleBadge,
    icon,
    badge
  }: ICircleButton): CircleButtonComponent {
    const container = new CircleButtonComponent(this._scene, x, y)
    container.setCircleWrapper(circleButton)
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
