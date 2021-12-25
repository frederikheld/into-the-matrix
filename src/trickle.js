'use strickt'

import Symbol from "./symbol"

class Trickle {
    currentRow = 0

    constructor (parentEl, column, options) {
        this.parentEl = parentEl
        this.column = column

        this.changeSymbolProbability = options.changeSymbolProbability
        this.fadeOutSpeed = (Math.floor(Math.random() * 20) + 5) / 100 // @TODO: this should be something like a bell curve!

        this.options = options

        // Stores references to child elements that will
        // be created when the element is being created:
        this.symbols = []

        this.el = this.createElement()
        this.parentEl.append(this.el)

        this.parentElHeight = parseInt(getComputedStyle(this.parentEl).height)
    }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('trickle')

        return el
    }

    render () {
        // Move to next position:
        this.currentRow++

        // Drop new symbol at current position if trickle is not out of bounds:
        if (this.currentRow * this.options.fontSize < this.parentElHeight) {
            const newSymbol = new Symbol(this.el, this.column, this.currentRow, this.changeSymbolProbability, this.fadeOutSpeed, options)
            this.symbols.push(newSymbol)
        }

        // Render all symbols:
        this.symbols.map((symbol) => {
            symbol.render()
        })
    }


}

export default Trickle
