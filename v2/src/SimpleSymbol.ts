import {convertToCssString} from './utils'

export class SimpleSymbol {
  private parentEl: HTMLDivElement // shadow host
  private el: HTMLDivElement
  private shadowRoot: ShadowRoot

  constructor(parentEl: HTMLDivElement, index: number) {
    this.parentEl = parentEl

    this.el = document.createElement("div")
    this.shadowRoot = this.el.attachShadow({mode:'open'})
    this.setup(index)
    this.shadowRoot.appendChild(this.el)

    this.parentEl.appendChild(this.shadowRoot)
  }

  public render(){
    this.el.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
  }

  private setup (index: number): void {
    this.el = document.createElement("div")

    this.el.id = `symbol-${index}`
    this.el.classList.add('symbol')

    this.el.setAttribute('style', convertToCssString({
      all: 'unset',
      width: '8px',
      height: '8px',
    }))

    console.log(this.el.style.width)

    this.el.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`

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

