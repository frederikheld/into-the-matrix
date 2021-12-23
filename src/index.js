'use strict'

import css from './index.css'
import Strand from './strand'

class Matrix {

    newStrandProbability = 0.2 // probability per column

    constructor (parentEl, columns, debug) {
        this.parentEl = parentEl
        this.columns = columns
        this.debug = debug

        // Stores references to child elements that will be
        // created/deleted dynamically in each render step:
        this.strands = []
        
        this.el = this.createElement()
        this.parentEl.append(this.el)

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

        return el
    }

    /**
     * Call the render() function in each iteration to
     * update the presentation of the "Matrix" dom element.
     */
    render () {
        // delete all strands that are out of bounds:
        this.strands = this.strands.filter((strand) => {
            const parentHeight = this.el.clientHeight

            const marginTop = parseInt(getComputedStyle(strand.el).marginTop)
            
            if (marginTop > parentHeight) {
                strand.el.remove() // remove element from DOM
                return false // remove object from references list
            }

            return true
        })

        // randomly add new strands in each column:
        for (let i = 0; i < this.columns; i++) {
            if (Math.random() < this.newStrandProbability) {
                const newStrand = new Strand(this.el, i, this.debug)
                this.strands.push(newStrand)
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
    run (cadence = 1000, statsEl = undefined) {
        this.renderTimer = setInterval(() => {
            this.render()

            if (statsEl) {
                this.updateStats(statsEl)
            }
        }, cadence)
    }

    /**
     * Stops the automatic rendering. It can be continued with run().
     */
    stop () {
        clearInterval(this.renderTimer)
    }

    updateStats (statsEl) {
        statsEl.innerHTML = `
<table>
  <tbody>
    <tr><td># of strands:</td><td>${this.strands.length}</td></tr>
  </tbody>
</table>
`
    }
}

export default Matrix
