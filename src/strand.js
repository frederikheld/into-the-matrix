'use strict'

import Symbol from "./symbol"

class Strand {

    min_length = 0
    max_length = 20

    position = 0 // on the way down

    // has random length
    // propagates +1 down each step

    constructor (column = 0, debug) {
        this.length = Math.floor((Math.random() * this.max_length) + this.min_length - 1)
        this.column = column
        this.debug = debug

        this.debugColor = this.debug ? this._generateRandomColorString() : undefined

        this.position = -this.length // start with negative offset to have the first char start at the top

        this.symbols = []
        for (let i = 0; i < this.length; i++) {
            this.symbols[i] = new Symbol()
        }
    }

    render () {
        // render symbols in strand container:
        const html = '<div class="strand" style="margin-top: ' + this.position + 'em; margin-left: ' + this.column + 'em' + (this.debugColor ? '; border: 1px solid ' + this.debugColor : '') + '">' + this.symbols.map((symbol, i) => {
            const renderOptions = {}
            if (i < this.symbols.length - 1) {
                renderOptions.style = { 'opacity': i * 0.1 }
            } else {
                renderOptions.style = { 'color': '#fff', 'font-weight': 'bold' }
            }

            return symbol.render(renderOptions)
        }).join('') + '</div>'

        // iterate:
        this.position += 1

        return html
    }

    _generateRandomColorString () {
        return '#ff0000'
        // return '#' + Math.floor(Math.random() * 16777215)
    }
}

export default Strand
