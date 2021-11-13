import { CircleButton, IconWhite } from '../../types/shared-typed'
import * as Phaser from 'phaser'

export default class CircleButtonComponent extends Phaser.GameObjects.Container {
  private readonly _scene: Phaser.Scene
  private _circle: Phaser.GameObjects.Image
  private _shadowCircle: Phaser.GameObjects.Image
  private _icon: Phaser.GameObjects.Image
  private _componentBorderCircle: Phaser.GameObjects.Container
  private _borderCircle: Phaser.GameObjects.Image
  private _shadowBorderCircle: Phaser.GameObjects.Image
  private _textBadge: Phaser.GameObjects.Text
  public static readonly SCALE_ANIMATION: number = 0.18
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

  setCircleWrapper(texture: CircleButton, scale: number = 1): Phaser.GameObjects.Image {
    this._circle = this._scene.add.image(0, 0, texture).setInteractive({ cursor: 'pointer' }).setScale(scale)
    this._setShadowCircleWrapper()
    this.add(this._circle)
    this.createEvent()
    return this._circle
  }

  private _getScaleBasedOnImage(
    obj: Phaser.GameObjects.Image,
    target: Phaser.GameObjects.Image,
    scaleComparedToCircle: number = 1
  ): { x: number; y: number } {
    const widthTarget: number = target.width * this._circle.scaleX
    const heightTarget: number = target.height * this._circle.scaleY
    const widthObj: number = obj.width * obj.scaleX
    const heightObj: number = obj.height * obj.scaleY
    const widthExpectedObj: number = widthTarget * scaleComparedToCircle
    const heightExpectedObj: number = heightTarget * scaleComparedToCircle
    const xScaleExpectedObj: number = widthExpectedObj / widthObj
    const yScaleExpectedObj: number = heightExpectedObj / heightObj
    return {
      x: xScaleExpectedObj,
      y: yScaleExpectedObj
    }
  }

  private _setShadowCircleWrapper(): Phaser.GameObjects.Image {
    const OFFSET: number = 0.05
    const offsetX: number = this._circle.width * this._circle.scaleX * OFFSET
    const offsetY: number = this._circle.height * this._circle.scaleY * OFFSET
    this._shadowCircle = this._scene.add.image(-offsetX, offsetY, CircleButton.SHADOW)
    const { x, y } = this._getScaleBasedOnImage(this._shadowCircle, this._circle)
    this._shadowCircle.setScale(x, y)
    this.add(this._shadowCircle)
    return this._shadowCircle
  }

  setIcon(texture: IconWhite, scaleComparedToCircle: number = 0.4): Phaser.GameObjects.Image {
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
    this._icon.setScale(Math.min(xScaleExpectedIcon, yScaleExpectedIcon))
    // default set origin
    this._icon.setOrigin(0.5, 0.5)
    this.add(this._icon)
    return this._icon
  }

  setBorderCircle(texture: CircleButton, scaleComparedToCircle = 0.4): Phaser.GameObjects.Image {
    if (!this._circle) {
      throw new Error('please provide circle image wrapper')
    }
    this._borderCircle = this._scene.add.image(0, 0, texture)
    this._componentBorderCircle = this._scene.add.container(this._borderCircle.x, this._borderCircle.y)
    const { x, y } = this._getScaleBasedOnImage(this._borderCircle, this._circle, scaleComparedToCircle)
    this._borderCircle.setScale(x, y)
    this._borderCircle.setOrigin(0.5, 0)
    const offsetX: number =
      this._circle.width * this._circle.scaleX * 0.5 - this._borderCircle.width * this._borderCircle.scaleX * 0.22
    this._borderCircle.setPosition(offsetX, 0)
    this._borderCircle.setDepth(1)
    this._setShadowBorderCircle(scaleComparedToCircle)
    this._componentBorderCircle.add(this._borderCircle)
    this.add(this._componentBorderCircle)
    return this._borderCircle
  }

  private _setShadowBorderCircle(scaleComparedToCircle: number): Phaser.GameObjects.Image {
    const OFFSET: number = 0.14
    this._shadowBorderCircle = this._scene.add.image(0, 0, CircleButton.SHADOW_BORDER)
    const { x, y } = this._getScaleBasedOnImage(this._shadowBorderCircle, this._circle, scaleComparedToCircle)
    this._shadowBorderCircle.setScale(x, y)
    this._shadowBorderCircle.setOrigin(0.5, 0)
    const offsetX: number =
      this._circle.width * this._circle.scaleX * 0.5 -
      this._shadowBorderCircle.width * this._shadowBorderCircle.scaleX * 0.25
    const offsetY: number = this._shadowBorderCircle.height * this._shadowBorderCircle.scaleY * OFFSET
    this._shadowBorderCircle.setPosition(offsetX, offsetY)
    this._componentBorderCircle.add(this._shadowBorderCircle)
    return this._shadowBorderCircle
  }

  setBadge(value: number): Phaser.GameObjects.Text {
    if (!this._borderCircle) {
      throw new Error('please provide border circle image')
    }
    const badge: number = value > 99 ? 99 : value
    const minSizeBorderCircle: number = Math.min(
      ...[this._borderCircle.width * this._borderCircle.scaleX, this._borderCircle.height * this._borderCircle.scaleY]
    )
    const FONT_SIZE: number = minSizeBorderCircle * 0.4
    const style = { font: `${FONT_SIZE}px LilitaOne`, fill: '#ffffff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    this._textBadge = this._scene.add.text(0, 0, badge.toString(), style)
    this._textBadge.setOrigin(0.5, 0.5)
    const offsetX: number =
      this._circle.width * this._circle.scaleX * 0.5 - this._borderCircle.width * this._borderCircle.scaleX * 0.2
    const offsetY: number = this._borderCircle.height * this._borderCircle.scaleY * 0.5
    this._textBadge.setPosition(offsetX, offsetY)
    this._componentBorderCircle.add(this._textBadge)
    return this._textBadge
  }

  runAnimationComponentBorderCircle(): void {
    const scaleY: number = 0.18
    const scaleX: number = 0.12
    const { width, height } = this._componentBorderCircle
    const offsetY: number = height * scaleY * 0.5
    const offsetX: number = width * scaleX * 0.5
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
      easeParams: [1.5, 0.5]
    }
    this._scene.tweens.add({
      targets: this._componentBorderCircle,
      props: {
        scaleY: {
          value: this._componentBorderCircle.scaleY + scaleY,
          ...config
        },
        y: {
          value: -offsetY,
          ...config
        },
        scaleX: {
          value: this._componentBorderCircle.scaleX + scaleX,
          ...configHorizontal
        },
        x: {
          value: -offsetX,
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

  get componentBorderCircle(): Phaser.GameObjects.Container {
    return this._componentBorderCircle
  }

  get borderCircle(): Phaser.GameObjects.Image {
    return this._borderCircle
  }

  get textBadge(): Phaser.GameObjects.Text {
    return this._textBadge
  }

  /**
   * handle when hover
   */
  pointerOver(): void {
    this._scene.tweens.add({
      targets: this,
      scaleY: 1 + CircleButtonComponent.SCALE_ANIMATION,
      duration: 100,
      repeat: 0,
      yoyo: false
    })
    this._scene.tweens.add({
      targets: this,
      scaleX: 1 + CircleButtonComponent.SCALE_ANIMATION,
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
      scaleY: 1,
      duration: 100,
      repeat: 0,
      yoyo: false
    })
    this._scene.tweens.add({
      targets: this,
      scaleX: 1,
      duration: 1000,
      ease: 'Elastic.easeOut',
      easeParams: [1.5, 0.5]
    })
  }
}
