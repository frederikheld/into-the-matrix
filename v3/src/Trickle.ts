import type { MatrixOptions, RenderDimensions } from './Matrix'
import { Symbol } from './Symbol'

export class Trickle {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private columnIndex: number = 0

  private options: MatrixOptions
  private renderDimensions: RenderDimensions = {
    columnCount: 0,
    rowsCount: 0,
    scale: 0
  }

  private symbols: Symbol[] = []

  private posX: number = 0
  private posY: number = 0
  private width: number = 0
  private height: number = 0

  private rowsCount: number = 0

  constructor(canvas: HTMLCanvasElement, columnIndex: number, options: MatrixOptions) {
    this.canvas = canvas

    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get render context')
    this.ctx = ctx

    this.columnIndex = columnIndex
    this.options = options

    this.posX = columnIndex * options.symbolSize
    this.posY = 0
    this.width = options.symbolSize
    this.height = this.canvas.clientHeight
  }

  public resize(renderDimensions?: RenderDimensions): void {
    if (renderDimensions) {
      this.renderDimensions = renderDimensions
    }

    new Array(this.renderDimensions.rowsCount).fill(0).forEach((_, rowIndex) => {
      this.symbols.push(new Symbol(this.canvas, this.columnIndex, rowIndex, this.options))
    })

    this.symbols.forEach((symbol) => {
      symbol.resize(this.renderDimensions)
    })
  }

  public render(): void {
    // this.ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'
    // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)

    // this.ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
    // this.ctx.strokeRect(this.posX, this.posY, this.width, this.height)

    this.symbols.forEach((symbol) => {
      symbol.render()
    })
  }
}
