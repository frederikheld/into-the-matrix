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
  private currentRow: number = 1

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

    this.symbols.forEach((symbol) => {
      symbol.resize(this.renderDimensions)
    })
  }

  public render(): void {
    // Remove all symbols that have faded out:
    this.symbols = this.symbols.filter((symbol) => !symbol.isFadedOut())

    // If not out of bounds, drop new symbol at current position:
    if (this.currentRow * this.options.symbolSize < this.height) {
      this.symbols.push(new Symbol(this.canvas, this.columnIndex, this.currentRow, this.options))
    }

    this.symbols.forEach((symbol) => {
      symbol.render()
    })

    this.currentRow++
  }

  public getCurrentRow(): number {
    return this.currentRow
  }

  public getSymbolsLength(): number {
    return this.symbols.length
  }
}
