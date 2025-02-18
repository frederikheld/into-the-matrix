import { SimpleSymbol } from "./SimpleSymbol"

export class SimpleMatrix {
  private parentEl: HTMLDivElement
  private el: HTMLDivElement
  private shadowRoot: ShadowRoot

  private symbols: SimpleSymbol[] = []

  private isRunning: boolean = false

  constructor(parentEl: HTMLDivElement) {
    this.parentEl = parentEl

    this.el = document.createElement("div")
    this.shadowRoot = this.el.attachShadow({mode:'open'})
    this.shadowRoot.appendChild(this.setup(10))

    this.parentEl.appendChild(this.shadowRoot)
  }

  private setup (length: number): HTMLDivElement {
    const el = document.createElement("div")

    new Array(length).fill(0).forEach((_, index) => {
      this.symbols.push(new SimpleSymbol(el, index))
    })

    return el
  }

  public render() {
    this.symbols.forEach((symbol)=> symbol.render())

    if (this.isRunning) {
      setTimeout(() => {
        this.render()
      }, 100)
    }
  }

  public start(): void {
    console.log('START!')
    this.isRunning = true

    this.render()
  }

  public stop(): void {
    console.log('STOP!')
    this.isRunning = false
  }
}