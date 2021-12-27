'use strickt'

import Symbol from './symbol'

class Trickle extends HTMLElement {
    currentRow = -1 // -1 to compensate for the first render run in the constructor

    constructor (parentEl, column, options = {}) {
        super()

        this.parentEl = parentEl
        this.column = column

        this.changeSymbolProbability = options.changeSymbolProbability
        this.fadeOutSpeed = (Math.floor(Math.random() * 20) + 3) / 100 // @TODO: this should be something like a bell curve!

        this.options = options

        this.rigElement()
        this.parentEl.append(this)

        this.parentElHeight = parseInt(getComputedStyle(this.parentEl).height)

        /**
         * A trickle will have one render run on creation to add a first element.
         * This allows to do the removing and rendering in the same loop over the trickles 
         * in `Matrix.render()`.
         */
        this.render()
    }

    rigElement () {
        this.classList.add('trickle')
    }

    async render () {
        return new Promise ((resolve, reject) => {
            // Drop new symbol at current position if trickle is not out of bounds:
            if (this.currentRow * this.options.symbolSize < this.parentElHeight) {
                new Symbol(this, this.column, this.currentRow, this.changeSymbolProbability, this.fadeOutSpeed, this.options)
            }

            // Render all symbols:
            // this.children.forEach(symbol => symbol.render())
            for (let i = 0; i < this.children.length; i++) {

                // Delete element if it is faded out:
                if (this.children[i].style.opacity <= 0.0) {
                    if (this.options.debug) {
                        console.log('removing faded out symbol')
                    }

                    // remove element from DOM:
                    this.children[i].remove()
                } else {
                    this.children[i].render()
                }
            }

            // Move to next position:
            this.currentRow++

            resolve()
        })
    }


}

window.customElements.define('matrix-trickle', Trickle)

export default Trickle
