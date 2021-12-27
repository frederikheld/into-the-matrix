'use strict'

class Symbol extends HTMLElement {
    characters = [
        'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
        'A', 'B', 'C', 'D', 'E', 'F',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]

    iteration = -1

    constructor (parentEl, column, row, changeSymbolProbability = 0.1, fadeOutSpeed = 0.1, options = {}) {
        super()

        this.parentEl = parentEl
        this.column = column
        this.row = row
        this.changeSymbolProbability = changeSymbolProbability
        this.fadeOutSpeed = fadeOutSpeed

        this.options = options

        this.rigElement()
        this.parentEl.append(this)

        this.render()
    }

    rigElement () {
        this.classList.add('symbol')
        this.classList.add('new-symbol')

        this.style.display = 'block'
        this.style.position = 'absolute'
        this.style.top = this.options.symbolSize * this.row + 'px'
        this.style.left  = (this.options.symbolSize * this.options.widthScalingFactor * this.column) + 'px'
        this.style.fontSize = (this.options.symbolSize * this.options.fontSizeScalingFactor) + 'px'
        this.style.textShadow = '0 0 ' + (this.options.symbolSize / 4) + 'px rgba(42, 255, 42), 0 0 ' + (this.options.symbolSize / 3) + 'px rgba(42, 255, 42)'
        this.style.height = this.options.symbolSize + 'px'
        this.style.width = (this.options.symbolSize * this.options.widthScalingFactor) + 'px'
        this.style.lineHeight = this.options.symbolSize + 'px'

        this.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))] // duplicate with render()
    }

    async render () {
        return new Promise((resolve, reject) => {
            if (this.iteration > 0) {
                this.classList.remove('new-symbol')
            }

            // Calculate opacity:
            const opacity = 1.0 - (this.iteration * this.fadeOutSpeed)

            // Delete faded out symbols:
            if (opacity <= 0.0) {
                if (this.options.debug) {
                    console.log('deleting faded out symbol')
                }
                this.remove()
                resolve()
            }

            // Set opacity:
            this.style.opacity = opacity
            
            // this.style.color = 'rgba(42, 255, 42, ' + opacity + ')'
            // this.style.textShadow = '0 0 ' + (this.options.symbolSize / 4) + 'px rgba(42, 255, 42, ' + opacity + '), 0 0 ' + (this.options.symbolSize / 3) + 'px rgba(42, 255, 42, ' + opacity + ')'
            /* @PERFORMANCE:
             * According to this guide (https://web.dev/animations-guide/#conclusion),
             * `opacity` is one of the less heavy CSS animations.
             * It could be even better to not animate at all but put the opacity on
             * the text color and shadow .
             * But shadows are bad for performance as well. Multiple shadows are worse.
             * See: https://web.dev/animations-guide/#paint
             */

            // Change symbol according to probability:
            if (Math.random() < this.changeSymbolProbability) {
                this.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))]
            }

            // Start next iteration:
            this.iteration++

            resolve()
        })
    }
}

window.customElements.define('matrix-symbol', Symbol)

export default Symbol
