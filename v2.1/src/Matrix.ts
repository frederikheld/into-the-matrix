import { createTrickle, type Trickle } from './Trickle'

export const createMatrix = (
  parentEl: HTMLDivElement,
  options: MatrixOptions = {
    newTrickleProbability: 0.1,
    changeSymbolProbability: 0.05,
    symbolSize: 24,
    fadeOutDuration: 3
  }
): Matrix => {
  // element properties:
  let matrixWidth = -1
  let matrixHeight = -1
  let lanesCount = 0

  // rendering settings:
  const maxFps: number = options.maxFps || 60
  const minFrameTime: number = 1000 / maxFps

  // rendering mechanics:
  let isRunning: boolean = false
  let previousStartTime: number = window.performance.now()
  let currentFrameDuration: number = 1 // time since the previously rendered frame

  // statistics:
  let previousFrameTime: number = 0 // length of the previously rendered frame
  const previousFrameTimes: number[] = [] // a list of previous frame times

  const trickles = new Set<Trickle>()

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  parentEl.appendChild(canvas)
  resize()
  setup()

  /**
   * Private function.
   *
   * Scaffolds of the Matrix object, its html representation and
   * its children.
   *
   * Will only be called once when the object is being created, so
   * put all the heavy lifting here!
   */
  function setup(): void {
    canvas.classList.add('matrix')

    ctx.font = `${options.symbolSize}px monospaced rgba(42, 255, 42)`
    ctx.textAlign = 'center'

    // new Array(lanesCount).fill(0).forEach((_, index) => {
    //   trickles.add(createTrickle(el, index, options))
    // })
  }

  /**
   * Public function
   *
   * Call without parameters to render immediately.
   *
   * Parameter `frameTime` can be used in combination with
   * `requestAnimationFrame` to only render if the frame time
   * for `maxFps` that is defined in `MatrixOptions` has elapsed.
   *
   * To start an ongoing animation, use `start()`!
   *
   * @param frameTime
   */
  function render(frameTime: number = 0): void {
    currentFrameDuration = frameTime ? frameTime - previousStartTime : 0

    if (!frameTime || currentFrameDuration >= minFrameTime) {
      // el.style.display = 'none'

      // for statistics:
      previousFrameTime = currentFrameDuration
      addToStack(previousFrameTimes, previousFrameTime, 10)

      // for rendering mechanics:
      previousStartTime = frameTime

      // remove out of bottom bounds trickles:
      trickles.forEach((trickle) => {
        if (trickle.getRenderCycle() * options.symbolSize > matrixHeight) {
          trickle.teardown()
          trickles.delete(trickle)
        }
      })

      // add new trickles:
      new Array(lanesCount).fill(0).forEach((_, index) => {
        if (Math.random() < options.newTrickleProbability) {
          trickles.add(createTrickle(ctx, index, options))
        }
      })

      // render all trickles:
      const matrixState: MatrixState = {
        matrixWidth,
        matrixHeight
      }
      trickles.forEach((trickle) => trickle.render(frameTime, matrixState))

      // el.style.display = 'flex'
    }

    if (isRunning) {
      requestAnimationFrame(render)
    }
  }

  /* public */
  function getStats(): RenderStats {
    const averageFrameTime = calculateAverage(previousFrameTimes)
    return {
      trickleCount: trickles.size,
      childrenCount: canvas.children.length,
      maxFps,
      minFrameTime,
      fps: previousFrameTime > 0 ? 1000 / previousFrameTime : 0,
      frameTime: previousFrameTime,
      averageFrameTime,
      averageFps: averageFrameTime > 0 ? 1000 / averageFrameTime : 0
    }
  }

  /* public */
  function start(): void {
    isRunning = true

    requestAnimationFrame(render)
  }

  /* public */
  function stop(): void {
    isRunning = false
  }

  /* public */
  function resize(): void {
    matrixWidth = parentEl.clientWidth
    matrixHeight = parentEl.clientHeight
    lanesCount = Math.floor(matrixWidth / options.symbolSize)
  }

  return {
    el: canvas,
    render,
    start,
    stop,
    resize,
    getStats
  }
}

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

function calculateAverage(array: number[]): number {
  return array.reduce((acc, curr) => (acc += curr), 0) / array.length || 0
}

export interface Matrix {
  el: HTMLDivElement
  render: (frameTime: number) => void
  start: () => void
  stop: () => void
  resize: () => void
  getStats: () => RenderStats
}

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

export interface MatrixState {
  matrixWidth: number
  matrixHeight: number
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
