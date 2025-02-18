import { SimpleSymbol } from "./SimpleSymbol"

export class SimpleMatrix {
  private el: HTMLDivElement
  private parentEl: HTMLDivElement

  private symbols: SimpleSymbol[] = []

  constructor(parentEl: HTMLDivElement) {
    this.parentEl = parentEl

    this.el = this.setup(10)

    this.parentEl.appendChild(this.el)
  }

  private setup (length: number): HTMLDivElement {
    const el = document.createElement("div")

    new Array(length).fill(0).forEach((_, index) => {
      this.symbols.push(new SimpleSymbol(el, index))
    })

    return el
  }

  public start(): void {
    console.log('START!')
  }

  public stop(): void {
    console.log('STOP!')
  }
}