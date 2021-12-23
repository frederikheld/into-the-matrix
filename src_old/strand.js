'use strict'

import Symbol from "./symbol"

class Strand {

    min_length = 0
    max_length = 20

    position = 0 // on the way down

    // has random length
    // propagates +1 down each step

    constructor (parentEl, column = 0, debug) {
        this.parentEl = parentEl
        this.length = Math.floor((Math.random() * this.max_length) + this.min_length - 1)
        this.column = column
        this.debug = debug

        this.debugColor = this.debug ? this._generateRandomColorString() : undefined

        this.position = -this.length // start with negative offset to have the first char start at the top

        this.el = this.createElement()

        this.symbols = []
        for (let i = 0; i < this.length; i++) {
            // this.symbols[i] = new Symbol(this.el)
            this.symbols[i] = 'x'
        }

        // this.intersectionObserver = new IntersectionObserver(this.kill, {
        //     root: this.parentEl,
        //     rootMargin: '0px',
        //     threshold: 1.0
        // })
    }

    // kill () {

    // }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('strand')

        el.style.marginTop = this.position + 'em'
        el.style.marginLeft = this.column + 'em'
        el.style.display = 'block'
        el.style.position = 'absolute'

        if (this.debugColor) {
            el.style.border = '1px solid ' + this.debugColor
        }

        this.symbols.map((symbol, i) => {
            const renderOptions = {}
            if (i < this.symbols.length - 1) {
                renderOptions.style = { 'opacity': i * 0.1 }
            } else {
                renderOptions.style = { 'color': '#fff', 'font-weight': 'bold' }
            }

            el.append(symbol.render(renderOptions))
        })

        return el
    }

    getDimensions () {
        return this.getElement().getBoundingClientRect()
    }

    getPosition () {
        return this.position
    }

    render () {
        const el = this.getElement()

        // iterate:
        this.position += 1

        return el
    }

    _generateRandomColorString () {
        return '#ff0000'
        // return '#' + Math.floor(Math.random() * 16777215)
    }
}

export default Strand
