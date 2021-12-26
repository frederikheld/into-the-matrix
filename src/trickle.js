'use strickt'

import Symbol from './symbol'

class Trickle {
    currentRow = 0

    constructor (parentEl, column, options = {}) {
        this.parentEl = parentEl
        this.column = column

        this.changeSymbolProbability = options.changeSymbolProbability
        this.fadeOutSpeed = (Math.floor(Math.random() * 20) + 3) / 100 // @TODO: this should be something like a bell curve!

        this.options = options

        // Stores references to child elements that will
        // be created when the element is being created:
        this.symbols = []

        this.el = this.createElement()
        this.parentEl.append(this.el)

        this.parentElHeight = parseInt(getComputedStyle(this.parentEl).height)

        /**
         * A trickle will have one render run on creation to add a first element.
         * This allows to do the removing and rendering in the same loop over the trickles 
         * in `Matrix.render()`.
         */
        this.render()
    }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('trickle')

        return el
    }

    async render () {
        return new Promise ((resolve, reject) => {
            // Drop new symbol at current position if trickle is not out of bounds:
            if (this.currentRow * this.options.symbolSize < this.parentElHeight) {
                const newSymbol = new Symbol(this.el, this.column, this.currentRow, this.changeSymbolProbability, this.fadeOutSpeed, this.options)
                this.symbols.push(newSymbol)
            }

            // Render all symbols:
            // this.symbols.forEach(symbol => symbol.render())
            for (let i = 0; i < this.symbols.length; i++) {
                this.symbols[i].render()
            }

            // Move to next position:
            this.currentRow++

            resolve()
        })
    }


}

export default Trickle
