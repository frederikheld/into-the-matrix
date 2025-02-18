
export class CustomSymbolElement extends HTMLDivElement {
  constructor(index: number) {
    super()

    this.setup(index)
  }

  private setup(index: number) {
    this.className = "symbol"
    this.id= `symbol-${index}`

    this.style.display = 'block'
    this.style.width = '4px'
    this.style.height = '4px'
    this.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
  }

  static getElement() {
    return document.createElement('div', { is: 'custom-symbol' }) as CustomSymbolElement
  }
}

customElements.define("custom-symbol", CustomSymbolElement, { extends: 'div'})

function getRandomColorValue() {
  return Math.floor(Math.random() * 256)
}