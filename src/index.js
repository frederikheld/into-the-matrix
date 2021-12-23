'use strict'

import css from './index.css'
import Strand from '../src/strand'

class Matrix {

    newStrandProbability = 0.2 // probability per column

    constructor (parentEl, columns, debug) {
        this.parentEl = parentEl
        this.columns = columns
        this.debug = debug
        
        this.el = this.createElement()
        this.parentEl.append(this.el)

        // Stores references to child elements that will be
        // created (and some deleted) in each render step:
        this.strands = []

        // will store a reference to the timer created in run()
        // to be able to stop this timer in stop():
        this.renderTimer
    }

    /**
     * Creates and returns the "Matrix" dom element.
     * 
     * @returns dom element
     */
    createElement() {
        const el = document.createElement('div')
        el.classList.add('matrix')

        // el.innerHTML = 'Hello World!'

        return el
    }

    /**
     * Call the render() function in each iteration to
     * update the presentation of the "Matrix" dom element.
     */
    render () {
        // delete all strands that are out of bounds:
        // tbd

        // randomly add new strands in each column:
        for (let i = 0; i < this.columns; i++) {
            if (Math.random() < this.newStrandProbability) {
                const newStrand = new Strand(this.el, i, this.debug)
                this.strands.push(newStrand)
                console.log('created new strand', newStrand)
            }
        }

        // render all strands
        this.strands.map ((strand) => {
            strand.render()
        })
    }

    /**
     * Automatically runs the render function periodically.
     */
    run (cadence = 1000) {
        this.renderTimer = setInterval(() => {
            this.render()
        }, cadence)
    }

    /**
     * Stops the automatic rendering. It can be continued with run().
     */
    stop () {
        clearInterval(this.renderTimer)
    }

    getNumberOfStrands () {
        return this.strands.length
    }
}

export default Matrix
