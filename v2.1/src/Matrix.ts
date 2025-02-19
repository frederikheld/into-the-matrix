import { createSymbol, type Symbol } from './Symbol'

export const createMatrix = (parentEl: HTMLDivElement, length: number, options: MatrixOptions) => {
  const symbols = new Set<Symbol>()

  const el = document.createElement('div')
  setup(length, symbols)
  parentEl.appendChild(el)

  // rendering settings.
  const maxFps: number = options.maxFps || 60
  const minFrameTime: number = 1000 / maxFps

  // rendering mechanics:
  let isRunning: boolean = false
  let previousStartTime: number = performance.now()
  let currentFrameDuration: number = 1 // time since the previously rendered frame

  // statistics:
  let previousFrameTime: number = 0 // length of the previously rendered frame
  const previousFrameTimes: number[] = [] // a list of previous frame times

  /* private */
  function setup(length: number, symbols: Set<Symbol>): void {
    el.classList.add('matrix')

    new Array(length).fill(0).forEach((_, index) => {
      symbols.add(createSymbol(el, index))
    })
  }

  /* public */
  function render(currentTime: number = performance.now()): void {
    currentFrameDuration = currentTime - previousStartTime

    if (currentFrameDuration >= minFrameTime) {
      // for statistics:
      previousFrameTime = currentFrameDuration
      addToStack(previousFrameTimes, previousFrameTime, 10)

      // for rendering mechanics:
      previousStartTime = currentTime

      el.style.display = 'none'
      symbols.forEach((symbol) => symbol.render())
      el.style.display = 'flex'
    }

    if (isRunning) {
      requestAnimationFrame(render)
    }
  }

  /* public */
  function getStats(): RenderStats {
    const averageFrameTime = calculateAverage(previousFrameTimes)
    return {
      symbolCount: symbols.size,
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
    render()
  }

  /* public */
  function stop(): void {
    isRunning = false
  }

  return {
    el,
    render,
    start,
    stop,
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

export interface MatrixOptions {
  maxFps?: number
}

export interface RenderStats {
  /**
   * Number of symbols in the matrix.
   */
  symbolCount: number
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
