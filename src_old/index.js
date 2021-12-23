'use strict'

import css from "./index.css"
import Strand from "./strand"

class Matrix {

    newStrandProbability = 0.2 // probability per column

    constructor (parentEl, columns, debug = false) {
        this.parentEl = parentEl
        
        this.el = document.createElement('div')
        this.el.classList.add('matrix')

        this.parentEl.append(this.el)

        this.columns = columns
        this.debug = debug

        this.strands = []
    }

    run (cadence = 1000) {
        this.renderTimer = setInterval(() => {
            this.render()
        }, cadence)
    }

    stop () {
        clearInterval(this.renderTimer)
    }

    // getElement () {
    //     // this.strands.map(strand => {
    //     //     this.el.append(strand.render())
    //     // })

    //     this.parentEl.append(this.el)
    // }

    render () {
        const renderStartTime = new Date().getTime()

        // delete strands that are out of the visible area:
        // this.strands.filter(strand => {
        //     console.log(strand.getDimensions())
        //     // console.log('main.render:', strand, strand.getElement().clientWidth)
        // })
        // this.strands.filter(strand => { console.log(strand.style.visibility); return true })

        // add new strands:
        for (let i = 0; i < this.columns; i++) {
            if (Math.random() < this.newStrandProbability) {
                this._addNewStrand(i) 
            }
        }

        // render all strands:
        this.strands.map((strand) => {
            console.log('rendering strand', strand)
            strand.render()
        })

        // log:
        // this._logDebug(renderStartTime)
    }

    _addNewStrand (column) {
        const newStrand = new Strand(this.el, column, this.debug)
        this.strands.push(newStrand)
        console.log('added new strand')
    }

    _logDebug (renderStartTime) {
        const renderTime = new Date().getTime() - renderStartTime
        // console.log('number of strands:', this.strands.length, '| render time:', renderTime, 'ms | ration:', Math.floor(renderTime / this.strands.length * 1000) / 1000, 'ms/strand')
    }
}

export default Matrix
