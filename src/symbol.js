'use strict'

class Symbol extends HTMLElement {
    characters = [
        'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
        'A', 'B', 'C', 'D', 'E', 'F',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]

    iteration = 0

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
        this.style.height = this.options.symbolSize + 'px'
        this.style.width = (this.options.symbolSize * this.options.widthScalingFactor) + 'px'
        this.style.lineHeight = this.options.symbolSize + 'px'

        this.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))] // duplicate with render()
    }

    async render () {
        return new Promise((resolve, reject) => {
            if (this.iteration > 1) {
                this.classList.remove('new-symbol')
            }

            // Reduce opacity according to fade out speed:
            const opacity = 1.0 - (this.iteration * this.fadeOutSpeed)
            this.style.opacity = opacity

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
