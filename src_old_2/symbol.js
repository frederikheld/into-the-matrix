'use strict'

class Symbol {

    characters = [
        'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
        'A', 'B', 'C', 'D', 'E', 'F',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]

    iteration = 0

    constructor (parent, column, row, changeSymbolProbability = 0.1, fadeOutSpeed = 0.1, destructorCallback, options = {}) {
        this.parent = parent
        this.column = column
        this.row = row
        this.fadeOutSpeed = fadeOutSpeed // 0.0..1.0
        this.changeSymbolProbability = changeSymbolProbability // 0.0..1.0

        this.destructorCallback = destructorCallback

        this.options = options
        
        this.id = Date.now() + '' + Math.floor(Math.random() * 1000000)

        this.el = this.getElement()
        this.parent.el.append(this.el)
    }

    getElement () {
        const el = document.createElement('div')
        el.classList.add('symbol')
        el.id = this.id

        el.style.display = 'block'
        el.style.position = 'absolute'
        el.style.top = (this.options.fontSize * this.row) + 'px'
        el.style.left  = (this.options.fontSize * this.column) + 'px'
        el.style.fontSize = this.options.fontSize + 'px'

        // if (this.options?.style) {
        //     const cssText = Object.entries(this.options.style).map(entry => entry.join(': ')).join('; ') + ';'
        //     el.style.cssText = cssText
        //     // @REFACTOR: instead of cssText, use el.style attributes (needs to be changed in options.style as well)
        // }

        el.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))] // duplicate with render()

        return el
    }

    render () {
        // Start next iteration:
        this.iteration++

        // Reduce opacity according to fade out speed:
        const opacity = 1.0 - (this.iteration * this.fadeOutSpeed)
        // const opacity = 1.0
        console.log('opacity:', opacity)
        if (opacity <= 0.0) {
            // delete element:
            console.log('  > destruction initiated')
            this.destructorCallback(this)
            return
        }
        this.el.style.opacity = opacity

        // Change symbol according to probability:
        if (Math.random() < this.changeSymbolProbability) {
            this.el.innerText = this.characters[Math.floor(Math.random() * (this.characters.length - 1))]
        }
    }
}

export default Symbol
