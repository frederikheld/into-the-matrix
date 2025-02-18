import { createSymbol, type Symbol } from './Symbol'

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
}

export const createMatrix = (parentEl: HTMLDivElement, length: number, options: MatrixOptions) => {
    const symbols = new Set<Symbol>()

    const el = setup(length, symbols)
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

    function render (currentTime: number = performance.now()): void {
        currentFrameDuration = currentTime - previousStartTime

        if (currentFrameDuration >= minFrameTime) {
            previousFrameTime = currentFrameDuration // for statistics
            previousStartTime = currentTime // for rendering mechanics
            symbols.forEach((symbol) => symbol.render())
        }

        if (isRunning) {
            requestAnimationFrame(render)
        }
    }

    function getStats () : RenderStats {
        return {
            symbolCount: symbols.size,
            maxFps,
            minFrameTime,
            fps: previousFrameTime > 0 ? 1000 / previousFrameTime : 0,
            frameTime: previousFrameTime
        }
    }

    function start () : void {
        isRunning = true
        render()
    }

    function stop () : void {
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

function setup(length: number, symbols: Set<Symbol>): HTMLDivElement {
    const el = document.createElement('div')

    el.classList.add('matrix')

    new Array(length).fill(0).forEach((_, index) => {
      symbols.add(createSymbol(el, index))
    })

    return el

}