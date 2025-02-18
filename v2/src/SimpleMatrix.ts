import {convertToCssString} from './utils'
import { SimpleSymbol } from "./SimpleSymbol"

export interface SimpleMatrixOptions {
  maxFps?: number
}

export class SimpleMatrix {
  private parentEl: HTMLDivElement
  private el: HTMLDivElement
  private shadowRoot: ShadowRoot

  private options: SimpleMatrixOptions = {}

  private symbols: SimpleSymbol[] = []

  private isRunning: boolean = false

  constructor(parentEl: HTMLDivElement, count: number, options: SimpleMatrixOptions = {}) {
    // process arguments:
    this.parentEl = parentEl
    this.options = options

    // rendering settings:
    this.maxFps = this.options.maxFps || 60
    this.minFrameTime = 1000 / this.maxFps

    // set up element and shadow dom:
    this.el = document.createElement("div")
    this.shadowRoot = this.el.attachShadow({ mode:'open' })
    this.setup(count)
    this.shadowRoot.appendChild(this.el)

    this.parentEl.appendChild(this.shadowRoot)
  }

  private setup (length: number): void {
    this.el = document.createElement("div")

    this.el.setAttribute('style', convertToCssString({
      display: 'flex',
      'flex-direction': 'row',
      'flex-wrap': 'wrap'
    }))

    new Array(length).fill(0).forEach((_, index) => {
      this.symbols.push(new SimpleSymbol(this.el, index))
    })
  }

  // rendering mechanics:
  private maxFps: number
  private previousStartTime: number = performance.now()
  private minFrameTime: number
  private currentFrameDuration: number = 1 // time since the previously rendered frame

  // statistics:
  private previousFrameTime: number = 0 // length of the previously rendered frame

  public render (currentTime: number = performance.now()) {
    this.currentFrameDuration = currentTime - this.previousStartTime

    if (this.currentFrameDuration >= this.minFrameTime) {
      this.previousFrameTime = this.currentFrameDuration // for satistics
      this.previousStartTime = currentTime // for rendering mechanic
      this.symbols.forEach((symbol)=> symbol.render())
    }

    if (this.isRunning) {
      requestAnimationFrame((animationTime) => this.render(animationTime))
    }
  }

  public getStats() {
    return {
      minFrameTime: this.minFrameTime,
      maxFps: this.maxFps,
      frameTime: this.previousFrameTime,
      fps: this.previousFrameTime > 0 ? 1000 / this.previousFrameTime : 0
    }
  }

  public start(): void {
    this.isRunning = true

    this.render()
  }

  public stop(): void {
    this.isRunning = false
    this.currentFrameDuration = 1
  }
}
