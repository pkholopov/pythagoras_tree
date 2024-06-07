import { generator } from './generator.js'
import { Turtle } from './turtle.js'

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const isInstantDraw = true

window.onload = () => {

    //create and setup canvas

    const cnv = document.createElement('canvas')
    const ctx = cnv.getContext('2d')
    let w = cnv.width = innerWidth
    let h = cnv.height = innerHeight

    window.addEventListener('resize', () => {
        w = cnv.width = innerWidth
        h = cnv.height = innerHeight
    })

    //add canvas to page

    document.querySelector('body').appendChild(cnv)

    let turtle = new Turtle(cnv, w / 2, h - 50, -90)

    const begin = '2222220'
    const dictonary = {
        '1' : '21',
        '0' : '1[0]0',
        '[' : '[',
        ']' : ']',
        '2' : '2'
    }

    let dictStr = generator(begin, dictonary, 12)

    console.log(dictStr)

    function getRandom (min, max) {
        return max - Math.floor(Math.random() * (max - min + 1))
    }

    async function drawTree(dictonaryString, turtle, length, lengthFactor, angle, angleFactor, width) {
        turtle.lineWidth(width)
        turtle.lineColor('#382e13')
        let stack = []
        for (let i = 0; i < dictonaryString.length; i++) {
          if (!isInstantDraw) await pause(1)
          if (dictonaryString[i] === '1' || dictonaryString[i] === '2') {
              turtle.right(getRandom(-6, 6))
              turtle.drawLine(length + getRandom(-lengthFactor, lengthFactor))
          } else if (dictonaryString[i] === '0') {
              turtle.lineWidth(width + 3)
              turtle.lineColor('#33cc11')
              turtle.drawLine(length * 0.5)
              turtle.lineColor('#382e13')
              turtle.lineWidth(width)
          } else if (dictonaryString[i] === '[') {
              width *= 0.75
              turtle.lineWidth(width)
              stack.push({x:turtle.x, y:turtle.y, angle:turtle.angle, width:turtle.width})
              turtle.left(angle + getRandom(-angleFactor, angleFactor))
          } else if (dictonaryString[i] === ']') {
              let buffer = stack.pop()
              turtle.x = buffer.x
              turtle.y = buffer.y
              turtle.angle = buffer.angle
              width = buffer.width
              turtle.lineWidth(width)
              turtle.right(angle + getRandom(-angleFactor, angleFactor))
          }
        }
    }

    drawTree(
        dictStr, // словарь
        turtle,  // "черепаха"
        10,      // базовая длина сегмента
        7,       // разброс длины сегмента
        20,      // угол ветвления
        12,      // разброс угла
        16       // стартовая ширина
        )

}
