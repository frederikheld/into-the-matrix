'use strict'

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

        this.el = this.createElement()
        this.parentEl.append(this.el)
    }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('strand')

        el.style.marginTop = this.currentPosition + 'em'
        el.style.marginLeft = this.column + 'em'
        el.style.display = 'block'
        el.style.position = 'absolute'

        el.innerHTML = ':-)'

        return el
    }

    render () {
        this.currentPosition += 1
        this.el.style.marginTop = this.currentPosition + 'em'
        this.el.innerHTML = parseInt(getComputedStyle(this.el).marginTop)
    }
}

export default Strand
