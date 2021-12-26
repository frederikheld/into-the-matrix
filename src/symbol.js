'use strict'

class Symbol {
    characters = [
        'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
        'A', 'B', 'C', 'D', 'E', 'F',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]

    iteration = 0

    constructor (parentEl, column, row, changeSymbolProbability = 0.1, fadeOutSpeed = 0.1, options = {}) {
        this.parentEl = parentEl
        this.column = column
        this.row = row
        this.changeSymbolProbability = changeSymbolProbability
        this.fadeOutSpeed = fadeOutSpeed

        this.options = options

        this.id = Date.now() + '' + Math.floor(Math.random() * 1000000)

        this.el = this.createElement()
        this.parentEl.append(this.el)
    }

    createElement () {
        const el = document.createElement('div')
        el.classList.add('symbol')
        el.classList.add('new-symbol')
        el.id = this.id

        el.style.display = 'block'
        el.style.position = 'absolute'
        el.style.top = this.options.symbolSize * this.row + 'px'
        el.style.left  = (this.options.symbolSize * this.options.widthScalingFactor * this.column) + 'px'
        el.style.fontSize = (this.options.symbolSize * this.options.fontSizeScalingFactor) + 'px'
        el.style.height = this.options.symbolSize + 'px'
        el.style.width = (this.options.symbolSize * this.options.widthScalingFactor) + 'px'
        el.style.lineHeight = this.options.symbolSize + 'px'

        el.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))] // duplicate with render()

        return el
    }

    async render () {
        return new Promise((resolve, reject) => {
            if (this.iteration > 0) {
                this.el.classList.remove('new-symbol')
            }

            // Reduce opacity according to fade out speed:
            const opacity = 1.0 - (this.iteration * this.fadeOutSpeed)

            // Delete element if it is faded out:
            if (opacity <= 0.0) {
                // console.log('removing element')
                this.el.remove()
                return
            }
            this.el.style.opacity = opacity

            // Change symbol according to probability:
            if (Math.random() < this.changeSymbolProbability) {
                this.el.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))]
            }

            // Start next iteration:
            this.iteration++

            resolve()
        })
    }
}

export default Symbol
