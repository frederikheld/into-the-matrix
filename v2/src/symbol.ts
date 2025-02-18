import '../src/styles.css'

function getRandomColorValue() {
  return Math.floor(Math.random() * 256)
}

export class Symbol {
  private el: HTMLDivElement

  constructor(parentEl: HTMLDivElement) {
    this.el = this.setup()

    parentEl.appendChild(this.el)
  }

  private setup() {
    const el = document.createElement("div");
    el.className = "symbol"
    el.style.display = 'block'
    el.style.width = '4px'
    el.style.height = '4px'
    el.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
    return el
  }
  
  public render() {
    this.el.style.backgroundColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
  }
}