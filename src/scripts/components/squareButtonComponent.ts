import Phaser from 'phaser'
import { SquareButton } from '../../types/shared-typed'

export interface ISquareButton {
  game: Phaser.Game
  x: number
  y: number
}

export default class SquareButtonComponent extends Phaser.GameObjects.Container {
  public static readonly SCALE_ANIMATION: number = 0.18

  private _scene: Phaser.Scene
  private _square: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Array<Phaser.GameObjects.GameObject>) {
    super(scene, x, y, children)
    this._scene = scene
    // add container into scene
    scene.add.existing(this)
  }

  setSquareWrapper(texture: SquareButton, scale: number = 1): Phaser.GameObjects.Image {
    this._square = this._scene.add.image(0, 0, texture).setInteractive({ cursor: 'pointer' })
    this._square.setScale(scale)
    this._square.setInteractive({ cursor: 'pointer' })
    this.add(this._square)
    this._createEvent()
    return this._square
  }

  private _createEvent() {
    this._square.on('pointerover', this._pointerOver.bind(this))
    this._square.on('pointerout', this._pointerOut.bind(this))
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
}
