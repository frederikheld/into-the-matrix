import { createSymbol, type Symbol } from './Symbol'
import type { MatrixOptions, MatrixState } from './Matrix'

/**
 * Trickle factory
 *
 * @param ctx
 * @param laneIndex
 * @returns
 */
export const createTrickle = (
  ctx: CanvasRenderingContext2D,
  laneIndex: number,
  options: MatrixOptions
): Trickle => {
  const symbols = new Set<Symbol>()
  let renderCycle: number = 0

  // const el = document.createElement('div')
  setup(laneIndex)
  // parentEl.appendChild(el)

  /* private */
  function setup(laneIndex: number): void {
    // el.id = `trickle-${laneIndex}`
    // el.classList.add('trickle')

    // el.style.left = `${laneIndex * options.symbolSize}px`

    const length = 5

    new Array(length).fill(0).forEach((_, index) => {
      symbols.add(createSymbol(ctx, index, laneIndex, options))
    })

    // render()
  }

  /* public */
  function teardown() {
    symbols.forEach((symbol) => {
      symbol.teardown()
      symbols.delete(symbol)
    })
    // el.remove()
  }

  /* public */
  function render(frameTime: number, state: MatrixState) {
    if (renderCycle * options.symbolSize < state.matrixHeight) {
      symbols.add(createSymbol(ctx, renderCycle, laneIndex, options))
    }
    symbols.forEach((symbol) => {
      // if (symbol.getIsDeleted()) {
      //   console.log('is deleted')
      //   symbols.delete(symbol)
      // } else {
      symbol.render(frameTime)
      // }
    })
    renderCycle++
    // console.log('renderCycle:', renderCycle, 'frameTime:', frameTime)
  }

  /**
   * For some reason this OOP approach does not
   * allow to read member variables directly.
   *
   * It alway returns the inital value 0.
   *
   * Getters work though. so we use these.
   */
  function getRenderCycle(): number {
    return renderCycle
  }

  /**
   * Directly accessing `el` is possible but I
   * suspect that it alwas has the inital value
   * as well, so better use a getter here as well.
   */
  // function getEl(): HTMLDivElement {
  //   return el
  // }

  return {
    getRenderCycle,
    teardown,
    render
  }
}

export interface Trickle {
  getRenderCycle: () => number
  teardown: () => void
  render: (frameTime: number, state: MatrixState) => void
}
