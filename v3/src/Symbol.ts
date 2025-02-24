import type { MatrixOptions, RenderDimensions } from './Matrix'

export class Symbol {
  /* prettier-ignore  */
  private characters = [
    'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
    'A', 'B', 'C', 'D', 'E', 'F',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ]

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private options: MatrixOptions
  private renderDimensions: RenderDimensions = {
    columnCount: 0,
    rowsCount: 0,
    scale: 0
  }

  // this defined the bounding box of the symbol:
  private posX: number = 0
  private posY: number = 0
  private width: number = 0
  private height: number = 0

  private renderCycle: number = 0
  private currentSymbol: string = ' '

  constructor(
    canvas: HTMLCanvasElement,
    columnIndex: number,
    rowIndex: number,
    options: MatrixOptions
  ) {
    this.canvas = canvas

    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get render context')
    this.ctx = ctx

    this.options = options

    this.posX = columnIndex * this.options.symbolSize
    this.posY = rowIndex * this.options.symbolSize
    this.width = this.options.symbolSize
    this.height = this.options.symbolSize

    this.resize()
  }

  public resize(renderDimensions?: RenderDimensions): void {
    if (renderDimensions) {
      this.renderDimensions = renderDimensions
    }

    this.ctx.font = `${this.width}px monospace`
    this.ctx.textAlign = 'center'
    this.canvas.style.lineHeight = `${this.width}px`
    this.canvas.style.textAlign = 'center'
  }

  public render(): void {
    if (this.renderCycle > 0) {
      this.ctx.fillStyle = 'rgba(42, 255, 42, 1)'
    } else {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    }

    if (Math.random() < this.options.changeSymbolProbability) {
      this.currentSymbol = getRandomChar(this.characters)
    }

    // this.ctx.strokeStyle = ' green'
    // this.ctx.strokeRect(this.posX, this.posY, this.width, this.height)
    // console.log(`symbol:`, this.posX, this.posY, this.width, this.height)

    this.ctx.fillText(
      this.currentSymbol,
      this.posX + this.options.symbolSize / 2, // because of centered text
      this.posY,
      this.width
    )

    this.renderCycle++
  }
}

function getRandomChar(chars: string[]): string {
  const index = Math.floor(Math.random() * chars.length)
  return chars[index]
}
