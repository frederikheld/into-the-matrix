export class SimpleSymbol {
  private el: HTMLDivElement
  private parentEl: HTMLDivElement

  constructor(parentEl: HTMLDivElement, index: number) {
    this.parentEl = parentEl

    this.el = this.setup(index)

    this.parentEl.appendChild(this.el)
  }

  private setup (index: number): HTMLDivElement {
    console.log(`Creating SimpleSymbol ${index}`)
    const el = document.createElement("div")

    el.id = `symbol-${index}`
    el.classList.add('symbol')
    el.innerText = '?'

    return el
  }
}