export interface Symbol {
    el: HTMLDivElement,
    render: Function
}

export const createSymbol = (parentEl: HTMLDivElement, index: number): Symbol => {
    let rotation = index

    const el = setup(rotation)

    parentEl.appendChild(el)

    function render() {
        rotation += 15 // this depends on fps!
        el.style.transform = `rotate3d(0, 0, 1, ${rotation}deg)`
    }

    return {
        el,
        render
    }
}

function setup(index: number): HTMLDivElement {
    const el = document.createElement('div')

    el.id = `symbol-${index}`
    el.classList.add('symbol')

    el.style.willChange = 'transform'
    el.style.transform = `rotate3d(0, 0, 1, ${index}deg)`

    return el
}