'use strict'

class Symbol {

    // symbols = ['A', 'B', 'C', 'D', 'E', 'F']
    symbols = ['ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ']

    // @TODO: fades out over time

    render (options = undefined) {
        const el = document.createElement('span')
        el.classList.add('symbol')
        if (options?.style) {
            const cssText = Object.entries(options.style).map(entry => entry.join(': ')).join('; ') + ';'
            el.style.cssText = cssText
        }
        el.innerText = this.symbols[Math.floor(Math.random() * (this.symbols.length - 1))]
        return el.outerHTML
    }
}

export default Symbol
