import { Trickle } from './Trickle'

export class Matrix {
  private parentEl: HTMLElement
  private options: MatrixOptions

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  private trickles: Trickle[] = []

  private posX: number = 0
  private posY: number = 0
  private width: number = 0
  private height: number = 0

  private renderDimensions: RenderDimensions = {
    scale: 0,
    columnCount: 0,
    rowsCount: 0
  }

  // rendering settings:
  private maxFps: number = 60
  private minFrameTime: number = 0

  // rendering mechanics:
  private isRunning: boolean = false
  private previousStartTime: number = window.performance.now()
  private currentFrameDuration: number = 1 // time since the previously rendered frame

  // statistics:
  private previousFrameTime: number = 0 // length of the previously rendered frame
  private previousFrameTimes: number[] = [] // a list of previous frame times

  constructor(parentEl: HTMLElement, options: MatrixOptions) {
    // process parameters:
    this.parentEl = parentEl
    this.options = options
    this.maxFps = this.options.maxFps || 60
    this.minFrameTime = 1000 / this.maxFps

    // create canvas:
    this.canvas = document.createElement('canvas')
    this.parentEl.appendChild(this.canvas)

    // get render context:
    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get render context')
    this.ctx = ctx

    this.resize()
  }

  /// METHODS ///

  public resize(): void {
    console.log('RESIZE')

    this.canvas.width = this.parentEl.clientWidth
    this.canvas.height = this.parentEl.clientHeight

    this.width = this.canvas.width
    this.height = this.canvas.height

    // update render dimensions:
    this.renderDimensions.scale = Math.min(
      this.width / this.canvas.width,
      this.height / this.canvas.height
    )
    this.renderDimensions.columnCount = Math.floor(this.width / this.options.symbolSize)
    this.renderDimensions.rowsCount = Math.floor(this.height / this.options.symbolSize)

    this.canvas.style.width = `${Math.round(this.renderDimensions.scale * this.canvas.width)}px`
    this.canvas.style.height = `${Math.round(this.renderDimensions.scale * this.canvas.height)}px`

    if (this.renderDimensions.columnCount < this.trickles.length) {
      // remove trickles it too many:
      this.trickles.length = this.renderDimensions.columnCount
      // TODO: make sure that the object isn't referenced elsewhere,
      //       otherwise we have a memory leak here!
    } else if (this.renderDimensions.columnCount > this.trickles.length) {
      // add trickles if too little:
      const currentCount = this.trickles.length
      new Array(this.renderDimensions.columnCount - this.trickles.length)
        .fill(0)
        .forEach((_, columnIndex) => {
          this.trickles.push(new Trickle(this.canvas, columnIndex + currentCount, this.options))
        })
    }

    this.trickles.forEach((trickle) => trickle.resize(this.renderDimensions))

    this.render()
  }

  public render(frameTime: number = 0): void {
    this.currentFrameDuration = frameTime ? frameTime - this.previousStartTime : 0

    if (!frameTime || this.currentFrameDuration >= this.minFrameTime) {
      // for statistics:
      this.previousFrameTime = this.currentFrameDuration
      addToStack(this.previousFrameTimes, this.previousFrameTime, 10)

      // for rendering mechanics:
      this.previousStartTime = frameTime

      // this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.fillStyle = '#000'
      this.ctx.fillRect(0, 0, this.width, this.height)

      // this.ctx.fillStyle = 'rebeccapurple'
      // this.ctx.fillRect(0 + 24, 0 + 24, this.width - 48, this.height - 48)

      this.trickles.forEach((trickle) => {
        trickle.render()
      })
    }

    if (this.isRunning) {
      requestAnimationFrame((frameTime) => this.render(frameTime))
    }
  }

  public start(): void {
    this.previousFrameTimes.length = 0
    this.isRunning = true

    console.log(this.previousFrameTimes)
    requestAnimationFrame((frameTime) => this.render(frameTime))
  }

  public stop(): void {
    this.isRunning = false
  }

  public getStats(): RenderStats {
    const averageFrameTime = calculateAverage(this.previousFrameTimes)
    return {
      trickleCount: this.trickles.length,
      childrenCount: this.canvas.children.length,
      maxFps: this.maxFps,
      minFrameTime: this.minFrameTime,
      fps: this.previousFrameTime > 0 ? 1000 / this.previousFrameTime : 0,
      frameTime: this.previousFrameTime,
      averageFrameTime,
      averageFps: averageFrameTime > 0 ? 1000 / averageFrameTime : 0
    }
  }
}

/// FUNCTIONS ///

/**
 * Adds the `item` to the `stack`. If the stack would become
 * longer than `length`, the oldest element is being removed
 * before the new `item` is being added.
 *
 * The manipulation of the `stack` happens in place (in-out).
 *
 * @param stack in-out
 * @param item
 * @param length
 */
function addToStack(stack: unknown[], item: unknown, length: number) {
  if (stack.length < length) {
    stack.push(item)
  } else {
    stack.shift()
    stack.push(item)
  }
}

/**
 * Returns the arithmetic mean value of an array of numbers.
 *
 * @param array
 * @returns
 */
function calculateAverage(array: number[]): number {
  return array.reduce((acc, curr) => (acc += curr), 0) / array.length || 0
}

/// TYPES ///

export interface MatrixOptions {
  /**
   * FPS limit.
   *
   * This is not an actual FPS limit for
   * the browser but a limit of cycles
   * per seconds. CSS transitions like
   * the fade out will render faster if
   * the browser can do it.
   */
  maxFps?: number
  /**
   * The probability that a new trickle
   * will be spawned in a column in a
   * render cycle.
   */
  newTrickleProbability: number
  /**
   * Prbability that a symbol changes
   * its character in a render cycle.
   */
  changeSymbolProbability: number
  /**
   * Size of symbols in px.
   * Symbols are square, so this defines
   * width as well as height.
   */
  symbolSize: number
  /**
   * Time it takes in seconds for a
   * symbol to fade out.
   */
  fadeOutDuration: number
}

export interface RenderStats {
  /**
   * Number of trickles in the matrix.
   */
  trickleCount: number
  /**
   * Number of child nodes of this element.
   *
   * If this is not exactly the same as
   * `trickleCount`, something is broken.
   */
  childrenCount: number
  /**
   * The configured max fps.
   */
  maxFps: number
  /**
   * The min render duration per frame that is
   * required to reach the configured max fps.
   */
  minFrameTime: number
  /**
   * The acutal fps.
   */
  fps: number
  /**
   * The actual render duration per frame.
   */
  frameTime: number
  /**
   * Averate frame time over the previous
   * 10 frames.
   */
  averageFrameTime: number
  /**
   * Average fps over the previous 10 frames.
   */
  averageFps: number
}

export interface RenderDimensions {
  scale: number
  columnCount: number
  rowsCount: number
}
