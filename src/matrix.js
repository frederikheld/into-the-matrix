'use strict'

import css from './index.css'
import Trickle from './trickle'

class Matrix {

    constructor (parentEl, options) {
        this.parentEl = parentEl

        this.options = {
            symbolSize: options.symbolSize || 16,
            newTrickleProbability: options.newTrickleProbability || 0.1, // probability per column per render cycle,
            changeSymbolProbability: options.changeSymbolProbability || 0.05, // the probability (per render cycle) that a symbol changes it's character
            fontSizeScalingFactor: options.fontSizeScalingFactor || 1.0, // font size relative to `symbolSize`
            widthScalingFactor: options.widthScalingFactor || 0.8, // width relative to `symbolSize`
            debug: options.debug || false
        }

        this.columns = Math.floor(parseInt(getComputedStyle(parentEl).width) / (this.options.symbolSize * this.options.widthScalingFactor))

        // Stores references to child elements that will be
        // created/deleted dynamically in each render step:
        this.trickles = []
        
        this.el = this.createElement()
        this.parentEl.append(this.el)

        // will store a reference to the timer created in run()
        // to be able to stop this timer in stop():
        this.renderTimer

        // time in millis needed to render the whole matrix:
        this.renderTime
    }

    /**
     * Creates and returns the "Matrix" dom element.
     * 
     * @returns dom element
     */
     createElement() {
        const el = document.createElement('div')
        el.classList.add('matrix')
        if (this.options.debug) {
            el.classList.add('debug')
        }

        return el
    }

    /**
     * Call the render() function in each iteration to
     * update the presentation of the "Matrix" dom element.
     */
    async render () {
        return new Promise((resolve, reject) => {
            const renderStartTime = new Date().getTime()

            // remove trickles that have no children anymore:
            // this.trickles = this.trickles.filter(trickle => {
            //     if (trickle.el.children.length > 0) {
            //         return true
            //     }

            //     trickle.el.remove()

            //     return false
            // })
            for (let i = 0; i < this.trickles.length; i++) {
                if (this.trickles[i].el.children.length <= 0) {
                    // remove element from DOM:
                    this.trickles[i].el.remove()

                    // remove object reference:
                    this.trickles.splice(i, 1)
                }
            }

            // randomly add new trickles in each column:
            for (let i = 0; i < this.columns; i++) {
                if (Math.random() < this.options.newTrickleProbability) {
                    const newTrickle = new Trickle(this.el, i, this.options)
                    this.trickles.push(newTrickle)
                }
            }

            // render all trickles:
            // this.trickles.forEach(trickle => trickle.render())
            for (let i = 0; i < this.trickles.length; i++) {
                this.trickles[i].render()
            }

            this.renderTime = new Date().getTime() - renderStartTime

            resolve()
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
        statsEl.innerHTML = `# of cols: ${this.columns} | # of trickles: ${this.trickles.length} | render time: ${this.renderTime} ms`
    }
}

export default Matrix
