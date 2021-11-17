import Phaser from 'phaser'
import { ICircleButton } from '../scripts/components/circleButtonComponent'

export const getSize = (con: Phaser.GameObjects.Container, game: Phaser.Game): { w: number; h: number } => {
  //set the top position to the bottom of the game
  let top: number = Number(game.config.height)
  let bottom: number = 0
  //set the left to the right of the game
  let left: number = Number(game.config.width)
  let right: number = 0
  //
  //
  //loop through the children
  //
  con.iterate(
    function (child) {
      //get the positions of the child
      const childX = child.x
      const childY = child.y
      //
      //
      //
      const childW = child.displayWidth
      const childH = child.displayHeight
      //
      //
      //calculate the child position
      //based on the origin
      //
      //
      const childTop = childY - childH * child.originY
      const childBottom = childY + childH * (1 - child.originY)
      const childLeft = childX - childW * child.originX
      const childRight = childX + childW * (1 - child.originY)
      //test the positions against
      //top, bottom, left and right
      //
      if (childBottom > bottom) {
        bottom = childBottom
      }
      if (childTop < top) {
        top = childTop
      }
      if (childLeft < left) {
        left = childLeft
      }
      if (childRight > right) {
        right = childRight
      }
    }.bind(this)
  )
  //
  //calculate the square
  const h = Math.abs(top - bottom)
  const w = Math.abs(right - left)
  return {
    w,
    h
  }
}

export const isICircleButton = (data: any): data is ICircleButton =>
  data.hasOwnProperty('game') &&
  data.hasOwnProperty('x') &&
  data.hasOwnProperty('y') &&
  data.hasOwnProperty('circleButton') &&
  data.hasOwnProperty('icon')

export const getScaleBasedOnImage = (
  obj: Phaser.GameObjects.Image,
  target: Phaser.GameObjects.Image,
  scaleComparedToCircle: number = 1
): { x: number; y: number } => {
  const widthTarget: number = target.width * target.scaleX
  const heightTarget: number = target.height * target.scaleY
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
