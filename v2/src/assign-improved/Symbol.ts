export interface Symbol {
    el: HTMLDivElement,
    render: Function
}

export const createSymbol = (parentEl: HTMLDivElement, index: number): Symbol => {
    let rotation = index

    const chars: string[] = ['0', '1']

    const el = setup(rotation, chars)


    parentEl.appendChild(el)

    function render() {
        // el.innerText = getRandomChar(chars)
        // el.style.content = getRandomChar(chars)
        el.setAttribute('data-content', getRandomChar(chars))
    }

    return {
        el,
        render
    }
}

function setup(index: number, chars: string[]): HTMLDivElement {
    const el = document.createElement('div')

    el.id = `symbol-${index}`
    el.classList.add('symbol')

    // el.innerText = getRandomChar(chars)
    // el.style.content = getRandomChar(chars)
    el.setAttribute('data-content', getRandomChar(chars))

    return el
}

function getRandomChar(chars: string[]): string {
    const index = Math.floor(Math.random() * chars.length)
    return chars[index]
}