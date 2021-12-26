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

        this.animationHandler
        this.lastRenderTime
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
            if (this.options.debug) {
                console.log('# of columns:', this.columns)
                console.log('# of trickles:', this.trickles.length)
            }
            // for (let i = 0; i < this.trickles.length; i++) {
            // }

            // randomly add new trickles in each column:
            for (let i = 0; i < this.columns; i++) {
                if (Math.random() < this.options.newTrickleProbability) {
                    if (this.options.debug) {
                        console.log('  > adding new trickle')
                    }

                    const newTrickle = new Trickle(this.el, i, this.options)
                    this.trickles.push(newTrickle)
                }
            }

            // process trickles:
            // this.trickles.forEach(trickle => trickle.render())
            for (let i = 0; i < this.trickles.length; i++) {
                // remove trickle if it has run dry:
                if (this.trickles[i].el.children.length <= 0) {
                    if (this.options.debug) {
                        console.log('  > removing run dry trickle')
                    }

                    // remove element from DOM:
                    this.trickles[i].el.remove()

                    // remove object reference:
                    this.trickles.splice(i, 1)
                } else {
                    if (this.options.debug) {
                        console.log('  > rendering trickle')
                    }

                    // render trickle if it has children:
                    this.trickles[i].render()
                }
            }

            this.renderTime = new Date().getTime() - renderStartTime

            if (this.options.debug) {
                console.log('----------')
            }

            resolve()
        })
    }


    /**
     * Automatically runs the render function periodically.
     */
    run (cadence = 1000, statsEl = undefined) {
        // this.renderTimer = setInterval(() => {
        //     this.render()

        //     if (statsEl) {
        //         this.updateStats(statsEl)
        //     }
        // }, cadence)
        this.animationHandler = requestAnimationFrame(() => { 
            this.run(cadence, statsEl)
        })
        const currentRenderTime = Date.now()
            if (!this.lastRenderTime || currentRenderTime > this.lastRenderTime + cadence) {
            this.render()
            if (statsEl) {
                this.updateStats(statsEl)
            }
            this.lastRenderTime = currentRenderTime 
        }
    }

    /**
     * Stops the automatic rendering. It can be continued with run().
     */
    stop () {
        // clearInterval(this.renderTimer)
        cancelAnimationFrame(this.animationHandler)
    }

    updateStats (statsEl) {
        statsEl.innerHTML = `# of cols: ${this.columns} | # of trickles: ${this.trickles.length} | render time: ${this.renderTime} ms`
    }
}

export default Matrix
