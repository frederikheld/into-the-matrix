import './styles.css'
import { Trickle } from "./trickle";


export class Matrix {
  private el: HTMLDivElement
  private parentEl: HTMLDivElement
  private shadowRoot: ShadowRoot
  private trickles: Trickle[] = []

  private isRunning = false

  constructor(parentEl: HTMLDivElement, cols: number, rows: number) {
    this.parentEl = parentEl
    this.shadowRoot = this.parentEl.attachShadow({ mode: 'open' })

    this.el = this.setup(rows, cols)
  }

  private setup(rows : number, cols: number) {
    const el = document.createElement("div");
    el.className = "matrix";
  
    new Array(cols).fill(0).forEach((_, colIndex) => {
      this.trickles.push(new Trickle(el, rows, colIndex))
    })
    
    return el
  }

  public render(): void {
    if (!this.el.contains(this.shadowRoot)) {
      this.shadowRoot.appendChild(this.el)
    }
    // see: https://stackoverflow.com/a/53192876/10043870

    this.trickles.forEach((trickle) => {
      trickle.render()
    })

    if (this.isRunning) {
      requestAnimationFrame(() => this.render())
    }
  }

  public start():void {
    console.log('START!')

    if (!this.isRunning) {
      console.log('starting matrix')
      this.isRunning = true
      requestAnimationFrame(() => {
        this.render()
      })
    }
  }

  public stop(): void {
    console.log('STOP!')

    this.isRunning = false
  }
}