import { CircleButtonSvg, IconWhiteSvg } from '../../types/shared-typed'
import * as Phaser from 'phaser'
import { getScaleBasedOnImage } from '../../utils'

export interface ICircleButton {
  game: Phaser.Game
  x: number
  y: number
  circleButton: CircleButtonSvg
  scaleCircleButton?: number
  icon: IconWhiteSvg
  circleBadge?: CircleButtonSvg
  badge?: number
}

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

  private _createEvent() {
    this._circle.on('pointerover', this._pointerOver.bind(this))
    this._circle.on('pointerout', this._pointerOut.bind(this))
    this._circle.on('pointerdown', this._pointerDown.bind(this))
  }

  setCircleWrapper(texture: CircleButtonSvg, scale: number = 1): Phaser.GameObjects.Image {
    this._circle = this._scene.add.image(0, 0, texture).setInteractive({ cursor: 'pointer' }).setScale(scale)
    this._setShadowCircleWrapper()
    this.add(this._circle)
    this._createEvent()
    return this._circle
  }

  private _setShadowCircleWrapper(): Phaser.GameObjects.Image {
    const OFFSET: number = 0.05
    const offsetX: number = this._circle.width * this._circle.scaleX * OFFSET
    const offsetY: number = this._circle.height * this._circle.scaleY * OFFSET
    this._shadowCircle = this._scene.add.image(-offsetX, offsetY, CircleButtonSvg.SHADOW)
    const { x, y } = getScaleBasedOnImage(this._shadowCircle, this._circle)
    this._shadowCircle.setScale(x, y)
    this.add(this._shadowCircle)
    return this._shadowCircle
  }

  setIcon(texture: IconWhiteSvg, scaleComparedToCircle: number = 0.4): Phaser.GameObjects.Image {
    if (!this._circle) {
      throw new Error('please provide circle image wrapper')
    }
    this._icon = this._scene.add.image(0, 0, texture)
    const { x, y } = getScaleBasedOnImage(this._icon, this._circle, scaleComparedToCircle)
    this._icon.setScale(Math.min(x, y))
    // default set origin
    this._icon.setOrigin(0.5, 0.5)
    this.add(this._icon)
    return this._icon
  }

  setBorderCircle(texture: CircleButtonSvg, scaleComparedToCircle = 0.4): Phaser.GameObjects.Image {
    if (!this._circle) {
      throw new Error('please provide circle image wrapper')
    }
    this._borderCircle = this._scene.add.image(0, 0, texture)
    this._componentBorderCircle = this._scene.add.container(this._borderCircle.x, this._borderCircle.y)
    const { x, y } = getScaleBasedOnImage(this._borderCircle, this._circle, scaleComparedToCircle)
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
    this._shadowBorderCircle = this._scene.add.image(0, 0, CircleButtonSvg.SHADOW_BORDER)
    const { x, y } = getScaleBasedOnImage(this._shadowBorderCircle, this._circle, scaleComparedToCircle)
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
    const FONT_SIZE: number = minSizeBorderCircle * 0.5
    this._textBadge = this._scene.add
      .text(0, 0, badge.toString())
      .setFontFamily('LilitaOne')
      .setFontSize(FONT_SIZE)
      .setColor('#ffffff')
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
    const offsetX: number = width * scaleX * 0.52
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
  private _pointerOver(): void {
    this._scene.tweens.add({
      targets: this,
      props: {
        scaleY: {
          value: 1 + CircleButtonComponent.SCALE_ANIMATION,
          duration: 100,
          repeat: 0,
          yoyo: false
        },
        scaleX: {
          value: 1 + CircleButtonComponent.SCALE_ANIMATION,
          duration: 1000,
          ease: 'Elastic.easeOut',
          easeParams: [1.5, 0.5],
          repeat: 0,
          yoyo: false
        }
      }
    })
  }

  /**
   * handle when hover out
   */
  private _pointerOut(): void {
    this._scene.tweens.add({
      targets: this,
      props: {
        scaleY: {
          value: 1,
          duration: 100,
          repeat: 0,
          yoyo: false
        },
        scaleX: {
          value: 1,
          duration: 1000,
          ease: 'Elastic.easeOut',
          easeParams: [1.5, 0.5],
          repeat: 0,
          yoyo: false
        }
      }
    })
  }

  /**
   * handle when clicked
   */
  private _pointerDown(): void {
    this._scene.tweens.add({
      targets: this,
      scaleY: 1 + CircleButtonComponent.SCALE_ANIMATION - 0.25,
      scaleX: 1 + CircleButtonComponent.SCALE_ANIMATION + 0.1,
      duration: 350,
      repeat: 0,
      yoyo: false
    })
    this._scene.tweens.add({
      targets: this,
      scaleY: 1 + CircleButtonComponent.SCALE_ANIMATION,
      scaleX: 1 + CircleButtonComponent.SCALE_ANIMATION,
      delay: 350,
      duration: 950,
      repeat: 0,
      yoyo: false,
      ease: 'Elastic.easeOut',
      easeParams: [3.5, 0.65]
    })
  }
}
