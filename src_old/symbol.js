'use strict'

class Symbol {
    symbols = ['ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ']

    getElement (options = undefined) {
        const el = document.createElement('div')
        el.classList.add('symbol')

        el.style.display = 'block'
        el.style.position = 'relative'
        el.style.fontSize = '16px'

        if (options?.style) {
            const cssText = Object.entries(options.style).map(entry => entry.join(': ')).join('; ') + ';'
            el.style.cssText = cssText
            // @REFACTOR: instead of cssText, use el.style attributes (needs to be changed in options.style as well)
        }
        el.innerText = this.symbols[Math.floor(Math.random() * (this.symbols.length - 1))]

        return el
    }

    render (options = undefined) {
        const el = this.getElement(options)
        
        return el
    }
}

export default Symbol
