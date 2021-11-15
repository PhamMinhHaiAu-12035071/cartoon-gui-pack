import Phaser from 'phaser'
import { CircleButton } from '../../types/shared-typed'

export interface ISquareButton {
  game: Phaser.Game
  x: number
  y: number
}

export default class SquareButtonComponent extends Phaser.GameObjects.Container {
  private _scene: Phaser.Scene
  private _square: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Array<Phaser.GameObjects.GameObject>) {
    super(scene, x, y, children)
    this._scene = scene
    // add container into scene
    scene.add.existing(this)
  }

  setSquareWrapper(texture: CircleButton, scale: number = 1): Phaser.GameObjects.Image {
    this._square = this._scene.add.image(0, 0, texture).setInteractive({ cursor: 'pointer' }).setScale(scale)
    this.add(this._square)
    return this._square
  }
}
