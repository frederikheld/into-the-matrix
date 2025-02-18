import '../src/styles.css'
import { Symbol } from "./symbol"

export class Trickle {
  private el: HTMLDivElement
  private parentEl: HTMLDivElement
  private shadowRoot: ShadowRoot
  private symbols: Symbol[] = []  

  constructor(parentEl: HTMLDivElement, length: number, colIndex: number) { 
    this.parentEl = parentEl
    this.shadowRoot = this.parentEl.attachShadow({mode:'open'})

    this.el = this.setup(length, colIndex)
  }

  private setup(length: number, index: number): HTMLDivElement {
    const el = document.createElement('div')
      el.className = "trickle"
      el.id = `trickle-${index}`

      el.style.display = "inline-block"
  
    new Array(length).fill(0).forEach((_, i) => {
      this.symbols.push(new Symbol(el))
    })
  
      return el
  }
  
  public render() {
    console.log(`attaching trickle "${this.el.id}" to DOM`)
    if (!this.el.contains(this.shadowRoot)) {
      this.shadowRoot.appendChild(this.el)
    }

    this.symbols.forEach((symbol) => {
      symbol.render()
    })
  }
}