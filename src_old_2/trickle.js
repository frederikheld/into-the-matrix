'use strict'

import Symbol from "./symbol"

class Trickle {
    // A trickle
    //  - moves one position down at each iteration
    //  - drops a symbol at an absolute position each iteration
    //  - has a a fadeout speed that is given to each symbol (this determines the visible length of the trickle)
    // The trickle itself does not create an element, it's just the factory that drops new symbol elements

    currentRow = 0
    fadeOutSpeed = 0.1

    constructor (parent, column, options) {
        this.parent = parent
        this.column = column

        this.changeSymbolProbability = options.changeSymbolProbability
        this.fadeOutSpeed = Math.random()
        this.options = options

        // Stores references to child elements that will
        // be created when the element is being created:
        this.symbols = []

        this.el = this.createElement()
        this.parent.el.append(this.el)
    }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('trickle')

        return el
    }

    render () {
        // Move to next position:
        this.currentRow++

        // Drop new symbol at current position:
        const newSymbol = new Symbol(this, this.column, this.currentRow, this.changeSymbolProbability, this.fadeOutSpeed, this.deleteSymbolCallback, options)
        console.log('newly created symbol id:', newSymbol.id)
        this.symbols.push(newSymbol)

        // Render all symbols:
        this.symbols.map((symbol) => {
            symbol.render()
        })
    }

    /**
     * The execution context of this callback is the instances of Symbol.
     * This means that `this` refers to the instance of Symbol, not to the
     * instance of Trickle!
     */
    deleteSymbolCallback (symbolToDelete) {
        console.log('deleting symbol:', symbolToDelete.id, symbolToDelete)

        // remove symbol from parent element:
        const elementToRemove = document.getElementById(symbolToDelete.id)
        console.log('element to remove:', elementToRemove)
        elementToRemove.remove()

        // remove reference:
        console.log('  symbols.length before:', symbolToDelete.parent.el.symbols)
        symbolToDelete.parent.el.symbols = symbolToDelete.parent.el.symbols.filter(s => {
            console.log('  ', symbolToDelete.id, s)
            return symbolToDelete.id !== s.id
        })
        console.log('  symbols.length after:', symbolToDelete.parent.el.symbols)

        // delete object:
        // delete symbol
    }

}

export default Trickle
