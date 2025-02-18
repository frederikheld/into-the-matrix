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
    const newChar = getRandomChar()
    console.log("  ", newChar)
    this.el.innerHTML = newChar
  }

  private setup (index: number): void {
    this.el = document.createElement("div")

    this.el.id = `symbol-${index}`
    this.el.classList.add('symbol')

    this.el.style.display = "inline-block"
    this.el.style.width = '16px'

    this.el.innerHTML = '?'

  }
}

function getRandomChar(): string {
  const chars = ['?', 'x', '#', '!']
  const index = Math.floor(Math.random() * chars.length)
  return chars[index]
}