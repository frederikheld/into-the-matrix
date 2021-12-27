'use strict'

import css from './index.css'
import Trickle from './trickle'

class Matrix extends HTMLElement {

    availableRenderModes = ['request-animation-frame', 'set-interval'] // first element is the default mode!

    constructor (parentEl, options) {
        super()

        this.parentEl = parentEl

        this.options = {
            symbolSize: options.symbolSize || 16,
            newTrickleProbability: options.newTrickleProbability || 0.1, // probability per column per render cycle,
            changeSymbolProbability: options.changeSymbolProbability || 0.05, // the probability (per render cycle) that a symbol changes it's character
            fontSizeScalingFactor: options.fontSizeScalingFactor || 1.0, // font size relative to `symbolSize`
            widthScalingFactor: options.widthScalingFactor || 0.8, // width relative to `symbolSize`
            renderMode: options.renderMode || this.availableRenderModes[0], // render method. Options are defined in this.availableRenderModes. Defaults to the first mode in this list.
            debug: options.debug || false
        }
        if (!this.availableRenderModes.includes(this.options.renderMode)) {
            console.warn('`' + this.options.renderMode + '` is not a valid value for `options.renderMode`! Defaulting to `' + this.availableRenderModes[0] + '`. Valid options are: ' + this.availableRenderModes.map(el => '`' + el + '`').join(', ') + '.')
            this.options.renderMode = this.availableRenderModes[0]
        }

        if (this.options.debug) {
            console.log('options:', this.options)
        }

        this.columns = Math.floor(parseInt(getComputedStyle(parentEl).width) / (this.options.symbolSize * this.options.widthScalingFactor))

        this.rigElement()
        this.parentEl.append(this)

        // if render mode `set-interval`:
        this.renderTimer // reference to the render timer created in run()      
        this.renderTime // time in millis needed to render the whole matrix (for statistics)

        // if render mode `request-animation-frame:
        this.animationHandler
        this.lastRenderTime
    }

    /**
     * Creates and returns the "Matrix" dom element.
     * 
     * @returns dom element
     */
     rigElement() {
        this.classList.add('matrix')
        if (this.options.debug) {
            this.classList.add('debug')
        }
    }

    /**
     * Call the render() function in each iteration to
     * update the presentation of the "Matrix" dom element.
     */
    async render () {
        return new Promise((resolve, reject) => {
            const height = this.clientHeight

            this.style.display = 'none'

            const renderStartTime = new Date().getTime()

            if (this.options.debug) {
                console.log('# of columns:', this.columns)
                console.log('# of trickles:', this.children.length)
            }

            // randomly add new trickles in each column:
            for (let i = 0; i < this.columns; i++) {
                if (Math.random() < this.options.newTrickleProbability) {
                    if (this.options.debug) {
                        console.log('  > adding new trickle')
                    }

                    new Trickle(this, i, this.options)
                }
            }

            // process trickles:
            // this.trickles.forEach(trickle => trickle.render())
            for (let i = 0; i < this.children.length; i++) {
                // remove trickle if it has no children anymore:
                if (this.children[i].children.length <= 0) {
                    if (this.options.debug) {
                        console.log('  > removing run dry trickle')
                    }

                    // remove element from DOM:
                    this.children[i].remove()
                } else {
                    if (this.options.debug) {
                        console.log('  > rendering trickle')
                    }

                    // render trickle if it has children:
                    this.children[i].render(height)
                }
            }

            this.renderTime = new Date().getTime() - renderStartTime

            if (this.options.debug) {
                console.log('----------')
            }

            this.style.display = 'block'

            resolve()
        })
    }


    /**
     * Automatically runs the render function periodically.
     */
    run (cadence = 1000, statsEl = undefined) {
        if (this.options.renderMode === 'set-interval') {

            this.renderTimer = setInterval(() => {
                this.render()

                if (statsEl) {
                    this.updateStats(statsEl)
                }
            }, cadence)

        } else {

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
    }

    /**
     * Stops the automatic rendering. It can be continued with run().
     */
    stop () {
        if (this.options.renderMode === 'set-interval') {
            clearInterval(this.renderTimer)
        } else {
            cancelAnimationFrame(this.animationHandler)
        }
    }

    updateStats (statsEl) {
        statsEl.innerHTML = `# of cols: ${this.columns} | # of trickles: ${this.children.length} | render time: ${this.renderTime} ms`
    }
}

window.customElements.define('matrix-matrix', Matrix)

export default Matrix
