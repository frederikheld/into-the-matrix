'use strict'

import Symbol from './symbol'

class Strand {

    min_length = 0
    max_length = 20

    currentPosition = 0 // on the way down

    constructor (parentEl, column, debug) {
        this.parentEl = parentEl
        this.column = column
        this.debug = debug

        this.length = Math.floor((Math.random() * this.max_length) + this.min_length - 1)
        this.currentPosition = -this.length // start with negative offset to have the first char start at the top

        // Stores references to child elements that will
        // be created when the element is being created:
        this.symbols = []

        this.el = this.createElement()
        this.parentEl.append(this.el)
    }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('strand')

        // el.style.marginTop = this.currentPosition + 'em' // duplicate with render()
        el.style.marginLeft = this.column + 'em'
        el.style.display = 'block'
        el.style.position = 'absolute'

        // Fill list with number of child elements
        // according to `this.length`:
        for (let i = 0; i < this.length; i++) {
            const options = { }
            if (i < this.length - 1) {
                options.style = { 'opacity': i * 0.1 }
            } else {
                options.style = { 'color': '#fff', 'font-weight': 'bold' }
            }

            this.symbols[i] = new Symbol(el, options)
        }

        return el
    }

    render () {
        this.currentPosition += 1
        this.el.style.marginTop = this.currentPosition + 'em'

        this.symbols.map((symbol) => {
            symbol.render()
        })
    }
}

export default Strand
