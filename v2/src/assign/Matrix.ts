// import { convertToCssString } from './utils'
import { createSymbol, type Symbol } from './Symbol'

export const createMatrix = (parentEl: HTMLDivElement, length: number) => {
    const symbols = new Set<Symbol>()

    let isRunning = false

    const el = setup(length, symbols)

    parentEl.appendChild(el)

    function render () {
        symbols.forEach((symbol) => symbol.render())

        if (isRunning) {
            requestAnimationFrame(render)
        }
    }

    function start () {
        isRunning = true
        render()
    }

    function stop () {
        isRunning = false
    }

    return {
        el,
        render,
        start,
        stop
    }
}

function setup(length: number, symbols: Set<Symbol>): HTMLDivElement {
    const el = document.createElement('div')

    el.classList.add('matrix')

    // el.setAttribute('style', convertToCssString({
    //   display: 'flex',
    //   'flex-direction': 'row',
    //   'flex-wrap': 'wrap'
    // }))

    new Array(length).fill(0).forEach((_, index) => {
      symbols.add(createSymbol(el, index))
    })

    return el

}