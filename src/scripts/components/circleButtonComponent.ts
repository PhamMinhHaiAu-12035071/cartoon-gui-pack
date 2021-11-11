import { CircleButton, IconWhite } from '../../types/shared-typed'
import * as Phaser from 'phaser'

export default class CircleButtonComponent extends Phaser.GameObjects.Container {
  private readonly _scene: Phaser.Scene
  private _circle: Phaser.GameObjects.Image
  private _icon: Phaser.GameObjects.Image
  private _componentBorderCircle: Phaser.GameObjects.Container
  private _borderCircle: Phaser.GameObjects.Image
  private _textBadge: Phaser.GameObjects.Text
  public static readonly SCALE_ANIMATION: number = 0.18
  public static readonly SCALE_ANIMATION_BORDER_CIRCLE: number = 0.18
  constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Array<Phaser.GameObjects.GameObject>) {
    super(scene, x, y, children)
    this._scene = scene
    // add container into scene
    scene.add.existing(this)
  }

  createEvent() {
    this._circle.on('pointerover', this.pointerOver.bind(this))
    this._circle.on('pointerout', this.pointerOut.bind(this))
  }

  setCircleWrapper(texture: CircleButton): Phaser.GameObjects.Image {
    this._circle = this._scene.add.image(0, 0, texture).setInteractive({ cursor: 'pointer' })
    this.add(this._circle)
    this.createEvent()
    return this._circle
  }

  setIcon(texture: IconWhite, scaleComparedToCircle: number = 0.5): Phaser.GameObjects.Image {
    if (!this._circle) {
      throw new Error('please provide circle image wrapper')
    }
    const widthCircle: number = this._circle.width * this._circle.scaleX
    const heightCircle: number = this._circle.height * this._circle.scaleY
    this._icon = this._scene.add.image(0, 0, texture)
    const widthIcon: number = this._icon.width * this._icon.scaleX
    const heightIcon: number = this._icon.height * this._icon.scaleY
    const widthExpectIcon: number = widthCircle * scaleComparedToCircle
    const heightExpectIcon: number = heightCircle * scaleComparedToCircle
    const xScaleExpectedIcon: number = widthExpectIcon / widthIcon
    const yScaleExpectedIcon: number = heightExpectIcon / heightIcon
    this._icon.setScale(xScaleExpectedIcon, yScaleExpectedIcon)
    // default set origin
    this._icon.setOrigin(0.45, 0.6)
    this.add(this._icon)
    return this._icon
  }

  setBorderCircle(texture: CircleButton, scaleComparedToCircle = 0.4): Phaser.GameObjects.Image {
    if (!this._circle) {
      throw new Error('please provide circle image wrapper')
    }

    const widthCircle: number = this._circle.width * this._circle.scaleX
    const heightCircle: number = this._circle.height * this._circle.scaleY
    this._borderCircle = this._scene.add.image(0, 0, texture)
    this._componentBorderCircle = this._scene.add.container(this._borderCircle.x, this._borderCircle.y)
    const widthBorderCircle: number = this._borderCircle.width * this._borderCircle.scaleX
    const heightBorderCircle: number = this._borderCircle.height * this._borderCircle.scaleY
    const widthExpectBorderCircle: number = widthCircle * scaleComparedToCircle
    const heightExpectBorderCircle: number = heightCircle * scaleComparedToCircle
    const xScaleExpectedBorderCircle: number = widthExpectBorderCircle / widthBorderCircle
    const yScaleExpectedBorderCircle: number = heightExpectBorderCircle / heightBorderCircle
    this._borderCircle.setPosition(widthExpectBorderCircle * 0.5, 0)
    this._borderCircle.setScale(xScaleExpectedBorderCircle, yScaleExpectedBorderCircle)
    this._borderCircle.setOrigin(0, 0)
    this._componentBorderCircle.add(this._borderCircle)
    this.add(this._componentBorderCircle)
    return this._borderCircle
  }

  setBadge(value: number): Phaser.GameObjects.Text {
    if (!this._borderCircle) {
      throw new Error('please provide border circle image')
    }
    const FONT_SIZE: number = 30
    const style = { font: `${FONT_SIZE}px LilitaOne`, fill: '#ffffff' }
    this._textBadge = this._scene.add.text(
      this._borderCircle.x + FONT_SIZE * 0.7,
      this._borderCircle.y + FONT_SIZE * 0.25,
      value.toString(),
      style
    )
    this._componentBorderCircle.add(this._textBadge)
    return this._textBadge
  }

  runAnimationComponentBorderCircle(): void {
    const scaleY: number = 0.25
    const scaleX: number = 0.18
    const timeDuration: number = 650
    const config = {
      duration: timeDuration,
      repeat: -1,
      yoyo: true
    }
    const configHorizontal = {
      ...config,
      delay: 400,
      ease: 'Elastic.easeIn',
      easeParams: [1.5, 0.7]
    }
    this._scene.tweens.add({
      targets: this._componentBorderCircle,
      props: {
        scaleY: {
          value: this._componentBorderCircle.scaleY + scaleY,
          ...config
        },
        y: {
          value: -8,
          ...config
        },
        scaleX: {
          value: this._componentBorderCircle.scaleX + scaleX,
          ...configHorizontal
        },
        x: {
          value: -9,
          ...configHorizontal
        }
      }
    })
  }

  get circle(): Phaser.GameObjects.Image {
    return this._circle
  }

  get icon(): Phaser.GameObjects.Image {
    return this._icon
  }
  /**
   * handle when hover
   */
  pointerOver(): void {
    this._scene.tweens.add({
      targets: this,
      scaleY: this._circle.scale + CircleButtonComponent.SCALE_ANIMATION,
      duration: 100,
      repeat: 0,
      yoyo: false
    })
    this._scene.tweens.add({
      targets: this,
      scaleX: this._circle.scale + CircleButtonComponent.SCALE_ANIMATION,
      duration: 1000,
      ease: 'Elastic.easeOut',
      easeParams: [1.5, 0.5]
    })
  }

  /**
   * handle when hover out
   */
  pointerOut(): void {
    this._scene.tweens.add({
      targets: this,
      scaleY: this._circle.scale,
      duration: 100,
      repeat: 0,
      yoyo: false
    })
    this._scene.tweens.add({
      targets: this,
      scaleX: this._circle.scale,
      duration: 1000,
      ease: 'Elastic.easeOut',
      easeParams: [1.5, 0.5]
    })
  }
}
