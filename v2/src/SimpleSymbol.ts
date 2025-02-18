import {convertToCssString} from './utils'

export class SimpleSymbol {
  private parentEl: HTMLDivElement // shadow host
  private el: HTMLDivElement
  private shadowRoot: ShadowRoot

  constructor(parentEl: HTMLDivElement, index: number) {
    this.parentEl = parentEl

    this.rotation = index

    this.el = document.createElement("div")
    this.shadowRoot = this.el.attachShadow({mode:'open'})
    this.setup(index)
    this.shadowRoot.appendChild(this.el)

    this.parentEl.appendChild(this.shadowRoot)
  }

  // private rotation: number = Math.random() * 360
  private rotation: number = 0

  public render() {
    // this.el.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
    // this.el.style.transform = `rotate3d(0, 0, 1, ${Math.random() * 360}deg)`
    // this.el.style.transform = `rotate(${Math.random() * 360}deg)`
    this.rotation += 15 // this depends on fps!
    this.el.style.transform = `rotate3d(0, 0, 1, ${this.rotation}deg)`
    // this.el.style.transform = `rotate(${this.rotation}deg)`
  }

  private setup (index: number): void {
    this.el = document.createElement("div")

    this.el.id = `symbol-${index}`
    this.el.classList.add('symbol')

    this.el.setAttribute('style', convertToCssString({
      all: 'unset',
      width: '16px',
      height: '16px',
      'border-radius': '50%',
      background: 'conic-gradient(from 0deg, red 0deg, red 30deg, blue 30deg, blue 360deg)',
      // transform: 'rotate3d(0, 0, 1, -15deg)'
      // transform: 'rotate(-15deg)',
      transform: `rotate3d(0, 0, 1, ${this.rotation}deg)`,
      // transform: `rotate(${this.rotation}deg)`,
      'will-change': 'transform'
    }))

    // this.el.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`

  }
}

// function getRandomChar(): string {
//   const chars = ['?', 'x', '#', '!']
//   const index = Math.floor(Math.random() * chars.length)
//   return chars[index]
// }

function getRandomColorValue() {
  return Math.floor(Math.random() * 256)
}

