import { type MatrixOptions } from './Matrix'

/* prettier-ignore */
const allChars: string[] = [
  'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
  'A', 'B', 'C', 'D', 'E', 'F',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

/* private */
export const createSymbol = (
  ctx: CanvasRenderingContext2D,
  index: number,
  laneIndex: number,
  options: MatrixOptions
): Symbol => {
  let renderCycle = 0
  let isDeleted = false

  const posX = laneIndex * options.symbolSize
  const posY = renderCycle * renderCycle
  const width = options.symbolSize
  const height = options.symbolSize

  setup(index, laneIndex)

  /**
   * Private function.
   *
   * Scaffolds of the Symbol object and its html representation.
   *
   * Will only be called once when the object is being created, so
   * put all the heavy lifting here!
   *
   * @param index
   */
  function setup(index: number, laneIndex: number): void {
    // el.id = `symbol-${index}`
    // el.classList.add('symbol', 'leading')

    // el.style.left = `${laneIndex * options.symbolSize}px`
    // el.style.top = `${index * options.symbolSize}px`
    // el.style.width = `${options.symbolSize}px`
    // el.style.height = `${options.symbolSize}px`
    // el.style.fontSize = `${options.symbolSize}px`
    // el.style.lineHeight = `${options.symbolSize}px`
    // el.style.transitionDuration = `${options.fadeOutDuration}s`

    setTimeout(() => {
      teardown()
    }, options.fadeOutDuration * 1000)
  }

  /* public */
  function teardown() {
    isDeleted = true
    // el.remove()
  }

  /* public */
  function render(_frameTime: number) {
    if (renderCycle > 0) {
      // el.classList.remove('leading')
      // el.classList.add('fade-out')
      // @PERFORMANCE: a solution where only one classList operation
      // is required might be better
    }

    if (Math.random() > options.changeSymbolProbability) {
      // el.innerText = getRandomChar(allChars)
      ctx.clearRect(posX, posY, posX + width, posY + width)
      ctx.fillText(getRandomChar(allChars), posX, posY)
    }

    renderCycle++
    // console.log('renderCycle:', renderCycle, 'frameTime:', _frameTime)
  }

  /* public */
  function getRenderCycle(): number {
    return renderCycle
  }

  /* public */
  function getIsDeleted(): boolean {
    return isDeleted
  }

  return {
    getRenderCycle,
    teardown,
    render,
    getIsDeleted
  }
}

function getRandomChar(chars: string[]): string {
  const index = Math.floor(Math.random() * chars.length)
  return chars[index]
}

export interface Symbol {
  getRenderCycle: () => number
  teardown: () => void
  render: (frameTime: number) => void
  /**
   * Will be set to `true` after a symbol's
   * `el` was deleted from the DOM. It should
   * then be deleted from the Set.
   */
  getIsDeleted: () => boolean
}
