'use strict'

class Symbol {

    symbols = ['ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ']

    constructor (parentEl, options = undefined) {
        this.parentEl = parentEl
        this.options = options
        
        this.el = this.getElement()
        this.parentEl.append(this.el)
    }

    getElement () {
        const el = document.createElement('div')
        el.classList.add('symbol')

        el.style.display = 'block'
        el.style.position = 'relative'
        el.style.fontSize = '16px'

        if (this.options?.style) {
            const cssText = Object.entries(this.options.style).map(entry => entry.join(': ')).join('; ') + ';'
            el.style.cssText = cssText
            // @REFACTOR: instead of cssText, use el.style attributes (needs to be changed in options.style as well)
        }

        // el.innerText = this.symbols[Math.floor(Math.random() * (this.symbols.length - 1))] // duplicate with render()

        return el
    }

    render () {
        if (this.options?.text) {
            this.el.innerText = this.options.text
        } else {
            this.el.innerText = this.symbols[Math.floor(Math.random() * (this.symbols.length - 1))]
        }
    }
}

export default Symbol
