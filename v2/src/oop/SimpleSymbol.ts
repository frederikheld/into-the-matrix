import {convertToCssString} from './utils'

export class SimpleSymbol {
  private parentEl: HTMLDivElement // shadow host
  private el: HTMLDivElement
  private shadowRoot: ShadowRoot

  constructor(parentEl: HTMLDivElement, index: number) {
    this.parentEl = parentEl

    this.rotation = index

    const rootEl = document.createElement("div")
    this.shadowRoot = rootEl.attachShadow({mode:'open'})
    this.el = this.setup(index)
    this.shadowRoot.appendChild(this.el)

    this.parentEl.appendChild(this.shadowRoot)
  }

  private rotation: number = 0

  public render() {
    this.rotation += 15 // this depends on fps!
    this.el.style.transform = `rotate3d(0, 0, 1, ${this.rotation}deg)`
  }

  /**
   * Creates and styles the element that represents
   * the symbol.
   */
  private setup (index: number): HTMLDivElement {
    const symbolEl = document.createElement("div")

    symbolEl.id = `symbol-${index}`
    symbolEl.classList.add('symbol')

    symbolEl.setAttribute('style', convertToCssString({
      all: 'unset',
      width: '16px',
      height: '16px',
      'border-radius': '50%',
      background: 'conic-gradient(from 0deg, red 0deg, red 30deg, blue 30deg, blue 360deg)',
      transform: `rotate3d(0, 0, 1, ${this.rotation}deg)`,
      'will-change': 'transform'
    }))

    return symbolEl
  }
}

// function getRandomChar(): string {
//   const chars = ['?', 'x', '#', '!']
//   const index = Math.floor(Math.random() * chars.length)
//   return chars[index]
// }

// function getRandomColorValue() {
//   return Math.floor(Math.random() * 256)
// }
