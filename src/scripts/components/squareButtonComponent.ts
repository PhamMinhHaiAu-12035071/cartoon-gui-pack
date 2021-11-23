import Phaser from 'phaser'
import { IconWhiteSvg, SquareButtonSvg } from '../../types/shared-typed'
import { getScaleBasedOnImage } from '../../utils'

export interface ISquareButton {
  x: number
  y: number
  squareButton: SquareButtonSvg
  scaleSquareButton?: number
  icon: IconWhiteSvg
}

export default class SquareButtonComponent extends Phaser.GameObjects.Container {
  public static readonly SCALE_ANIMATION: number = 0.18

  private _scene: Phaser.Scene
  private _square: Phaser.GameObjects.Image
  private _shadowSquare: Phaser.GameObjects.Image
  private _icon: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Array<Phaser.GameObjects.GameObject>) {
    super(scene, x, y, children)
    this._scene = scene
    // add container into scene
    scene.add.existing(this)
  }

  setSquareWrapper(texture: SquareButtonSvg, scale: number = 1): Phaser.GameObjects.Image {
    this._square = this._scene.add.image(0, 0, texture).setInteractive({ cursor: 'pointer' }).setScale(scale)
    this._setShadowSquareWrapper()
    this.add(this._square)
    this._createEvent()
    return this._square
  }

  private _setShadowSquareWrapper(): Phaser.GameObjects.Image {
    const OFFSET: number = 0.05
    const offsetY: number = this._square.height * this._square.scaleY * OFFSET
    this._shadowSquare = this._scene.add.image(0, offsetY, SquareButtonSvg.SHADOW)
    const { x, y } = getScaleBasedOnImage(this._shadowSquare, this._square)
    this._shadowSquare.setScale(x, y)
    this.add(this._shadowSquare)
    return this._shadowSquare
  }

  private _createEvent() {
    this._square.on('pointerover', this._pointerOver.bind(this))
    this._square.on('pointerout', this._pointerOut.bind(this))
    this._square.on('pointerdown', this._pointerDown.bind(this))
  }

  setIcon(texture: IconWhiteSvg, scaleComparedToCircle: number = 0.4): Phaser.GameObjects.Image {
    if (!this._square) {
      throw new Error('please provide square image wrapper')
    }
    this._icon = this._scene.add.image(0, 0, texture)
    const { x, y } = getScaleBasedOnImage(this._icon, this._square, scaleComparedToCircle)
    this._icon.setScale(Math.min(x, y))
    // default set origin
    this._icon.setOrigin(0.5, 0.5)
    this.add(this._icon)
    return this._icon
  }

  /**
   * handle when hover square button
   */
  private _pointerOver() {
    this._scene.tweens.add({
      targets: this,
      props: {
        scaleY: {
          value: 1 + SquareButtonComponent.SCALE_ANIMATION,
          duration: 100,
          repeat: 0,
          yoyo: false
        },
        scaleX: {
          value: 1 + SquareButtonComponent.SCALE_ANIMATION,
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
   * handle when hover out square button
   */
  private _pointerOut() {
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
      scaleY: 1 + SquareButtonComponent.SCALE_ANIMATION - 0.25,
      scaleX: 1 + SquareButtonComponent.SCALE_ANIMATION + 0.1,
      duration: 350,
      repeat: 0,
      yoyo: false
    })
    this._scene.tweens.add({
      targets: this,
      scaleY: 1 + SquareButtonComponent.SCALE_ANIMATION,
      scaleX: 1 + SquareButtonComponent.SCALE_ANIMATION,
      delay: 350,
      duration: 950,
      repeat: 0,
      yoyo: false,
      ease: 'Elastic.easeOut',
      easeParams: [3.5, 0.65]
    })
  }
}
