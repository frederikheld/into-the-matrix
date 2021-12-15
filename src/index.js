'use strict'

import css from "./index.css"
import Strand from "./strand"

class MatrixCurtain {

    newStrandProbability = 0.2 // probability per column

    constructor (columns, debug = false) {

        this.columns = columns
        this.debug = debug

        this.strands = []
    }

    run (el, cadence = 800) {
        const containerArea = el.getBoundingClientRect()
        console.log(containerArea)
        this.renderTimer = setInterval(() => {
            el.innerHTML = this.render()
        }, cadence)
    }

    stop () {
        clearInterval(this.renderTimer)
    }

    render () {

        // delete strands that are out of the visible area:
        this.strands.filter(strand => { console.log(strand.style.visibility); return true })

        // create new strands:
        for (let i = 0; i < this.columns; i++) {
            if (Math.random() < this.newStrandProbability) {
                this._addNewStrand(i) 
            }
        }

        // log:
        this._logDebug()

        // render strands in curtain container:
        return '<div class="curtain">' + this.strands.map(strand => strand.render()).join('') + '</div>'
    }

    _addNewStrand (column) {
        this.strands.push(new Strand(column, this.debug))
    }

    _logDebug () {
        console.log('number of strands:', this.strands.length)
    }
}

export default MatrixCurtain
